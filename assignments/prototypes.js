/*
  Object oriented design is commonly used in video games.  For this part of the assignment you will be implementing several constructor functions with their correct inheritance hierarchy.

  In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.  

  At the bottom of this file are 3 objects that all end up inheriting from Humanoid.  Use the objects at the bottom of the page to test your constructor functions.
  
  Each constructor function has unique properties and methods that are defined in their block comments below:
*/
  
/*
  === GameObject ===
  * createdAt
  * name
  * dimensions (These represent the character's size in the video game)
  * destroy() // prototype method that returns: `${this.name} was removed from the game.`
*/

function GameObject (charAttributes) {
    this.createdAt = charAttributes.createdAt;
    this.name = charAttributes.name;
    this.dimensions = charAttributes.dimensions;
}

GameObject.prototype.destroy = function () {
    return `${this.name} was removed from the game.`
}

/*
  === CharacterStats ===
  * healthPoints
  * takeDamage() // prototype method -> returns the string '<object name> took damage.'
  * should inherit destroy() from GameObject's prototype
*/

function CharacterStats (statAttributes) {
    GameObject.call(this, statAttributes);
    this.healthPoints = statAttributes.healthPoints;
}

CharacterStats.prototype = Object.create(GameObject.prototype);
CharacterStats.prototype.takeDamage = function () {
    return `${this.name} took damage.`
}

/*
  === Humanoid (Having an appearance or character resembling that of a human.) ===
  * team
  * weapons
  * language
  * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
  * should inherit destroy() from GameObject through CharacterStats
  * should inherit takeDamage() from CharacterStats
*/
function Humanoid (humanAttributes) {
    GameObject.call(this, humanAttributes);
    CharacterStats.call(this, humanAttributes);
    this.team = humanAttributes.team;
    this.weapons = humanAttributes.weapons;
    this.language = humanAttributes.language;
} 

Humanoid.prototype = Object.create(GameObject.prototype);
Humanoid.prototype = Object.create(CharacterStats.prototype);
Humanoid.prototype.greet = function () {
    return `${this.name} offers a greeting in ${this.language}`
}
/*
  * Inheritance chain: GameObject -> CharacterStats -> Humanoid
  * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
  * Instances of CharacterStats should have all of the same properties as GameObject.
*/

