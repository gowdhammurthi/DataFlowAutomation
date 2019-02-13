const csvFilePath='./utils/roles_info.csv'
const csv=require('csvtojson');
var user,pass;
module.exports = {'calculate' : function(id){return new Promise (function(resolve,reject){
       csv()
       .fromFile(csvFilePath)
        .then((jsonObj)=>{ 
                        var output = jsonObj.find(element => {
                          return element.id == id ;
                           })
                            if(output)
                                {resolve(output)
                                   }
                            else
                               {
                                  reject("Not found")
                                  }
                               })
    })}}