var imgLogo = chrome.extension.getURL("logo.png");
var variant = "";
var prodName = "";
var varCode = "";
var saleTime = "";
var eid = "";

if(parseInt(Date.now()/1000)-localStorage.bookingTime >900){
    localStorage.bookingStarted = 0;
}

// Something's not right. Please try again.

function checkForOOS(){
    if(document.querySelectorAll('._3hgEev').length > 0 && (document.querySelectorAll('._3hgEev')[0].innerText.split('Out Of Stock').length>1 || document.querySelectorAll('._3hgEev')[0].innerText.split('try again').length>1)){
      if(!document.getElementById('pop-alert-ams')){
            $('body').append('<div id="pop-alert-ams" class="hk-green" style="display:block;height:150px!important;"><div id="p-logo"><img src="' + imgLogo + '"></div><div id="p-msg"><a target="_blank" style="text-decoration:none;color:white;font-size:14px;font-family:calibri" href="https://compare.buyhatke.com/options/#mi-details"><p>Product is already added in your cart.Don\'t close this tab. We are refreshing to check when it would be in stock. As soon as it is in stock you can checkout.</a></p></div></div></div>'); 
          }
          else {
            $('#pop-alert-ams').html('<div id="p-logo"><img src="' + imgLogo + '"></div><div id="p-msg"><a target="_blank" style="text-decoration:none;color:white;font-size:14px;font-family:calibri" href="https://compare.buyhatke.com/options/#mi-details"><p>Product is already added in your cart.Don\'t close this tab. We are refreshing to check when it would be in stock. As soon as it is in stock you can checkout.</a></p></div></div>'); 
          }
             setTimeout(function(){window.location.reload();},5000);
         }
     else {
        setTimeout(function(){checkForOOS();},1000);
     }
}

if(window.location.href.split("/checkout/init").length>1){
     if(localStorage.bookingStarted==1){
         checkForOOS();
         
     }
}

if(getPID()!=""){
    switch(getPID()){
       case "MOBEZWXESCPGF3GZ":
         prodName = getProd();
         varCode = "f118";
         eid = "LSTMOBEZWXESCPGF3GZ7OIFQS";
         break;

       case "MOBEZWXENJA6PKFM":
         prodName = getProd();
         varCode = "f117";
         eid = "LSTMOBEZWXENJA6PKFMHVLIX8";
         break;

       case "TVSF2BVARHHNNGZG":
         prodName = getProd();
         varCode = "f116";
         eid = "LSTTVSF2BVARHHNNGZGF45N0U";
         break;

       case "MOBF28FTQPHUPX83":
         prodName = getProd();
         varCode = "f115";
         eid = "LSTMOBF28FTQPHUPX83H7IIOZ";
         break;

       case "MOBF28FTHZYYGXFY":
         prodName = getProd();
         varCode = "f114";
         eid = "LSTMOBF28FTHZYYGXFYRE2WTC";
         break;

       case "MOBF28FTXZYZ6UYJ":
         prodName = getProd();
         varCode = "f113";
         eid = "LSTMOBF28FTXZYZ6UYJSQJJLU";
         break;

       case "MOBF28FTGXFYNXX2":
         prodName = getProd();
         varCode = "f112";
         eid = "LSTMOBF28FTGXFYNXX2RKBHLZ";
         break;

        case "MOBF28FTHEP6NDYB": 
         prodName = getProd();
         varCode = "f111";
         eid = "LSTMOBF28FTHEP6NDYBDVDLFX";
         break;

       case "MOBF28FTQYA9BFW5":
         prodName = getProd();
         varCode = "f110";
         eid = "LSTMOBF28FTQYA9BFW5XJRGOI";
         break;
    }
}

if(varCode!=""){
    getTime(varCode);
}

function getTime(varCode){
   var jsonArr = [{'sendStartTime': varCode}];
   jsonArr = JSON.stringify(jsonArr);
   var passBack = [];
   passBack['code'] = varCode;
   passBack = JSON.stringify(passBack);
   sendMessage(0, jsonArr, 0, startAutoBook, passBack);
 }

