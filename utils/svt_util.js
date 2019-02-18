let svt_lib = require("../utils/svt_lib");
const time_out = 1000;
let util = require("../utils/util");
var name;
module.exports ={
  
    "launch_svt4": function(browser,username,password){
        browser
                  .url("https://svt4sugarlb01a.rtp.raleigh.ibm.com/sales/salesconnect/")
                  .windowMaximize()
                  .waitForElementVisible(svt_lib.login.username,time_out)
                  .waitForElementVisible(svt_lib.login.password,time_out)
                  .waitForElementVisible(svt_lib.login.signin,time_out)
                  .setValue(svt_lib.login.username,username)
                  .setValue(svt_lib.login.password,password)   
                  .click(svt_lib.login.signin)
                  .waitForElementVisible(svt_lib.oppty.drop,time_out*40);
        return browser;
    },
    "createOppty" : function(browser,Item){
      browser
           .pause(time_out*2)
        util.click(browser,svt_lib.oppty.drop);
        util.click(browser,svt_lib.oppty.create)
         .setValue(svt_lib.oppty.description,Item.name);
        util.click(browser,svt_lib.oppty.primary_contact);
        util.select_drop(browser,svt_lib.oppty.primary_contact,1,Item.primary_contact);
        util.click(browser,svt_lib.oppty.client_name);
        util.select_drop(browser,svt_lib.oppty.client_name,1,Item.client_name);
        util.click(browser,svt_lib.oppty.source);
        util.select_drop(browser,svt_lib.oppty.source,1,Item.source);
        util.click(browser,svt_lib.oppty.product);
        util.select_drop(browser,svt_lib.oppty.product,1,Item.product)
          .pause(time_out*3)
          .setValue(svt_lib.oppty.amount,Item.amount);
        util.click(browser,svt_lib.oppty.contract);
        util.select_drop(browser,svt_lib.oppty.contract,Item.contract);
        util.click(browser,svt_lib.oppty.competitor);
        util.click(browser,svt_lib.oppty.competitor_select);//edit in lib for changes
        util.click(browser,svt_lib.oppty.save)
          .pause(time_out*5)
          .waitForElementVisible(svt_lib.oppty.out,time_out*5)
          .getText(svt_lib.oppty.out,(result)=>{
              name = result.value;
              console.log(result.value);
          })
    }
 }