const _ =require('lodash');


class Users {
    constructor(){
        this.users=[];
    }
    addUser(id,name,room){
        var user ={id,name,room};
        this.users.push(user);
        return user;
    }
    removeUser(id){
        var removedUser =_.remove(this.users,(user)=>user.id==id)[0];
        if(removedUser)
        {
            this.users=_.remove(this.users,(user)=>user.id!=id);
            console.log('user after removed element ',this.users);
        }
        
        return removedUser;
    }
    getUser(id){
        var users=this.users.filter((user)=>user.id==id);
        var userName=users.map((user)=>user.name);
        return userName[0];
    }
    getUserList(room){
        var users =this.users.filter((user)=>user.room===room);
        var namesArray = users.map((user)=>user.name);


        return namesArray;
    }
}

module.exports={Users}