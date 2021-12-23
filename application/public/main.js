var expanded = false;

function showDamageSelection() {
  var checkboxes = document.getElementById("checkboxes_damage");
  if (!expanded) {
    checkboxes.style.display = "block";
    expanded = true;
  } else {
    checkboxes.style.display = "none";
    expanded = false;
  }
}

function showSlotSelection() {
    var checkboxes = document.getElementById("checkboxes_slot");
    if (!expanded) {
      checkboxes.style.display = "block";
      expanded = true;
    } else {
      checkboxes.style.display = "none";
      expanded = false;
    }
}

function showRaritySelection() {
    var checkboxes = document.getElementById("checkboxes_rarity");
    if (!expanded) {
      checkboxes.style.display = "block";
      expanded = true;
    } else {
      checkboxes.style.display = "none";
      expanded = false;
    }
}

function showWeaponSelection() {
    var checkboxes = document.getElementById("checkboxes_weapon");
    if (!expanded) {
      checkboxes.style.display = "block";
      expanded = true;
    } else {
      checkboxes.style.display = "none";
      expanded = false;
    }
}

function getValues()
{
    const damage_list = []
    var damage = document.getElementsByName("damage");
    for(var checkbox of damage)
    {
        if(checkbox.checked)
        {
            if(damage_list.length===0)
            {
                damage_list.push(checkbox.id)
            }
            else{
                for(let j=0;j<damage_list.length;j++)
                {
                    if(damage_list.indexOf(checkbox.id)=="-1")
                    {
                        damage_list.push(checkbox.id)
                    }
                }
            }
        }
    }
    if(damage_list.length!=0)
    {
        console.log("Damage List: "+damage_list)
    }
    else{
        damage_list.push("NULL")
        console.log("Damage List: "+damage_list)
    }

    const slot_list = []
    var slot = document.getElementsByName("slot");
    for(var checkbox of slot)
    {
        if(checkbox.checked)
        {
            if(slot_list.length===0)
            {
                slot_list.push(checkbox.id)
            }
            else{
                for(let j=0;j<slot_list.length;j++)
                {
                    if(slot_list.indexOf(checkbox.id)=="-1")
                    {
                        slot_list.push(checkbox.id)
                    }
                }
            }
        }
    }
    if(slot_list.length!=0)
    {
        console.log("Slot List: "+slot_list);
    }
    else{
        slot_list.push("NULL")
        console.log("Slot List: "+slot_list);
    }

    const rarity_list = []
    var rarity = document.getElementsByName("rarity");
    for(var checkbox of rarity)
    {
        if(checkbox.checked)
        {
            if(rarity_list.length===0)
            {
                rarity_list.push(checkbox.id)
            }
            else{
                for(let j=0;j<rarity_list.length;j++)
                {
                    if(rarity_list.indexOf(checkbox.id)=="-1")
                    {
                        rarity_list.push(checkbox.id)
                    }
                }
            }
        }
    }
    if(rarity_list.length!=0)
    {
        console.log("Rarity List: "+rarity_list);
    }
    else{
        rarity_list.push("NULL")
        console.log("Rarity List: "+rarity_list);
    }


    const weapon_list = []
    var weapon = document.getElementsByName("weapon");
    for(var checkbox of weapon)
    {
        if(checkbox.checked)
        {
            if(weapon_list.length===0)
            {
                weapon_list.push(checkbox.id)
            }
            else{
                for(let i=0;i<weapon_list.length;i++)
                {
                    if(weapon_list.indexOf(checkbox.id)=="-1")
                    {
                        weapon_list.push(checkbox.id)
                    }
                }
            }
            
        }
    }
    if(weapon_list.length!=0)
    {
        console.log("Weapon List: "+weapon_list);
    }
    else{
        weapon_list.push("NULL")
        console.log("Weapon List: "+weapon_list);
    }
    
    let weapon_name = document.getElementById('weapon_input').value;
    if(weapon_name!='')
    {
        console.log("Weapon Name: "+weapon_name);
    }
    else
    {
        weapon_name="NULL";
        console.log("Weapon Name: "+weapon_name);
    }
    
    let armor_name = document.getElementById('armor_input').value;
    if(armor_name!='')
    {
        console.log("Armor Name: "+armor_name);
    }
    else{
        armor_name="NULL"
        console.log("Armor Name: "+armor_name);
    }

}
