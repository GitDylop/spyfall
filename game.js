window.onload = function() {
    load_game_data();
}

function start_new_game() {
    // Check if there any words left to pick
    const pickedWords = JSON.parse(sessionStorage.getItem('pickedWords'));
    const totalWords = 15; // TODO: Replace with actual total number of words in the category
        
    if (pickedWords && pickedWords.length >= totalWords) {
        alert("Nėra daugiau žodžių šiai kategorijai.");
    }
    else {
        pick_word();
        reshuffle_roles();
        load_game_data();
        alert('Pradėtas naujas žaidimas!')
    }
}

function load_game_data() {
    // Clear existing player list
    const container = document.getElementById("player-list");
    container.innerHTML = "";

    // Load player data from session storage
    const data = sessionStorage.getItem("game-data");
    if (!data) return;

    const players = JSON.parse(data);

    players.forEach((player, index) => {
        const playerEl = document.createElement("p");
        playerEl.textContent = `${player.name}`;
        playerEl.id = `${index}`;
        playerEl.className = "player unchecked";
        playerEl.onclick = function() { show_player_card(this); };
        container.appendChild(playerEl);
    });
}

function reshuffle_roles() {
    const data = sessionStorage.getItem("game-data");
    if (!data) return;

    const players = JSON.parse(data);
    const numPlayers = players.length;
    const numSpies = Math.max(1, Math.floor(numPlayers / 4));

    // Reset all roles to 'player'
    players.forEach(player => player.role = 'player');

    // Randomly assign 'spy' roles
    let assignedSpies = 0;
    while (assignedSpies < numSpies) {
        const randomIndex = Math.floor(Math.random() * numPlayers);
        if (players[randomIndex].role !== 'spy') {
            players[randomIndex].role = 'spy';
            assignedSpies++;
        }
    }

    sessionStorage.setItem("game-data", JSON.stringify(players));
}

function show_player_card(element) {
    const data = sessionStorage.getItem("game-data");
    const players = JSON.parse(data);
    const player = players[element.id];

    const overlayEl = document.getElementById('overlay');
    const cardEl = document.getElementById('player-card');
    const cardNameEl = document.getElementById('player-name');
    const cardRoleEl = document.getElementById('player-role');
    const cardWordEl = document.getElementById('player-word');

    cardNameEl.textContent = player.name;
    if (player.role == 'spy') {
        cardRoleEl.textContent = "Šnipas";
        cardWordEl.textContent = "????";
    }
    else {
        cardRoleEl.textContent = "Žaidėjas";
        cardWordEl.textContent = sessionStorage.getItem("currentWord");
    }

    if (element.classList[1] == 'unchecked') {
        element.className = 'player';
        overlayEl.style.display = 'block';
        cardEl.style.display = 'flex';
    }
    else if (confirm(`${player.name} jau matė savo rolę. Ar tikrai norite vėl ją parodyti?`)) {
        element.className = 'player';
        overlayEl.style.display = 'block';                  
        cardEl.style.display = 'flex';
    }
}

function hide_player_card() {
    const overlayEl = document.getElementById('overlay');
    const cardEl = document.getElementById('player-card');

    overlayEl.style.display = 'none';
    cardEl.style.display = 'none';
}


// TODO: Žodžių sąrašas turi priklausyti nuo vartotojo pasirinkimo.

async function pick_word() {
    const response = await fetch('src/data/categories.json');
    const myArray = await response.json();
    const category = myArray[0].content.locations;

    const randomIndex = Math.floor(Math.random() * category.length);
    let word = category[randomIndex];

    while (sessionStorage.getItem('pickedWords') && JSON.parse(sessionStorage.getItem('pickedWords')).includes(word)) {
        const randomIndex = Math.floor(Math.random() * category.length);
        word = category[randomIndex];
    }

    sessionStorage.setItem('currentWord', word);

    let pickedWords = JSON.parse(sessionStorage.getItem('pickedWords')) || [];
    pickedWords.push(word);
    sessionStorage.setItem('pickedWords', JSON.stringify(pickedWords));

    document.getElementById('player-word').textContent = word;
}
