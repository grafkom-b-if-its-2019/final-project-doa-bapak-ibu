$(function () {
     var txt = $('#sentence');

     //generate text
     var str = "once upon a time abcdefg hijklmn opqrstu vwxyz";
     for (let i = 0; i < str.length; i++) {
          var letter = str[i] != " " ? str[i] : '&nbsp';
          txt.append('<p class="flag">' + letter + '</p>');
     }
});

function check(param) {
     var input = param == 32 || param == 160 ? '&NBSP;' : String.fromCharCode(param);
     var letter = $('.flag').first();
     var up = letter.html().toUpperCase();
     var audio = new sound("sound/click.mp3");
     var audio2 = new sound("sound/wrong.mp3");
     

     
     //kalau bener
     if (input == up) {
          letter.css("color", "chartreuse");
          letter.removeClass('flag');
          letter.addClass("hvr-pop");
          audio.play();
          globalFlag = 1;

     } else {
          //kalau salah
          letter.addClass("wrong");
          letter.addClass("hvr-wobble-vertical");
          audio2.play();
          letter.delay(700).queue(function () { // Wait for 0,7 second.
               letter.removeClass("hvr-wobble-vertical").dequeue();
               letter.removeClass("wrong").dequeue();
          });
          globalFlag = -1
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
     check(event.keyCode);
});

$(document).ready(function(){
     $(".play").click(function(){
          $(".mainpage").hide();
          $(".playpage").show();
          $(".world").show();
          $(".howtoplaypage").hide();
     });
});

$(document).ready(function(){
     $(".howtoplay").click(function(){
          $(".mainpage").hide();
          $(".playpage").hide();
          $(".world").hide();
          $(".howtoplaypage").show();
     });
});

$(document).ready(function(){
     $(".backhowtoplay").click(function(){
          $(".mainpage").show();
          $(".playpage").hide();
          $(".world").hide();
          $(".howtoplaypage").hide();
     });
});

$(document).ready(function(){
     $(".backplay").click(function(){
          $(".mainpage").show();
          $(".playpage").hide();
          $(".howtoplaypage").hide();
     });
});

/* semua tombol*/
$(document).ready(function(){
     var audiobutton = new sound("sound/button click.mp3")
     $(".play").click(function(){
          audiobutton.play();
     });
     $("#link_multi").click(function(){
          audiobutton.play();
          $('#multi').submit();
     });
     $("#link_single").click(function(){
          audiobutton.play();
          $('#single').submit();
     });
     $(".howtoplay").click(function(){
          audiobutton.play();
     });
     $(".backplay").click(function(){
          audiobutton.play();
     });
     $(".backhowtoplay").click(function(){
          audiobutton.play();
     });
});

$('.button--bubble').each(function() {
     var $circlesTopLeft = $(this).parent().find('.circle.top-left');
     var $circlesBottomRight = $(this).parent().find('.circle.bottom-right');
   
     var tl = new TimelineLite();
     var tl2 = new TimelineLite();
     
     var btTl = new TimelineLite({ paused: true });
   
     tl.to($circlesTopLeft, 1.2, { x: -25, y: -25, scaleY: 2, ease: SlowMo.ease.config(0.1, 0.7, false) });
     tl.to($circlesTopLeft.eq(0), 0.1, { scale: 0.2, x: '+=6', y: '-=2' });
     tl.to($circlesTopLeft.eq(1), 0.1, { scaleX: 1, scaleY: 0.8, x: '-=10', y: '-=7' }, '-=0.1');
     tl.to($circlesTopLeft.eq(2), 0.1, { scale: 0.2, x: '-=15', y: '+=6' }, '-=0.1');
     tl.to($circlesTopLeft.eq(0), 1, { scale: 0, x: '-=5', y: '-=15', opacity: 0 });
     tl.to($circlesTopLeft.eq(1), 1, { scaleX: 0.4, scaleY: 0.4, x: '-=10', y: '-=10', opacity: 0 }, '-=1');
     tl.to($circlesTopLeft.eq(2), 1, { scale: 0, x: '-=15', y: '+=5', opacity: 0 }, '-=1');
   
     var tlBt1 = new TimelineLite();
     var tlBt2 = new TimelineLite();
     
     tlBt1.set($circlesTopLeft, { x: 0, y: 0, rotation: -45 });
     tlBt1.add(tl);
   
     tl2.set($circlesBottomRight, { x: 0, y: 0 });
     tl2.to($circlesBottomRight, 1.1, { x: 30, y: 30, ease: SlowMo.ease.config(0.1, 0.7, false) });
     tl2.to($circlesBottomRight.eq(0), 0.1, { scale: 0.2, x: '-=6', y: '+=3' });
     tl2.to($circlesBottomRight.eq(1), 0.1, { scale: 0.8, x: '+=7', y: '+=3' }, '-=0.1');
     tl2.to($circlesBottomRight.eq(2), 0.1, { scale: 0.2, x: '+=15', y: '-=6' }, '-=0.2');
     tl2.to($circlesBottomRight.eq(0), 1, { scale: 0, x: '+=5', y: '+=15', opacity: 0 });
     tl2.to($circlesBottomRight.eq(1), 1, { scale: 0.4, x: '+=7', y: '+=7', opacity: 0 }, '-=1');
     tl2.to($circlesBottomRight.eq(2), 1, { scale: 0, x: '+=15', y: '-=5', opacity: 0 }, '-=1');
     
     tlBt2.set($circlesBottomRight, { x: 0, y: 0, rotation: 45 });
     tlBt2.add(tl2);
   
     btTl.add(tlBt1);
     btTl.to($(this).parent().find('.button.effect-button'), 0.8, { scaleY: 1.1 }, 0.1);
     btTl.add(tlBt2, 0.2);
     btTl.to($(this).parent().find('.button.effect-button'), 1.8, { scale: 1, ease: Elastic.easeOut.config(1.2, 0.4) }, 1.2);
   
     btTl.timeScale(2.6);
   
     $(this).on('mouseover', function() {
     //   btTl.strtart();
     });
   });