// Test you work by un-commenting these 3 objects and the list of console logs below:


  const mage = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 1,
      height: 1,
    },
    healthPoints: 5,
    name: 'Bruce',
    team: 'Mage Guild',
    weapons: [
      'Staff of Shamalama',
    ],
    language: 'Common Tongue',
  });

  const swordsman = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 2,
      height: 2,
    },
    healthPoints: 15,
    name: 'Sir Mustachio',
    team: 'The Round Table',
    weapons: [
      'Giant Sword',
      'Shield',
    ],
    language: 'Common Tongue',
  });

  const archer = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 1,
      width: 2,
      height: 4,
    },
    healthPoints: 10,
    name: 'Lilith',
    team: 'Forest Kingdom',
    weapons: [
      'Bow',
      'Dagger',
    ],
    language: 'Elvish',
  });

  console.log(mage.createdAt); // Today's date
  console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
  console.log(swordsman.healthPoints); // 15
  console.log(mage.name); // Bruce
  console.log(swordsman.team); // The Round Table
  console.log(mage.weapons); // Staff of Shamalama
  console.log(archer.language); // Elvish
  console.log(archer.greet()); // Lilith offers a greeting in Elvish.
  console.log(mage.takeDamage()); // Bruce took damage.
  console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.


  // Stretch task: 
  // * Create Villain and Hero constructor functions that inherit from the Humanoid constructor function.  
  // * Give the Hero and Villains different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;
  // * Create two new objects, one a villain and one a hero and fight it out with methods!

  //a method to be used by  both hero and villian. It will set their health after being attacked by their opponent.
  Humanoid.prototype.setHealth = function (newHealthPoints) {
      this.healthPoints -= newHealthPoints;
      
      if(this.healthPoints>0) {
            console.log(`${this.name} is still in the fight with ${this.healthPoints} hP.\n\n`)
      } else{
            console.log(`\n\n **OH WOW! What an attack! ${this.name} has died.** \n\n`);
      }
  }

  //Villian constructor
    function Villian (villianAttributes) {
        Humanoid.call(this, villianAttributes);
        this.teammate = villianAttributes.teammate;
        this.opponent = villianAttributes.opponent;
    }

    //Villian prototypes. I have similar battle and attack prototypes for the Hero, but have them separate so the text output could be different. 
    Villian.prototype = Object.create(Humanoid.prototype);
    Villian.prototype.battle = function (opponent) {
        this.opponent = opponent.name;
        return `${this.name} is going to try to kill ${opponent.name}`;
    }

    Villian.prototype.attack = function(){
        const damage = Math.ceil(Math.random()*10); //determines damage of attack, will be less than hero attacks
        const hit = Math.random(); //determines if attack hits
        const temp = Math.random(); //will be used to determine which weapon is used, see if loop below to choose between weapon options
        let attackChoice = '';
        if(temp<0.33){
            attackChoice = this.weapons[0];
        } else if (temp>=0.33 && temp <0.67){
            attackChoice = this.weapons[1];
        } else {
            attackChoice=this.weapons[2]
        }

        console.log(`${this.name} attacks with ${attackChoice}!`);

        if(hit<0.7){ //probability of villian hitting is lower than hero
            console.log((`${attackChoice} hit! It did ${damage} damage points to ${this.opponent}.`));
            return damage;
        } else {
            console.log(`${this.opponent} was too fast! ${attackChoice} missed!`);
            return 0;
        }
    }

    

    function Hero (heroAttributes) {
        Humanoid.call(this, heroAttributes);
        this.teammate = heroAttributes.teammate;
        this.winningCheer = heroAttributes.winningCheer;
        this.opponent = heroAttributes.opponent;
    }

    Hero.prototype = Object.create(Humanoid.prototype);
    Hero.prototype.battle = function (opponent) {
        this.opponent = opponent.name;
        return `${this.name} has entered a battle with ${opponent.name}`;
    }

    Hero.prototype.attack = function(){
        const damage = Math.ceil(Math.random()*15);
        const hit = Math.random();
        const temp = Math.random();
        let attackChoice = '';
        if(temp<0.33){
            attackChoice = this.weapons[0];
        } else if (temp>=0.33 && temp <0.67){
            attackChoice = this.weapons[1];
        } else {
            attackChoice=this.weapons[2]
        }

        console.log(`${this.name} attacks with ${attackChoice}!`);

        if(hit<0.85){
            console.log(`${attackChoice} hit! It did ${damage} damage points to ${this.opponent}`);
            return damage;
        } else {
            console.log(`${this.opponent} got lucky! ${attackChoice} missed!`);
            return 0;
        }
    }

    

    const boss = new Villian ({
        createdAt: new Date(),
        dimensions: {
            length: 6,
            width: 10, //yes, he is fat
            height: 6,
        },
        healthPoints: 65,
        name: 'Bowser',
        team: 'Team Evil',
        weapons: [
        'Fire Breath',
        'Spinning Shell',
        'Roar',
        ],
        language: 'Turtle',
        teammate: [
            'Baby Bowser',
            'Wario'
        ]
    });

    const goodGuy = new Hero ({
        createdAt: new Date(),
        dimensions: {
            length: 2,
            width: 3, 
            height: 4,
        },
        healthPoints: 55, //less health than villian
        name: 'Mario',
        team: 'Team Good',
        weapons: [
        'Fire Ball',
        'Coin Jump',
        'Magic Carpet',
        ],
        language: 'Italian',
        teammate: [
            'Luigi',
            'Toad'
        ],
        winningCheer: 'Yippee'
    });

    //The nuisances of the battle
    console.log(goodGuy.battle(boss));
    console.log(boss.battle(goodGuy));
    console.log(goodGuy.greet());
    console.log(boss.greet());
    console.log(`\n\n*******BATTLE BEGINS*******`);
    
    //The battle. It will go back and forth until someone dies. 
    do{
        goodGuy.setHealth(boss.attack());
        boss.setHealth(goodGuy.attack());
    }while((goodGuy.healthPoints>0 && boss.healthPoints>0));
