let util = require("../utils/util.js");
let lib = require("../utils/lib.js");
let input = require("../utils/input.js");
const checker = "#content > div > div > div.main-pane.span8 > div > div:nth-child(1) > div:nth-child(2) > div.record.tab-layout > div:nth-child(2) > div > div:nth-child(7) > div > span.normal.index > span > div";
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
         .switchWindow(result.value[1]);
      })
      .url("https://svt4sugarlb01a.rtp.raleigh.ibm.com/sales/salesconnect/#ibm_RevenueLineItems/soc-5184-304e-11e9-bd38-06684e9a08fe")
      .waitForElementVisible(checker,time_out*40)
    browser
      .windowHandles(function(result) {
        browser
        .switchWindow(result.value[0]);
     })
      for(var i=0;i<6;i++){
       util.edit_selectProduct(browser,input.products[i]);
       for(var j=0;j<7;j++){
          util.edit_type(browser,j+2)
          var x = input.ContractInput[j]+"\n";
          fs.appendFile('inputs.txt', x, function(err, data){
            if (err) console.log(err);
                });
          browser
          .windowHandles(function(result) {
            browser
             .switchWindow(result.value[1])
          })
          browser
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
              .switchWindow(result.value[0])
            })  
         }
       }
  }
}