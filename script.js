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