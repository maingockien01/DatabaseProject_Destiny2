# Populate tables

- [x] Weapons: InventoryItem - done extract
    - [x] Problem: dont know how to find Frame of Weapon
    - [x] Problem: dont know how to get WeaponType
- [x] Perks: InventoryItem -> Perk: use hash of InventoryItem
- [x] Armor: InventoryItem - done extract 
    - [x] All stats are 0 -> fixed
- [] Catalysts: InventoryItem 
    - [] There are only 61 but dont know how to find them.
- [x] WeaponFrom: Unsure, either RewardSource, or Vendor -> decide where to insert it
- [x] CanMod: This is just a joining relation on Weapons and Mods filtering only weapon mods. No new data is included here. -> only get singleInitialItem Mod - there can be more but require more works to do so nah
- [x] CanRoll: Again, this is just a joining table from Weapons to Perks. The info would be found within the Weapons entry, and thus InventoryItem 
    - [x] For now its fine. Maybe perks is in socket instead
- [x] ArmorFrom: Same as WeaponFrom, RewardSource or Vendor
- [x] ArmorMod: Same as CanMod, but for armor.
- [x] WeaponType: ItemCategory ? whether there are only 3 types or more than that?
- [x] AmmoType: It looks like these are actually in PresentationNode, there's a lot of other things in here besides the ammo though.
- [x] Frame: This is in Inventory Item -> belong category: Weapon Mod: Frame
- [x] DamageType: This thankfully is in it's own definition, all by itself. DamageType
- [x] Source: Again, this is some sort of link between Vendors and weapons.
- [x] Mods: InventoryItems + itemCategoryHashes: 59 - modHash
- [x] TierType: Also in its own: ItemTierType

# References
https://github.com/vpzed/Destiny2-API-Info-wiki/blob/master/API-Introduction-Part-3-Manifest.md
https://alexanderwe.github.io/the-traveler/