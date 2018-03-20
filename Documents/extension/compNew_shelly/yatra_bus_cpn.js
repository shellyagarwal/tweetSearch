var arrayMsg = [];
var cur_url = window.location.href;
superPnr = "";
if(cur_url.split("?superPnr=").length > 1){
 superPnr = cur_url.split("?superPnr=");
 superPnr = superPnr[1];
 if(superPnr.split("#").length > 1){
  superPnr = superPnr.split("#")[0].trim();
}
if(superPnr.split("?").length > 1){
  superPnr = superPnr.split("?")[0].trim();
}
if(superPnr.split("&").length > 1){
  superPnr = superPnr.split("&")[0].trim();
}
if(superPnr.split("/").length > 1){
  superPnr = superPnr.split("/")[0].trim();
}
if(cur_url.split("secure.yatra.com/busview/busdesktop/paxDetails").length > 1 && superPnr != ""){
  if($("#promoText").length > 0 && $("#couponClick").length == 0){
    var selectorACIcon = "#promoText";
    var position = "before";
    var parent = "none";
    var method = "POST";
    var wedID = 17;
    var api = "https://secure.yatra.com/busview/busdesktop/partialValidate?promocode=**&superPnr="+superPnr+"&context=TRAVELLER";
    var postFields = {};
    var details = [{'postFields': postFields, "api": api, "method": method, "api_case": 1}];
    details = JSON.stringify(details);
    arrayMsg = [];
    displayACIcon(selectorACIcon, parent, position, wedID, details);
  }
} 
}

savings = [];
bestSaving = 0;
bestCoupon = "";
bestECoupon = "";
bestEcash = 0;
var deleteAC = 0;

function startSaving(data){
  data = JSON.parse(data);
  var nowCode = "";
  var nowSaving = "";
  var csaving = 0;
  var ecashsaving = 0;
  var resp = data[0].data;
  var code = data[0].code.trim();
  var cpnMsg = "";
  var couponAt = 1293;
  var savingsObject = {};
  nowCode = code;
  resp = JSON.parse(resp);
  respYatra = resp;
  if(resp != "" && code != ""){
    if(resp.success == "true"){
      if(resp.cashDiscount && resp.cashValue){
        csaving = resp.cashValue;
        csaving = filter_price(csaving);
      }
      if(resp.ecashDiscount && resp.ecashValue){
        ecashsaving = resp.ecashValue;
        ecashsaving = filter_price(ecashsaving);
      }
      if(isNaN(csaving)){
        csaving = 0
      }
      else if(csaving > bestSaving){
        bestSaving = csaving;
        bestCoupon = code;
      }
      if(isNaN(ecashsaving)){
        ecashsaving = 0
      }
      else if(ecashsaving > bestEcash){
        bestEcash = ecashsaving;
        bestECoupon = code;
      }
      if(resp.success){
        cpnMsg = "";
        arrayMsg.push([code, cpnMsg, couponAt]);
      }
    }
    else{
      if(resp.success == "false" && resp.failureMsg){
        cpnMsg = resp.failureMsg.trim();
        arrayMsg.push([code, encodeURIComponent(cpnMsg), couponAt]);
      }
    }
  }
  var savingsLen = savings.length;
  savingsObject["code"] = code;
  savingsObject["saving"] = csaving;
  savingsObject["ecash"] = ecashsaving;
  savings[savingsLen] = savingsObject;
  localStorage.savings = JSON.stringify(savings);
  displayEachCpnSaving(code, csaving, ecashsaving);
  doneSavingCheck++;
  if(doneSavingCheckFn() == 1){
    applyBestCoupon();
    if(localStorage.anaSent!=1 && parseInt(bestSaving) != 0 && bestSaving!="" && !isNaN(parseInt(bestSaving))){
      localStorage.anaSent = 1;
      var host=window.location.host;
      var jsonArr = [{'type': 'finish1','website':host}];
      jsonArr = JSON.stringify(jsonArr);
      sendMessage(1, jsonArr,22,doNothing, []);
      tracer(1,4);
      setTimeout(function(){if(JSON.parse(features_json)[4]==0){ft(4);}},100);
    }
  }
  else{
    displayAutoSaving(bestSaving);
  }
}

var mainClick = 0;
var clcikedRemove = 0;
function applyBestCoupon(){
  if((parseInt(bestSaving) != 0 && bestCoupon.trim() != "") || (parseInt(bestEcash) != 0 && bestECoupon.trim() != "")){

    if(parseInt(bestSaving) != 0 && bestCoupon.trim() != ""){
      var applyBestCode = bestCoupon;
    }
    else{
      var applyBestCode = bestECoupon.trim();
      bestCoupon = bestECoupon;
      bestSaving = bestEcash;
    }
    if(document.getElementById("promoValidate").length > 0 && document.getElementById("promoValidate").getAttribute("value").toUpperCase().trim() == "REMOVE" && clcikedRemove == 0){
      document.getElementById("promoValidate").click();
      clcikedRemove = 1;
    }
    
    if($("#promoValidate").length > 0){
      document.getElementById("promoValidate").click();
      var s = document.createElement('script');
      s.src = chrome.extension.getURL('checkAngular.js');
      var idSelector = document.createElement("div");
      idSelector.id = "idSelectorHK";
      idSelector.innerText= "#promoText";

      var idCode =document.createElement("div");
      idCode.id = "idCodeHK";
      idCode.innerText= applyBestCode;

      var idClick = document.createElement("div");
      idClick.id = "idClickHK";
      idClick.innerText= "#promoValidate";

      s.onload = function(pincode) {
      };
      (document.head || document.documentElement).appendChild(s);
      (document.head || document.documentElement).appendChild(idSelector);
      (document.head || document.documentElement).appendChild(idCode);
      (document.head || document.documentElement).appendChild(idClick);
      displayFinalSavings();
    }
    else{
      setTimeout(applyBestCoupon, 1000);
    }

  }
  else{
    displayNoSavings();
  }

  if(deleteAC == 0){
    if(arrayMsg.length > 0 && arrayMsg.length != ""){
      arrayMsg = JSON.stringify(arrayMsg);
      var jsonArr = [{'cpn_msg': arrayMsg}];
      jsonArr = JSON.stringify(jsonArr);
    // console.log("cpn_msg JSON: "+jsonArr);
    deleteAC = 1;
    sendMessage(1, jsonArr, 12, doNothing, []);
    arrayMsg = [];
  }
}
}
