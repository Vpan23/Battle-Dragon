let xpe = 100;
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
    },
    {
        name: '~God Sword~',
        power: 1000
    }
]

const monsters = [
    {
        name: 'slime',
        level: 2,
        health: 15
    },
    {
        name: 'fanged beast',
        level: 8,
        health: 60
    },
    {
        name: "dragon",
        level: 20,
        health: 300
    }
];

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
    },
    {
        name: "fight",
        "button text": ["Attack","Dodge","Run"],
        "button functions": [attack, dodge, goTown],
        text: "You are fighting monsters."
    },
    {
        name: "kill monster",
        "button text": ["Go to town square","Go to town square","Go to town square"],
        "button functions": [goTown, goTown, goTown],
        text: "The monster screams 'Arg!' as it dies. You gain experience points and find gold."
    },
    {
        name: "lose",
        "button text": ["Replay?","Replay?","Replay?"],
        "button functions": [restart, restart, restart],
        text: "You die."
    },
    {
        name: "win",
        "button text": ["Replay?","Replay?","Replay?"],
        "button functions": [restart, restart, restart],
        text: "You defeat the Dragon! YOU WIN THE GAME!."
    }

]


button1.onclick = goStore
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
    monsterStats.style.display = 'none';
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
    fighting = 0;
    goFight();
}
function fightBeast() {
    fighting = 1;
    goFight();
}
function fightDragon() {
    fighting = 2;
    goFight();
}
function goFight() {
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = 'block';
    monsterNameText.innerHTML = monsters[fighting].name;
    monsterHealthText.innerHTML = monsterHealth;
}
function attack() {
    text.innerHTML = "The " + monsters[fighting].name + " attacks."; 
    text.innerHTML += " You attack it with your " + weapons[currentWeapon].name + ".";
    health -= monsters[fighting].level;
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;;
    healthText.innerHTML = health;
    monsterHealthText.innerHTML = monsterHealth;
    if (health <= 0) {
        lose();
    } else if (monsterHealth <= 0) {
        fighting === 2 ? winGame() : defeatMonster();
    }
}
function dodge() {
    text.innerHTML = "You dodge the attack from the " + monsters[fighting].name + ".";
}
function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerHTML = gold;
    xp += 1;
    update(locations[4]);
}
function lose() {
    update(locations[5]);
}
function winGame() {
    update(locations[6]);
}
function restart() {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = ['stick'];
    goldText.innerHTML = gold;
    xpText.innerHTML = xp;
    healthText.innerHTML = health;
    goTown();
}
