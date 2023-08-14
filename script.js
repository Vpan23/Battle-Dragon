let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpTest");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const weapons = [
    {
        name: 'stick',
        power: 5
    },
    {
        name: 'dagger',
        power: 30
    },
    {
        name: 'claw hammer',
        power: 50
    },
    {
        name: 'sword',
        power: 100
    }
]

const locations = [
    {
        name: "town square",
        "button text": ["Go to store","Go to cave","Fight Dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in the town square. you see a sign that says \"store.\""
    },
    {
        name: "store",
        "button text": ["Buy 10 health (10 gold)","But weapon (30 gold)","Go to town square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "You enter the store."
    },
    {
        name: "cave",
        "button text": ["Fight slime","Fight fanged beast","Go to town square"],
        "button functions": [fightSlime, fightBeast, goTown],
        text: "You enter the cave. You see some monsters."
    }

]


button1.onclick = goStore
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
    button1.innerHTML = location["button text"][0];
    button2.innerHTML = location["button text"][1];
    button3.innerHTML = location["button text"][2];
    text.innerHTML = location.text;
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
}

function goTown() {
    update(locations[0]);
}

function goStore() {
    update(locations[1]);
}
function goCave() {
    update(locations[2]);
}
function buyHealth() {
    if (gold >= 10) {
        gold -= 10;
        health += 10;
        goldText.innerHTML = gold;
        healthText.innerHTML = health;
    } else {
        text.innerHTML = 'You do not have enough gold to buy health';
    }
}
function buyWeapon() {
   if (currentWeapon < weapons.length - 1) {
        if (gold >= 30) {
            gold -= 30;
            currentWeapon++;
            goldText.innerHTML = gold;
            let newWeapon = weapons[currentWeapon].name;
            text.innerHTML = 'You have now a ' + newWeapon + '.';
            inventory.push(newWeapon);
            text.innerHTML += 'In your inventory you have: ' + inventory; 
        } else {
            text.innerHTML = 'You do not have enough gold to buy a weapon';
        } 
   } else {
        text.innerHTML = 'You already have the most powerful weapon';
        button2.innerHTML = 'Sell weapon for 15 gold';
        button2.onclick = sellWeapon;
}
function sellWeapon() {
    if (inventory.length > 1) {
        gold += 15;
        goldText.innerHTML = gold;
        let currentWeapon = inventory.shift();
        text.innerHTML = 'You sold a ' + currentWeapon + '.';
        text.innerHTML += "In your inventory you have " + inventory; 
    } else {
        text.innerHTML = "Don't sell your only weapon!";
    }
}
}
function fightSlime() {

}
function fightBeast() {

}
function fightDragon() {
    console.log('Fight Dragons');
}

4:09