var refreshedOnce = 0;

function post(path, params, method) {
    localStorage.bookingStarted = 1;
    localStorage.bookingTime = parseInt(Date.now()/1000);
    method = method || "post"; 
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
         }
    }

    document.body.appendChild(form);
    form.submit();
    
}

function addToCart(){
  var data = {};
  data['domain'] = "physical";
  data['eids'] = eid;
  data['otracker'] = "nmenu_sub_Appliances_0_Fully Automatic Top Load"; 
    post('/checkout/init', data, "post");
}


function startSale(){
  if(!document.getElementById('pop-alert-ams')){
      $('body').append('<div id="pop-alert-ams" class="hk-green" style="display:block;height:150px!important;"><div id="p-logo"><img src="' + imgLogo + '"></div><div id="p-msg"><a target="_blank" style="text-decoration:none;color:white;font-size:14px;font-family:calibri" href="https://compare.buyhatke.com/options/#mi-details"><p>We will add ' + prodName + ' to the cart as soon as it is available for sale. Make sure you system timing is correct. Match it with http://bit.ly/2sEtPIP <br>Time Remaining : <span id="ourTimer"></span></a></p></div></div></div>'); 
    }
    else {
      $('#pop-alert-ams').html('<div id="p-logo"><img src="' + imgLogo + '"></div><div id="p-msg"><a target="_blank" style="text-decoration:none;color:white;font-size:14px;font-family:calibri" href="https://compare.buyhatke.com/options/#mi-details"><p>We will add ' + prodName + ' to the cart as soon as it is available for sale. Make sure you system timing is correct. Match it with http://bit.ly/2sEtPIP <br>Time Remaining : <span id="ourTimer"></span></a></p></div></div>');
    }
      timer = setInterval(function(){
          var timeRemaining = Math.floor(Date.now() / 1000) - saleTime;
          if(timeRemaining >= 0 && timeRemaining < 3600){
             addToCart();
             clearInterval(timer);
             if(localStorage[varCode]==undefined){
               localStorage[varCode] =1;
             }
             else {
               localStorage[varCode] = 1 + parseInt(localStorage[varCode]);
             }
          }
          else {
            timeRemaining = -1*timeRemaining;
            if(timeRemaining < 3 && refreshedOnce==0){
               
            }
            var hours = Math.floor(timeRemaining/3600);
            var remTime = timeRemaining - hours*3600;
            var minRemain = Math.floor(remTime/60);
            remTime = remTime - minRemain*60;
            if(hours < 10){
               hours = '0' + hours;
            }
            if(minRemain < 10){
               minRemain = '0' + minRemain;
            }
            if(remTime < 10){
               remTime = '0' + remTime;
            }
            document.getElementById('ourTimer').innerText = hours + ":" + minRemain + ":" + remTime;
          }
      },200);  
}

function startAutoBook(data, passBack){
	console.log("Data Received " + data);
	
  // data = 1499086086;
  saleTime = data - 10;
	if(data!=0){
		// passBack = JSON.parse(passBack);
		var currentTime = Math.floor(Date.now() / 1000);
		if(data - currentTime > 3600){
			  // More than 1 hr. Ask to subscribe/check already subscribed
			 // sale over - nothing to do 
			 // console.log("Case 1");
			 checkSubscription(passBack);
		}
		else if(data - currentTime > 0 || (currentTime - data > 0 && currentTime - data < 3600)){

				// console.log("Case 2");
			  //  Ask for variant. Focus on sale
        if(localStorage[varCode]==undefined || localStorage[varCode]<=10){
            startSale();
        }
		}
		else if(currentTime - data >0){
			 // sale over - nothing to do 
			 // console.log("Case 3");
			 // checkSubscription(passBack);
		}
	}
}

