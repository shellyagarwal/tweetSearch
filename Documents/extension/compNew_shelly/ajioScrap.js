var arrayMsg = [];
var arrayBest = [];
var couponAt = 2191;
function getPos(){
	return 2191;
}
function sendPairs(){
	arrayToSend = [];

	if($('.item').length > 0){
		var slider = $('.item');
		var sliderLength = slider.length;
		var link = "";
		var price;
		var PID;
		var prod = "";
		var image = "";
		var oos = 100;
		for(i=0;i<sliderLength;i++){
			price = "";
			PID = "";
			prod = "";
			image = "";
			oos = 100;
			if($('.item:eq('+ i +') a').length > 0 && $('.item:eq('+ i +') a').attr("href")){
				link = $('.item:eq('+ i +') a:eq(0)').attr('href');
				if(link != ""){
					if(link.split("ajio.com").length < 2){
						link = "www.ajio.com"+link;
						PID = returnPID(link);
					}
				}
				else{
					PID = "";
				}
			}
			if(PID != ""){
				if($('.item:eq('+ i +')').find('.contentHolder').length > 0){
					prod = $('.item:eq('+ i +')').find('.contentHolder:eq(0) .brand:eq(0)').text().trim();

					if($('.item:eq('+ i +')').find('.contentHolder:eq(0) .name').length > 0){
						prod = prod + " " +$('.item:eq('+ i +')').find('.contentHolder:eq(0) .name:eq(0)').text().trim();
					}
					prod = prod.trim();

				}
				if($('.item:eq('+ i +')').find('.imgHolder').length > 0 && $('.item:eq('+ i +')').find('.imgHolder:eq(0) img').length > 0 && $('.item:eq('+ i +')').find('.imgHolder:eq(0) img').attr("src")){
					image = $('.item:eq('+ i +')').find('.imgHolder:eq(0) img:eq(0)').attr("src");

					if(image != "" && image.split("ajio.com").length < 2){
						image = "https://www.ajio.com/"+image;
					}
				}

				if($('.item:eq('+ i +')').find('.contentHolder').length > 0 && $('.item:eq('+ i +')').find('.contentHolder:eq(0) .price').length > 0){
					price = $('.item:eq('+ i +')').find('.contentHolder:eq(0) .price:eq(0)').text();
					price = filter_price(price);
				}
				else if($('.item:eq('+ i +')').find('#finprc-amt').length > 0){
					price = $('.item:eq('+ i +')').find('#finprc-amt:eq(0)').text();
					price = filter_price(price);
				}

			}

			else{
				price = "";
			}
			if(PID != "" && price != ""){
				arrayToSend.push([PID, price, prod, image, oos]);
			}

		}

	}

	if($('.pdpProdComplete').length > 0){
		var slider = $('.pdpProdComplete');
		var sliderLength = slider.length;
		var link = "";
		var price;
		var PID;
		var prod = "";
		var image = "";
		var oos = 100;
		for(i=0;i<sliderLength;i++){
			price = "";
			PID = "";
			prod = "";
			image = "";
			oos = 100;
			if($('.pdpProdComplete:eq('+ i +') a').length > 0 && $('.pdpProdComplete:eq('+ i +') a').attr("href")){
				link = $('.pdpProdComplete:eq('+ i +') a:eq(0)').attr('href');
				if(link != ""){
					if(link.split("ajio.com").length < 2){
						link = "www.ajio.com"+link;
						PID = returnPID(link);
					}
				}
				else{
					PID = "";
				}
			}
			if(PID != ""){
				if($('.pdpProdComplete:eq('+ i +')').find('.fnl-plp-titlecaps').length > 0){
					prod = $('.pdpProdComplete:eq('+ i +')').find('.fnl-plp-titlecaps:eq(0)').text().trim();

					if($('.pdpProdComplete:eq('+ i +')').find('.fnl-plp-subtitle').length > 0){
						prod = prod + " " +$('.pdpProdComplete:eq('+ i +')').find('.fnl-plp-subtitle:eq(0)').text().trim();
					}
					prod = prod.trim();

				}
				if($('.pdpProdComplete:eq('+ i +')').find('img').length > 0){
					image = $('.pdpProdComplete:eq('+ i +')').find('img:eq(0)').attr("src");

					if(image.split("ajio.com").length < 2){
						image = "https://www.ajio.com/"+image;
					}
				}

				if($('.pdpProdComplete:eq('+ i +')').find('.fnl-plp-pricecaps').length > 0){
					price = $('.pdpProdComplete:eq('+ i +')').find('.fnl-plp-pricecaps:eq(0)').text();
					price = filter_price(price);
				}
				else if($('.pdpProdComplete:eq('+ i +')').find('#finprc-amt').length > 0){
					price = $('.pdpProdComplete:eq('+ i +')').find('#finprc-amt:eq(0)').text();
					price = filter_price(price);
				}

			}

			else{
				price = "";
			}
			if(PID != "" && price != ""){
				arrayToSend.push([PID, price, prod, image, oos]);
			}

		}

	}

	if($('.fnl-cp-product').length > 0){
		var slider = $('.fnl-cp-product');
		var sliderLength = slider.length;
		var link = "";
		var price;
		var PID;
		var prod = "";
		var image = "";
		var oos = 100;
		for(i=0;i<sliderLength;i++){
			price = "";
			PID = "";
			prod = "";
			image = "";
			oos = 100;
			if($('.fnl-cp-product:eq('+ i +') .fnl-cp-productimgdiv').length > 0 && $('.fnl-cp-product:eq('+ i +') .fnl-cp-productimgdiv').attr("url")){
				link = $('.fnl-cp-product:eq('+ i +') .fnl-cp-productimgdiv:eq(0)').attr('url');
				if(link != ""){
					if(link.split("ajio.com").length < 2){
						link = "www.ajio.com"+link;
						PID = returnPID(link);
					}
				}
				else{
					PID = "";
				}
			}
			else if($('.fnl-cp-product:eq('+ i +') .fnl-cp-productimgdiv').length > 0 && $('.fnl-cp-product:eq('+ i +') .fnl-cp-productimgdiv').attr("href")){
				link = $('.fnl-cp-product:eq('+ i +') .fnl-cp-productimgdiv:eq(0)').attr('href');
				if(link != ""){
					if(link.split("ajio.com").length < 2){
						link = "www.ajio.com"+link;
						PID = returnPID(link);
					}
				}
				else{
					PID = "";
				}
			}
			if(PID != ""){
				if($('.fnl-cp-product:eq('+ i +')').find('.fnl-plp-title').length > 0){
					prod = $('.fnl-cp-product:eq('+ i +')').find('.fnl-plp-title:eq(0)').text().trim();

					if($('.fnl-cp-product:eq('+ i +')').find('.fnl-plp-subtitle').length > 0){
						prod = prod + " " +$('.fnl-cp-product:eq('+ i +')').find('.fnl-plp-subtitle:eq(0)').text().trim();
					}
					prod = prod.trim();

				}
				if($('.fnl-cp-product:eq('+ i +')').find('img').length > 0 && $('.fnl-cp-product:eq('+ i +')').find('img').attr("data-src")){
					image = $('.fnl-cp-product:eq('+ i +')').find('img:eq(0)').attr("data-src");
					if(image.split("ajio.com").length < 2){
						image = "https://www.ajio.com/"+image;
					}
				}
				else if($('.fnl-cp-product:eq('+ i +')').find('img').length > 0 && $('.fnl-cp-product:eq('+ i +')').find('img').attr("src")){
					image = $('.fnl-cp-product:eq('+ i +')').find('img:eq(0)').attr("src");
					if(!(typeof(image)=="undefined") &&image.split("ajio.com").length < 2){
						image = "https://www.ajio.com/"+image;
					}
				}

				if($('.fnl-cp-product:eq('+ i +')').find('#finprc-amt').length > 0){
					price = $('.fnl-cp-product:eq('+ i +')').find('#finprc-amt:eq(0)').text();
					price = filter_price(price);
				}
			}

			else{
				price = "";
			}
			if(PID != "" && price != ""){
				arrayToSend.push([PID, price, prod, image, oos]);
			}

		}

	}

	if($('#showAllProducts .fnl-plp-product').length > 0){
		var slider = $('#showAllProducts .fnl-plp-product');
		var sliderLength = slider.length;
		var link = "";
		var price;
		var PID;
		var prod = "";
		var image = "";
		var oos = 100;
		for(i=0;i<sliderLength;i++){
			price = "";
			PID = "";
			link = "";
			prod = "";
			image = "";
			oos = 100;
			if($('#showAllProducts .fnl-plp-product:eq('+ i +')').length > 0 && $('#showAllProducts .fnl-plp-product:eq('+ i +')').attr("href")){
				link = $('#showAllProducts .fnl-plp-product:eq('+ i +')').attr('href');
			// console.log("link: "+link);
			if(link != ""){
				if(link.split("ajio.com").length < 2){
					link = "www.ajio.com"+link;
					PID = returnPID(link);
				}
			}
			else{
				PID = "";
			}
		}
		// console.log("PID: "+PID);
		if(PID != ""){
			if($('#showAllProducts .fnl-plp-product:eq('+ i +')').find('.fnl-plp-title').length > 0){
				prod = $('#showAllProducts .fnl-plp-product:eq('+ i +')').find('.fnl-plp-title:eq(0)').text().trim();

				if($('#showAllProducts .fnl-plp-product:eq('+ i +')').find('.fnl-plp-subtitle').length > 0){
					prod = prod + " " +$('#showAllProducts .fnl-plp-product:eq('+ i +')').find('.fnl-plp-subtitle:eq(0)').text().trim();
				}
				prod = prod.trim();

			}
			if($('#showAllProducts .fnl-plp-product:eq('+ i +')').find('.fnl-pdp-img').length > 0 && $('#showAllProducts .fnl-plp-product:eq('+ i +')').find('.fnl-pdp-img').attr("data-original")){
				image = $('#showAllProducts .fnl-plp-product:eq('+ i +')').find('.fnl-pdp-img:eq(0)').attr("data-original");

				if(image.split("ajio.com").length < 2){
					image = "https://www.ajio.com/"+image;
				}
			}
			else if($('#showAllProducts .fnl-plp-product:eq('+ i +')').find('.fnl-pdp-img').length > 0 && $('#showAllProducts .fnl-plp-product:eq('+ i +')').find('.fnl-pdp-img').attr("src")){
				image = $('#showAllProducts .fnl-plp-product:eq('+ i +')').find('.fnl-pdp-img:eq(0)').attr("src");

				if(image.split("ajio.com").length < 2){
					image = "https://www.ajio.com/"+image;
				}
			}

			if($('#showAllProducts .fnl-plp-product:eq('+ i +')').find('#finprc-amt').length > 0){
				price = $('#showAllProducts .fnl-plp-product:eq('+ i +')').find('#finprc-amt:eq(0)').text();
				price = filter_price(price);
			}
		}

		else{
			price = "";
		}
		if(PID != "" && price != ""){
			arrayToSend.push([PID, price, prod, image, oos]);
		}

	}
}
if(arrayToSend.length > 0){
	arrayToSend = JSON.stringify(arrayToSend);
	var jsonArr = [{'pairsAjio': arrayToSend}];
	jsonArr = JSON.stringify(jsonArr);
	sendMessage(0, jsonArr, 0, doNothing, []);
}
}

