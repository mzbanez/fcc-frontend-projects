var timer = $('.timer');

var minutes = parseInt($('#sessionLength').val());
var seconds = 0;
var hours = 0;
var clicked = true;
var counter;
var now="session";
var pause = 0;

document.getElementById("part").innerHTML = now;
document.getElementById("demo").innerHTML = minutes;

var leadingZero = function (n) {
    if (n < 10 && n >= 0) return '0' + n;
    else return n;
}

function add(min) {
   if(pause == 1){
    return;
  }else{
  
   if(min == 'break'){
      $('#breakLength').val(parseInt($('#breakLength').val()) + 1);

     if(now == "break"){
      minutes = parseInt($('#breakLength').val());
      document.getElementById("demo").innerHTML = minutes;
      setMin(minutes);
      seconds = 0;
     }
   }
   if(min == 'session'){
      $('#sessionLength').val(parseInt($('#sessionLength').val()) + 1);
     
          minutes = parseInt($('#sessionLength').val());
          document.getElementById("demo").innerHTML = minutes;
          setMin(minutes);
          seconds = 0;
   }
  }

};


function sub(min) { 
  if(pause == 1){
    return;
  }
  
   if(min == 'break'){
      if(parseInt($('#breakLength').val()) == 1){
         return;
        }
      $('#breakLength').val(parseInt($('#breakLength').val()) - 1);
     if(now == "break"){
       
      minutes = parseInt($('#breakLength').val());
      document.getElementById("demo").innerHTML = minutes;
     
      setMin(minutes);
      seconds = 0;

     }
    
   }
   if(min == 'session'){
      if(parseInt($('#sessionLength').val()) == 1){
         return;
        } 
      $('#sessionLength').val(parseInt($('#sessionLength').val()) - 1);
     
      minutes = parseInt($('#sessionLength').val());
      document.getElementById("demo").innerHTML = minutes;
     
      setMin(minutes);
      seconds = 0;
   }
};

function setMin(x){
  if (x >=60){
          hours = Math.floor(minutes/60);
          minutes = parseInt(minutes%60);
  }  
  else {
     x = minutes;
     hours = 0;
     
   }
    seconds = 0;
  
}

function printTime(){
         if(hours != 0){
           document.getElementById("part").innerHTML = now;
            document.getElementById("demo").innerHTML = hours + ":" + leadingZero(minutes) + ":" + leadingZero(seconds);
            }
          if (hours == 0){
             document.getElementById("part").innerHTML = now;
             document.getElementById("demo").innerHTML = (minutes) + ":" + leadingZero(seconds);
          }
}

function startTimer(){   

if (clicked) {
    
        printTime();  
    
        counter = setInterval(function () {
            var h = $('.hr', timer),
                m = $('.min', timer),
                s = $('.sec', timer);
            if (seconds === 0) {
                if(minutes !==0){
                  minutes--;
                }else if (minutes === 0 && hours !==0) {
                    hours--;
                    minutes = 59;
                } 
              
                seconds = 59;
            } else {
                seconds--;
            }
             
         
          
            if (seconds === 0 && minutes === 0 && hours === 0 && now =="session") {
                    minutes = parseInt($('#breakLength').val());
                    setMin(minutes);
                    now = "break";
            }
            if (seconds === 0 && minutes === 0 && hours === 0 && now =="break") {
                    minutes = parseInt($('#sessionLength').val());
                    setMin(minutes);
                    now = "session";
            }
         
          printTime();
        }, 1000);
        pause = 1;
  
    } else {
        clearInterval(counter);
        pause = 0;
        
    }
    clicked = !clicked; 
}





