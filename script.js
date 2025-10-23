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
    const popup = document.getElementById('credits-popup');

    popup.style.animation = 'none';
    void popup.offsetWidth;

    if (active) {
        popup.style.pointerEvents = 'auto';
        popup.style.animation = 'pop-in 300ms forwards';
    } else {
        popup.style.animation = 'pop-out 300ms forwards';

        function handleEnd() {
            popup.style.pointerEvents = 'none';
            popup.removeEventListener('animationend', handleEnd);
        }

        popup.addEventListener('animationend', handleEnd);
    }
}

// Puslapių navigacija
function navigate_to(destination, page) {
    if (page) {
        switch (page) {
            case 'new-game':
                const players = document.querySelectorAll('.player-name');
                if (players.length > 0) {
                    if (!confirm('Ar tikrai norite išeiti?')) {
                        return;
                    }
                }
            case 'game':
        }
    }

    window.location.href = destination;
}