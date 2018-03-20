
$("body").append("<div id='proddetails' style='display:none;'></div>");

$("#proddetails").html(JSON.stringify(prodsJson));

$("body").append("<div id='proddata' style='display:none;'></div>");

$("#proddata").html(JSON.stringify(digitalData));

$("body").append("<div id='prodemail' style='display:none;'></div>");
$("#prodemail").html(email);
