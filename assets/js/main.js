$( document ).ready(function() {

	var helper = {
	round : function( x ){
        return Math.floor(x/5)*5;
    },
	get_time : function( unit ){
		time = new Date();
		
		if(unit == 'minutes') {
			time = time.getMinutes();
		}else if (unit == 'hours'){
			time = time.getHours();
		}
		
		return time;
	}
}


/* var time_clock = {
	time_to_words : function( obj, time, prefix ){
		prefix = prefix || "";

		var words = [];
		$.each( obj, function( key, value ) {
		  if( value.indexOf( time ) >= 0 ){
			words.push(prefix + key);
		  }
		});

		return words;
	},
	set_class : function( array, element, class ){
		for (var i = 0; i < array.length; i++) {
			active_word = array[i];
			$(element).addClass(class);  
		}
	}
} */

var minutes = {
  vijf: [05, 25, 35, 55],
  tien : [10, 20, 40, 50],
  over : [35, 40],
  over_2 : [05, 10, 15],
  voor: [20, 25],
  voor_2: [45, 50, 55],
  kwart : [15, 45],
  half : [20, 25, 30, 35, 40],
  uur: [00]
}

var hours = {
  een : [01, 13],
  twee : [02, 14],
  drie : [03, 15],
  vier : [04, 16],
  vijf : [05, 17],
  zes : [06, 18],
  zeven : [07, 19],
  acht : [08, 20],
  negen : [09, 21],
  tien : [10, 22],
  elf : [11, 23],
  twaalf : [12, 00, 24]
}


function round5(x)
{
    return Math.floor(x/5)*5;
}


function update_time(){
  
  var time = new Date();
  var current_minutes_raw = time.getMinutes();
  var current_minutes = round5(current_minutes_raw);
  
  if( dots == 0 ){
    $('.dots-container').removeAttr('class');
  }
  
  var dots = current_minutes_raw - current_minutes;
  
  $('.dots-container').addClass('dots-container-active--' + dots);


  var current_hours = time.getHours();

  if(current_minutes >= 20 ){
    current_hours = current_hours + 1;
  }

  function time_to_words( obj, time, prefix ){
    prefix = prefix || "";

    var words = [];
    $.each( obj, function( key, value ) {
      if( value.indexOf( time ) >= 0 ){
        words.push(prefix + key);
      }
    });

    return words;
  }

  words_minutes = time_to_words(minutes, current_minutes, 'minutes-');
  words_hours = time_to_words(hours, current_hours, 'hours-');

  var words = words_minutes.concat(words_hours);

  for (var i = 0; i < words.length; i++) {
    active_word = words[i];
    $('span[data-time="'+ active_word +'"]').addClass('active');  
  }
}


update_time();

time_update = 0;

function set_interval(){
	if( time_update == 0 ){
		var s = new Date();
		var seconds = s.getSeconds();
		var seconds = seconds * 1000;
		interval = 60000 - seconds;
	}else {
		interval = 60000;
	}

	return interval;
}



window.setInterval(function(){

	$('span').removeClass('active');
	update_time();

	time_update++;
	set_interval();
  
	console.log(time_update);
  
}, set_interval() );
    

});