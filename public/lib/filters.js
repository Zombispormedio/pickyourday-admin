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
