const chai = require('chai')
const message = require('./message');

var expect = chai.expect;

describe('generateMessage',()=>{
    it('should generate correct message',()=>{
        var text='hi masoud';
        var from='admin';

        const Message = message.generateMessage(text,from);
        expect(Message.text).to.equal(text);
        expect(Message.from).to.equal(from);
        expect(Message.createdAt).to.be.a('number');
    })
})


describe('generateLocationMessage',()=>{
    it('should generate correct location message',()=>{
        var from='admin';
        var lat=51.24;
        var long=41.256;

        var Message = message.generateLocationMessage(from,lat,long);
        var url=`https://www.google.com/maps?q=${lat},${long}`
        expect(Message).to.include({from,url});
    })
})