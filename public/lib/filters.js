adminFilter.capitalize=function(){
    return function(input) {
        return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    };
};
adminFilter.formatByArray=function(){
    return function(input, array){
        return array.find(input);
    };
};
adminFilter.image=function(ConfigService){
    return function(input) {
        return ConfigService.cdn + input;
    };
};

adminFilter.service_name=function($rootScope){
    return function(input){

        var result="No Name";
        if(input.name && input.name!==""){result=input.name;}
        else{
         
            var temp=_.find($rootScope.services, function(o){
                return o._id===input.id_name;
            }); 
    
            if(temp){
                result=temp.name;
            }
        }
     
       

        return result;
    }
}