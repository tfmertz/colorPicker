//store the sliders
var $colorSliders = $('input[type="range"]');
//store the span
var $colorPreview = $('.colorPreview');
var $colorInHex = $('#colorInHex');
var $colorInRGB = $('#colorInRGB');
var $addHash = $('#addHash');

//On range change event
$colorSliders.mousemove(updateColor);

//if reset button is pushed
$('.resetColor').click(function(){
  $('input[type="range"]').each(function(){
    $(this).val(0);
    updateColor();
  });
}); //end resetColor click

//if the user hits the add color button
$('.addColor').click(function(){
  //grab the current color
  var background = $colorInRGB.val();
  //create a li
  var listItem = '<li ' + 'style="background-color:' + background + ';"></li>';
  //append it to the colorList
  $('#colorList').append(listItem);
  console.log(background);
});

//if the user clicks on a color in the list
$('#colorList').on("click", 'li', function() {
  //remove the selected from it's siblings
  $(this).siblings().removeClass("selected");
  $(this).addClass("selected");
  
}); //end colorList li click

//automatically select all the text inside the inputs when focused
//and fix bug in chrome that makes it deselect
$('input[type="text"]').focus(function() {
  $(this).select().one('mouseup', function(e) {
    $(this).off('keyup');
    e.preventDefault();
  }).one('keyup', function() {
    $(this).select().off('mouseup');
  });
});

//update the hex color code to have a # or not on click
$addHash.click(function() {
  //get the contents of the hex input text
  var hexColor = $colorInHex.val();
  
  //is the checkbox checked?
  if($addHash.prop("checked") === true) {
    //add the contents with a hash
    $colorInHex.val("#" + hexColor);
  } else {
    $colorInHex.val(hexColor.substr(1));
  } 
}); //end addHash.click


//substr changes the amount of padding, 2 = 2 digits, 4 = 4 digits
function dec2hex(num) {
  return (num+0x10000).toString(16).substr(-2).toUpperCase();
}

//Update color picker to reflect any changes to the input ranges
function updateColor() {
  
  //store the values of the input changed into numbers
  var r = Number.parseInt($('#red').val());
  var g = Number.parseInt($('#green').val());
  var b = Number.parseInt($('#blue').val());
  
  //store the hex value
  var hexColor = dec2hex(r) + dec2hex(g) + dec2hex(b);
  
  
  //update the Hex and RBG text inputs to be the value of the range input
  
  //if the add # is checked add it into the inputs
  if($addHash.prop("checked") === true) {
    $colorInHex.val("#" + hexColor);
  } else {
    $colorInHex.val(hexColor);
  }
  $colorInRGB.val("rgb(" + r + ", " + g + ", " + b + ")");
  
  //change the background color of the span
  $colorPreview.css("background-color", "rgb(" + r + "," + g + "," + b + ")");
}

updateColor();