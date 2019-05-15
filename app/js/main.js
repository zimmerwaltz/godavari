$(document).ready(function(){

    
//Function to animate slider captions starts
  function doAnimations(elems) {
    //Cache the animationend event in a variable
    var animEndEv = "webkitAnimationEnd animationend";

    elems.each(function() {
      var $this = $(this),
        $animationType = $this.data("animation");
      $this.addClass($animationType).one(animEndEv, function() {
        $this.removeClass($animationType);
      });
    });
  }

  //Variables on page load
  var $myCarousel = $("#slider-hero"),
    $firstAnimatingElems = $myCarousel
      .find(".carousel-item:first")
      .find("[data-animation ^= 'animated']");

  //Initialize carousel
  $myCarousel.carousel({
      interval:70000,
      keyboard:true,
      hover:false,
      ride:true
  });

  //Animate captions in first slide on page load
  doAnimations($firstAnimatingElems);

  //Other slides to be animated on carousel slide event
  $myCarousel.on("slide.bs.carousel", function(e) {
    var $animatingElems = $(e.relatedTarget).find(
      "[data-animation ^= 'animated']"
    );
    doAnimations($animatingElems);
  });
    
//Function to animate slider captions ends
    
    
//parallax on slider 
    $(window).scroll(function(){
        var scrollTop = $(window).scrollTop();
        var slide = $myCarousel.find('.carousel-item');
        
        slide.css({
            backgroundPositionY:scrollTop*0.5+"px"
        });
    })
    
});// dom ends


//menu toggle function starts
let menuOpen = $('#menu-open'),
    menuClose = $('#menu-close'),
    mainMenu = $('#main-menu'),
    menuItems = mainMenu.find('ul li'),
    bodyContent = $('body'); 

    menuItems.addClass('animated fadeOut');
 
menuOpen.on('click',() => {
    //slide down tray
    mainMenu.css({
        transform: 'translateY(0)' 
    });
    //lock body scroll
    bodyContent.css({
        overflowY: 'hidden'
    })
    //animate each menu item
    menuItems.each(function(n){ 
        setTimeout(function(){
            menuItems.eq(n).removeClass().addClass('animated fadeInUp'); 
        },100*(n));    
    });
});

menuClose.on('click',() => {
    mainMenu.css({
        transform: 'translateY(-100%)'
    });
     //unlock body scroll
    bodyContent.css({
        overflowY: 'scroll'
    })
    menuItems.removeClass().addClass('animated fadeOut'); 
});
//menu toggle function ends

//
//var contactForm = document.forms['contactform'];
//
//var formFields = [];
//
//for (var i=0;i<contactForm.elements.length-1;i++){
//    formFields.push(contactForm.elements[i]);
//}
//
//console.log(formFields);
//
//contactForm.addEventListener('submit',validateForm);


function validateForm(form){
    var name = form.elements['name'];
    var email = form.elements['email'];
    var number = form.elements['number'];
    var city = form.elements['city'];
    var message = form.elements['message'];
    
    function checkEmpty(field){
        if(field.value===""){
            setErrorText(field);
            console.log('empty field');
            return false;
        }
        else{
            console.log(field.value);
            setErrorText(field,'')
            return true;
        }
    }
    
    function setErrorText(field){
       var errorMessage = "";
        if(errorMessage===""){
            var errorElement = document.createElement('P');

            errorMessage = field.name[0].toUpperCase()+field.name.substr(1,field.name.length)+" cannot be blank";

            errorElement.setAttribute('id',field.name+"-error");
            errorElement.setAttribute('class','error-message');
            errorElement.innerHTML= errorMessage;
            field.parentNode.appendChild(errorElement);
            console.log("after="+errorMessage.length);
        }
        else{
            console.log('error message already present');
        }
        
    }
    
    checkEmpty(name),
    checkEmpty(number),checkEmpty(email),checkEmpty(city),checkEmpty(message);
    
    
//   console.log(form.elements['name']);
return false;
}

    

    