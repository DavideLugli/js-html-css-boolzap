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
  // per garantire che funzioni anche per elementi creati 'al volo' con js
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
    $('.current-chat-screen.active').append(newMessage);
    scrollChat();
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
      $('.current-chat-screen.active').append(autoReply);
      scrollChat();
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

// funzione che scrolla
// function scrollChat() {
//   var chatHeight = $('.current-chat-screen.active').height();
//
//   $('.current-chat-screen.active').scrollTop(chatHeight);
// }
function scrollChat() {
  var chatHeight = $('.current-chat-screen.active').height();

  $('.chat-container').scrollTop(chatHeight);
}
// cliccando sul contatto si apre chat corrispondente
$(document).on('click', '.account_convo', function() {
  $('.account_convo').removeClass('active');
  $(this).addClass('active');
  var currentChat = $('.current-chat-screen').eq($(this).index());
  var currentImg;
  var currentUserName;
  $('.current-chat-screen').removeClass('active');
  currentChat.addClass('active');
  $('.chat-nav').find('img').remove();
  $('.chat-nav').find('h4').text('');
  currentImg = $(this).find('img').clone();
  $('.chat-nav').prepend(currentImg);
  currentUserName = $(this).find('h4').clone();
  $('.chat-nav h4').append(currentUserName);
});


// cambio icona sul focus input
$('input.send-message').focus(function(){
    $('.icon-send').removeClass('fa fa-microphone').addClass('fab fa-telegram-plane');
  }).blur(function(){
    $('.icon-send').removeClass('fab fa-telegram-plane').addClass('fa fa-microphone');
  });

// cliccando sul contatto mostro chat corrispondente,
// togliendo active all'altra conversazione e aggiungendolo a quella

// $(".account_convo[data-elemt='2']").click(
//   function() {
//     $('.current-chat-screen.active').removeClass('active');
//     var newChat = $(".current-chat-screen[data-elemt='2']");
//     newChat.addClass('active');
//     // rimuovo img e nome
//     $('.chat-nav').find('img').hide();
//     $('.chat-nav').find('h4').hide();
//     // aggiungo nuove imag
//     var newImg = $(".account_convo[data-elemt='2']").child('img.user-avatar');
//     var newName = $(".account_convo[data-elemt='2']").find('h4');
//     $('.chat-nav').show(newImg);
//     $('.chat-nav .chat_notification').show(newName);
//
//
//   }
// );
