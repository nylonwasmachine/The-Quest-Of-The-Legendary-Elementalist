// ==========================================
// THE QUEST OF THE LEGENDARY ELEMENTALIST
// Game JavaScript
// ==========================================

// ==========================================
// GAME DATA
// ==========================================

const elements = {

```
fire: {
    name: "Fire",
    icon: "🔥",
    color: "#a33b22",
    description:
        "The element of courage, passion and destruction.",

    beginning:
        "The warm wind carries the smell of smoke from the northern hills. " +
        "Your fire answers with a faint glow in your hands.",

    chapter1:
        "Beyond the old stone road stands a village surrounded by burnt fields. " +
        "The villagers whisper that something ancient has awakened beneath the mountain."
},

ice: {
    name: "Ice",
    icon: "❄️",
    color: "#5b8499",
    description:
        "The element of patience, wisdom and the frozen north.",

    beginning:
        "A strange cold follows you wherever you walk. " +
        "Even in the summer air, frost appears beneath your footsteps.",

    chapter1:
        "At the edge of the northern forest you discover a frozen road. " +
        "No map of the kingdom shows this road."
},

plant: {
    name: "Plant",
    icon: "🌿",
    color: "#557548",
    description:
        "The element of life, nature and growth.",

    beginning:
        "The plants around you move when you approach. " +
        "Somewhere deep within the forest, something is calling your name.",

    chapter1:
        "You enter the ancient Greenwood, where trees older than the kingdom " +
        "stand beside forgotten ruins."
},

earth: {
    name: "Earth",
    icon: "🪨",
    color: "#79583c",
    description:
        "The element of strength, endurance and stone.",

    beginning:
        "The ground trembles beneath your boots. " +
        "For a moment, you hear the sound of something enormous moving underground.",

    chapter1:
        "An old mining road leads toward a mountain marked with a symbol " +
        "that matches the mark appearing on your hand."
},

lightning: {
    name: "Lightning",
    icon: "⚡",
    color: "#a07c28",
    description:
        "The element of speed, storms and sudden change.",

    beginning:
        "Thunder rolls across a perfectly clear sky. " +
        "A spark jumps from your fingers and disappears into the clouds.",

    chapter1:
        "A ruined watchtower stands on the hill ahead. " +
        "Lightning repeatedly strikes its highest tower."
},

air: {
    name: "Air",
    icon: "💨",
    color: "#71858c",
    description:
        "The element of freedom, movement and the open sky.",

    beginning:
        "The wind whispers words you cannot quite understand. " +
        "Then it suddenly changes direction and points toward the west.",

    chapter1:
        "On the western cliffs you discover an ancient bridge suspended over " +
        "a valley that does not appear on any royal map."
},

water: {
    name: "Water",
    icon: "🌊",
    color: "#39758a",
    description:
        "The element of change, healing and the sea.",

    beginning:
        "The nearby river suddenly changes its course. " +
        "For a moment, a path appears beneath the water.",

    chapter1:
        "The hidden road leads to an ancient shrine surrounded by water. " +
        "A symbol on the shrine begins to glow when you approach."
}
```

};

// ==========================================
// GAME STATE
// ==========================================

const game = {

```
playerName: "Unknown",
element: null,
skin: "🧙",

chapter: 1,
reputation: 0,
courage: 0,
wisdom: 0,

choices: [],

currentScene: 0
```

};

// ==========================================
// GET HTML ELEMENTS
// ==========================================

const startScreen =
document.getElementById("start-screen");

const elementScreen =
document.getElementById("element-screen");

const characterScreen =
document.getElementById("character-screen");

const storyScreen =
document.getElementById("story-screen");

const beginButton =
document.getElementById("begin-button");

const confirmElementButton =
document.getElementById("confirm-element");

const startStoryButton =
document.getElementById("start-story");

const characterNameInput =
document.getElementById("character-name");

const characterPreview =
document.getElementById("character-preview");

const currentElement =
document.getElementById("current-element");

const storyCharacter =
document.getElementById("story-character");

const storyTitle =
document.getElementById("story-title");

const storyText =
document.getElementById("story-text");

const storyChoices =
document.getElementById("story-choices");

