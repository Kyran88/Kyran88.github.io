$('.continue').click(function() {
  $(this).closest('.humanlyText').slideUp();
  $(this).closest('.humanlyText').next().slideDown();
});

$('#demo').click(function() {
  $(this).closest('.humanlyText').slideUp();
  $('.humanlyText.demo').slideDown();
});
