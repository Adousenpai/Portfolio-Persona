const $page = $('.page');

$('.menu_toggle').on('click', function() {
  $page.toggleClass('shazam');
});
$('.content').on('click', function() {
  $page.removeClass('shazam');
});
$('.menu_items').on('click', function() {
  $page.removeClass('shazam');
});
