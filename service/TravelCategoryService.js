import {RestApiRepo} from "../model/RestApiRepo.js";

export class TravelCategoryService {
    constructor() {
        this.travelCategoryRepo=new RestApiRepo();
        this.path="/travel/category";
    }
    saveTravelCategory(travelCategory){
        return this.travelCategoryRepo.save(this.path,travelCategory);
    }

    updateTravelCategory(travelCategory){
        return this.travelCategoryRepo.update(this.path,travelCategory);

    }
    deleteTravelCategory(travelCategoryID){
        return this.travelCategoryRepo.delete(this.path+"/"+travelCategoryID);
    }

    loadAllTravelCategory(){
        return this.travelCategoryRepo.getAll(this.path);
    }

}