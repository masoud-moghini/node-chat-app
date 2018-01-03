const chai = require('chai')
const expect = chai.expect;
const {Users} = require('./users');

describe('should test users functions',()=>{
    it('addUser',()=>{

        var users = new Users();
        
        var masoud = users.addUser('15*5$564','masoud','comp');
        expect(masoud).to.include({id:'15*5$564',name:'masoud',room:'comp'})
    })
})