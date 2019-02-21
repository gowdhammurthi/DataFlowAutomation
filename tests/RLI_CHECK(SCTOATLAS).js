let util = require("../utils/util.js");
let lib = require("../utils/svt_lib.js");
let input = require("../utils/input.js");
const checker = "div[id^='panel_bodyview'] > div:nth-child(6) > div:nth-child(2) > span.normal.index > span > div";
const time_out =1000;
let fs = require('fs');
var x,y;
module.exports = {
 'loginfind' : function(browser){
    util.launchHome(browser,"sugarf6@tst.ibm.com","Welcome2ibm");
 },
    
'Pencil edit' : function(browser){ 
      util.viewRli(browser,"Regression12");
      util.editRecord(browser)
},
'On pencil Select Lost sales stage and verify if Lost category is displayed' : function(browser){
    browser
      .execute(function(){window.open('')})
      .windowHandles(function(result) {
         browser
         .switchWindow(result.value[1])
         .url("https://svt4sugarlb01a.rtp.raleigh.ibm.com/sales/salesconnect/#ibm_RevenueLineItems/soc-5184-304e-11e9-bd38-06684e9a08fe")
         .waitForElementVisible(lib.RLI.edit,time_out*40)
        })
      for(var i=1;i<7;i++){
       util.click(browser,lib.RLI.edit);
       util.click(browser,lib.RLI.product)
       util.select_drop(browser,lib.RLI.product,1,input.products[i]);
       util.click(browser,lib.RLI.save)
       for(var j=2;j<input.typecount[i];j++){
        util.click(browser,lib.RLI.edit);
        util.click(browser,lib.RLI.type);
        util.select_drop(browser,lib.RLI.type,j+1);
        if(i==1 && j==2){
          util.click(browser,lib.RLI.ContractExtension.showmore);
          util.click(browser,lib.RLI.ContractExtension.status);
          util.select_drop(browser,lib.RLI.ContractExtension.status,1,"e")
          util.click(browser,lib.RLI.ContractExtension.reasonForloss)
          util.select_drop(browser,lib.RLI.ContractExtension.reasonForloss,2)
              .setValue(lib.RLI.ContractExtension.expTcv,"80000")
              .setValue(lib.RLI.ContractExtension.date,"08/11/2019")
          util.click(browser,lib.RLI.ContractExtension.reason);
          util.select_drop(browser,lib.RLI.ContractExtension.reason,2);
         }
        util.click(browser,lib.RLI.save)
            .waitForElementVisible(lib.login.alertButton,time_out*5)
            .getText(lib.login.alertmessage,(result)=>{
                  console.log(result.value);
            })
            .windowHandles(function(result) {
             browser
              .switchWindow(result.value[0])
            })
            .refresh()
            .waitForElementVisible(checker,time_out*10)
            browser
             .getText(checker,(result)=>{
                   var x = result.value;
                   fs.appendFile('temp.txt',x+"\n", function(err, data){
                           if (err) console.log(err);
                             console.log("Successfully Written to File.");
                               });
                   })
            .windowHandles(function(result) {
              browser
              .switchWindow(result.value[1])
            })  
         }}
       }
  }
