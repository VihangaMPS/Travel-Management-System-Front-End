import {HotelService} from "../service/HotelService.js";
import {Regex} from "../util/Regex.js";

var isHotelUpdate = false;

export class HotelController {
    constructor() {
        this.hotelService = new HotelService();
        this.regex = new Regex();
        $("#btnHotelSave").click(this.saveAndUpdateHotel.bind(this));
        $("#btnImageUploadHotel").click(this.uploadImage.bind(this));
        $("#btnNavigateHotel").click(this.loadAllFields.bind(this));

    }

    saveAndUpdateHotel() {
        let hotelID = Number($("#hotelID").val())
        let hotel = {
            hotelID: hotelID,
            name: $("#hotelName").val(),
            email: $("#hotelEmail").val(),
            starRate: $("#hotelStarRate").val(),
            location: $("#hotelLocation").val(),
            map: $("#hotelMap").val(),
            tel: $("#hotelTel").val(),
            hotelOption: [{
                option1: $("#hotelOption1").val(),
                option2: $("#hotelOption2").val(),
                option3: $("#hotelOption3").val(),
                option4: $("#hotelOption4").val()
            }]
        };

        if (this.isValid(hotel)) {

            if (!isHotelUpdate) {
                hotel.hotelID = null;
                let promise = this.hotelService.saveHotel(hotel);
                promise.then(resp => alert("Saved")).catch(e => alert(e));
            } else {
                let promise = this.hotelService.updateHotel(hotel);
                promise.then(resp => alert("Updated")).catch(e => alert(e));

            }
            isHotelUpdate = false;

            this.clearAllFields();
            this.loadAllFields();
        }
    }
    uploadImage(){
        let formData = new FormData();
        formData.append("image", $('#hotelImage')[0].files[0]);
        let promise = this.hotelService.uploadImageHotel(formData,$("#hotelID").val());
        promise.then(resp => alert("UPLOADED..!!")).catch(e => alert("FAILED"));
        isHotelUpdate=false;
        this.clearAllFields();
        this.loadAllFields();
    }

    loadAllFields() {
        let promise = this.hotelService.loadAllHotel();
        promise.then(resp => {
            $("#tblHotel").html("");
            for (let hotel of resp.body) {
                console.log(hotel);
                let options = {
                    option1: 0,
                    option2: 0,
                    option3: 0,
                    option4: 0
                };
                for (let opt of hotel.hotelOption) {
                    options.option1 = opt.option1;
                    options.option2 = opt.option2;
                    options.option3 = opt.option3;
                    options.option4 = opt.option4;
                }
                $("#tblHotel").append(`
                        <tr>
                                <th>${hotel.hotelID}</th>
                                <td>${hotel.name}</td>
                                <td>${hotel.email}</td>
                                <td>${hotel.location}</td>
                                <td>${hotel.map}</td>
                                <td>${hotel.starRate}</td>
                                <td>${hotel.tel}</td>
                                <td>${options.option1}</td>
                                <td>${options.option2}</td>
                                <td>${options.option3}</td>
                                <td>${options.option4}</td>
                                <td><button type="button" class="btn btn-outline-success btn-sm">edit</button>
             <button type="button" class="btn btn-outline-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteModel">remove</button></td></tr></tr>`);
                $("#tblHotel>:last-child>:last-child>:first-child").click(function () {
                    let row = $(this).parent().parent();
                    $("#hotelID").val(row.children().eq(0).text());
                    $("#hotelName").val(row.children().eq(1).text());
                    $("#hotelEmail").val(row.children().eq(2).text());
                    $("#hotelLocation").val(row.children().eq(3).text());
                    $("#hotelMap").val(row.children().eq(4).text());
                    $("#hotelStarRate").val(row.children().eq(5).text());
                    $("#hotelTel").val(row.children().eq(6).text());
                    $("#hotelOption1").val(row.children().eq(7).text());
                    $("#hotelOption2").val(row.children().eq(8).text());
                    $("#hotelOption3").val(row.children().eq(9).text());
                    $("#hotelOption4").val(row.children().eq(10).text());
                    $("#btnHotelSave").text("Update");
                    $("#btnHotelSave").removeClass("bg-primary");
                    $("#btnHotelSave").addClass("bg-success");
                    $("#tblHotel> tr").fadeTo(1000, 0.2);
                    $(row).fadeTo(1000, 1);
                    $("#tblHotel> tr>td >button").prop("disabled", true);
                    $(".aside-down-section button").prop("disabled", true);
                    $("#btnImageUploadHotel").prop("disabled", false);

                    isHotelUpdate = true;
                });

                $("#tblHotel>:last-child>:last-child>:last-child").click(function () {
                    let row = $(this).parent().parent();
                    $("#btnDeleteModel").click(function () {
                        $("#btnDeleteModel").off();
                        new HotelService().deleteHotel(row.children().eq(0).text());
                        new HotelController().loadAllFields();
                    });
                });

            }


        }).catch(e => console.log(e));
    }

    isValid(hotel) {
        if (!hotel.name.length > 1) {
            alert("Name Not Valid");
            return false;
        } else {
            if (!this.regex.emailTest(hotel.email)) {
                alert("Email Not Valid");
                return false;
            } else {
                if (!this.regex.integerTest(hotel.starRate)) {
                    alert("Invalid Star");
                    return false;
                } else {
                    if (!this.regex.doubleTest(hotel.hotelOption[0].option1)) {
                        alert("Invalid Option 1");
                        return false;
                    } else {
                        if (!this.regex.doubleTest(hotel.hotelOption[0].option2)) {
                            alert("Invalid Option 2");
                            return false;
                        } else {
                            if (!this.regex.doubleTest(hotel.hotelOption[0].option3)) {
                                alert("Invalid Option 3");
                                return false;
                            } else {
                                if (!this.regex.doubleTest(hotel.hotelOption[0].option4)) {
                                    alert("Invalid Option 4");
                                    return false;
                                } else {
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    clearAllFields() {
        $("#btnHotelSave").text("Save");
        $("#btnHotelSave").removeClass("bg-success");
        $("#btnHotelSave").addClass("bg-primary");
        $("#tblHotel> tr").fadeTo(1000, 1);
        $("#tblHotel> tr>td >button").prop("disabled", false);
        $(".aside-down-section button").prop("disabled", false);
        $("#btnImageUploadHotel").prop("disabled", true);
        $("#hotelName").val("");
        $("#hotelEmail").val("");
        $("#hotelStarRate").val("");
        $("#hotelLocation").val("");
        $("#hotelMap").val("");
        $("#hotelTel").val("");
        $("#hotelOption1").val("");
        $("#hotelOption2").val("");
        $("#hotelOption3").val("");
        $("#hotelOption4").val("");


    }

}
let hotelController = new HotelController();

