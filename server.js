var express = require("express");
var C=require("./config/config.js");


var app=express();
//Configuracion
require(C.config+"express.js")(app);
var port=process.env.PORT || 5000;
app.set('port', port);

app.use("/", express.static(__dirname+"/public"));






app.listen(port, function(){
    console.log("Conectado: "+app.get("port"));
});








