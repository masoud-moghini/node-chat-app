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