function sendCurrent(){
	curData = [];
	var prod = getProd();
	var image = getImage();
	var myPrice = getPrice();
	var cur_url = window.location.href;
	var current_status = 0;
	var link = window.location.href;
	var PID = getPID();
	var breadcrumb_str = getBreadCrumb();
	var avail = getAvailability();
	if(avail == 0){
		current_status = 1;
	}
	else{
		current_status = 0;
	}

	curData.push([prod, image, myPrice, cur_url, current_status, PID, breadcrumb_str]);
	curData = JSON.stringify(curData);
	var jsonArr = [{'curDataAjio': curData}];
	jsonArr = JSON.stringify(jsonArr);
	if(cur_url.split("/p/").length > 1){
		sendMessage(0, jsonArr, 0, doNothing, []);
	}
}

var pollInterval = 1000 * 15;
window.setTimeout(sendCurrent, 5000);
window.setTimeout(sendPairs, 5000);
window.setTimeout(sendPairs, pollInterval);

//avail (1 = available, 0 = oos, -1 = permanently disconnected )
var check_prod_pg = 1;


function getProd(){
	var prod = "";
	var brand = "";
	if($(".fnl-pdp-prodDetails").length > 0){
		if($(".fnl-pdp-prodDetails:eq(0) .fnl-pdp-title").length > 0){
			brand = $(".fnl-pdp-prodDetails:eq(0) .fnl-pdp-title:eq(0)").text().trim();
		}
		if($(".fnl-pdp-prodDetails:eq(0) .fnl-pdp-subtitle").length > 0){
			prod = $(".fnl-pdp-prodDetails:eq(0) .fnl-pdp-subtitle:eq(0)").text().trim();
		}
	}
	else if($(".prod-content").length > 0){
		if($(".prod-content:eq(0) .brand-name").length > 0){
			brand = $(".prod-content:eq(0) .brand-name:eq(0)").text().trim();
		}
		if($(".prod-content:eq(0) .prod-name").length > 0){
			prod = $(".prod-content:eq(0) .prod-name:eq(0)").text().trim();
		}
	}
	if(brand != ""){
		prod = brand+" "+prod;
		prod = prod.trim();
	}
	var cur_url = window.location.href;
	if(cur_url.split("/p/").length > 1){
		return prod;
	}
	else{
		return "";
	}
}

