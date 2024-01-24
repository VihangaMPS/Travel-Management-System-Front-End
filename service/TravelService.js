import {RestApiRepo} from "../model/RestApiRepo.js";

export class TravelService{
    constructor() {
        this.travelRepo=new RestApiRepo();
        this.path="/travel";
    }
    saveTravel(travel){
        return this.travelRepo.save(this.path,travel);
    }

    updateTravel(travel){
        return this.travelRepo.update(this.path,travel);

    }
    deleteTravel(travelID){
        return this.travelRepo.delete(this.path+"/"+travelID);
    }

    loadAllTravel(){
        return this.travelRepo.getAll(this.path);
    }
}