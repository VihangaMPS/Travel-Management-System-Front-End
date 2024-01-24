import {TravelAreaService} from "../service/TravelAreaService.js";
var isTravelAreaUpdate=false;
export class TravelAreaController{

    constructor() {
        this.travelAreaService=new TravelAreaService();
        $("#btnSaveTravelArea").click(this.saveAndUpdate.bind(this));
        $("#btnNavigateTravelArea").click(this.loadAllTravel.bind(this));
    }
    saveAndUpdate(){
       let travelArea={
           travelAreaID:$("#travelAreaID").val(),
           areaName:$("#travelAreaName").val()
        }
        if(! travelArea.areaName.length>1){
            alert("invalid Input")
            return;
        }else{
            if(!isTravelAreaUpdate){
                this.travelAreaService.saveTravelArea(travelArea);
            }else {
                this.travelAreaService.updateTravelArea(travelArea);

            }
            $("#travelAreaID").val("");
            $("#travelAreaName").val("");
            isTravelAreaUpdate=false;
            this.loadAllTravel();
        }
    }
    loadAllTravel(){
    let promise = this.travelAreaService.loadAllTravelArea();
    promise.then( resp=>{
       $("#tblTravelArea").html("");
        for (let area of resp.body) {
       $("#tblTravelArea").append( `
            <tr>
            <th>${area.travelAreaID}</th>
            <td>${area.areaName}</td>
             <td><button type="button" class="btn btn-outline-success btn-sm">edit</button>
             <button type="button" class="btn btn-outline-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteModel">remove</button></td></tr>`);

        }
    });
    }

}
let travelAreaController = new TravelAreaController();