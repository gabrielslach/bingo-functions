const writeData = (db, roomId = null, docName = null, data = {}) => new Promise((resolve,reject) => {
    if (roomId === null) {
        return;
    }
    if (docName === null){
        db.collection(`${roomId}`)
            .add(data)
            .then(docRef => {
                console.log("Document written with ID: ", docRef.id);
                resolve(docRef.id)
            })
            .catch(error => {
                console.error("Error adding document: ", error);
                reject();
            });
    } else {
        try {
            db.collection(`${roomId}`)
            .doc(`${docName}`)
            .set(data)
            .then(docRef => {
                resolve(docRef.id)
            });
        } catch(e) {
            console.log(e);
            reject();
        };
    }
});

const updateField = (db, roomId = null, docName = null, data = {}) => new Promise((resolve,reject) => {
    try {
        db.collection(`${roomId}`)
        .doc(`${docName}`)
        .update(data)
        .then(docRef => {
            resolve(docRef.id)
        });
    } catch(e) {
        console.log(e);
        reject();
    };
});

const deleteDocument = (db, roomId = null, docName = null) => new Promise((resolve,reject) => {
    try {
        db.collection(`${roomId}`)
        .doc(`${docName}`)
        .delete()
        .then(docRef => {
            resolve()
        });
    } catch(e) {
        console.log(e);
        reject();
    };
});

const getCollection = (db, collectionKey)=> new Promise((resolve, reject) => {
    db.collection(collectionKey)
        .get()
        .then(querySnapshot => {
            const docs = querySnapshot.docs.map(doc => {
                //console.log(`${doc.id} => ${doc.data()}`)
                return doc.data();
            });
            resolve(docs);
        })
        .catch(e=>reject(e));
});

const getDoc = (db, collectionKey, docKey)=> new Promise((resolve, reject) => {
    db.collection(`${collectionKey}`)
        .doc(`${docKey}`)
        .get()
        .then(querySnapshot => {
            resolve(querySnapshot.data());
            })
        .catch(e=>reject(e))
});

const getIds = (db, collectionKey)=> new Promise((resolve, reject) => {
    db.collection(`${collectionKey}`)
        .get()
        .then(querySnapshot => {
            const playerIds = [];
            const cardIds = [];
            querySnapshot.docs.forEach(doc => {
                const docData = doc.data();

                if (docData.player) {
                    const {id, cards} = docData.player;
                    playerIds.push(id);
                    cards.forEach(card => {
                        cardIds.push(card.id);
                    });
                }
            })
            resolve({playerIds, cardIds});
            })
        .catch(e=>reject(e))
});

const createRoom = () => {
    let roomId = '';
    do {
        roomId = Math.random()*Math.random() * 1000
        roomId = roomId.toFixed(0)
        roomId = String(roomId)
    } while (roomId.length !== 3);
    writeData(roomId)
    return(roomId);
}


module.exports = {
    writeData,
    updateField,
    deleteDocument,
    getCollection,
    getDoc,
    createRoom,
    getIds
}