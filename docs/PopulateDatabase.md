# Populate tables

| Manifest table | DB Tables |
|----------------|-----------|
| DestinyInventoryItemDefinition: stats.stats -> stats, flavorText -> lore, displayProperties.name -> name | Weapon |
|  | AmmoType |

- [] Weapons: InventoryItem
- [x] Perks: InventoryItem -> Perk: use hash of InventoryItem
- [] Armor: InventoryItem
- [] Catalysts: InventoryItem
- [] WeaponFrom: Unsure, either RewardSource, or Vendor
- [] CanMod: This is just a joining relation on Weapons and Mods filtering only weapon mods. No new data is included here.
- [] CanRoll: Again, this is just a joining table from Weapons to Perks. The info would be found within the Weapons entry, and thus InventoryItem
- [] ArmorFrom: Same as WeapoFrom, RewardSource or Vendor
- [] ArmorMod: Same as CanMod, but for armor.
- [?] WeaponType: ItemCategory ? whether there are only 3 types or more than that?
- [x] AmmoType: It looks like these are actually in PresentationNode, there's a lot of other things in here besides the ammo though.
- [?] Frame: This is in SandboxPerk as well.
- [x] DamageType: This thankfully is in it's own definition, all by itself. DamageType
- [] Source: Again, this is some sort of link between Vendors and weapons.
- [x] Mods: InventoryItems + itemCategoryHashes: 59 - modHash
- [x] TierType: Also in its own: ItemTierType

# References
https://github.com/vpzed/Destiny2-API-Info-wiki/blob/master/API-Introduction-Part-3-Manifest.md
https://alexanderwe.github.io/the-traveler/