import {RestApiRepo} from "../model/RestApiRepo.js";

export class BookingService{

    constructor() {
        this.bookingRepo=new RestApiRepo();
        this.path="/booking";
    }
    saveBooking(booking){
        return this.bookingRepo.save(this.path,booking);
    }

    updateBooking(booking){
        return this.bookingRepo.update(this.path,booking);
    }
    deleteBooking(bookingID){
        return this.bookingRepo.delete(this.path+"/"+bookingID);
    }

    loadAllBooking(){
        return  this.bookingRepo.getAll(this.path);
    }

}