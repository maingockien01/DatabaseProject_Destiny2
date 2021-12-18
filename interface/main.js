/*function myFunction()
{
    document.getElementById("damage").multiple = true; 
    let x = document.getElementById('damage').value;
    let y = document.getElementById('slot').value;
    let z = document.getElementById('rarity').value;
    let w = document.getElementById('weapon').value;
    let weapon = document.getElementById('weapon_input').value;
    let armor = document.getElementById('armor_input').value;
    console.log("Damage type: "+x);
    console.log("Slot type: "+y);
    console.log("Rarity type: "+z);
    console.log("Weapon type: "+w);
    console.log("Weapon Name: "+weapon);
    console.log("Armor Name: "+armor);
}*/

function getValue()
{
    let weapon = document.getElementById('weapon_input').value;
    if(weapon!='')
    {
        console.log(weapon);
    }
    else
    {
        weapon="null";
        console.log(weapon);
    }
    
    let armor = document.getElementById('armor_input').value;
    if(armor!='')
    {
        console.log(armor);
    }
    else{
        armor="null"
        console.log(armor);
    }
    
    let weaponList = document.getElementById("weapon").options;
    for(let i=0 ; i < weaponList.length; i++)
    {
        if(weaponList[i].selected==true)
        {
            console.log(weaponList[i].value)
            //weaponList[i].selected=false
        }
    }

    let damageList = document.getElementById("damage").options;
    for(let i=0 ; i < damageList.length; i++)
    {
        if(damageList[i].selected==true)
        {
            console.log(damageList[i].value)
            //weaponList[i].selected=false
        }
    }

    let rarityList = document.getElementById("rarity").options;
    for(let i=0 ; i < rarityList.length; i++)
    {
        if(rarityList[i].selected==true)
        {
            console.log(rarityList[i].value)
            //weaponList[i].selected=false
        }
    }

    let slotList = document.getElementById("slot").options;
    for(let i=0 ; i < slotList.length; i++)
    {
        if(slotList[i].selected==true)
        {
            console.log(slotList[i].value)
            //weaponList[i].selected=false
        }
    }

    
}

function clearAll()
{
    let weaponList = document.getElementById("weapon").options;
    for(let i=0;i<weaponList.length;i++)
    {
        weaponList[i].selected=false;
    }
    let damageList = document.getElementById("damage").options;
    for(let i=0;i<damageList.length;i++)
    {
        damageList[i].selected=false;
    }
    let rarityList = document.getElementById("rarity").options;
    for(let i=0;i<rarityList.length;i++)
    {
        rarityList[i].selected=false;
    }
    let slotList = document.getElementById("slot").options;
    for(let i=0;i<slotList.length;i++)
    {
        slotList[i].selected=false;
    }
}

function checkSelect()
{
    let weaponList = document.getElementById("weapon").options;
    for(let i=0 ; i < weaponList.length; i++)
    {
        weaponList[i].addEventListener("click",()=> {
            if(weaponList[i].selected==true)
            {
                weaponList[i].selected=false;
            }
            else{
                weaponList[i].selected=true;
            }
        })
    }

    let damageList = document.getElementById("damage").options;
    for(let i=0 ; i < damageList.length; i++)
    {
        damageList[i].addEventListener("click",()=> {

            if(damageList[i].selected==true)
            {
                damageList[i].selected=false;
            }
            else
            {
                damageList[i].selected=true;
            }
            
        })
    }

    let slotList = document.getElementById("slot").options
    for(let i=0 ; i < slotList.length; i++)
    {
        slotList[i].addEventListener("click",()=> {
            if(slotList[i].selected==true)
            {
                slotList[i].selected=false;
            }
            else{
                slotList[i].selected=true;
            }
        })
    }

    let rarityList = document.getElementById("rarity").options
    for(let i=0 ; i < rarityList.length; i++)
    {
        rarityList[i].addEventListener("click", ()=> {
            if(rarityList[i].selected==true)
            {
                rarityList[i].selected=false;
            }
            else{
                rarityList[i].selected=true;
            }
        })
    }
}
