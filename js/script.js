$(document).ready(
  function() {
    $('#send').keypress(
      function (event) {
        if (event.which == 13 || event.keyCode == 13 ) {
        var text = $('#send').val();
        $('#send').val('');
        var newText = $('.template .text-message-wrapper').clone();
        newText.find('p').append(text);
        $('.current-chat-screen').append(newText);

        }
      }
    );
  }
);
