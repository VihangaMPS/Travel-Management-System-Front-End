import {BookingService} from "../../service/BookingService.js";
import {TravelService} from "../../service/TravelService.js";

export class BookingController{

    constructor() {
this.bookingService = new BookingService();
this.travelService = new TravelService();
            $("#btnBooking").click(this.bookingHandler.bind(this));
            $("#btnPayment").click(this.paymentHandler.bind(this));


    }
    bookingHandler(){
        this.adult = Number($("#adultValue").text());
        this.children =Number( $("#childrenValue").text());
        this.room = Number($("#roomValue").text());
        $(".fragment-07-mainSection>:first-child>:nth-child(1)>:last-child").text(this.adult);
        $(".fragment-07-mainSection>:first-child>:nth-child(2)>:last-child").text(this.children);
        $(".fragment-07-mainSection>:first-child>:nth-child(3)>:last-child").text(this.room===0 ? 1:this.room);

        this.vehicle = JSON.parse(sessionStorage.getItem("selectedVehicle"));
        this.hotel = JSON.parse(sessionStorage.getItem("selectedHotel"));
        $("#hotelSelectSection>:first-child").html("");
        $("#hotelSelectSection>:first-child").append(`<img src="data:image/png;base64,${this.hotel.image}" alt="">`);
        $("#hotelSelectSection>:last-child>:nth-child(1)>:last-child").text(this.hotel.name);
        $("#hotelSelectSection>:last-child>:nth-child(2)>:last-child").text(this.hotel.email);
        $("#hotelSelectSection>:last-child>:nth-child(3)>:last-child").text(this.hotel.location);
        $("#hotelSelectSection>:last-child>:nth-child(4)>:last-child").text(this.hotel.starRate);
        $("#hotelSelectSection>:last-child>:nth-child(5)>:last-child").text(this.hotel.tel);
        $("#hotelSelectSection>:last-child>:nth-child(6)>:last-child").html("");
        $("#hotelSelectSection>:last-child>:nth-child(6)>:last-child").click(this.calculatePrice.bind(this));
        $("#hotelSelectSection>:last-child>:nth-child(6)>:last-child").append(`
                        <option value="${this.hotel.hotelOption[0].option1}">${this.hotel.hotelOption[0].option1}</option>
                        <option value="${this.hotel.hotelOption[0].option2}">${this.hotel.hotelOption[0].option2}</option>
                        <option value="${this.hotel.hotelOption[0].option3}">${this.hotel.hotelOption[0].option3}</option>
                        <option value="${this.hotel.hotelOption[0].option4}">${this.hotel.hotelOption[0].option4}</option>`);
        $("#vehicleSelectSection>:first-child").html("");
        $("#vehicleSelectSection>:first-child").append(`<img src="data:image/png;base64,${this.vehicle.image}" alt="">`);
        let totalHeadCount=this.adult+this.children;
       this.vehicleQty=1;
        if(totalHeadCount>4){
           this.vehicleQty++;
        }else if(totalHeadCount>8){
            this.vehicleQty++;
        }
        $("#vehicleSelectSection>:last-child>:nth-child(1)>:last-child").text(this.vehicleQty);
        $("#vehicleSelectSection>:last-child>:nth-child(2)>:last-child").text(this.vehicle.brandName);
        $("#vehicleSelectSection>:last-child>:nth-child(3)>:last-child").text(this.vehicle.fee1Day);
        $("#vehicleSelectSection>:last-child>:nth-child(4)>:last-child").text(this.vehicle.fee1KM);
        $("#vehicleSelectSection>:last-child>:nth-child(5)>:last-child").text(this.vehicle.fuel1KM);
        $("#vehicleSelectSection>:last-child>:nth-child(6)>:last-child").text(this.vehicle.seat);
        this.calculatePrice();
        $(".fragment-02").hide();
        $(".fragment-03").hide();
        $(".fragment-04").hide();
        $(".fragment-05").hide();
        $(".fragment-06").hide();
        $(".fragment-07").show();
    }
    paymentHandler(){
        let date=new Date().toISOString().split("T")[0];
        let time=new Date().getHours()+":"+ new Date().getMinutes();
        let customer =JSON.parse( localStorage.getItem("userDetails"));


        /*not completed*/
        let travel={
             startDate:date,
             endDate:date,
             countDay:1,
             countNight:1,
             noAdults:this.adult,
             children:this.children,
             headCount:this.adult+this.children,
             pets:0,
             guide:0,
             paidValue:this.totalAmount,
             remark:"",
             travelCategory:{
                 travelCategoryID: 1
             },
        }

        this.travelService.saveTravel(travel);

        let promise = this.travelService.loadAllTravel();
        promise.then(resp=>{
            let count=1;
            for (let travel of resp.body) {
                count++;
            }
            let booking={
                date:date,
                time:time.length===4 ? 0+time:time,
                paidValue:this.totalAmount,
                paymentStatus:true,
                travelID:count,
                hotelID:this.hotel.hotelID,
                vehicleID:this.vehicle.vehicleID,
                guideID:0,
                customer:customer
            }

            this.bookingService.saveBooking(booking).then(resp => {
                alert("BOOKED");
                location.reload();

            }).catch(e => alert("FAILED"));
        });


    }
    calculatePrice(){
        let vehicleAmount=this.vehicleQty*(this.vehicle.fee1Day+this.vehicle.fee1KM+this.vehicle.fuel1KM);
        let hotelAmount=Number($("#hotelOptionBox").val());
        $("#travelPriceSection>section>:nth-child(2)>:nth-child(2)").text(hotelAmount+"");
        $("#travelPriceSection>section>:nth-child(3)>:nth-child(2)").text(vehicleAmount+"");
        $("#travelPriceSection>section>:nth-child(4)>:nth-child(2)").text("0");
        $("#travelPriceSection>section>:nth-child(5)>:nth-child(2)").text("0");
        this.totalAmount=vehicleAmount+hotelAmount;
        $("#travelPriceSection>section>:nth-child(6)>:nth-child(2)").text((this.totalAmount)+"");
        $("#totalAmount").text(this.totalAmount+"");
    }
}
new BookingController();