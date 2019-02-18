let util = require("../utils/svt_util")
module.exports = {
   "@disabled" : true,
    "login" : function(browser){
        util.launch_svt4(browser,"sugarf6@tst.ibm.com","Welcome2ibm");
        var I = {
           name : "Test",
           primary_contact: "Fran",
           client_name : "Fran",
           source : "b",
           product : "BYS99",
           amount : "6789",
           contract : 1
        }

        util.createOppty(browser,I);
     }
}