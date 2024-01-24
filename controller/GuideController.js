import {GuideService} from "../service/GuideService.js";
import {Regex} from "../util/Regex.js";


var isGuideUpdate = false;

export class GuideController {

    constructor() {
        this.guideService = new GuideService();
        $("#btnSaveGuide").click(this.saveAndUpdateGuide.bind(this));
        $("#btnNavigateGuide").click(this.loadAllGuide.bind(this));

    }

    saveAndUpdateGuide() {
        var guide = {
            guideID: $("#guideID").val(),
            name: $("#guideName").val(),
            address: $("#guideAddress").val(),
            tel: $("#guideTel").val(),
            price: $("#guidePrice").val()
        }
        if (this.isValid(guide)) {
            if (!isGuideUpdate) {
                this.guideService.saveGuide(guide);
            } else {
                this.guideService.updateGuide(guide);
            }
            this.clearAllFields();
            isGuideUpdate = false;
            this.loadAllGuide();
        }
    }

    loadAllGuide() {
        let promise = this.guideService.loadAllGuide();
        promise.then(resp => {
            $("#tblGuide").html("");
            for (let guide of resp.body) {
                $("#tblGuide").append(`
                <tr>
                <th>${guide.guideID}</th>
                <td>${guide.name}</td>
                <td>${guide.address}</td>
                <td>${guide.price}</td>
                <td>${guide.tel}</td>
               <td><button type="button" class="btn btn-outline-success btn-sm">edit</button>
             <button type="button" class="btn btn-outline-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteModel">remove</button></td></tr>`);

                $("#tblGuide >:last-child>:last-child>:first-child").click(function () {
                    let row = $(this).parent().parent();
                    $("#guideID").val(row.children().eq(0).text());
                    $("#guideName").val(row.children().eq(1).text());
                    $("#guideAddress").val(row.children().eq(2).text());
                    $("#guidePrice").val(row.children().eq(3).text());
                    $("#guideTel").val(row.children().eq(4).text());
                    $("#tblGuide > tr").fadeTo(1000, 0.2);
                    $(row).fadeTo(1000, 1);
                    $("#tblGuide > tr button").prop("disabled", true);
                    $(".aside-down-section button").prop("disabled", true);
                    $("#btnSaveGuide").text("Update");
                    $("#btnSaveGuide").removeClass("bg-primary");
                    $("#btnSaveGuide").addClass("bg-success");
                    isGuideUpdate = true;
                });
                $("#tblGuide >:last-child>:last-child>:last-child").click(function (){
                    let row = $(this).parent().parent();
                    $("#btnDeleteModel").click(function () {
                        $("#btnDeleteModel").off();
                        new GuideService().deleteGuide(row.children().eq(0).text());
                        new GuideController().loadAllGuide();
                    });
                });

            }
        });
    }

    isValid(guide) {
        let regex = new Regex();
        if (!regex.nameTest(guide.name)) {
            alert("Invalid Name");
            return false;
        } else {
            if (!guide.address.length > 2) {
                alert("Invalid Address");
                return false;
            } else {
                if (!guide.tel.length > 4) {
                    alert("Invalid Phone Number");
                    return false;
                } else {
                    if (!regex.doubleTest(guide.price)) {
                        alert("Invalid Price");
                        return false;
                    } else {
                        return true;
                    }
                }
            }
        }
    }

    clearAllFields() {
        $("#btnSaveGuide").text("Save");
        $("#btnSaveGuide").removeClass("bg-success");
        $("#btnSaveGuide").addClass("bg-primary");
        $("#guideID").val("");
        $("#guideName").val("");
        $("#guideAddress").val("");
        $("#guideTel").val("");
        $("#guidePrice").val("");
        $("#tblGuide > tr").fadeTo(1000, 1);
        $("#tblGuide > tr button").prop("disabled", false);
        $(".aside-down-section button").prop("disabled", false);
    }
}
let guideController = new GuideController();
