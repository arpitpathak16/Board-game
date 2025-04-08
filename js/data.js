// data.js - Game content and configuration

const gameData = {
    // Board configuration - 65 spaces (0 is start, 64 is finish)
    boardSpaces: [
        { type: 'start', position: 0, instruction: 'Start' },
        { type: 'instruction', position: 1, instruction: "Guide your community through all the hazards, reducing disasters.", extraTurn: false },
        { type: 'instruction', position: 2, instruction: 'Very Good! You remebered to develop a family emergency plan. Now you are better prepared. Throw again.', extraTurn: true },
        { type: 'question', position: 3 },
        { type: 'surprise', position: 4 },
        { type: 'normal', position: 5 },
        { type: 'instruction', position: 6, instruction: 'You helped to clean a polluted river. Advance 6 spaces.', move: 6 },
        { type: 'normal', position: 7 },
        { type: 'instruction', position: 8, instruction: 'Danger! A house was built on unstable ground. Go back 3 spaces', move: -3 },
        { type: 'normal', position: 9 },
        { type: 'normal', position: 10 },
        { type: 'instruction', position: 11, instruction: 'House built near an active volcano! Stay away from the area. Go back 2 spaces', move: -2 },
        { type: 'normal', position: 12 },
        { type: 'instruction', position: 13, instruction: 'Your community has been cutting down too many trees. Go back to the start.', move: -13 },
        { type: 'normal', position: 14 },
        { type: 'surprise', position: 15 },
        { type: 'normal', position: 16 },
        { type: 'instruction', position: 17, instruction: 'Danger of flood. Go back 3 spaces to higher ground.', move: -3 },
        { type: 'instruction', position: 18, instruction: 'There was a flood in your community and you helped to evacuate your friends. Advance 4 spaces.', move: 4 },
        { type: 'normal', position: 19 },
        { type: 'instruction', position: 20, instruction: 'At school, you and your friends prepared a risk map. Advance 7 spaces.', move: 7 },
        { type: 'normal', position: 21 },
        { type: 'normal', position: 22 },
        { type: 'instruction', position: 23, instruction: 'EARTHQUAKE! Skip one turn so you can get ready in cases there are aftershocks.', skipTurn: true },
        { type: 'instruction', position: 24, instruction: 'You got under the table to protect yourself from the earthquake. Advance 4 spaces', move: 4 },
        { type: 'normal', position: 25 },
        { type: 'instruction', position: 26, instruction: 'You looked for information on disaster prevention. Advance 7 spaces.', move: 7 },
        { type: 'normal', position: 27 },
        { type: 'question', position: 28 },
        { type: 'instruction', position: 29, instruction: 'You planted seedings to prevent landslides. Advance along this path.', move: 17},
        { type: 'normal', position: 30 },
        { type: 'normal', position: 31 },
        { type: 'instruction', position: 32, instruction: 'You discovered a flash flood on its way downriver. Advance 5 spaces to warn your community.', move: 5 },
        { type: 'normal', position: 33 },
        { type: 'instruction', position: 34, instruction: 'The factories in your community have polluted the river. Go back 4 spaces.', move: -4 },
        { type: 'normal', position: 35 },
        { type: 'normal', position: 36 },
        { type: 'normal', position: 37 },
        { type: 'question', position: 38 },
        { type: 'instruction', position: 39, instruction: 'Someone dropped a cigarette in the forest and started a fire. Advance 4 spaces to warn the firefighters.', move: 4 },
        { type: 'normal', position: 40 },
        { type: 'normal', position: 41 },
        { type: 'instruction', position: 42, instruction: 'Drought leaves us without enough food. You will have to reinforce children\'s diet with dietary supplement, and make sure that babies are getting mothers\'s milk. Skip one turn.', skipTurn: true },
        { type: 'normal', position: 43 },
        { type: 'surprise', position: 44 },
        { type: 'normal', position: 45 },
        { type: 'normal', position: 46 },
        { type: 'instruction', position: 47, instruction: 'You discovered a landslide hazard. Advance two spaces to warn the community.', move: 2 },
        { type: 'normal', position: 48 },
        { type: 'normal', position: 49 },
        { type: 'instruction', position: 50, instruction: 'Danger of a landslide. Go back 4 spaces.', move: -4 },
        { type: 'question', position: 51 },
        { type: 'normal', position: 52 },
        { type: 'normal', position: 53 },
        { type: 'normal', position: 54 },
        { type: 'instruction', position: 55, instruction: 'Tsunami warning! You must be evacuated to higher ground. Advance 2 spaces', move: 2 },
        { type: 'normal', position: 56 },
        { type: 'surprise', position: 57 },
        { type: 'normal', position: 58 },
        { type: 'question', position: 59 },
        { type: 'normal', position: 60 },
        { type: 'instruction', position: 61, instruction: 'A bridge in poor condistion. Fix it and advance 2 spaces.', move: 2 },
        { type: 'normal', position: 62 },
        { type: 'normal', position: 63 },
        { type: 'question', position: 64 },
        { type: 'normal', position: 65 },
        { type: 'finish', position: 66, instruction: 'Finish!' }
    ],

    // Question cards
    questionCards: [
        {
            question: "When there is an earthquake, why do some houses collapse while others don’t?",
            options: [
                "Because of the design and construction quality",
                "Because of the location of the house",
                "Because they were poorly built, built with poor materials, or not meeting building code regulations.",
                "Because of the number of floors"
            ],
            correctAnswer: 2,
            explanation: "Buildings that are not designed to withstand earthquakes or are built with poor materials are more likely to collapse. The number of floors is not a determining factor.",
            trueEffect: { extraTurn: true },
            falseEffect: { extraTurn: false }
        },
        {
            question: "Are earthquakes natural or man-made hazards?",
            options: [
                "Natural hazards",
                "Man-made hazards",               
            ],
            correctAnswer: 0,
            explanation: "They are natural hazards, although people's actions can increase their impact.",
            trueEffect: { extraTurn: true },
            falseEffect: { extraTurn: false }
        },
        {
            question: "What do you call a large number of insects or other animals that eat and destroy crops?",
            options: [
                "Invasive species",
                "A plague",
                "Natural hazards",
                "Earthquake"
            ],
            correctAnswer: 1,
            explanation: "A plague is a large number of insects or other animals that eat and destroy crops. Invasive species are non-native species that can cause harm to the environment, economy, or human health.",
            trueEffect: { extraTurn: true },
            falseEffect: { extraTurn: false }
        },
        {
            question: "What should you do during an earthquake if you're indoors?",
            options: [
                "Run outside immediately",
                "Stand in a doorway or get under a sturdy table",
                "Go to the highest floor of the building",
                "Stand near windows to see what's happening"
            ],
            correctAnswer: 1,
            explanation: "During an earthquake, you should 'Drop, Cover, and Hold On' under sturdy furniture or in a doorway to protect yourself from falling objects.",
            trueEffect: { extraTurn: true },
            falseEffect: { extraTurn: false }
        },
        {
            question: "Which of the following is a giant wave caused by an earthquake under the sea?",
            options: [
                "Tsunami",
                "Hurricane",
                "Tornado",
                "Flood"
            ],
            correctAnswer: 0,
            explanation: "A tsunami is a series of ocean waves caused by large earthquakes or volcanic eruptions under the sea. They can cause significant damage when they reach land.",
            trueEffect: { extraTurn: true },
            falseEffect: { extraTurn: false }
        },
        {
            question: "What is a seismometer?",
            options: [
                "A device that measures the intensity of earthquakes",
                "An instrument used to predict weather",
                "A tool for measuring the depth of the ocean",
                "A device that detects volcanic eruptions"
            ],
            correctAnswer: 0,
            explanation: "A seismometer is an instrument that measures the intensity and duration of seismic waves produced by earthquakes. It helps scientists study and understand earthquakes.",
            trueEffect: { extraTurn: true },
            falseEffect: { extraTurn: false }
        },
        {
            question: "What should you do if you're caught in a flood?",
            options: [
                "Try to drive through the floodwaters",
                "Walk to higher ground",
                "Stay in your home and wait for help",
                "Stay in your car if water is rising around it"
            ],
            correctAnswer: 1,
            explanation: "Just 6 inches of moving water can knock you down, and 12 inches can sweep away a car. Always seek higher ground and avoid floodwaters.",
            trueEffect: { extraTurn: true },
            falseEffect: { extraTurn: false }
        },        
        // Add more questions following the same format
    ],

    // Surprise cards 
    surpriseCards: [
        {
            text: "Your community has taken preventive measures and has drawn a risk map. Advance six places.",
            effect: { move: 6 }
        },
        {
            text: "You and your family have prepared a family emergency plan. You are ready to take everything you need for a few days if you have to leave your home suddenly. Roll again.",
            effect: { extraTurn: true }
        },
        {
            text: "Hurricane! You know where the shelter is, and run directly to it. Go to space No. 33.",
            effect: { moveTo: 33 }
        },
        {
            text: "You made a bonfire without your parents or another adult being there to supervise you. Skip one turn.",
            effect: { skipTurn: true }
        },
        {
            text: "You and your family have built your house in a safe place, following all the proper building codes. You may roll again.",
            effect: { extraTurn: true }
        },
        // {
        //     text: "Your community has an early warning system. For instance, someone upriver can watch to see if the water level goes higher than normal, and warn the people downriver so they can rush to a shelter. Advance seven places.",
        //     effect: { move: 7 }
        // },
        {
            text: "You have helped to clear the garbage from the river, there by reducing the risk of floods. Advance six places.",
            effect: { move: 6 }
        },
        {
            text: "Did you know that you can reduce the risk of floods by throwing garbage in its proper place and not in the river and by keeping the sewage systems clean. Roll again.",
            effect: { extraTurn: true }
        },
        {
            text: "Your school has decided to launch a campaign against landslides. With the participation of all the students, you have planted 200 seedlings on an eroded slope, reducing the vulnerability of the area. Advance five places.",
            effect: { move: 5 }
        },
        {
            text: "You feel a tremor when you are at home, and get immediately under a table or under a doorframe to protect yourself from falling objects. Roll again.",
            effect: { extraTurn: true }
        },
        {
            text: "Earthquake! You remember to wear shoes to protect your feet from broken glass. Throw again.",
            effect: { extraTurn: true }
        },
        {
            text: "During and after a flood, you must only drink bottled or boiled water. Skip the next turn while you look for safe drinking water.",
            effect: { skipTurn: true }
        }, 
        // Add more surprise cards following the same format
    ],

    // Hazard types for game customization
    hazardTypes: {
        all: "All Hazards",
        earthquake: "Earthquakes",
        flood: "Floods",
        tsunami: "Tsunamis",
        volcano: "Volcanoes",
        hurricane: "Hurricanes"
    },

    // Difficulty levels
    difficultyLevels: {
        easy: "Easy",
        medium: "Medium",
        hard: "Hard"
    }
};

// Export the game data for use in other files
export default gameData;