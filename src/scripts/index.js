$(document).ready(function(){

// Paralax on hero section
$('#hero-bg').mousemove(function(e){
    var amountMovedX = (e.pageX * -0.05);
    var amountMovedY = (e.pageY * -0.05);
    $(this).css('background-position', amountMovedX + 'px ' + amountMovedY + 'px');
});

});
