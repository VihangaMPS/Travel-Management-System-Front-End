import {RestApiRepo} from "../model/RestApiRepo.js";

export class TravelAreaService{
    constructor() {
        this.travelAreaRepo=new RestApiRepo();
        this.path="/travel/area";
    }
    saveTravelArea(travelArea){
        return this.travelAreaRepo.save(this.path,travelArea);
    }

    updateTravelArea(travelArea){
        return this.travelAreaRepo.update(this.path,travelArea);

    }
    deleteTravelArea(travelAreaID){
        return this.travelAreaRepo.delete(this.path+"/"+travelAreaID);
    }

    loadAllTravelArea(){
        return this.travelAreaRepo.getAll(this.path);
    }
}