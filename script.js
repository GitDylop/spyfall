// Prideda naują žaidėją į sąrašą
function add_player() {
    const player_item = document.createElement('div');
    document.getElementById('player-list').appendChild(player_item);
    player_item.innerHTML = `
        <input type="text" placeholder="Žaidėjo vardas" class="player-name">
        <img src="src/images/trash.svg" alt="Pašalinti žaidėją" class="remove-player" onclick="remove_player(this)">
    `;
    player_item.className = 'player-list-item'

}

// Pašalina žaidėją iš sąrašo
function remove_player(element) {
    const player = element.parentElement;
    const playerInput = player.querySelector('input');
    const playerName = playerInput.value.trim();


    if (playerName === '') {
        player.remove();
    } else {
        if (confirm(`Ar tikrai norite pašalinti žaidėją ${playerName}?`)) {
            player.remove();
        }
    }
}

// Pop-up langas
function toggle_popup(active) {
    const popup = document.getElementById('credits-card');
    const overlay = document.getElementById('overlay');

    if (active) {
        overlay.style.display = 'block';
        popup.style.display = 'flex';
    } else {
        overlay.style.display = 'none';
        popup.style.display = 'none';
    }
}

// Puslapių navigacija
function navigate_to(destination, page) {
    const players = document.querySelectorAll('.player-name');

    if (page) {
        switch (page) {
            case 'new-game':
                if (players.length > 0) {
                    if (!confirm('Ar tikrai norite išeiti?')) {
                        return;
                    }
                }
                break;
            case 'to-game':
                if (players.length < 3) {
                    alert('Žaidimui reikia bent 3 žaidėjų!');
                    return;
                }
                break;
            case 'game':
                if (!confirm('Ar tikrai norite išeiti iš žaidimo? Visi duomenys bus prarasti.')) {
                    return;
                }
                break;
        }
    }

    window.location.href = destination;
}


// Nustatyti temą
const media = window.matchMedia('(prefers-color-scheme: dark)');
let theme = media.matches ? 'dark' : 'light';
document.documentElement.setAttribute('theme', theme);

function updateArrowFilter() {
    const arrowImage = document.getElementById('navigation-link-image');
    if (arrowImage) {
        arrowImage.style.filter = theme === 'light' ? 'invert(0)' : 'invert(1)';
    }
}

updateArrowFilter();

media.addEventListener('change', (e) => {
    theme = e.matches ? 'dark' : 'light';
    document.documentElement.setAttribute('theme', theme);
    updateArrowFilter();
});

window.addEventListener('load', updateArrowFilter);


// Žaidimo paruošimas
function prepare_game() {
    players = [];
    const playerInputs = document.querySelectorAll('.player-name');

    playerInputs.forEach(input => {
        players.push({
            name: input.value.trim(),
            role: "normal"
        });
    });

    const spyIndex = Math.floor(Math.random() * players.length);
    players[spyIndex].role = "spy";

    sessionStorage.setItem("game-data", JSON.stringify(players));
    navigate_to('game.html', 'to-game');
}