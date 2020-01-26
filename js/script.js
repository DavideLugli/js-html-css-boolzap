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
  $('input.search-chat').keyup(
    function(backspace) {
      if (backspace.which == 8 || backspace.keyCode == 8) {
        searchChat();
      } else {
        searchChat();
      }
    });
  // funzione mostra/nascondi dropdown con toggle
  $('.message i.message-options').click(
    function() {
      $(this).next().toggle('slow').removeClass('hidden');
    }
  );
  // per elementi creati 'al volo' con js
  $(document).on('click', '.message i.message-options', function() {
    $(this).next().toggle('slow').removeClass('hidden');
  });
  // cancellare Messaggio
  $('.delete-mex').click(
    function() {
      $(this).parents('.message').remove();
    }
  );
  // per elementi creati 'al volo' con js
  $(document).on('click', '.delete-mex', function() {
    $(this).parents('.message').remove();
  })
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


// funzione ricerca chat

function searchChat() {
  var searchFor = $('input.search-chat').val().toLowerCase();
  $(".account_convo").each(function() {
    var accountName = $(this).find('h4').text().toLowerCase();
    if (accountName.includes(searchFor)) {
      $(this).fadeIn();
    } else {
      $(this).fadeOut();
    }
  });
}



// mostra/nascondi dropdown coi click sull'icona, non funzionante

// $('.message i.message-options').click(
//   function() {
//     $(this).next().removeClass('hidden');
//   }
// );
// var dropdownDelete = $('.delete-dropdown');
// if (dropdownDelete.hasClass('hidden') == false) {
//   $('.message i.message-options').click(
//     function() {
//       $(this).next().addClass('hidden');
//     }
//   )
// }
