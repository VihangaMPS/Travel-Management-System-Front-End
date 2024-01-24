import {TravelAreaService} from "../../service/TravelAreaService.js";
import {HotelService} from "../../service/HotelService.js";

export class BookingSearchController{

    constructor() {
        this.travelAreaService = new TravelAreaService();
      this.hotelService = new HotelService();
        $(".adult-children-room-section>div>p").click(this.adultChildrenRoomHandler.bind(this));
        $(".btn-option-search").click(this.btnOptionSearchHandler.bind(this));

    this.loadAllTravelArea();
        this.adultChildrenRoomHandlerOptionManage();

    }
    searchHandler(){

    }
    btnOptionSearchHandler(){

        let location = $("#locationSelectBox").val();
        if(location.startsWith("Where are you going?")){
            alert("Please Select Location");
        }else{
            let promise = this.hotelService.findAllHotelLocation(location);
            document.querySelector(".option-body").style.display="none";
            promise.then(resp =>{
                $(".fragment-04-main-section").html("");
                for (let hotel of resp.body) {
                    $(".fragment-04-main-section").append(` <figure><i>${JSON.stringify(hotel)}</i> <img src="data:image/png;base64,${hotel.image}" alt=""><figcaption>${hotel.name}</figcaption> <div><span></span></div></figure>`);
                    $(".fragment-04-main-section >:last-child").click(function (){
                        $(".fragment-04-main-section>figure>img").fadeTo(1000, 1);
                        $(".fragment-04-main-section span").css("background-color","rgba(52, 9, 222, 0.25)");
                        $($(this).children().eq(3).children().eq(0)).css("background-color","blue");
                        sessionStorage.setItem("selectedHotel",$(this).children().eq(0).text())
                        $($(this).children().eq(1)).fadeTo("fast", 0.2);
                    });
                }
                $(".fragment-04").show();
                $(".fragment-05").show();
                $(".fragment-06").show();


            });
        }

    }
loadAllTravelArea(){
        let promise = this.travelAreaService.loadAllTravelArea();
        promise.then(resp =>{
            $("#locationSelectBox").html("");
            $("#locationSelectBox").append(` <option value="1" selected>Where are you going?</option>`);
            for (let travelArea of resp.body) {
            $("#locationSelectBox").append(`<option value="${travelArea.areaName}">${travelArea.areaName}</option>`);
            }
        });


}
adultChildrenRoomHandler(){
    let element = document.querySelector(".option-body");
    if(element.style.display==="block"){
        element.style.display="none";
    }else{
        element.style.display="block";
    }
}
    adultChildrenRoomHandlerOptionManage(){

        $("#adultIncrement").click(function () {
            $("#adultValue").text(incrementMethod($(this).parent().children().eq(1)));
        });
        $("#adultDecrement").click(function () {
            $("#adultValue").text( decrementMethod($(this).parent().children().eq(1)));
        });
        $("#childrenIncrement").click(function () {
            $("#childrenValue").text(incrementMethod($(this).parent().children().eq(1)));
        });
        $("#childrenDecrement").click(function () {
            $("#childrenValue").text( decrementMethod($(this).parent().children().eq(1)));
        });
        $("#roomIncrement").click(function () {
            $("#roomValue").text(incrementMethod($(this).parent().children().eq(1)));
        });
        $("#roomDecrement").click(function () {
            $("#roomValue").text( decrementMethod($(this).parent().children().eq(1)));
        });


    }



}
function incrementMethod(field){
    let adultNumber = Number( field.text());
    if(adultNumber>9){
        field.text("1");
        adultNumber=1;
    }else{
        field.text(++adultNumber);
    }
    return adultNumber;
}
function decrementMethod(field){
    let adultNumber = Number( field.text());
    if(adultNumber<1){
        field.text("10");
        adultNumber=10;
    }else{
        field.text(--adultNumber);

    }
    return adultNumber;
}

let bookingSearchController = new BookingSearchController();