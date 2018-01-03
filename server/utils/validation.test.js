const chai = require('chai')
const expect = chai.expect
const {isRealString}=require('./validation')

describe('testing isRealString',()=>{
    it('should test when empty string is passed',()=>{
        const justEmpty = isRealString('   ');
        expect(justEmpty).to.equal(false);
    })

    it('should test when number  is passed',()=>{
        const justEmpty = isRealString(248);
        expect(justEmpty).to.equal(false);
    })

    it('should test when variable string is passed',()=>{
        const justEmpty = isRealString('  bbb ');
        expect(justEmpty).to.equal(true);
    })
})