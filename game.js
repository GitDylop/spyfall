window.onload = function() {
    start_new_game();
}

function start_new_game() {
    const data = localStorage.getItem("game-data");
    if (!data) return;

    const players = JSON.parse(data);
    const container = document.getElementById("player-list");

    players.forEach((player, index) => {
        const playerEl = document.createElement("p");
        playerEl.textContent = `${player.name}`;
        playerEl.id = `${index}`;
        playerEl.className = "player unchecked";
        playerEl.onclick = function() { show_player_card(this); };
        container.appendChild(playerEl);
    });
}

function show_player_card(element) {
    const data = localStorage.getItem("game-data");
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
        cardWordEl.textContent = "_test_word";
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