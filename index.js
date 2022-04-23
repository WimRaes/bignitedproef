/*proeftest voor b.ignited
via de voorziene server een GET en POST call maken + POST valideren
*/

//requires
const jsonServer = require('json-server');
const supertest = require('supertest');
const assert = require('assert');

//server opstarten
const server = jsonServer.create();
const router = jsonServer.router('db.json');

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});

//supertest GET call
supertest(server)
.get('/posts')
.expect(200)
.end(function(err, res){
    if(err){
        throw err;
    }
    //controleren of inhoud array is van response
    assert(Array.isArray(res.body))
    //eerste lijn vd array in data plaatsen
    const data = res.body[0];
    //data testen
    assert.strictEqual(data.author, 'wim');
    assert.strictEqual(data.id, 1);
    assert(typeof data.title === 'string');
    console.log('GET call is ok.');
});

//supertest POST call
supertest(server)
.post('/posts')
.send({title: 'thibault', author: 'wim'})
.expect(201)
.end(function(err, res){
    if(err){
        throw err;
    };
    //data van response ophalen
    const data = res.body;
    //data testen
    assert.strictEqual(data.title, 'thibault');
    assert.strictEqual(data.author, 'wim');
    assert.strictEqual(typeof data.id, 'number');
    console.log('POST call is ok.');
});

