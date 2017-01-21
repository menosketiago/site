$(document).ready(function(){

// Paralax on hero section
$('#hero-bg').mousemove(function(e){
    var ammountX = (e.pageX * -0.06);
    var ammountY = (e.pageY * -0.06);
    $(this).css('background-position', ammountX + 'px ' + ammountY + 'px');
});

});
