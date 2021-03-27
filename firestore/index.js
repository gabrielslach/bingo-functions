var admin = require('firebase-admin');

const setup =() => {
    admin.initializeApp({
        credential: admin.credential.applicationDefault()
      });
    
    const db = admin.firestore();
    
    console.log('Firestore connected.')
    
    return db;
}

module.exports = setup;