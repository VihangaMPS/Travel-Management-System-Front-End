import {Environment} from "../environment/Environment.js";

export class MultipartRepo{


    constructor() {
        this.jwtToken=localStorage.getItem("Authorization");
        this.url=Environment.url;
    }
    uploadImage(path,data){
        return  new Promise((resolve, reject)=>{
            $.ajax({
                type:"PUT",
                contentType:false,
                enctype: 'multipart/form-data',
                url:this.url+path,
                credentials:true,
                processData: false,
                data:data,
                cache: false,
                headers:{
                    "Authorization":this.jwtToken,
                    'X-Requested-With': 'XMLHttpRequest'
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