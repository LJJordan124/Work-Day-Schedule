var currentDay = $('#currentDay');
var now = dayjs();
var alert = $('.alert');
var timeBlocks = $('.time-block');
var hour9 = $('#hour-9');
var hour10 = $('#hour-10');
var hour11 = $('#hour-11');
var hour12 = $('#hour-12');
var hour13 = $('#hour-13');
var hour14 = $('#hour-14');
var hour15 = $('#hour-15');
var hour16 = $('#hour-16');
var hour17 = $('#hour-17');
var saveBtn = $('.saveBtn');

$(function () {
  // Date and Time //
  currentDay.text(now.format('dddd, MMMM D, YYYY h:mm A'));
  setInterval(function() {
    now = dayjs();
    currentDay.text(now.format('dddd, MMMM D, YYYY h:mm A'));
  }, 1000);
  saveBtn.on('click', function (event) {
    event.preventDefault();
    var input = $(this).siblings('textarea').val();
    var timeBlockId = $(this).closest('.time-block').attr('id');
    localStorage.setItem(timeBlockId, input);
    alert.removeClass('d-none').addClass('d-flex');
    });
    $('.btn-close').on('click', function() {
      alert.addClass('d-none').removeClass('d-flex');
  });
    
  // Past, Present, Future according to the current time //
  timeBlocks.each(function () {
    var hour = parseInt($(this).attr('id').match(/\d+/)[0]);
    if (hour < now.hour()) {
      $(this).addClass('past');
      } else if (hour === now.hour()) {
        $(this).addClass('present');
      } else {
        $(this).addClass('future');
      }
  });

  // Textarea Elements //
  timeBlocks.each(function () {
    var timeBlockId = $(this).attr('id');
    var input = localStorage.getItem(timeBlockId);
    $(this).find('textarea').val(input);
  }); 

  // Clear Button w/ user confirmation //
  $('#clearBtn').on('click', function() {
    if (confirm('Are you sure you want to clear your entire schedule?')) {
      localStorage.clear();
      location.reload();
    }
  });
});