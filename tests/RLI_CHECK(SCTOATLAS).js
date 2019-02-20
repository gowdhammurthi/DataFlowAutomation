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
    // browser
    //   .windowHandles(function(result) {
    //     browser
    //     .switchWindow(result.value[0]);
    //  })
      for(var i=0;i<7;i++){
       util.click(browser,lib.RLI.edit);
       util.click(browser,lib.RLI.product)
       util.select_drop(browser,lib.RLI.product,1,input.products[i]);
       util.click(browser,lib.RLI.save)
       for(var j=0;j<input.typecount[i];j++){
         if(i==1 && j==2){}else{
          util.click(browser,lib.RLI.edit);
          util.click(browser,lib.RLI.type);
          util.select_drop(browser,lib.RLI.type,j+1);
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
}