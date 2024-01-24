import {Environment} from "../environment/Environment.js";

export class RestApiRepo {
    constructor() {
        this.jwtToken=localStorage.getItem("Authorization");
        this.url=Environment.url;
    }
    save(path,data){
        localStorage.getItem("")
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
                    "Authorization":this.jwtToken,
                    'X-Requested-With': 'XMLHttpRequest',
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
    update(path,data){
        return  new Promise((resolve, reject)=>{
            $.ajax({
                method:"PUT",
                contentType:"application/json",
                url:this.url+path,
                dataType:"json",
                credentials:true,
                async:false,
                data:JSON.stringify(data),
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
    delete(path){
        return new Promise((resolve, reject)=>{
            $.ajax({
                method:"DELETE",
                contentType:"application/json",
                url:this.url+path,
                dataType:"json",
                async:false,
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
    search(path){
        return new Promise((resolve, reject) => {
            $.ajax(this.url+path,{
                method:"GET",
                dataType:"json",
                contentType:"application/json",
                async:false,
                headers:{
                    "Authorization":this.jwtToken,
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
    searchBasicAuth(path,email,pwd){
        return new Promise((resolve, reject) => {
            $.ajax({
                url:this.url+path,
                method:"GET",
                dataType:"json",
                async:false,
                headers:{
                    "Authorization":"Basic "+window.btoa(email+":"+pwd),
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
    getAll(path){
        return new Promise((resolve, reject) => {
            $.ajax({
                method:"GET",
                url:this.url+path,
                dataType:"json",
                contentType:"application/json",
                async:false,
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