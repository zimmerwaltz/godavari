//preloader code starts
var preloader = $('.preloader');
var strips = preloader.find('.strips');
var body = $('body');

//preloader code starts here 
$(window).on('load',function(){

    strips.each(function(n){  
        setTimeout(function(){
            strips.eq(n).addClass('strips-slide-out');
        },150*n+1); 
    });
    
    body.css('overflow','initial');
    preloader.css('visibility','hidden');
    
});
//preloader code ends