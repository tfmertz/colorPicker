//store the sliders
var $colorSliders = $('input[type="range"]');
//store the span
var $colorPreview = $('.colorPreview');
var $colorInHex = $('#colorInHex');
var $colorInRGB = $('#colorInRGB');
var $addHash = $('#addHash');

//On range change event
//BUG: Doesn't work on touchscreens
$colorSliders.mousemove(updateColor);

//set all the color sliders back to their original values
$('.clearValues').click(function(){
  $colorSliders.each(function(){
    $(this).val(0);
  });
  updateColor();
});

//if recall button is pushed
$('.recallColor').click(function(){
  //grab the hex value out of the selected color's style
  //note: .css() returns rgb(x,x,x) and isn't necessarily consistent across browsers
  var hexValue = $(".selected").attr('style').substr(17,7);
  //create and array to store the rgb values
  var rgbArray = [];
  //store each span value in the array
  $(".selected span").each(function() {
    rgbArray.push($(this).html());
  });
  
  //put the rgb and hex values back into the text inputs
  $colorInHex.html(hexValue);
  $colorInRGB.html('rgb(' + rgbArray[0] + ', ' + rgbArray[1] + ', ' + rgbArray[2] + ')');

  //go through the sliders and put each color back in
  $('input[type="range"]').each(function(index){
    $(this).val(rgbArray[index]);
  });

  updateColor();
}); //end recallColor click

//if the user hits the add color button
$('.addColor').click(function(){
  //grab the current color
  var background = $colorInHex.val();
  var rgbArray = getRGB();
  //create a li with rgb as background color and hex on top
  var listItem = '<li ' + 'style="background-color:' + background + ';">';
  listItem += '<span>' + rgbArray[0] + "</span><span>" + rgbArray[1] + "</span><span>" + rgbArray[2] + '</span></li>';
  //append it to the colorList
  $('#colorList').append(listItem);
});

//if the user hits the remove color button
$('.removeColor').click(function(){
  //grab the color that is currently selected and remove it
  $(".selected").remove();
}); //end removeColor click

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

//returns the red, green, and blue values of the sliders in an array
function getRGB() {
  //store the values of the input changed into numbers
  var r = Number.parseInt($('#red').val());
  var g = Number.parseInt($('#green').val());
  var b = Number.parseInt($('#blue').val());
  //throw those numbers into an array and return it
  var rgb = [r, g, b];
  return rgb;
}

//Update color picker to reflect any changes to the input ranges
function updateColor() {
  
  var rgbArray = getRGB();
  
  //store the hex & rgb values
  var hexColor = dec2hex(rgbArray[0]) + dec2hex(rgbArray[1]) + dec2hex(rgbArray[2]);
  var rgbValue = "rgb(" + rgbArray[0] + ", " + rgbArray[1] + ", " + rgbArray[2] + ")";
  
  //update the Hex text input
  //if the add # is checked add it into the inputs
  if($addHash.prop("checked") === true) {
    $colorInHex.val("#" + hexColor);
  } else {
    $colorInHex.val(hexColor);
  }
  //update the rgb text input
  $colorInRGB.val(rgbValue);
  
  //change the background color of the span
  $colorPreview.css("background-color", rgbValue);
}

updateColor();