function getImage(){
	var image = "";
	if($('.prod-container').length > 0 && $('.prod-container:eq(0) .img-container').length > 0 && $('.prod-container:eq(0) .img-container:eq(0) img:eq(0)').attr("src")){
		image = $('.prod-container:eq(0) .img-container:eq(0) img:eq(0)').attr("src").trim();
		if(image.split("ajio.com").length < 2){
			image = "https://www.ajio.com/"+image;
		}
	}
	else if($('.product-Image').length > 0 && $('.product-Image:eq(0) [itemprop="image"]').length > 0){
		image = $('.product-Image:eq(0) [itemprop="image"]:eq(0)').attr("src").trim();
		if(image.split("ajio.com").length < 2){
			image = "https://www.ajio.com/"+image;
		}
	}
	return image;
}

function getPrice(){
	price = "";
	if($('.prod-price-section').length > 0 && $('.prod-price-section:eq(0) .prod-sp').length > 0)
	{
		price = $('.prod-price-section:eq(0) .prod-sp:eq(0)').text().trim();
	}
	else if($('[itemtype="http://schema.org/Offer"]').length > 0 && $('[itemtype="http://schema.org/Offer"]:eq(0) #finprc-amt').length > 0)
	{
		price = $('[itemtype="http://schema.org/Offer"]:eq(0) #finprc-amt').text().trim();
	}
	price = filter_price(price);
	if(isNaN(price)){
		price = 0;
	}
	return price;
}

