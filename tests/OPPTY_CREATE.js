let util = require("../utils/util.js");
module.exports = {
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