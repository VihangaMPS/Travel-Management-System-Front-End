import {VehicleCategoryService} from "../service/VehicleCategoryService.js";
import {vehicleCategoryPromise} from "../db/DB.js";


var isUpdateVehicleCategory=false;
export class VehicleCategoryController{
    constructor() {
        this.vehicleCategoryService=new VehicleCategoryService();
        this.categoryList=vehicleCategoryPromise;
        $("#btnSaveVehicleCategory").click(this.saveAndUpdateVehicleCategory.bind(this));
        $("#btnNavigateVehicleCategory").click(this.loadAllVehicleCategory.bind(this));
    }

    saveAndUpdateVehicleCategory(){

        let vehicleCategory ={
            vehicleCategoryID: $("#vehicleCategoryID").val(),
            categoryName:$("#vehicleCategoryName").val()
        }
        if(!vehicleCategory.categoryName.length>1)return;
        if(!isUpdateVehicleCategory){
            this.vehicleCategoryService.saveVehicleCategory(vehicleCategory);
        }else{
            this.vehicleCategoryService.updateVehicleCategory(vehicleCategory);

        }
        $("#vehicleCategoryID").val("");
        $("#vehicleCategoryName").val("");
        isUpdateVehicleCategory=false;
        this.loadAllVehicleCategory();
    }
    loadAllVehicleCategory(){

       this.categoryList.then(resp =>{
            $("#tblVehicleCategory").html("");
            for (let category of resp.body) {
                console.log(category);
                $("#tblVehicleCategory").append(`
                <tr>
                <th>${category.vehicleCategoryID}</th>
                <td>${category.categoryName}</td>
                   <td><button type="button" class="btn btn-outline-success btn-sm">edit</button>
             <button type="button" class="btn btn-outline-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteModel">remove</button></td></tr>`);
            }

        });



    }

}
 let vehicleCategoryController = new VehicleCategoryController();

