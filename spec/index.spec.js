
describe(' addVisitor', ()=>{
    const axios = require('axios')
    let server
    //const {addNewVisitor,listAllVisitors,deleteVisitor,deleteVisitors,viewVisitor,updateVisitor} = require('../src/queries')


    beforeEach(()=>{
        server = require('../src/index')
    });

    it('should check status code is 200', async (done)=>{
        try {
            const route = await axios.get("http://127.0.0.1:4000/addVisitor/")
            expect(route.status).toEqual(200)
        } catch (err) {
            console.log(err)
        }
        done()
    })

})

describe('deleteVisitor', ()=>{
    const axios = require('axios')
    let server
    


    beforeEach(()=>{
        server = require('../src/index')
    });

    it('should check status code is 200', async (done)=>{
        try {
            const route = await axios.get("http://127.0.0.1:4000/deleteVisitor/1")
            expect(route.status).toEqual(200)
        } catch (err) {
            console.log(err)
        }
        done()
    })

    it('should return empty array after deleting visitor', async (done)=>{
        try {
            const route = await axios.get("http://127.0.0.1:4000/deleteVisitor/3")
            expect(route.outputData).toEqual([])
        } catch (err) {
            console.log(err)
        }
        done()
    })


})

describe(' updateVisitor', ()=>{
    const axios = require('axios')
    let server;

    beforeEach(()=>{
        server = require('../src/index')
    });

    it('should check status code is 200', async (done)=>{
        try {
            const route = await axios.get("http://127.0.0.1:4000/updateVisitor/2")
            expect(route.status).toEqual(200)
        } catch (err) {
            console.log(err)
        }
        done()
    })

})

describe('testing delete all visitor', ()=>{
    const axios = require('axios')
    let server;
    beforeEach(()=>{
        server = require('../src/index')
    });

    it('should check status code is 200', async (done)=>{
        try {
            const route = await axios.get("http://127.0.0.1:000/deleteVisitors")
            expect(route.status).toEqual(200)
        } catch (err) {
            console.log(err)
        }
        done()
    })

    it('should return empty array after deleting all visitors', async (done)=>{
        try {
            const route = await axios.get("http://127.0.0.1:4000/deleteVisitors")
            expect(route.outputData).toEqual([])
        } catch (err) {
            console.log(err)
        }
        done()
    })


})