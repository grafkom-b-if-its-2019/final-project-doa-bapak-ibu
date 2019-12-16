// $(function () {
//      var txt = $('#sentence');

//      //generate text
//      var str = "once upon a time";
//      for (let i = 0; i < str.length; i++) {
//           var letter = str[i] != " " ? str[i] : '&nbsp';
//           txt.append('<p class="flag">' + letter + '</p>');
//      }
// });

function generateText(sentence){
     var txt = $('#sentence');

     //generate text
     var str = sentence;
     for (let i = 0; i < str.length; i++) {
          var letter = str[i] != " " ? str[i] : '&nbsp';
          txt.append('<p class="flag">' + letter + '</p>');
     }
}

function check(param) {
     if(gameStatus !== 'play') return;

     var input = param == 32 || param == 160 ? '&NBSP;' : String.fromCharCode(param);
     if(param == 188) {
          input = ',';
     }
     if(param == 190) {
          input = '.';
     }
     var letter = $('.flag').first();
     var up = letter.html();
     if (up != ',') {
          up = up.toUpperCase();
     }
     console.log(up + 'input' + input);
     
     var audio = new sound("click.mp3");
     var audio2 = new sound("wrong.mp3");
     

     
     //kalau bener
     if (input == up) {
          letter.css("color", "chartreuse");
          letter.removeClass('flag');
          letter.addClass("hvr-pop");
          audio.play();


     } else {
          //kalau salah
          letter.addClass("wrong");
          letter.addClass("hvr-wobble-vertical");
          audio2.play();
          letter.delay(700).queue(function () { // Wait for 0,7 second.
               letter.removeClass("hvr-wobble-vertical").dequeue();
               letter.removeClass("wrong").dequeue();
          });
     }
}

function sound(src) {
     this.sound = document.createElement("audio");
     this.sound.src = src;
     this.sound.setAttribute("preload", "auto");
     this.sound.setAttribute("controls", "none");
     this.sound.style.display = "none";
     document.body.appendChild(this.sound);
     this.play = function(){
         this.sound.play();
     }
     this.stop = function(){
         this.sound.pause();
     }    
 }

//ngecek apakah ada input
document.addEventListener("keydown", function (event) {
     if(gameStatus !== 'play') return;
     if(player.text_len == 0){
          var sentence = story[player.text];
          generateText(sentence);
          player.text_len = sentence.length;
          console.log(player.text_len);
     }
     check(event.keyCode);
});