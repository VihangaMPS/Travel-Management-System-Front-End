import {RestApiRepo} from "../model/RestApiRepo.js";

export class VehicleCategoryService {
    constructor() {
        this.vehicleCategoryRepo=new RestApiRepo();
        this.path="/vehicle/category";
    }
    saveVehicleCategory(vehicleCategory){
        return this.vehicleCategoryRepo.save(this.path,vehicleCategory);
    }

    updateVehicleCategory(vehicleCategory){
        return this.vehicleCategoryRepo.update(this.path,vehicleCategory);

    }
    deleteVehicleCategory(vehicleCategoryID){
        return this.vehicleCategoryRepo.delete(this.path+"/"+vehicleCategoryID);
    }

   async loadAllVehicleCategory(){
        return await this.vehicleCategoryRepo.getAll(this.path);
    }

}