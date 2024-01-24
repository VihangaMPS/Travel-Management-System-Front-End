import {TravelCategoryService} from "../service/TravelCategoryService.js";

export class TravelCategoryController{

    constructor() {
        this.travelCategoryService=new TravelCategoryService();
        $("#btnNavigateTravelCategory").click(this.loadAllCategory.bind(this));

    }
    saveAndUpdateTravelCategory(){
       var travelCategory={
           travelCategoryID:$("#travelCategoryID").val(),
           categoryName:$("#travelCategoryName").val()
        }


    }
    loadAllCategory(){
        let promise = this.travelCategoryService.loadAllTravelCategory();
        $("#tblTravelCategory").html("");
        promise.then(resp =>{
            for (let category of resp.body) {
                $("#tblTravelCategory").append(`<tr>
                    <th>${category.travelCategoryID}</th>
                    <td>${category.categoryName}</td>
                      <td><button type="button" class="btn btn-outline-success btn-sm">edit</button>
             <button type="button" class="btn btn-outline-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteModel">remove</button></td></tr>`);
            }


        });

    }

}
let travelCategoryController = new TravelCategoryController();