// ==========================================
// START BUTTON
// ==========================================

beginButton.addEventListener("click", () => {

```
startScreen.classList.add("hidden");

elementScreen.classList.remove("hidden");
```

});

// ==========================================
// ELEMENT SELECTION
// ==========================================

const elementButtons =
document.querySelectorAll(".element-button");

elementButtons.forEach(button => {

```
button.addEventListener("click", () => {

    // Remove previous selection
    elementButtons.forEach(otherButton => {
        otherButton.classList.remove("selected");
    });

    // Select this element
    button.classList.add("selected");

    game.element =
        button.dataset.element;

    confirmElementButton.disabled = false;

});
```

});

// ==========================================
// CONFIRM ELEMENT
// ==========================================

confirmElementButton.addEventListener("click", () => {

```
if (!game.element) {
    return;
}

elementScreen.classList.add("hidden");

characterScreen.classList.remove("hidden");
```

});

// ==========================================
// CHARACTER SKINS
// ==========================================

const skinButtons =
document.querySelectorAll(".skin-button");

skinButtons.forEach(button => {

```
button.addEventListener("click", () => {

    skinButtons.forEach(otherButton => {
        otherButton.classList.remove("selected");
    });

    button.classList.add("selected");

    game.skin =
        button.dataset.skin;

    characterPreview.textContent =
        game.skin;

});
```

});

// ==========================================
// START STORY
// ==========================================

startStoryButton.addEventListener("click", () => {

```
let name =
    characterNameInput.value.trim();

if (name === "") {
    name = "The Wanderer";
}

game.playerName = name;

characterScreen.classList.add("hidden");

storyScreen.classList.remove("hidden");

startAdventure();
```

});

// ==========================================
// START ADVENTURE
// ==========================================

function startAdventure() {

```
const element =
    elements[game.element];

currentElement.textContent =
    `${element.icon} ${element.name}`;

storyCharacter.textContent =
    game.skin;

showStory(
    "The Beginning",
    `${game.playerName}, ${element.beginning}`
);

addChoice(
    "Continue along the old road",
    () => {

        game.courage += 1;

        showChapterOne();

    }
);

addChoice(
    "Study the strange sign before moving",
    () => {

        game.wisdom += 1;

        showChapterOne();

    }
);
```

}

// ==========================================
// CHAPTER ONE
// ==========================================

function showChapterOne() {

```
game.chapter = 1;

const element =
    elements[game.element];

showStory(
    "The First Sign",
    element.chapter1
);

storyChoices.innerHTML = "";

addChoice(
    "Help the people you find",
    () => {

        game.reputation += 2;

        game.choices.push("helped_people");

        showFirstDecision();

    }
);

addChoice(
    "Investigate the strange ruins",
    () => {

        game.wisdom += 2;

        game.choices.push("investigated_ruins");

        showFirstDecision();

    }
);

addChoice(
    "Continue your journey alone",
    () => {

        game.courage += 2;

        game.choices.push("traveled_alone");

        showFirstDecision();

    }
);
```

}

// ==========================================
// FIRST MAJOR DECISION
// ==========================================

function showFirstDecision() {

```
showStory(
    "A Choice That Matters",
    `${game.playerName}, your decision has changed how the people of this land see you.\n\n` +
    `Your reputation: ${game.reputation}\n` +
    `Your courage: ${game.courage}\n` +
    `Your wisdom: ${game.wisdom}\n\n` +
    `But this is only the beginning.`
);

storyChoices.innerHTML = "";

addChoice(
    "Follow the mysterious voice",
    () => {

        game.choices.push("followed_voice");

        continueStory();

    }
);

addChoice(
    "Return to the village",
    () => {

        game.choices.push("returned_village");

        continueStory();

    }
);
```

}

// ==========================================
// CONTINUE STORY
// ==========================================

function continueStory() {

```
game.chapter = 2;

showStory(
    "Chapter II — The Forgotten Kingdom",
    `The road disappears beneath the mist.\n\n` +
    `Far ahead, you see the silhouette of an enormous castle. ` +
    `Its towers rise above the forest, but no flag flies above them.\n\n` +
    `Your ${elements[game.element].name.toLowerCase()} power begins to react.`
);

storyChoices.innerHTML = "";

addChoice(
    "Approach the castle",
    () => {

        game.courage += 2;

        castleScene();

    }
);

addChoice(
    "Search for another entrance",
    () => {

        game.wisdom += 2;

        secretEntrance();

    }
);
```

}

