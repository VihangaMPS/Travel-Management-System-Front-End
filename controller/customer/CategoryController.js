import {VehicleBrandService} from "../../service/VehicleBrandService.js";
import {VehicleCategoryService} from "../../service/VehicleCategoryService.js";
import {HotelService} from "../../service/HotelService.js";
import {CustomerService} from "../../service/CustomerService.js";
import {TravelAreaService} from "../../service/TravelAreaService.js";
import {TravelCategoryService} from "../../service/TravelCategoryService.js";


export class CategoryController{
    constructor() {
        this.vehicleBrandService = new VehicleBrandService();
        let vehicleCategoryService = new VehicleCategoryService();
        let hotelService = new HotelService();
        let customerService = new CustomerService();
        let travelAreaService = new TravelAreaService();
        let travelCategoryService = new TravelCategoryService();

        $(".fragment-02 .main-category-section>:nth-child(1)").click(this.mainCategoryHandlerRegular.bind(this));
        $(".fragment-02 .main-category-section>:nth-child(2)").click(this.mainCategoryHandlerMedium.bind(this));
        $(".fragment-02 .main-category-section>:nth-child(3)").click(this.mainCategoryHandlerLuxury.bind(this));
        $(".fragment-02 .main-category-section>:nth-child(4)").click(this.mainCategoryHandlerSuperLuxury.bind(this));

    }
    mainCategoryHandlerRegular(event){
          this.visibleAllFields(event);
    }
    mainCategoryHandlerMedium(event){
        this.visibleAllFields(event);
    }
    mainCategoryHandlerLuxury(event){
        this.visibleAllFields(event);
    }
    mainCategoryHandlerSuperLuxury(event){
        this.visibleAllFields(event);
    }
   visibleAllFields(evt){
        $(".fragment-02").fadeOut(500);
        $(".fragment-03").show();
        sessionStorage.setItem("travelCategory",evt.target.innerText);
        let category=1;
        switch (evt.target.innerText) {
            case "Regular": category=1;break;
            case "Medium": category=2;break;
            case "Luxury": category=3;break;
            case "Super-Luxury": category=4;break;
        }
        console.log(category);
        let promise = this.vehicleBrandService.findAllVehicleCategory(category);
        promise.then((resp) =>{
                $(".fragment-05-main-section").html("");
            for (let vehicle of resp.body) {


              $(".fragment-05-main-section").append(` <figure><i>${JSON.stringify(vehicle)}</i> <img src="data:image/png;base64,${vehicle.image}" alt=""><figcaption>${vehicle.brandName}</figcaption> <div><span></span></div></figure>`);
                $(".fragment-05-main-section >:last-child").click(function (){
                    $(".fragment-05-main-section>figure>img").fadeTo(1000, 1);
                    $(".fragment-05-main-section span").css("background-color","rgba(52, 9, 222, 0.25)");
                    $($(this).children().eq(3).children().eq(0)).css("background-color","blue");
                    sessionStorage.setItem("selectedVehicle",$(this).children().eq(0).text())
                    $($(this).children().eq(1)).fadeTo("fast", 0.2);

                });
            }

        });
    }

}
let categoryController = new CategoryController();