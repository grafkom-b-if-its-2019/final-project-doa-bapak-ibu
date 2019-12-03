$(function () {
     var txt = $('#sentence');

     //generate text
     var str = "once upon a time";
     for (let i = 0; i < str.length; i++) {
          var letter = str[i] != " " ? str[i] : '&nbsp';
          txt.append('<p class="flag">' + letter + '</p>');
     }
});

function check(param) {
     var input = param == 32 || param == 160 ? '&NBSP;' : String.fromCharCode(param);
     var letter = $('.flag').first();
     var up = letter.html().toUpperCase();

     //kalau bener
     if (input == up) {
          letter.css("color", "red");
          letter.removeClass('flag');
     } else {
          //kalau salah
          letter.addClass("hvr-wobble-vertical");
          letter.delay(700).queue(function () { // Wait for 0,7 second.
               letter.removeClass("hvr-wobble-vertical").dequeue();
          });
     }
}
//ngecek apakah ada input
document.addEventListener("keydown", function (event) {
     check(event.keyCode);
});