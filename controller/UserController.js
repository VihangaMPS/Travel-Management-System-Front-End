import {UserService} from "../service/UserService.js";
import {Regex} from "../util/Regex.js";

var isUserUpdate = false;

export  class UserController {

    constructor() {
        this.userService = new UserService();
        $("#btnSaveUser").click(this.saveAndUpdateUser.bind(this));
        $("#btnNavigateUser").click(this.loadAllUser.bind(this));

    }

    saveAndUpdateUser() {
        let user = {
            userID: $("#userID").val(),
            name: $("#userName").val(),
            email: $("#userEmail").val(),
            pwd: $("#userPwd").val(),
            role: $("#userRole").val()
        }
        if (this.isValid(user)) {
            if (!isUserUpdate) {
                let promise = this.userService.saveUser(user);
                promise.then(resp => console.log("SAVED")).catch(e =>{console.log(e);});
            } else {
                let promise = this.userService.updateUser(user);
                promise.then(resp => console.log("UPDATED")).catch(e =>{console.log(e);});
            }
            isUserUpdate = false;
            this.loadAllUser();
            this.clearAllFields();
        }
    }

    loadAllUser() {
        let promise = this.userService.loadAllUser();
        promise.then(resp => {
            $("#tblUser").html("");
            for (let user of resp.body) {
                $("#tblUser").append(`
                <tr>
                <th>${user.userID}</th>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                   <td><button type="button" class="btn btn-outline-success btn-sm">edit</button>
             <button type="button" class="btn btn-outline-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteModel">remove</button></td></tr>`);
                $("#tblUser >:last-child>:last-child>:first-child").click(function () {
                    let row = $(this).parent().parent();
                    $("#userID").val(row.children().eq(0).text());
                    $("#userName").val(row.children().eq(1).text());
                    $("#userEmail").val(row.children().eq(2).text());
                    $("#userRole").val(row.children().eq(3).text());
                    $("#tblUser > tr").fadeTo(1000, 0.2);
                    $(row).fadeTo(1000, 1);
                    $("#tblUser > tr button").prop("disabled", true);
                    $(".aside-down-section button").prop("disabled", true);
                    $("#btnSaveGuide").text("Update User");
                    $("#btnSaveGuide").removeClass("bg-primary");
                    $("#btnSaveGuide").addClass("bg-success");
                    isUserUpdate = true;
                });
                $("#tblUser >:last-child>:last-child>:last-child").click(function () {
                    let row = $(this).parent().parent();
                    $("#btnDeleteModel").click(function () {
                        $("#btnDeleteModel").off();
                        new UserService().deleteUser(row.children().eq(0).text());
                        new UserController().loadAllUser();
                    });
                });
            }

        });

    }

    clearAllFields() {
        $("#btnSaveGuide").text("Save User");
        $("#btnSaveGuide").removeClass("bg-success");
        $("#btnSaveGuide").addClass("bg-primary");
        $("#tblUser > tr").fadeTo(1000, 1);
        $("#tblUser > tr button").prop("disabled", false);
        $(".aside-down-section button").prop("disabled", false);
        $("#userID").val("");
        $("#userName").val("");
        $("#userEmail").val("");
        $("#userPwd").val("");
        $("#userRole").val("");
    }

    isValid(user) {
        let regex = new Regex();
       if(!regex.nameTest(user.name)){
           alert("Invalid Name");
           return false;
       }else{
           if(!regex.emailTest(user.email)){
               alert("Invalid Email");
               return false;
           }else{
               if(! (user.role==="ADMIN" || user.role==="MANAGER")){
                   alert("Invalid Role");
                   return false;
               }else{
                   if(! user.pwd.length>3){
                       alert("Invalid pwd");
                       return false;
                   }else{
                    return true;
                   }
               }
           }
       }
    }
}
let userController = new UserController();