let lib = require("./lib.js");
const time_out = 1000;
module.exports = {
    
    "launchHome": function(browser,username,password) {
         browser
                  .url("https://ibmatlas-dev01.sugarondemand.com/")
                  .windowMaximize()
                  .waitForElementVisible(lib.login.button,time_out*2)
                  .click(lib.login.button)
                  .waitForElementVisible(lib.login.user,time_out)
                  .waitForElementVisible(lib.login.pass,time_out)
                  .waitForElementVisible(lib.login.signin,time_out)
                  .setValue(lib.login.user,username)
                  .setValue(lib.login.pass,password)   
                  .click(lib.login.signin)
                  .expect.element(lib.login.dash).text.to.equal('IBM Seller Dashboard').before(time_out*40);
                 this.handleAlerts(browser); 
        return browser;
    },
    "handleAlerts" : function(browser){
        browser.execute(function(){var elementExists = document.querySelector("#alerts > div > div > button");
                                   if(elementExists!=null)
                                   {
                                    
                                   elementExists.click(); 
                                   }});
        return browser;
    },
    "viewRli" : function(browser,val){
        browser
        .click(lib.rli.dropdown)
        .click(lib.rli.view)
        .setValue(lib.rli.search,val)
        .waitForElementVisible(lib.rli.firstchild,time_out*10)
     return browser;
    },
    "svt4" : function(browser,val){
      browser 
        .click(lib.dropdown)
        .waitForElementVisible(lib.view,time_out)
        .click(lib.view)
        .setValue(lib.search,val)
        .pause(time_out*10)
        .click(lib.firstchild)
     return browser;

    },
    "createOppty" : function(browser,type="normal"){
      if(type=="normal"){
        browser
        .assert.containsText(lib.oppty.header,"Opportunities")
        .click(lib.oppty.drop)
        .click(lib.oppty.create)
      }
      else if(type ==  "quick") {
       this.click(browser,lib.Quick_create);
       this.click(browser,lib.oppty.q_create);
      }
      else{
          this.click(browser,lib.oppty.straight);
          this.click(browser,lib.oppty.straight_create);
      }
     return browser;

    },
    "create_Oppty" : function(browser,Item_op,search,type="not_rli"){
        browser    
            .setValue(lib.oppty.name,Item_op.name);
        this.click(browser,lib.oppty.acc_name);
        this.select_drop(browser,lib.oppty.acc_name,1,Item_op.acc_name);
        this.click(browser,lib.oppty.lead_name);
        this.select_drop(browser,lib.oppty.lead_name,1,Item_op.lead_name);
        if(type=="not_rli"){
        browser
          .setValue(lib.oppty.rli.name,Item_op.rli_name);
        this.click(browser,lib.oppty.rli.product);
        if(search){
            this.select_drop(browser,lib.oppty.rli.product,1);
            this.click(browser,lib.oppty.rli.filter);
            this.select_drop(browser,lib.oppty.rli.filter,1);
            this.click(browser,lib.oppty.rli.drop_1);
            this.select_drop(browser,lib.oppty.rli.drop_1,1);
            this.click(browser,lib.oppty.rli.drop_2);
            this.select_drop(browser,lib.oppty.rli.drop_2,2)
              .setValue(lib.oppty.rli.input,Item_op.product)
              .waitForElementVisible(lib.oppty.rli.result)
              .assert.containsText(lib.oppty.rli.result,Item_op.product)
            this.click(browser,lib.oppty.rli.result);

        }
        else{this.select_drop(browser,lib.oppty.rli.product,1,Item_op.product)
            .setValue(lib.oppty.rli.date,Item_op.date)

        }
        browser
          .setValue(lib.oppty.rli.amt,Item_op.amount);
        this.click(browser,lib.oppty.rli.type);
        this.select_drop(browser,lib.oppty.rli.type,1,Item_op.type)
          .setValue(lib.oppty.rli.competitor,Item_op.competitor);
        this.click(browser,lib.oppty.rli.competitor_click);
        }
        this.click(browser,lib.oppty.save)
            .waitForElementVisible(lib.login.alertmessage,time_out*5)
            .getText(lib.login.alertmessage,(result)=>{
                    console.log(result.value);
            });
        this.handleAlerts(browser);
     return browser;
    },
    "edit_selectProduct" : function(browser,item){
        browser
         .waitForElementVisible(lib.rli.edit,5*time_out);
        this.click(browser,lib.rli.edit);
        this.click(browser,lib.rli.product_pencil);
        this.click(browser,lib.rli.product_searchselect);
        this.click(browser,lib.oppty.rli.filter);
        this.select_drop(browser,lib.oppty.rli.filter,1);
        this.click(browser,lib.oppty.rli.drop_1);
        this.select_drop(browser,lib.oppty.rli.drop_1,1);
        this.click(browser,lib.oppty.rli.drop_2);
        this.select_drop(browser,lib.oppty.rli.drop_2,2)
          .setValue(lib.oppty.rli.input,item)
          .waitForElementVisible("#ProductTemplates_select_"+item,2*time_out)
        this.click(browser,"#ProductTemplates_select_"+item)
        this.click(browser,lib.test_save)
            .waitForElementVisible(lib.login.alertmessage,time_out*5)
            .getText(lib.login.alertmessage,(result)=>{
                    console.log(result.value);
            });
       this.handleAlerts(browser);
        return browser;
    },
    "edit_type": function(browser,num){
        browser
         .waitForElementVisible(lib.rli.edit,5*time_out);
        this.click(browser,lib.rli.edit);
        this.click(browser,lib.rli.contract);
        this.select_drop(browser,lib.rli.contract,num);
        this.click(browser,lib.test_save)
            .waitForElementVisible(lib.login.alertmessage,time_out*5)
            .getText(lib.login.alertmessage,(result)=>{
                    console.log(result.value);
            });
        this.handleAlerts(browser);
        return browser;
    },
    "editRecord" : function(browser,type="null"){
        browser
            .click(lib.rli.firstchild);
        this.handleAlerts(browser);
            
                if(type == "normal"){
                    browser
                    .click(lib.rli.edit);
                }
                else {
                 if(type == "action"){
                    browser
                    .click(lib.rli.action_drop)  
                    .click(lib.rli.action_edit)
                 }
                 else
                 {}
                }
           
       return browser;
    },
    "assert_categories_select" : function(browser,drop,i,n,list,num){
        browser
            .getAttribute(drop,"id",function(result){
                var y = result.value;
                var x = y.substring(15,y.length);
            browser
                .pause(time_out);
            for(var j =i; j <= n; j++){
               browser
               .expect.element("ul[id='select2-results-"+x+"'] > li:nth-child("+j+") > div").text.to.equal(list[j-i]);
              }
               browser
                 .click("#select2-results-"+x+" > li:nth-child("+num+")");
            });
        return browser;
    },
    "click" : function(browser, here){
           browser
              .waitForElementVisible(here,time_out*1.5)
              .click(here);
           return browser;
    },
    "select_drop" : function(browser, item, num,keys='false'){
        if(keys!='false'){ 
        browser
            .keys(keys)
            .pause(time_out*5);
        }
        browser
            .getAttribute(item,"id",function(result){
                var y = result.value;
                var x = y.substring(15,y.length);
                browser
                .pause(time_out*2)
                 .click("#select2-results-"+x+" > li:nth-child("+num+")");
            })
        return browser;
    },
   "VerifySalesStage" : function(browser,num ,type = "normal"){
        browser 
          .assert.containsText(lib.rli.sales_stage,"Sales Stage");
        switch(type){
            case "normal" : {this.click(browser,lib.rli.lost);
                             this.select_drop(browser,lib.rli.lost,num)
                                    .waitForElementVisible(lib.rli.lost_category,2000)
                                  //  .assert.attributeContains(lib.rli.lost_category,"data-name","lost_category_c"); 
                                break;}
            case "action" : {this.select_drop(browser,lib.rli.action_lost,num);
                                break;}
            case "pencil" : {this.click(browser,lib.rli.sales_pencil); 
                             this.select_drop(browser,lib.rli.lost,num)
                                    .waitForElementVisible(lib.rli.lost_category,2000)
                                  //  .assert.attributeContains(lib.rli.lost_category,"data-name","lost_category_c");
                                break;}
            default : {break;}
        }
    
         return browser;
   },
   "VerifyLostCategory" : function(browser,num,type="normal"){
        var lostcategory = [
            "Lost to competition" ,
            "Customer did not pursue",
            "IBM did not pursue"
        ];
        switch(type){
            case "normal" : {this.click(browser,lib.rli.lost_cat);
                             this.assert_categories_select(browser,lib.rli.lost_cat,2,4,lostcategory,num);
                             break;}
            case "action" : {this.click(browser,lib.rli.action_lostcat_span);
                             this.assert_categories_select(browser,lib.rli.action_lostcat,2,4,lostcategory,num);
                             break;}
            case "pencil" : {this.click(browser,lib.rli.lost_pencil); 
                             this.assert_categories_select(browser,lib.rli.lost_cat,2,4,lostcategory,num)
                                .getText(lib.rli.lostvalue,function(result){
                                                    lost = result.value;
                                });
                             break;}
            default : {break;}
       }
         return browser;
    },
   "VerifyReasonLost" : function(browser,num,type="normal"){
        browser
       // .assert.attributeContains(lib.rli.reason_lost,"data-name","reason_lost_c");
        switch(type){
            case "normal" : {this.click(browser,lib.rli.rea_los); 
                             this.select_drop(browser,lib.rli.rea_los,num);
                            break;}
            case "action" : {this.click(browser,lib.rli.action_rea_los_span);
                             this.select_drop(browser,lib.rli.action_rea_los,num);
                            break;}
            case "pencil" : {this.click(browser,lib.rli.reason_pencil);
                             this.select_drop(browser,lib.rli.rea_los,num)
                                .getText(lib.rli.reasonvalue,(result) => {
                                        reason = result.value;
                                }); 
                            break;}
            default : {break;}
        }
     return browser;
   }
}