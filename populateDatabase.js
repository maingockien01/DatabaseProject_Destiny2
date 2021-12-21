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
            sanitizeKeepAttributes(['itemSubType', 'sockets', 'source', 'sourceHash', 'damageTypeHashes', 'description', 'inventory', 'itemTypeAndTierDisplayName', 'equippingBlock', 'name', 'hash', 'flavorText', 'perks', 'itemType', 'classType', 'stats', 'inventory', 'perks', 'itemCategoryHashes'])])
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


    await extractTable(manifest, "DestinyCollectibleDefinition",
        [sanitizeDisplayProperties, sanitizeKeepAttributes(['name', 'hash', 'description', 'sourceString', 'sourceHash', 'itemHash'])])
        .then(extractedTable => {
            data.collectible = extractedTable;
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
    //--------------- PREPARE DATA --------------    

    const createWeaponType = (name, hash) => { return { name: name, hash: hash } }
    const weaponTypes = [

        createWeaponType('None', 0),
        createWeaponType('Crucible', 1),
        createWeaponType('Vanguard', 2),
        createWeaponType('Exotic', 5),
        createWeaponType('AutoRifle', 4),
        createWeaponType('Shotgun', 7),
        createWeaponType('Machinegun', 8),
        createWeaponType('HandCannon', 9),
        createWeaponType('RocketLauncher', 10),
        createWeaponType('FusionRifle', 11),
        createWeaponType('SniperRifle', 12),
        createWeaponType('PulseRifle', 13),
        createWeaponType('ScoutRifle', 14),
        createWeaponType('Crm', 16),
        createWeaponType('Sidearm', 17),
        createWeaponType('Sword', 18),
        createWeaponType('Mask', 19),
        createWeaponType('Shader', 20),
    ]

    var weaponsHash = []
    var weaponSQL = []
    var weapon = []
    //Get weapon list
    const weaponItemType = 3
    data.inventoryItem.map(object => {
        if (object.itemType === weaponItemType) {
            const name = object.name
            const id = object.hash
            const lore = object.flavorText
            const weaponTypeHash = object.itemSubType;
            const ammoType = object.equippingBlock.ammoType
            const frameHash = -1 //TODO: connect with Frame table
            const damageType = object.damageTypeHashes[0] || -1
            const tierType = object.inventory.tierTypeHash

            //Stats
            const impact = (object.stats.stats['4043523819']) ? object.stats.stats['4043523819'].value : 0;
            const range = object.stats.stats['1240592695'] ? object.stats.stats['1240592695'].value : 0;
            const stability = object.stats.stats['155624089'] ? object.stats.stats['155624089'].value : 0;
            const handling = object.stats.stats['943549884'] ? object.stats.stats['943549884'].value : 0;
            const reloadSpeed = object.stats.stats['4188031367'] ? object.stats.stats['4188031367'].value : 0;
            const aimAssistence = object.stats.stats['1345609583'] ? object.stats.stats['1345609583'].value : 0;
            const inventorySize = object.stats.stats['1931675084'] ? object.stats.stats['1931675084'].value : 0;
            const zoom = object.stats.stats['3555269338'] ? object.stats.stats['3555269338'].value : 0;
            const recoilDirection = object.stats['2715839340'] ? object.stats['2715839340'].value : 0;

            const sql = `INSERT INTO Weapon (name, wID, lore, tID, amID, fID, dID, ttID, Impact, Range, Stability, Handling, ReloadSpeed, AimAssistence, InventorySize, Zoom, RecoilDirection) 
VALUES 
(${prepare(object.name)}, ${prepare(object.hash)}, ${prepare(lore)}, ${prepare(weaponTypeHash)}, ${prepare(ammoType)} , ${prepare(frameHash)}, ${prepare(damageType)} , ${prepare(tierType)}
, ${prepare(impact)}, ${prepare(range)}, ${prepare(stability)} , ${prepare(handling)}, ${prepare(reloadSpeed)} , ${prepare(aimAssistence)}
, ${prepare(inventorySize)}, ${prepare(zoom)}, ${prepare(recoilDirection)});`

            weapon.push(object)
            weaponSQL.push(sql)
            weaponsHash.push(id)
        }
    })


    //Get armor
    var armorSQL = []
    var armor = []
    var armorHash = []
    const armorItemType = 2
    data.inventoryItem.map(object => {
        if (object.itemType === armorItemType) {

            var pID = ''
            if (object.perks && object.perks.length > 0) {
                pID = object.perks[0].perkHash
                console.log(object.hash)
            }
            const ttID = object.inventory.tierTypeHash

            const slot = object.equippingBlock.equipmentSlotTypeHash

            //Stats
            const Mobility = (object.stats.stats['2996146975'] && object.stats.stats['2996146975'].value) || 0;
            const Resilience = (object.stats.stats['392767087'] && object.stats.stats['392767087'].value) || 0;
            const Recovery = (object.stats.stats['1943323491'] && object.stats.stats['1943323491'].value) || 0;
            const Discipline = (object.stats.stats['1735777505'] && object.stats.stats['1735777505'].value) || 0;
            const Intelliect = (object.stats.stats['144602215'] && object.stats.stats['144602215'].value) || 0;
            const Strength = (object.stats.stats['4244567218'] && object.stats.stats['4244567218'].value) || 0;


            const sql = `INSERT INTO Armor (Name, aID, ttID, Description, Mobility, Resilience, Recovery, Discipline, Intelliect, Strength, Slot) 
            VALUES 
            (${prepare(object.name)}, ${prepare(object.hash)}, ${prepare(ttID)}, ${prepare(object.description)},
            ${prepare(Mobility)}, ${prepare(Resilience)}, ${prepare(Recovery)}, ${prepare(Discipline)}, ${prepare(Intelliect)}, ${prepare(Strength)}, ${prepare(slot)});`

            armorSQL.push(sql)
            armorHash.push(object.hash)
            armor.push(object)
            console.log(object)
        }
    })

    //Get source

    var source = []

    var weaponFrom = []
    var armorFrom = []

    data.collectible.map(object => {
        source.push({
            hash: object.sourceHash,
            description: object.sourceString,
        })


        if (weaponsHash.includes(object.itemHash)) {

            weaponFrom.push({
                weaponHash: object.itemHash,
                sourceHash: object.sourceHash,
            })
        }

        if (armorHash.includes(object.itemHash)) {

            armorFrom.push({
                armorHash: object.itemHash,
                sourceHash: object.sourceHash,
            })
        }
    })

    // Get can mod of weapons


    canMod = []
    canModSQL = []
    weapon.map(object => {
        if (object.sockets) {
            const sockets = object.sockets

            var socketIndexes = []

            sockets.socketCategories.map(socket => {
                if (socket.socketCategoryHash === 2685412949) {
                    socketIndexes = socket.socketIndexes
                }
            })

            socketIndexes.map(index => {
                const entry = sockets.socketEntries[index]

                if (entry.singleInitialItemHash) {
                    const canModObject = {
                        modHash: entry.singleInitialItemHash,
                        weaponHash: object.hash,
                    }

                    const sql = `INSERT INTO CanMod (wID, mID) VALUES (${prepare(canModObject.weaponHash)}, ${canModObject.modHash})`

                    canMod.push(canModObject)
                    canModSQL.push(sql)
                }
            })

        }
    })

    armorModCat = [590099826]

    //Armor mod
    armorMod = []
    armorModSQL = []
    armor.map(object => {
        if (object.sockets) {

            const sockets = object.sockets

            var socketIndexes = []

            sockets.socketCategories.map(socket => {
                if (armorModCat.includes(socket.socketCategoryHash)) {
                    socketIndexes = socket.socketIndexes


                    socketIndexes.map(index => {
                        const entry = sockets.socketEntries[index]

                        if (entry.singleInitialItemHash) {
                            const armorModObject = {
                                modHash: entry.singleInitialItemHash,
                                armorHash: object.hash,
                            }

                            const sql = `INSERT INTO ArmorMod (aID, mID) VALUES (${prepare(armorModObject.armorHash)}, ${armorModObject.modHash})`

                            armorMod.push(armorModObject)
                            armorModSQL.push(sql)
                        }
                    })
                }
            })
        }
    })

    //--------------- INSERT --------------------
    appendSQL('# INSERT TierType')
    data.tierType.map(object => {
        const sql = `INSERT INTO TierType (TierName, ttID) VALUES (${prepare(object.name)}, ${prepare(object.hash)});`
        appendSQL(sql)
    })

    appendSQL('# INSERT DamageType')
    data.damageType.map(object => {
        const sql = `INSERT INTO DamageType (DamageName, dID) VALUES (${prepare(object.name)}, ${prepare(object.hash)});`
        appendSQL(sql)
    })

    appendSQL('# INSERT WeaponType')
    weaponTypes.map(object => {
        const sql = `INSERT INTO WeaponType (WeaponName, tID) VALUES (${prepare(object.name)}, ${prepare(object.hash)});`
        appendSQL(sql)

    })

    appendSQL('# INSERT AmmoType')
    data.presentationNode.map(object => {
        if (['Primary', 'Heavy', 'Special'].includes(object.name)) {

            const sql = `INSERT INTO AmmoType (AmmoName, aaID) VALUES (${prepare(object.name)}, ${prepare(object.hash)});`
            appendSQL(sql)
        }
    })

    appendSQL('# INSERT Mods')
    data.inventoryItem.map(object => {
        const modsHash = 59
        if (object.itemCategoryHashes && object.itemCategoryHashes.includes(modsHash)) {

            const sql = `INSERT INTO Mods (ModName, mID) VALUES (${prepare(object.name)}, ${prepare(object.hash)});`
            appendSQL(sql)
        }
    })

    appendSQL('# INSERT Frame')
    const frameModHash = 3708671066
    data.inventoryItem.map(object => {
        if (object.itemCategoryHashes && object.itemCategoryHashes.includes(frameModHash)) {

            const sql = `INSERT INTO Frame (Description, fID) VALUES (${prepare(object.name)}, ${prepare(object.hash)});`
            appendSQL(sql)
        }
    })



    appendSQL('# INSERT Source')
    var sourceHashSet = []
    source.map(object => {
        if (!sourceHashSet.includes(object.hash)) {
            const sql = `INSERT INTO Source (sID, Description) VALUES (${prepare(object.hash)}, ${prepare(object.description)});`
            appendSQL(sql)

            sourceHashSet.push(object.hash)
        }
    })

    appendSQL('# INSERT Perks')
    data.sandbox.map(object => {
        const sql = `INSERT INTO Perks (Name, pID, Description) VALUES (${prepare(object.name)}, ${prepare(object.hash)}, ${prepare(object.description)});`
        appendSQL(sql)


    })

    appendSQL('# INSERT Armor')
    armorSQL.map(sql => {
        appendSQL(sql)
    })

    appendSQL('# INSERT Weapon')
    weaponSQL.map(sql => {
        appendSQL(sql)
    })


    appendSQL('# INSERT CanMod')
    canModSQL.map(sql => {
        appendSQL(sql)
    })

    appendSQL('# INSERT ArmorMod')
    armorModSQL.map(sql => {
        appendSQL(sql)
    })


    appendSQL('# INSERT CanRoll')
    weapon.map(object => {
        if (object.perks && object.perks.length > 0) {
            object.perks.map(perk => {
                const sql = `INSERT INTO CanRoll (wID, pID) VALUES (${prepare(object.hash)}, ${prepare(perk.perkHash)});`
                appendSQL(sql)
            })
        }

    })

    appendSQL('# INSERT WeaponFrom')
    weaponFrom.map(object => {
        const sql = `INSERT INT WeaponFrom (wID, sID) VALUES (${object.weaponHash}, ${object.sourceHash})`
        appendSQL(sql)
    })

    appendSQL('# INSERT ArmorForm')
    armorFrom.map(object => {
        const sql = `INSERT INT WeaponFrom (aID, sID) VALUES (${object.armorHash}, ${object.sourceHash})`
        appendSQL(sql)
    })
}

//---------------------- HELPERS ---------------------

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
    if (!param && typeof param !== 'number') {
        return ''
    }
    if (typeof param === 'string' || param instanceof String) {
        const prepared = "'" + param.replaceAll("'", "''") + "'"

        return prepared
    } else {
        return param
    }
}