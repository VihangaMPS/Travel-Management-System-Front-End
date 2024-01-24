import {RestApiRepo} from "../model/RestApiRepo.js";

export class UserService{
    constructor() {
        this.userRepo=new RestApiRepo();
        this.path="/user";
    }
    saveUser(user){
        return this.userRepo.save(this.path+"/register",user);
    }

    updateUser(user){
        return this.userRepo.update(this.path+"/update",user);

    }
    searchByEmail(email){
        return this.userRepo.search(this.path+"/search/email?email="+email);
    }
    searchBasicAuth(email,pwd){
        return this.userRepo.searchBasicAuth(this.path+"/search/email?email="+email,email,pwd);
    }
    deleteUser(userID){
        return this.userRepo.delete(this.path+"/"+userID);
    }

    loadAllUser(){
        return this.userRepo.getAll(this.path);
    }
}