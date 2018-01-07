const chai = require('chai')
const expect = chai.expect;
const assert = chai.assert;
const {Users} = require('./users');

describe('should test users functions',()=>{
    beforeEach(()=>{
        users=new Users();
        users.users=[
            {id:'1',name:'Mike',room:'node course'},
            {id:'2',name:'Masoud',room:'react course'},
            {id:'3',name:'Koosha',room:'node course'},
        ]
    })
    it('addUser',()=>{

        var users = new Users();
        
        var masoud = users.addUser('15*5$564','masoud','comp');
        expect(masoud).to.include({id:'15*5$564',name:'masoud',room:'comp'})
    })

    it('get user with id 1',()=>{
    
        var user = users.getUser('1');
        assert.equal(user,'Mike')
    })


    it('get user with id 99 which produces undefined',()=>{
        var user = users.getUser('99');
        assert.equal(user,undefined)
    })



    it('remove user with id 1',()=>{
        
        
        var user = users.removeUser('1');
        expect(user).to.equal(
            [{id:'2',name:'Masoud',room:'react course'},
            {id:'3',name:'Koosha',room:'node course'},]
        )
    })



    it('should return names for course node course',()=>{
        var userList = users.getUserList('node course');
        expect(userList).to.equals(['Mike','Koosha']);
    })

    it('should return names for course react course',()=>{
        var userList = users.getUserList('react course');
        // expect(userList).to.equals(['Masoud']);

        assert.equal(userList,['Masoud'])
    })
})