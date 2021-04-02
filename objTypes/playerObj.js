const playerObj = (name = '', email = '',  cards = [],) => ({
    id: (new Date()).getTime().toString().substring(7,12),
    name,
    email,
    cards,
    code: Math.random().toString(36).substring(2,6),
    timestamp: Date.now()
});

const createPlayer = (cards = [], name = '', email = '', existingPlayerIds = []) => {
    let player;
    do {
        player = playerObj(
            name,
            email,
            cards
        );
    } while (existingPlayerIds.includes(player.id));
    
    return player;
}


module.exports = createPlayer;