function getAvailability(){
	var avail = 1;
	if($(".fnl-pdp-prodDetails").length > 0){
		if($('.fnl-pdp-prodDetails:eq(0) .outofstock.pdpcolorstock').length > 0 && $(".fnl-pdp-prodDetails:eq(0) .outofstock.pdpcolorstock").css("display") == "none"){
			avail = 1;
		}
		else if($('.fnl-pdp-prodDetails:eq(0) .outofstock.pdpcolorstock').length > 0){
			avail = 0;
		}
	}
	return avail;

}
function getPID(){

	var link = window.location.href;
	var pid = link;

	if(pid.split("#").length > 1){
		pid = pid.split("#")[0];
	}
	if(pid.split("&").length > 1){
		pid = pid.split("&")[0];
	}
	if(pid.split("?").length > 1){
		pid = pid.split("?")[0];
	}
	if(pid.split("/p/").length > 1){
		pid = pid.split("/p/");
		pid = pid[pid.length-1];
		if(pid.split("/").length > 1){
			pid = pid.split("/");
			pid = pid[0];
		}
	}
	else{
		pid = "";
	}
	return pid;
}
function returnPID(link){

	var pid = link;
	if(pid.split("#").length > 1){
		pid = pid.split("#")[0];
	}
	if(pid.split("&").length > 1){
		pid = pid.split("&")[0];
	}
	if(pid.split("?").length > 1){
		pid = pid.split("?")[0];
	}
	if(pid.split("/p/").length > 1){
		pid = pid.split("/p/");
		pid = pid[pid.length-1];
		if(pid.split("/").length > 1){
			pid = pid.split("/");
			pid = pid[0];
		}
	}
	else{
		pid = 0;
	}
	if(link.split('ajio.com').length < 2){
		pid = 0;
	}
	if(link == ""){
		pid = 0;
	}
	return pid;
}

