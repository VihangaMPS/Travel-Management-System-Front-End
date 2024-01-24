import {RestApiRepo} from "../model/RestApiRepo.js";
import {MultipartRepo} from "../model/MultipartRepo.js";

export class VehicleBrandService {

    constructor() {
    this.vehicleBrandRepo=new RestApiRepo();
            this.vehicleMultiPartRepo=new MultipartRepo();
    this.path="/vehicle/brand";
    }
    saveVehicle(vehicle){
     return this.vehicleBrandRepo.save(this.path,vehicle);
    }
    uploadVehicleImage(image,id){
        return this.vehicleMultiPartRepo.uploadImage(this.path+"/image/"+id,image);
    }
    updateVehicle(vehicle){
     return this.vehicleBrandRepo.update(this.path,vehicle);

    }
    deleteVehicle(vehicleID){
        return this.vehicleBrandRepo.delete(this.path+"/"+vehicleID);
    }
    findAllVehicleCategory(categoryID){
        return this.vehicleBrandRepo.getAll(this.path+"/search/category/"+categoryID);
    }

    loadAllVehicleWithoutImage(){
        return  this.vehicleBrandRepo.getAll(this.path+"/!image");
    }
}