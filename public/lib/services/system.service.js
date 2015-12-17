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
        }


    };
};