function getBreadCrumb(){
	var breadcrumb = "";
	var bread_final = "";
	if($('.breadcrumb-list').length > 0){
		var len_bread = $('.breadcrumb-list').length;

		for(i=0;i<len_bread-1;i++){
			if($('.breadcrumb-list:eq('+i+') a').length > 0){
				breadcrumb = $('.breadcrumb-list:eq('+i+') a:eq(0)').text().trim();
				bread_final += breadcrumb + "*~";
			}
		}
	}
	else if($('[itemprop="itemListElement"]').length > 0){
		var len_bread = $('[itemprop="itemListElement"]').length;

		for(i=0;i<len_bread-1;i++){
			if($('[itemprop="itemListElement"]:eq('+i+') [itemprop="name"]').length > 0){
				breadcrumb = $('[itemprop="itemListElement"]:eq('+i+') [itemprop="name"]:eq(0)').text().trim();
				bread_final += breadcrumb + "*~";
			}
		}
	}

	return bread_final;
}

function getCategory(){
	var categories = getBreadCrumb();
	var index = 2;
	var category = "";
	if(categories != undefined && categories != ""){
		categories = categories.split("*~");
		category = categories[index];
	}
	return category;
}

function initiateAjioAC(){
	console.log("Entered here");
	var cur_url = window.location.href;
	if(cur_url.split(".ajio.com/cart").length > 1){
		if($(".fnl-cart-coupon-table").length > 0 && $("#couponClick").length == 0){
			var selectorACIcon = ".fnl-cart-coupon-table";
			var position = "after";
			var parent = "none";
			var selectorInput = "#voucherCode";
			var inputAttr = "val";
			var clickApplySelector = ".fnl-applycpn-btn";
			var clickRemoveSelector = ".fnl-cart-couponremoveIMG";
			var details = [{'selectorInput': selectorInput, "clickApplySelector": clickApplySelector, "clickRemoveSelector": clickRemoveSelector, "inputAttr" : inputAttr, "api_case": 0}];
			details = JSON.stringify(details);
			localStorage.acDetails = details;
			displayACIcon(selectorACIcon, parent, position, 2191, details);
			if(localStorage.showFinalSavings && localStorage.showFinalSavings == 1){
				displayFinalSavings();
				$(".hk-aCoup__netSavings b:eq(0)").text(localStorage.bestSaving);
				$(".hk-js-autoCoup__bestCouponTill").text(localStorage.bestCoupon.toUpperCase());
			}
		}
	}
}
initiateAjioAC();

if(!localStorage.savings){
	localStorage.savings = "";
}
if(!localStorage.bestSaving){
	localStorage.bestSaving = 0;
}
if(!localStorage.bestCoupon){
	localStorage.bestCoupon = "";
}
if(!localStorage.clickedRemove){
	localStorage.clickedRemove = 0;
}


