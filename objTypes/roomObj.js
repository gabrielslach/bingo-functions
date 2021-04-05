const roomObj = () => ({
    id: Math.random().toString(36).toUpperCase().substring(2,6),
    roomConfig: {
        password: (new Date()).getTime().toString().substring(7,12),
        pickedCells: [],
        timestamp: Date.now()
    }
});

const createRoom = (existingRoomIds = []) => {
    let room;
    do {
        room = roomObj();
    } while (existingRoomIds.includes(room.id));
    
    return room;
};


module.exports = createRoom;