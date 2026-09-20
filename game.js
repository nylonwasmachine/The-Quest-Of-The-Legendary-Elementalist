document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // ELEMENT DATA
    // =========================

    const elements = {

        fire: {
            name: "Fire",
            icon: "🔥",
            description: "The power of flame and courage.",
            beginning:
                "The warmth of a hidden flame stirs within you. Somewhere beyond the hills, an ancient bell begins to ring."
        },

        ice: {
            name: "Ice",
            icon: "❄️",
            description: "The power of frost and patience.",
            beginning:
                "A cold breeze passes through the kingdom. Frost forms beneath your feet, even though the summer sun still shines."
        },

        plant: {
            name: "Plant",
            icon: "🌿",
            description: "The power of nature and life.",
            beginning:
                "The leaves around you suddenly move without wind. The ancient forest seems to whisper your name."
        },

        earth: {
            name: "Earth",
            icon: "🪨",
            description: "The power of stone and endurance.",
            beginning:
                "The ground trembles beneath your feet. A strange symbol appears in the earth before slowly fading away."
        },

        lightning: {
            name: "Lightning",
            icon: "⚡",
            description: "The power of storms and speed.",
            beginning:
                "A flash of lightning strikes the distant mountains. For a moment, you see a mysterious castle in the clouds."
        },

        air: {
            name: "Air",
            icon: "💨",
            description: "The power of freedom and movement.",
            beginning:
                "A powerful wind sweeps across the fields. A sealed letter lands at your feet."
        },

        water: {
            name: "Water",
            icon: "🌊",
            description: "The power of rivers and change.",
            beginning:
                "The nearby river suddenly flows backwards. Something ancient is awakening beneath the water."
        }

    };


    // =========================
    // GAME STATE
    // =========================

    const game = {
        playerName: "",
        element: null,
        skin: "🧙",

        chapter: 1,

        reputation: 0,
        courage: 0,
        wisdom: 0,

        choices: [],

        currentScene: ""
    };


    // =========================
    // SCREEN ELEMENTS
    // =========================

    const startScreen = document.getElementById("start-screen");
    const elementScreen = document.getElementById("element-screen");
    const characterScreen = document.getElementById("character-screen");
    const storyScreen = document.getElementById("story-screen");

    const beginButton = document.getElementById("begin-button");
    const confirmElementButton = document.getElementById("confirm-element");
    const startStoryButton = document.getElementById("start-story");

    const characterName = document.getElementById("character-name");
    const characterPreview = document.getElementById("character-preview");

    const currentElement = document.getElementById("current-element");
    const currentChapter = document.getElementById("current-chapter");

    const storyCharacter = document.getElementById("story-character");
    const storyTitle = document.getElementById("story-title");
    const storyText = document.getElementById("story-text");
    const storyChoices = document.getElementById("story-choices");


    // =========================
    // HELPER
    // =========================

    function showScreen(screenToShow) {

        const screens = [
            startScreen,
            elementScreen,
            characterScreen,
            storyScreen
        ];

        screens.forEach(screen => {
            if (screen) {
                screen.classList.add("hidden");
            }
        });

        if (screenToShow) {
            screenToShow.classList.remove("hidden");
        }
    }


    // =========================
    // START GAME
    // =========================

    beginButton.addEventListener("click", () => {

        showScreen(elementScreen);

    });


    // =========================
    // ELEMENT SELECTION
    // =========================

    const elementButtons =
        document.querySelectorAll(".element-button");

    elementButtons.forEach(button => {

        button.addEventListener("click", () => {

            elementButtons.forEach(btn => {
                btn.classList.remove("selected");
            });

            button.classList.add("selected");

            game.element = button.dataset.element;

            confirmElementButton.disabled = false;

        });

    });


    // =========================
    // CONFIRM ELEMENT
    // =========================

    confirmElementButton.addEventListener("click", () => {

        if (!game.element) {
            return;
        }

        showScreen(characterScreen);

    });


    // =========================
    // CHARACTER SELECTION
    // =========================

    const skinButtons =
        document.querySelectorAll(".skin-button");

    skinButtons.forEach(button => {

        button.addEventListener("click", () => {

            skinButtons.forEach(btn => {
                btn.classList.remove("selected");
            });

            button.classList.add("selected");

            game.skin = button.dataset.skin;

            characterPreview.textContent = game.skin;

        });

    });


    // =========================
    // START STORY
    // =========================

    startStoryButton.addEventListener("click", () => {

        const enteredName =
            characterName.value.trim();

        if (enteredName === "") {

            game.playerName = "The Elementalist";

        } else {

            game.playerName = enteredName;

        }

        showScreen(storyScreen);

        startAdventure();

    });


    // =========================
    // START ADVENTURE
    // =========================

    function startAdventure() {

        const selectedElement =
            elements[game.element];

        currentElement.textContent =
            `${selectedElement.icon} ${selectedElement.name}`;

        currentChapter.textContent =
            "Chapter I";

        storyCharacter.textContent =
            game.skin;

        game.currentScene =
            "beginning";

        showStory(
            "The Awakening",
            selectedElement.beginning
        );

        setTimeout(() => {

            showFirstDecision();

        }, 400);

    }


    // =========================
    // FIRST DECISION
    // =========================

    function showFirstDecision() {

        let text =
            `${game.playerName}, you feel the power of ${elements[game.element].name.toLowerCase()} awakening inside you.`;

        storyText.innerHTML =
            `<p>${text}</p>
             <p>A mysterious road stretches before you.</p>`;

        storyChoices.innerHTML = "";

        addChoice(
            "Follow the old road",
            () => {

                game.courage += 1;
                game.choices.push("old-road");

                continueStory(
                    "You follow the ancient road toward the kingdom."
                );

            }
        );

        addChoice(
            "Search the nearby ruins",
            () => {

                game.wisdom += 1;
                game.choices.push("ruins");

                continueStory(
                    "You decide that knowledge may be more valuable than haste."
                );

            }
        );

    }


    // =========================
    // CONTINUE STORY
    // =========================

    function continueStory(message) {

        storyText.innerHTML =
            `<p>${message}</p>
             <p>After some time, you reach the edge of the kingdom.</p>`;

        storyChoices.innerHTML = "";

        addChoice(
            "Enter through the main gate",
            () => {

                game.reputation += 1;

                castleScene();

            }
        );

        addChoice(
            "Look for another entrance",
            () => {

                game.wisdom += 1;

                secretEntrance();

            }
        );

    }


    // =========================
    // CASTLE SCENE
    // =========================

    function castleScene() {

        showStory(
            "The Kingdom Gate",
            "The enormous gates of the kingdom open before you. Guards watch every traveler who enters."
        );

        addChoice(
            "Speak to the guards",
            () => {

                game.reputation += 1;

                finalChoice();

            }
        );

        addChoice(
            "Walk past without speaking",
            () => {

                game.courage += 1;

                finalChoice();

            }
        );

    }


    // =========================
    // SECRET ENTRANCE
    // =========================

    function secretEntrance() {

        showStory(
            "The Forgotten Passage",
            "Behind an old stone wall, you discover a forgotten passage leading beneath the kingdom."
        );

        addChoice(
            "Enter the passage",
            () => {

                game.wisdom += 1;

                finalChoice();

            }
        );

        addChoice(
            "Return to the main road",
            () => {

                game.reputation += 1;

                castleScene();

            }
        );

    }


    // =========================
    // FINAL CHOICE
    // =========================

    function finalChoice() {

        showStory(
            "A Strange Omen",
            "As night falls, a mysterious light appears above the kingdom."
        );

        addChoice(
            "Investigate the light",
            () => {

                game.courage += 1;
                game.choices.push("investigate");

                ending();

            }
        );

        addChoice(
            "Stay inside the kingdom",
            () => {

                game.wisdom += 1;
                game.choices.push("stay");

                ending();

            }
        );

    }


    // =========================
    // ENDING
    // =========================

    function ending() {

        let endingTitle;
        let endingText;

        if (game.courage >= 2) {

            endingTitle =
                "The Brave Elementalist";

            endingText =
                `${game.playerName}, your courage leads you toward a destiny that few would dare to face. The first chapter of your legend has begun.`;

        } else if (game.wisdom >= 2) {

            endingTitle =
                "The Wise Elementalist";

            endingText =
                `${game.playerName}, your patience and wisdom reveal secrets hidden from ordinary travelers. Your true quest is only beginning.`;

        } else {

            endingTitle =
                "The Wandering Elementalist";

            endingText =
                `${game.playerName}, your journey has only just begun. The kingdom holds many mysteries, and your choices will shape what comes next.`;

        }

        showStory(
            endingTitle,
            endingText
        );

        addChoice(
            "Begin Chapter II",
            () => {

                showStory(
                    "Chapter II — The Ancient Secret",
                    "Far beyond the kingdom walls, something ancient has awakened..."
                );

                storyChoices.innerHTML = "";

            }
        );

    }


    // =========================
    // SHOW STORY
    // =========================

    function showStory(title, text) {

        storyTitle.textContent = title;

        storyText.innerHTML =
            `<p>${text}</p>`;

        storyChoices.innerHTML = "";

    }


    // =========================
    // ADD CHOICE BUTTON
    // =========================

    function addChoice(text, action) {

        const button =
            document.createElement("button");

        button.className =
            "story-choice";

        button.textContent =
            text;

        button.addEventListener(
            "click",
            action
        );

        storyChoices.appendChild(button);

    }


    // =========================
    // GAME LOADED
    // =========================

    console.log(
        "The Quest of the Legendary Elementalist loaded successfully!"
    );

});
