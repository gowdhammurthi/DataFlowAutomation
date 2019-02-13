let util = require("../utils/util.js");
let role = require("../utils/role.js");
let input = require("../utils/inputs.js")
let promisePass = role.calculate("sandbox");
   promisePass.then(function(result){
    user = result.username;
    pass = result.password;
  },function(err) {
    console.log(err);
    throw new Error("Unknown user");
   });
module.exports = {
   '@disabled' : true,
 'login_create' : function(browser,type="normal"){
    util.launchHome(browser,"sugarf6@tst.ibm.com","Welcome2ibm");
    util.createOppty(browser,type);
 },
 'Create_Oppty' : function(browser) {
     var Item = {
      name : 'Regression12',
      acc_name : 'a',
      lead_name : 'b',
      rli_name : 'Reg1234',
      product : 'Do not use - gpp gsb4',
      date : "08.11.2018",
      amount : '70000',
      type : 'new',
      competitor : 'Abea'

     }
     util.create_Oppty(browser,Item);
 }
}