function timeConverter(t) {     
   var a = new Date(t * 1000);
    var today = new Date();
    var yesterday = new Date(Date.now() - 86400000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    if(min<10){
    	min = '0' + min;
    }
    if(hour >=12){
    	var last = "PM";
    }
    else {
    	var last = "AM";
    }
    if (a.setHours(0,0,0,0) == today.setHours(0,0,0,0))
        return 'today, ' + hour + ':' + min + " " + last;
    else if (a.setHours(0,0,0,0) == yesterday.setHours(0,0,0,0))
        return 'yesterday, ' + hour + ':' + min + " " + last;
    else if (year == today.getFullYear())
        return date + ' ' + month + ', ' + hour + ':' + min + " " + last;
    else
        return date + ' ' + month + ' ' + year + ', ' + hour + ':' + min + " " + last;
}

function checkSubscription(passBack){
	var passBack = JSON.parse(passBack);
	var jsonArr = [{'checkSubscription': varCode}];
   jsonArr = JSON.stringify(jsonArr);
   var passBack = [];
   passBack = JSON.stringify(passBack);
   sendMessage(0, jsonArr, 0, showSubsMessage, passBack);
}


function showSubsMessage(data, passBack){
	if(data==1){
      // console.log("FOund subscribed");
      if(!document.getElementById('pop-alert-ams')){
      $('body').append('<div id="pop-alert-ams" class="hk-green" style="display:block;height:120px!important;color:white;font-size:1em;font-family:calibri"><a target="_blank" style="text-decoration:none;color:white;font-size:1em;font-family:calibri" href="https://compare.buyhatke.com/options/#mi-details"><div id="p-logo"><img src="' + imgLogo + '"></div><div id="p-msg"><p>You are subscribed to ' + prodName + ' Flash Sale starting  ' + timeConverter(saleTime) + '.&nbsp;&nbsp;<br> We will open the page automatically at sale time and book it for you.</p></div></div></a></div>');
    }
    else {
      $('#pop-alert-ams').html('<a target="_blank" style="text-decoration:none;color:white;font-size:1em;font-family:calibri" href="https://compare.buyhatke.com/options/#mi-details"><div id="p-logo"><img src="' + imgLogo + '"></div><div id="p-msg"><p>You are subscribed to ' + prodName + ' Flash Sale starting  ' + timeConverter(saleTime) + '.&nbsp;&nbsp;<br> We will open the page automatically at sale time and book it for you.</p></div></div></a>');
    }
	}
	else {
	  // console.log("Found unsuscribed");
	  // a = "what about this";
    if(!document.getElementById('pop-alert-ams')){
	  $('body').append('<div id="pop-alert-ams" class="hk-green" style="display:block;height:180px!important;color:white;font-size:1em;font-family:calibri"><div id="p-logo"><img src="' + imgLogo + '"></div><div id="p-msg"><a id="subscribeNow" target="_blank" style="text-decoration:none;color:white;font-size:1em;font-family:calibri" href="https://compare.buyhatke.com/options/#mi-details"><p>Click me to subscribe to autobook ' + prodName + ' during flash Sale starting  ' + timeConverter(saleTime) + '.&nbsp;&nbsp;<br> We will open the page automatically at sale time and book it for you.</p></a><a href="http://bit.ly/2sjz41k" style="text-decoration:none;color:white;font-size:13px;font-family:calibri" target="_blank">Now that I have got your attention, why not let us know how we can improve your shopping experience. Tap here to rate us.  </a></div></div></div>');
  }
  else {
     $('#pop-alert-ams').html('<a id="subscribeNow" target="_blank" style="text-decoration:none;color:white;font-size:1em;font-family:calibri" href="https://compare.buyhatke.com/options/#mi-details"><div id="p-logo"><img src="' + imgLogo + '"></div><div id="p-msg"><p>Click me to subscribe to autobook ' + prodName + ' during flash Sale starting  ' + timeConverter(saleTime) + '.&nbsp;&nbsp;<br> We will open the page automatically at sale time and book it for you.</p></div></div></a>');
  }
	}
}



