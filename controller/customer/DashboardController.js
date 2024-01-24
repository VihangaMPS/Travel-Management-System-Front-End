import {VehicleBrandService} from "../../service/VehicleBrandService.js";
import {VehicleCategoryService} from "../../service/VehicleCategoryService.js";
import {HotelService} from "../../service/HotelService.js";
import {CustomerService} from "../../service/CustomerService.js";
import {TravelAreaService} from "../../service/TravelAreaService.js";
import {TravelCategoryService} from "../../service/TravelCategoryService.js";

export class DashboardController{

    constructor() {
            $("#btnLogout").click(function (){
                localStorage.removeItem("Authorization");
                $(location).prop("href","../../index.html");
            });
    }
}
new DashboardController();