import {Environment} from "../environment/Environment.js";

export class PermitRepo{

    constructor() {
        this.url=Environment.url;
    }
    saveCustomer(path,data){
        return  new Promise((resolve, reject)=>{
            $.ajax({
                method:"POST",
                contentType:"application/json",
                url:this.url+path,
                dataType:"json",
                credentials:true,
                async:false,
                data:JSON.stringify(data),
                headers:{

                },
                success:function (data,status,resp){
                    data={
                        "body":data,
                        "status":status,
                        "resp":resp,

                    }
                    resolve(data);
                },
                error:function (er){
                    reject(er);
                }

            });
        });
    }
}