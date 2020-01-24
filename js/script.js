$(document).ready(function() {
  $('.icon-send').click(function() {
    sendMessage();
  });
  $('#send').keypress(
    function(enter) {
      if (enter.which == 13 || enter.keyCode == 13) {
        sendMessage();
      }
    });
});

function sendMessage() {
  var textMessage = $('#send').val();

  if (textMessage.length != 0) {
    var newMessage = $('.template .message').clone();
    console.log(newMessage);

    newMessage.find('.message-text').text(textMessage);

    var data = new Date();
    var hours = addZero(data.getHours());
    var minutes = addZero(data.getMinutes());
    var time = hours + ':' + minutes;

    newMessage.find('.message-time').text(time);
    newMessage.addClass('sent');
    $('.current-chat-screen').append(newMessage);

    $('#send').val('');
  }
}

function addZero(number) {
  if (number < 10) {
    number = '0' + number;
  }
  return number;
}
