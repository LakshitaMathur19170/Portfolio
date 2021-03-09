$num = $('.project-card').length;
$even = $num / 2;
$odd = ($num + 1) / 2;

if ($num % 2 == 0) {
  $('.project-card:nth-child(' + $even + ')').addClass('active');
  $('.project-card:nth-child(' + $even + ')').prev().addClass('prev');
  $('.project-card:nth-child(' + $even + ')').next().addClass('next');
} else {
  $('.project-card:nth-child(' + $odd + ')').addClass('active');
  $('.project-card:nth-child(' + $odd + ')').prev().addClass('prev');
  $('.project-card:nth-child(' + $odd + ')').next().addClass('next');
}

$('.project-card').click(function() {
  $slide = $('.active').width();
  console.log($('.active').position().left);
  
  if ($(this).hasClass('next')) {
    $('.container').stop(false, true).animate({left: '-=' + $slide});
  } else if ($(this).hasClass('prev')) {
    $('.container').stop(false, true).animate({left: '+=' + $slide});
  }
  
  $(this).removeClass('prev next');
  $(this).siblings().removeClass('prev active next');
  
  $(this).addClass('active');
  $(this).prev().addClass('prev');
  $(this).next().addClass('next');
});


// Keyboard nav
$('html body').keydown(function(e) {
  if (e.keyCode == 37) { // left
    $('.active').prev().trigger('click');
  }
  else if (e.keyCode == 39) { // right
    $('.active').next().trigger('click');
  }
});
