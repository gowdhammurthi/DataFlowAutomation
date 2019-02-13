let util = require("../utils/util.js");
let lib = require("../utils/lib.js");
let role = require("../utils/role.js");
let inputs = require("../utils/inputs.js");
var lost,reason;
let promisePass = role.calculate("seller");
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
    util.launchHome(browser,user,pass);
    util.createRli(browser,type);
    return browser;
  },
 'Select Lost sales stage and verify if Lost category is displayed' : ""+function(browser){
    util.VerifySalesStage(browser,6);
  },
 'Click on the Lost category and verify':""+function(browser){
    util.VerifyLostCategory(browser,2); 
  },
  'verify if  Reason Lost field is displayed':""+function(browser){
    util.VerifyReasonLost(browser,2);
    util.click(browser,"#drawers > div > div > div.main-pane.span8 > div:nth-child(1) > div > div.headerpane > h1 > div > span:nth-child(1) > a");

  },
  'all mandatory fields and click on save button':""+function(browser){  
    var Item = JSON.parse(inputs.Rli);
    var Item_info = JSON.parse(inputs.RLI_Oppor)
    util.create_rev(browser,Item,Item_info);
  },
  'Button edit' : function(browser){   
        util.viewRli(browser,"Regression12");
        util.editRecord(browser,"normal")
          .getText(lib.rli.lostvalue,function(result){
             lost = result.value;
            })
          .getText(lib.rli.reasonvalue,(result) => {
              reason = result.value;
            });
        return browser;
   },
  'On edit Select Lost sales stage and verify if Lost category is displayed':""+function(browser){
            util.VerifySalesStage(browser,6);
   },
  'On edit Click on the Lost category and verify': ""+function(browser){
            util.VerifyLostCategory(browser,3);
   },
  'On edit verify if  Reason Lost field is displayed':""+function(browser){
            util.VerifyReasonLost(browser,3);
   },
   'Cancelling and checking' : ""+function(browser){
        util.check(browser,lib.rli.cancel,lost,reason);
   },
   'Action edit' : ""+function(browser){
            util.viewRli(browser,"Regression12");
            util.editRecord(browser,"action")
            .getText(lib.rli.action_lostcat,function(result){
                lost = result.value;
                }) 
            .getText(lib.rli.action_rea_los,(result) => {
                reason = result.value;
            });
    },
    'On action Select Lost sales stage and verify if Lost category is displayed_3' : ""+function(browser){
             util.VerifySalesStage(browser,6,"action");
     },  
    'On action Click on the Lost category and verify_3':""+function(browser){
             util.VerifyLostCategory(browser,3,"action");
     },
    'On action verify if  Reason Lost field is displayed_3':""+function(browser){
             util.VerifyReasonLost(browser,3,"action");
     },
    'Action Cancelling and checking' : ""+function(browser){
            util.check(browser,lib.rli.action_cancel,lost,reason);
     },
    'Pencil edit' : function(browser){ 
            util.viewRli(browser,"Regression12");
            util.editRecord(browser);
     },
    'On pencil Select Lost sales stage and verify if Lost category is displayed' : function(browser){
            util.VerifySalesStage(browser,6,"pencil");
     },
    'On pencil Click on the Lost category and verify':function(browser,num = 3){
            util.VerifyLostCategory(browser,3,"pencil");
     },
    'On pencil verify if  Reason Lost field is displayed':function(browser,num =2){
            util.VerifyReasonLost(browser,3,"pencil");
     }, 
    'Pencil saving and checking' : function(browser){
            util.getLostReason((result) =>{
               util.check(browser,lib.rli.saves,result[0],result[1]);
      })
     },
    'logout' : function(browser){
            util.logout(browser);
    }
}

