var Traveler = require('the-traveler').default

var Manifest = require('the-traveler/build/Manifest').default

const fs = require('fs')

const traveler = new Traveler({
    apiKey: '8c0a428fa52248c8846df7b2128fbd95',
    userAgent: 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:95.0) Gecko/20100101 Firefox/95.0',
    debug: true,
})

const manitfestFilepath = './manifest.content'
const sqlFilepath = './populate.sql'

fs.writeFile(sqlFilepath, `# CREATED AT ${Date.now()}\n`, { flag: 'w+' }, err => { if (err) console.log(err) })



// Download the manifest

traveler.destiny2.getDestinyManifest().then(result => {
    traveler.destiny2.downloadManifest(result.Response.mobileWorldContentPaths.en, manitfestFilepath).then(async (filepath) => {
        const manifest = new Manifest(filepath);
        const data = await extractData(manifest)
        populate(data)


        manifest.queryManifest('SELECT name FROM sqlite_master WHERE type="table"').then(queryResult => {
            console.log(queryResult);
        }).catch(err => {
            console.log(err);
        })

    }).catch(err => {
        console.log(err)
    })
})

const extractData = async (manifest) => {
    var data = {}

    await extractTable(manifest, "DestinyItemCategoryDefinition",
        [sanitizeDisplayProperties, sanitizeKeepAttributes(['name', 'hash', 'grantDestinyItemType', 'groupedCategoryHashes'])])
        .then(extractedTable => {
            data.itemCategory = extractedTable
        })

    await extractTable(manifest, "DestinyInventoryItemDefinition",
        [sanitizeDisplayProperties,
            sanitizeKeepAttributes(['description', 'inventory', 'itemTypeAndTierDisplayName', 'equippingBlock', 'name', 'hash', 'flavorText', 'perks', 'itemType', 'classType', 'stats', 'inventory', 'perks', 'itemCategoryHashes'])])
        .then(extractedTable => {
            data.inventoryItem = extractedTable

        })

    await extractTable(manifest, "DestinyStatDefinition",
        [sanitizeDisplayProperties, sanitizeKeepAttributes(['name', 'hash', 'description'])])
        .then(extractedTable => {
            data.stat = extractedTable;
        })

    await extractTable(manifest, "DestinySandboxPerkDefinition",
        [sanitizeDisplayProperties, sanitizeKeepAttributes(['name', 'hash', 'description', 'damageType'])])
        .then(extractedTable => {
            data.sandbox = extractedTable;
        })

    await extractTable(manifest, "DestinyItemTierTypeDefinition",
        [sanitizeDisplayProperties, sanitizeKeepAttributes(['name', 'hash', 'description'])])
        .then(extractedTable => {
            data.tierType = extractedTable;

        })

    //DamageType
    await extractTable(manifest, "DestinyDamageTypeDefinition",
        [sanitizeDisplayProperties, sanitizeKeepAttributes(['name', 'hash', 'description', 'enumValue'])])
        .then(extractedTable => {
            data.damageType = extractedTable;
        })

    await extractTable(manifest, "DestinyPresentationNodeDefinition",
        [sanitizeDisplayProperties, sanitizeKeepAttributes(['name', 'hash', 'description', 'nodeType', 'scope'])])
        .then(extractedTable => {
            data.presentationNode = extractedTable;
        })


    return data
}

const extractTable = async (manifest, tableName, sanitizeList) => {

    return manifest.queryManifest(`SELECT * FROM ${tableName}`).then(queryResult => {
        const sanitizedObjects = sanitizeQueryResult(queryResult, sanitizeList)

        return sanitizedObjects
    }).catch(err => {
        throw err
    })
}


const populate = (data) => {
    appendSQL('# INSERT TierType')
    data.tierType.map(object => {
        const sql = `INSERT INTO TierType (name, id) VALUES (${prepare(object.name)}, ${prepare(object.hash)});`
        appendSQL(sql)
    })

    appendSQL('# INSERT DamageType')
    data.damageType.map(object => {
        const sql = `INSERT INTO DamageType (type, id) VALUES (${prepare(object.name)}, ${prepare(object.hash)});`
        appendSQL(sql)
    })

    const weaponTypeHash = [2, 3, 4] //Subtype of Weapon (hash 1) - Result from web api
    appendSQL('# INSERT WeaponType')
    data.itemCategory.map(object => {
        if (weaponTypeHash.includes(object.hash)) {
            const sql = `INSERT INTO WeaponType (type, id) VALUES (${prepare(object.name)}, ${prepare(object.hash)});`
            appendSQL(sql)
        }



    })

    appendSQL('# INSERT AmmoType')
    data.presentationNode.map(object => {
        if (['Primary', 'Heavy', 'Special'].includes(object.name)) {

            const sql = `INSERT INTO AmmoType (type, id) VALUES (${prepare(object.name)}, ${prepare(object.hash)});`
            appendSQL(sql)
        }
    })

    appendSQL('# INSERT Mods')
    data.inventoryItem.map(object => {
        const modsHash = 59
        if (object.itemCategoryHashes && object.itemCategoryHashes.includes(modsHash)) {

            const sql = `INSERT INTO Mods (type, id) VALUES (${prepare(object.name)}, ${prepare(object.hash)});`
            appendSQL(sql)
        }
    })

    appendSQL('# INSERT Frame')
    data.sandbox.map(object => {
        if (object.name && object.name.includes("Frame")) {

            const sql = `INSERT INTO Frames (type, id) VALUES (${prepare(object.name)}, ${prepare(object.hash)});`
            appendSQL(sql)
        }
    })


    appendSQL('# INSERT Perks')
    data.inventoryItem.map(object => {
        if (object.perks && object.perks.length > 0) {
            const tierTypeHash = object.inventory.tierTypeHash;
            const sql = `INSERT INTO Perks (type, id, description, ttID) VALUES (${prepare(object.name)}, ${prepare(object.hash)}, ${prepare(object.description)}, ${prepare(tierTypeHash)});`
            appendSQL(sql)
        }

    })

    appendSQL('# INSERT Weapon')
    data.inventoryItem.map(object => {
        if (object.itemType === 3) {
            const ammoType = object.equippingBlock.ammoType

            const sql = `INSERT INTO Weapon (type, id) VALUES (${prepare(object.name)}, ${prepare(object.hash)});`
            appendSQL(sql)


        }

    })



}

const sanitizeDisplayProperties = (object) => {
    object.name = object.displayProperties.name
    object.description = object.displayProperties.description

    delete object.displayProperties

    return object
}

const sanitizeKeepAttributes = (attributes) => {
    return (object) => {
        var sanitizedObject = {}

        attributes.map(attribute => {
            sanitizedObject[attribute] = object[attribute]

        })


        return sanitizedObject
    }
}

const sanitizeQueryResult = (queryResult, sanitizeList) => {
    const sanitized = queryResult.map(result => {
        const json = result.json;
        var object = JSON.parse(json)

        if (sanitizeList) {
            sanitizeList.map(sanitize => {
                object = sanitize(object)
            })
        }
        return object
    })

    const filteredSanitized = sanitized.filter(object => {
        return object.name !== ''
    })


    return filteredSanitized
}

const appendSQL = (line) => {
    fs.appendFileSync(sqlFilepath, line + "\n", function (err) {
        if (err) throw err;
    });
}

const prepare = (param) => {
    if (typeof param === 'string' || param instanceof String) {
        const prepared = "'" + param.replaceAll("'", "''") + "'"

        return prepared
    } else {
        return param
    }
}