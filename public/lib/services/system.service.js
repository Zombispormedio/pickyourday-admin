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
          countCategories:function(){
            return ApiService.rest(this.base+"/category/count",{
                get:{method:"GET", params:{}},
              

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
        
          countDefaultServices:function(){
            return ApiService.rest(this.base+"/default_service/count",{
                get:{method:"GET", params:{}},
              

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
         countPreferences:function(){
            return ApiService.rest(this.base+"/preferences/count",{
                get:{method:"GET", params:{}},

            });
        },
        picks:function(){
            return ApiService.rest(this.base+"/pick/:id",{
                list:{method:"GET", params:{}},

                getByID:{method:"GET", params:{id:"@id"}},

                delete:{method:"DELETE", params:{id:"@id"}}

            });
        },
        
         countPicks:function(){
            return ApiService.rest(this.base+"/pick/count",{
                get:{method:"GET", params:{}},
              

            });
        },

        images:function(){
            return ApiService.rest(this.base+"/image/:type",{

                upload:{method:"POST", params:{type:"@type"}}

            });
        }






    };
};
