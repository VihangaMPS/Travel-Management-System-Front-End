import {VehicleBrandService} from "../service/VehicleBrandService.js";
import {Regex} from "../util/Regex.js";
import {vehicleCategoryPromise} from "../db/DB.js";


var isVehicleControllerUpdate = false;

export class VehicleController {


    constructor() {
        this.vehicleService = new VehicleBrandService();
             vehicleCategoryPromise.then(resp => {
             this.vehicleCategoryInMemory = resp.body;
             this.regex = new Regex();
         });
      $("#btnSaveVehicle").click(this.saveAndUpdateVehicle.bind(this));
      $("#btnImageUploadVehicle").click(this.uploadImage.bind(this));
        $("#btnNavigateVehicle").click(this.loadAllVehicleBrand.bind(this));


    }

    loadAllVehicleBrand() {
        let promise = this.vehicleService.loadAllVehicleWithoutImage();
            $("#vehicleCategoryOption").html("");
                $("#tblVehicleBrand").html("");
        for (let category of this.vehicleCategoryInMemory) {
            $("#vehicleCategoryOption").append(`<option value="${category.vehicleCategoryID}">${category.categoryName}</option>`);
        }
        promise.then(resp => {
            for (let vehicle of resp.body) {
                $("#tblVehicleBrand").append(`
                    <tr>
                     <th>${vehicle.vehicleID}</th>
                     <td>${vehicle.brandName}</td>
                     <td>${vehicle.fee1Day}</td>
                     <td>${vehicle.fee1KM}</td>
                     <td>${vehicle.fuel1KM}</td>
                     <td>${vehicle.seat}</td>
                     <td>${vehicle.vehicleCategory.categoryName}</td>
                      <td><button type="button" class="btn btn-outline-success btn-sm">edit</button>
             <button type="button" class="btn btn-outline-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteModel">remove</button></td></tr>`);
                $("#tblVehicleBrand > :last-child>:last-child>:first-child").click(function () {
                    let row = $(this).parent().parent();
                    $("#vehicleID").val(row.children().eq(0).text());
                    $("#vehicleName").val(row.children().eq(1).text());
                    $("#vehicleFeeDay").val(row.children().eq(2).text());
                    $("#vehicleFee1KM").val(row.children().eq(3).text());
                    $("#vehicleFuel1KM").val(row.children().eq(4).text());
                    $("#vehicleSeat").val(row.children().eq(5).text());
                    $("#tblVehicleBrand > tr").fadeTo(1000, 0.2);
                    $(row).fadeTo(1000, 1);
                    $("#tblVehicleBrand > tr button").prop("disabled", true);
                    $(".aside-down-section button").prop("disabled", true);
                    $("#btnImageUploadVehicle").prop("disabled", false);
                    $("#btnSaveVehicle").text("Update");
                    $("#btnSaveVehicle").removeClass("bg-primary");
                    $("#btnSaveVehicle").addClass("bg-success");
                    isVehicleControllerUpdate = true;
                });
                $("#tblVehicleBrand > :last-child>:last-child>:last-child").click(function () {
                    let row = $(this).parent().parent();
                    $("#btnDeleteModel").click(function () {
                        $("#btnDeleteModel").off();
                        new VehicleBrandService().deleteVehicle(row.children().eq(0).text());
                        new VehicleController().loadAllVehicleBrand();
                    });
                });


            }
        });
    }
    uploadImage(){
        let formData = new FormData();
        formData.append("file", $('#vehicleImage')[0].files[0]);
        this.vehicleService.uploadVehicleImage(formData,$("#vehicleID").val());
        alert("Alert Saved!!");
        this.clearAllFields();
        this.loadAllVehicleBrand();
        isVehicleControllerUpdate = false;
    }

    saveAndUpdateVehicle() {
           let vehicle = {
                  vehicleID: $("#vehicleID").val(),
                  brandName: $("#vehicleName").val(),
                  fee1Day: $("#vehicleFeeDay").val(),
                  fee1KM: $("#vehicleFee1KM").val(),
                  fuel1KM: $("#vehicleFuel1KM").val(),
                  seat: $("#vehicleSeat").val(),
                  vehicleCategory: {
                      vehicleCategoryID: $("#vehicleCategoryOption").val()
                  }
              }

            if (this.isValid(vehicle)) {
                if (!isVehicleControllerUpdate) {
                    this.vehicleService.saveVehicle(vehicle);
                } else {
                    this.vehicleService.updateVehicle(vehicle);
                }
                this.clearAllFields();
                this.loadAllVehicleBrand();
                isVehicleControllerUpdate = false;
            }

    }

    isValid(vehicle) {
        if (!vehicle.brandName.length > 1) {
            alert("invalid Vehicle Name");
            return false;
        } else {
            if (!this.regex.integerTest(vehicle.seat)) {
                alert("invalid Seat");
                return false;
            } else {
                if (vehicle.fee1Day === "") {
                    return false;
                } else {
                    if (vehicle.fee1KM === "") {
                        return false;
                    } else {
                        if (vehicle.fuel1KM === "") {
                            return false;
                        } else {
                            return true;
                        }
                    }
                }
            }

        }
    }

    clearAllFields() {
        $("#btnSaveVehicle").text("Save");
        $("#btnSaveVehicle").removeClass("bg-success");
        $("#btnSaveVehicle").addClass("bg-primary");
        $("#tblVehicleBrand > tr").fadeTo(1000, 1);
        $("#tblVehicleBrand > tr button").prop("disabled", false);
        $(".aside-down-section button").prop("disabled", false);
        $("#btnImageUploadVehicle").prop("disabled", true);
        $("#vehicleID").val("");
        $("#vehicleName").val("");
        $("#vehicleFeeDay").val("");
        $("#vehicleFee1KM").val("");
        $("#vehicleFuel1KM").val("");
        $("#vehicleSeat").val("");

    }
}

let vehicleController = new VehicleController();