function startSaving(){
	// console.log("Entered startSaving");
	return new Promise(function(resolve, reject){

		var code = localStorage.lastCoupon;
		var csaving = 0;
		var ecashing = 0;
		var savingsObject = {};
		var bestSaving = localStorage.bestSaving;
		var bestCoupon = localStorage.bestCoupon;
		var savings = localStorage.savings;
		var doneSavingCheck = localStorage.doneSavingCheck;
		var couponsTotal = localStorage.getCoupons;
		var couponAt = 1349;
		couponsTotal = couponsTotal.split("~").length - 1;

		if($("#orderTotals").length > 0 && $("#orderTotals .fnl-cart-total").length > 0){

			var cnt_tr = $("#orderTotals .fnl-cart-total .fnl-cart-sbtl-type").length;

			for(var t=0;t<cnt_tr;t++){
				if($("#orderTotals .fnl-cart-total .fnl-cart-sbtl-type:eq("+t+")").text().trim().toUpperCase() == "COUPON DISCOUNT"){
					if($("#orderTotals .fnl-cart-total .fnl-cart-sbtl-type:eq("+t+")").parent().find(".discountValue").length > 0){
						csaving = $("#orderTotals .fnl-cart-total .fnl-cart-sbtl-type:eq("+t+")").parent().find(".discountValue").text().trim();
						csaving = filter_price(csaving);
					}
				}
			}
			if(isNaN(csaving)){
				csaving = 0;
			}
			else if(csaving > bestSaving && code != ""){
				bestSaving = csaving;
				localStorage.bestSaving = bestSaving;
				if(code.trim() != ""){
					localStorage.bestCoupon = code;
				}
				else{
					localStorage.bestCoupon = lastCoupon;
				}
			}
		}
// if($(".alert__inner").length > 0){
// 	var cpnMsg = $(".alert__inner").text().trim();
// 	setCookie("HKCode~"+localStorage.lastCoupon, cpnMsg, 1);
// }

if($(".fnl-cart-couponremoveIMG").length > 0){
	document.getElementsByClassName("fnl-cart-couponremoveIMG")[0].click();
}
if(localStorage.savings.trim() != ""){
	var savings = JSON.parse(localStorage.savings);
}
else{
	var savings = [];
}
var savingsLen = savings.length;
savingsObject["code"] = code;
savingsObject["saving"] = csaving;
savingsObject["ecash"] = ecashing;
savings[savingsLen] = savingsObject;
localStorage.savings = JSON.stringify(savings);
displayEachCpnSaving(code, csaving, ecashing);
if(parseInt(localStorage.doneACTill) >= parseInt(couponsTotal)){
	resolve("done");
}
else{
	if(csaving == 0){
		window.location.reload();
	}
	resolve("notdone");
}
});
}

function applyBestCoupon(){
	bestSaving = localStorage.bestSaving;
	bestCoupon = localStorage.bestCoupon;
	// alert("applyBestCoupon was called with "+bestCoupon+" "+bestSaving);
	if(bestSaving != 0 && bestCoupon.trim() != ""){
		if($(".fnl-cart-couponremoveIMG").length > 0 && localStorage.clickedRemove == 0){
			document.getElementsByClassName("fnl-cart-couponremoveIMG")[0].click();
			localStorage.clickedRemove = 1;
		}
		if($(".fnl-cart-couponremoveIMG").length == 0 && $("#voucherCode").length > 0 && $(".fnl-applycpn-btn").length > 0){
			$("#voucherCode").val(bestCoupon.trim());
			localStorage.showFinalSavings = 1;
			localStorage.acStarted = 0;
			displayFinalSavings();
			document.getElementsByClassName("fnl-applycpn-btn")[0].click();
		}
		else if(bestSaving != 0 && bestCoupon.trim() != ""){
			setTimeout(applyBestCoupon, 1000);
		}
	}
	else{
		displayNoSavings();
	}
  // var allCoupons = localStorage.getCoupons;
  // allCoupons = allCoupons.split("~");
  // for(var all=0;all<allCoupons.length-1;all++){
  // 	var cookieCpn = "HKCode~"+allCoupons[all].trim();
  // 	if(getCookie(cookieCpn)){
  // 		arrayMsg.push([allCoupons[all], encodeURIComponent(getCookie(cookieCpn)), 1349]);
  // 		setCookie(cookieCpn, 0, -1);
  // 	}
  // }
  // localStorage.getCoupons = "";

  // arrayMsg = JSON.stringify(arrayMsg);
  // var jsonArr = [{'cpn_msg': arrayMsg}];
  // jsonArr = JSON.stringify(jsonArr);
  // sendMessage(1, jsonArr, 12, doNothing, []);
}

if(localStorage.clickedRemove == 1){
	applyBestCoupon();
	localStorage.clickedRemove = 0;
}
