import {CustomerService} from "../service/CustomerService.js";

export class CustomerLoginController {

    constructor() {
        $("#btnCustomerLogin").click(this.handleLoginCustomer.bind(this));
        $("#btnCustomerRegister").click(this.handleRegisterCustomer.bind(this));
        this.customerService=new CustomerService();
    }
    handleLoginCustomer(){

            let promise = this.customerService.searchBasicAuth($("#loginEmail").val(),$("#customerLoginPassword").val());
            promise.then(resp=>{
                localStorage.setItem("userDetails",JSON.stringify(resp.body));
                localStorage.setItem("Authorization",resp.resp.getResponseHeader("Authorization"));
             $(location).prop("href","./page/customer/dashboard.html");

            });
    }
    handleRegisterCustomer(){
        console.log("is click");
        let customer = {
            nic:$("#nic").val(),
            name:$("#name").val(),
            email:$("#registerEmail").val(),
            address:$("#address").val(),
            pwd:$("#registerPassword").val()
        }
        if(this.isValid(customer)){

            this.customerService.saveCustomer(customer).then(resp => {
                alert("REGISTERED");

            }).catch(e => alert("ERORR..!!"));
        }
    }

    isValid(customer) {
        const nic=/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/;
        const  name=/^([A-z]){2,}$/;
        const email=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if(false){
          alert("invalid NIC")
          return null;
      }else{
        if(!name.test(customer.name)){
          alert("invalid Name")
            return null;
        }else {
            if($("#conformPassword").val()!==customer.pwd){
          alert("invalid PWd")
                return null;
            }else {
                if(!email.test(customer.email)){
                    return null;
                }else {
              return customer;
                }
            }
        }
      }
    }
}
let customerLoginController = new CustomerLoginController();