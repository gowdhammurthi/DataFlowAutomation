let util = require("../utils/util.js");
let lib = require("../utils/lib.js");
const time_out =1000;
module.exports = {
 'loginfind' : function(browser){
    util.launchHome(browser,"sugarf6@tst.ibm.com","Welcome2ibm");
 },
    
'Pencil edit' : function(browser){ 
      util.viewRli(browser,"Reg1234");
      util.editRecord(browser);
},
'On pencil Select Lost sales stage and verify if Lost category is displayed' : function(browser){
      util.VerifySalesStage(browser,6,"pencil");
      var values = [
      ['Superior demo, ease of use', 
      'Superior pricing', 
      'Superior terms', 
      'Superior functionality', 
      'Integrated solution, comprehensive suite', 
      'Better relationship with customer'],
      ['Business priority changed', 
      'Client took “in-house”', 
      'Delayed indefinitely', 
      'New client management',  
      'Required funding not avail'],
      ['Bid resources not available',
      'Duplicate opportunity', 
      'Entered in Error', 
      'Too old to pursue', 
      'Client unresponsive to our efforts', 
      'Low odds of winning', 
      'Low priority vs other deals']];
    var fs = require('fs');
    browser
      .execute(function(){window.open('')})
      .windowHandles(function(result) {
         browser
         .switchWindow(result.value[1]);
      })
      .url("https://svt4sugarlb01a.rtp.raleigh.ibm.com/sales/salesconnect/#Opportunities/SOC-O904X9X")
      .waitForElementVisible("#Opportunities > div.record.oppty-main-tab.oppty-css-fix > div.record-main-tab > div > div:nth-child(2) > div > div:nth-child(2) > div > span.normal.index > span > div > span:nth-child(1) > div",time_out*40)
      for(var i=0;i<3;i++){
       for(var j=0;j<values[i].length;j++){
          browser
          .windowHandles(function(result) {
            browser
            .switchWindow(result.value[0]);
         })
          util.VerifyLostCategory(browser,2+i,"pencil");
          util.VerifyReasonLost(browser,2+j,"pencil");
          util.click(browser,lib.test_save)
          .windowHandles(function(result) {
            browser
            .switchWindow(result.value[1])
             .refresh()
             .waitForElementVisible("#Opportunities > div.record.oppty-main-tab.oppty-css-fix > div.record-main-tab > div > div:nth-child(2) > div > div:nth-child(2) > div > span.normal.index > span > div > span:nth-child(1) > div",time_out*10)
             .getText("#Opportunities > div.record.oppty-main-tab.oppty-css-fix > div.record-main-tab > div > div:nth-child(2) > div > div:nth-child(2) > div > span.normal.index > span > div > span:nth-child(1) > div",(result)=>{
                   var x = result.value;
                   var y =x.substring(0,2);
                   fs.appendFile('temp.txt', "\n"+y, function(err, data){
                           if (err) console.log(err);
                             console.log("Successfully Written to File.");
                               });
                   })
            })  
         }
       }
  }
}