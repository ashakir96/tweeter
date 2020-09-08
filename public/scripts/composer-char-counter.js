$(document).ready(function() {

  $('textarea').keyup(function() {
    let lengthInput = this.value.length;
    let lengthChars = 140 - lengthInput;

    if (lengthChars < 0) {
      $(this).siblings("div").children(".counter").addClass('negativeTweet');
    } else {
      $(this).siblings("div").children(".counter").removeClass('negativeTweet');
    } 
    $(this).siblings("div").children(".counter").text(lengthChars);
  });

});