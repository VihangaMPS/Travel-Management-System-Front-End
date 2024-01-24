import {UserService} from "../service/UserService.js";

export class AdminLoginController{


    constructor() {
        $("#btnAdminLogin").click(this.handleLoginCustomer.bind(this));
        this.userService=new UserService();

    }
    handleLoginCustomer(){
        let email = $("#loginEmail").val();
        let promise = this.userService.searchBasicAuth(email,$("#loginPassword").val());
        promise.then((resp) =>{
            localStorage.setItem("userDetails",JSON.stringify(resp.body));
            localStorage.setItem("Authorization",resp.resp.getResponseHeader("Authorization"));
            $(location).prop("href","./page/admin/console.html");

        });
    }
}
let adminLoginController = new AdminLoginController();