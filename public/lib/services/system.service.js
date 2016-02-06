adminFactory.SystemService= function(ApiService){
    return {

        base:"system",
        categories:function(){
            return ApiService.rest(this.base+"/category/:id",{
                list:{method:"GET", params:{}},
                create:{method:"POST", params:{}},
                getByID:{method:"GET", params:{id:"@id"}},
                update:{method:"PUT", params:{id:"@id"}},
                delete:{method:"DELETE", params:{id:"@id"}}

            });
        },
        default_services:function(){
            return ApiService.rest(this.base+"/default_service/:id",{
                list:{method:"GET", params:{}},
                create:{method:"POST", params:{}},
                getByID:{method:"GET", params:{id:"@id"}},
                update:{method:"PUT", params:{id:"@id"}},
                delete:{method:"DELETE", params:{id:"@id"}}

            });
        },

        preferences:function(){
            return ApiService.rest(this.base+"/preferences/:id",{
                list:{method:"GET", params:{}},
                create:{method:"POST", params:{}},
                getByID:{method:"GET", params:{id:"@id"}},
                update:{method:"PUT", params:{id:"@id"}},
                delete:{method:"DELETE", params:{id:"@id"}}

            });
        },
        picks:function(){
            return ApiService.rest(this.base+"/pick/:id",{
                list:{method:"GET", params:{}},

                getByID:{method:"GET", params:{id:"@id"}},

                delete:{method:"DELETE", params:{id:"@id"}}

            });
        },

        images:function(){
            return ApiService.rest(this.base+"/image/:type",{

                upload:{method:"POST", params:{type:"@type"}}

            });
        }






    };
};