// ==========================================
// CASTLE
// ==========================================

function castleScene() {

```
showStory(
    "The Forgotten Castle",
    `The enormous gates open without anyone touching them.\n\n` +
    `Inside, hundreds of candles suddenly ignite.\n\n` +
    `At the end of the hall stands a mysterious figure wearing ` +
    `the symbol of an ancient Elemental Order.`
);

storyChoices.innerHTML = "";

addChoice(
    "Speak to the mysterious figure",
    () => {

        game.choices.push("spoke_to_figure");

        finalChoice();

    }
);

addChoice(
    "Prepare your elemental power",
    () => {

        game.choices.push("prepared_power");

        finalChoice();

    }
);
```

}

// ==========================================
// SECRET ENTRANCE
// ==========================================

function secretEntrance() {

```
showStory(
    "The Hidden Passage",
    `Behind the castle you discover a small stone door hidden beneath ivy.\n\n` +
    `The door reacts to your ${elements[game.element].name.toLowerCase()} element.\n\n` +
    `Something inside the castle has been waiting for an Elementalist.`
);

storyChoices.innerHTML = "";

addChoice(
    "Open the door",
    () => {

        game.wisdom += 1;

        finalChoice();

    }
);

addChoice(
    "Mark the location and return later",
    () => {

        game.courage += 1;

        finalChoice();

    }
);
```

}

// ==========================================
// MAJOR CHOICE
// ==========================================

function finalChoice() {

```
showStory(
    "The Ancient Oath",
    `The mysterious presence asks you a simple question:\n\n` +
    `"What will you use your elemental power for?"`
);

storyChoices.innerHTML = "";

addChoice(
    "Protect the kingdom",
    () => {

        game.reputation += 3;

        ending("Guardian");

    }
);

addChoice(
    "Discover the truth",
    () => {

        game.wisdom += 3;

        ending("Seeker");

    }
);

addChoice(
    "Become the strongest Elementalist",
    () => {

        game.courage += 3;

        ending("Power");

    }
);
```

}

// ==========================================
// ENDING
// ==========================================

function ending(type) {

```
let title = "";
let text = "";

if (type === "Guardian") {

    title = "The Guardian's Path";

    text =
        `${game.playerName}, the ancient oath recognizes your determination.\n\n` +
        `Your ${elements[game.element].name.toLowerCase()} power shines brightly.\n\n` +
        `The people will remember the Elementalist who chose to protect them.\n\n` +
        `But somewhere beyond the kingdom, another ancient power has awakened...`;

}

else if (type === "Seeker") {

    title = "The Seeker's Path";

    text =
        `${game.playerName}, you choose knowledge over glory.\n\n` +
        `The ancient ruins reveal a secret that could change the history of the kingdom.\n\n` +
        `Your journey has only just begun.`;

}

else {

    title = "The Path of Power";

    text =
        `${game.playerName}, you swear to master your element completely.\n\n` +
        `The ancient order watches you carefully.\n\n` +
        `Whether you become a hero or something else will depend on the choices you make next.`;

}

showStory(title, text);

storyChoices.innerHTML = "";

addChoice(
    "Continue your journey...",
    () => {

        alert(
            "Chapter 3 will be added soon!"
        );

    }
);
```

}

// ==========================================
// STORY DISPLAY
// ==========================================

function showStory(title, text) {

```
storyTitle.textContent =
    title;

storyText.textContent =
    text;
```

}

// ==========================================
// ADD STORY CHOICE
// ==========================================

function addChoice(text, action) {

```
const button =
    document.createElement("button");

button.textContent =
    text;

button.addEventListener(
    "click",
    action
);

storyChoices.appendChild(button);
```

}

// ==========================================
// DEBUG INFORMATION
// ==========================================

console.log(
"The Quest of the Legendary Elementalist loaded."
);

console.log(
"Choose your element and begin your adventure!"
);
