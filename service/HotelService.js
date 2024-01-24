import {RestApiRepo} from "../model/RestApiRepo.js";
import {MultipartRepo} from "../model/MultipartRepo.js";


export class HotelService{


    constructor() {
        this.hotelRepo = new RestApiRepo();
        this.hotelMultipartRepo = new MultipartRepo();
        this.path="/hotel";

    }
    saveHotel(hotel){
       return  this.hotelRepo.save(this.path,hotel);
        }

    uploadImageHotel(image,id){
      return this.hotelMultipartRepo.uploadImage(this.path+"/image/"+id,image);
    }
    updateHotel(hotel){
       return this.hotelRepo.update(this.path,hotel);
    }
    deleteHotel(hotelID){
        return this.hotelRepo.delete(this.path+"/"+hotelID);
    }
    findAllHotelLocation(location){

        return this.hotelRepo.getAll(this.path+"/search/location/"+location);
    }

    loadAllHotel(){
            return this.hotelRepo.getAll(this.path+"/!image");
    }

}