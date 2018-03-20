var alertPosition = 57;

function sendTrack(){
  var prod = getProd();
  var webID = getCurrentPosition(window.location.href);
  var url = window.location.href;
  url = encodeURIComponent(url);
  prod = encodeURIComponent(prod);
  if(prod!=""){
    var jsonArr = [{'prod': prod, 'url': url, 'webID': webID, 'isBook': 0 }];
    jsonArr = JSON.stringify(jsonArr);
    sendMessage(1, jsonArr, 11, doNothing, []);
  }
}

sendTrack();


pidFlipkart = getPID();
// prod = getProd();
var selector = [];
selector.push({selector: '.product-essential', attr: 'none', pos: 'after'});
selector = JSON.stringify(selector);
height = "auto";
var passBack = [{selectors: selector, height: height}];
passBack = JSON.stringify(passBack);
addGraphBase(passBack);
// var passBack1 = [{title: prod, siteName: 'LensKart', price: getPrice()}];
// passBack1 = JSON.stringify(passBack1);
// prepareGraph(pidFlipkart, passBack1);


// var selector2 = [];
// selector2.push({selector: '.product-shop .price-compare:eq(0)', attr: 'none', pos: 'before'});
// selector2.push({selector: '.product-shop .row-fluid:eq(0)', attr: 'none', pos: 'after'});
// selector2 = JSON.stringify(selector2);
// setTimeout("checkAlertStatus(" + selector2 + ")", 4000);

var title = getProd();
var url = "http://compare.buyhatke.com/products/";
origProd = title;
title = title.split("(")[0];
var titleS = title.split(" ");
if(titleS.length<6){
  title = titleS.join("-");
}
else {
  title = titleS[0] + "-" + titleS[1] + "-" + titleS[2] + "-" + titleS[3] + "-" + titleS[4] + "-" + titleS[5];
}
var urlToFollow = url + title;
var imgURL2 = returnResource("watch-price1.png");


  // if($('.product-shop .purchase-type').length>0){
  //   $('.product-shop .purchase-type:eq(0)').after('<a target="_blank" title="Compare via Compare Hatke" href="' + urlToFollow + '" ><div class="buy_compare" style="padding: 10px 35px; color: #fff; background: #329C92; border: none; font-size: 12px; font-weight: bold; width: 30%;margin-left: 68px;display: inline-block;margin-top: 2px;text-align: center;">Compare Prices</div></a>');
  // }
  
  price = getPrice();
  origPrice = price;
  var final2send = urlToFollow.split("products/");
  var msgToSend = final2send[1] + "~*~*" + price;
  msgToSend = msgToSend + "&moreData=";
  sendSearchMessage(msgToSend, urlToFollow);

  function filterResults(data, url){
    if(data && data != null && data.trim() != "" && data != "null"){
      var results2 = JSON.parse(data);
      var message = results2;
      var results = message;
      results.sort(compare);
      var origPrice = getPrice();
      origProd = getProd();
    //console.log(origProd);
    var countArray = Array();
    for (var i = 0; i <= results.length - 1; i++) {
      var current = results[i].prod;
      countArray[i] = 0;
      currentArray = origProd.split(" ");
      var totalLen = currentArray.length;
      for(var k=0; k< currentArray.length; k++){
        if(current.toUpperCase().indexOf(currentArray[k].toUpperCase())!=-1){
          countArray[i] = countArray[i] + 1;
        }
      }
      results[i].score = countArray[i];
    }
    indexSelected = 0; notFound = 1;
    for(k=0; k< results.length; k++){
      if(results[k].score/totalLen > .5){
        indexSelected = k;
        notFound = 0;
        break;
      }
    }
    var posResults = [];
    posResults.push({selector: 'body', attr: 'none', pos: 'before'});
    posResults = JSON.stringify(posResults);
    var posSpecs = [];
    posSpecs.push({selector: 'body', attr: 'none', cssAttr: 'margin-top', preVal: '45px', postVal: '0px'});
    posSpecs = JSON.stringify(posSpecs);
    showResultsNew(results, indexSelected, posSpecs, posResults, url);
  }
}