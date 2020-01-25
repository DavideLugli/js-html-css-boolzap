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
    newMessage.find('.message-text').text(textMessage);
    // aggiungo ora corrente al messaggio
    var data = new Date();
    var hours = addZero(data.getHours());
    var minutes = addZero(data.getMinutes());
    var time = hours + ':' + minutes;
    newMessage.find('.message-time').text(time);
    // aggiungo classe sent e testo del messaggio
    newMessage.addClass('sent');
    $('.current-chat-screen').append(newMessage);
    // svuoto l'input
    $('#send').val('');
    // funzione di risposta automatica dopo 1 sec
    setTimeout(function() {
      var autoReply = $('.template .message').clone();
      autoReply.find('.message-text').text('Fantastico!');
      var data = new Date();
      var hours = addZero(data.getHours());
      var minutes = addZero(data.getMinutes());
      var time = hours + ':' + minutes;
      autoReply.find('.message-time').text(time);
      autoReply.addClass('received');
      $('.current-chat-screen').append(autoReply);
    }, 1000);
  }
}

// aggiunge uno 0 ai minuti nell'ora nel caso i minuti attuali siano <10
function addZero(number) {
  if (number < 10) {
    number = '0' + number;
  }
  return number;
}
