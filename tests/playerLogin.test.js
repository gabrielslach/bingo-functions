var request = require('supertest');
const functions = require('../firestore/functions');
const app = require('../index');

jest.mock('../firestore/functions');

describe('player login endpoint', ()=>{
    it('should give back jwt', async ()=>{
        const response = {player: {}}
        functions.getDoc.mockResolvedValue(response)

        const res = await request(app)
        .post('/api/player-login')
        .send({})
        
        return expect(res.status).toEqual(200);
    })
})