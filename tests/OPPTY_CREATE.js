let util = require("../utils/util.js");
let input = require("../utils/input");
module.exports = {
 'login_create' : function(browser,type="normal"){
    util.launchHome(browser,"sugarf6@tst.ibm.com","Welcome2ibm");
    util.createOppty(browser,type);
 },
 'Create_Oppty' : function(browser) {
     var Item = input.Opportunity_1;
     util.create_Oppty(browser,Item);
 }
}