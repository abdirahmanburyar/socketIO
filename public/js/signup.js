$(document).ready(function() { 
    $(".close").click(function() { 
        $("ul").fadeOut(100); 
    }); 
    setTimeout(function(){
        $("ul").fadeOut(100); 
    }, 5000)
    console.log(io)
}); 