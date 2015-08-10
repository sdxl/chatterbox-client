// YOUR CODE HERE:
var app= {};


app.server = 'https://api.parse.com/1/classes/chatterbox';

app.init = function(){};

app.send = function(message){

  $.ajax({
  url: 'https://api.parse.com/1/classes/chatterbox',
  type: 'POST',
  data: JSON.stringify(message),
  contentType: 'application/json',
  success: function (data) {
    console.log('chatterbox: Message sent');
  },
  error: function (data) {
    console.error('chatterbox: Failed to send message');
    }
  });

};

app.fetch = function(){
  $.ajax({
    url: app.server,
    type: 'GET',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
       for(var i=0; i< data.results.length; i++){
         var $chat = '<div class=chatText>' +
                   data.results[i].username + " " + data.results[i].text
                   + "</div>";
          $('#chats').append($chat);
         console.log($chat)
       }

      console.log('chatterbox: Message sent');

    },
    error: function (data) {
    console.error('chatterbox: Failed to send message');
  }
});

};

app.addMessage =function(message){
  //gets txt property, appends to chat box
   var $post = $('<div class= chatText>@'+message.username+ ' ' + message.text + '</div>')
   $("#chats").append($post)
   app.send(message);
   console.log(message)
}

app.clearMessages = function(){
  $('#chats').empty()
}


app.postMessages = function(){
  var messages = app.fetch(); // fetch messages
      _.each(messages, function(item){
         var $chat = '<div class="chatText">'+
                     item.username + ' ' + item.text
                      +'</div>'
        console.log($chat);
        $('chats').prepend($chat)

      })
} //


 var message = {
  username: window.location.search.substr(10),
  text: undefined,
  roomname: undefined
  }


$(document).ready(function(){

$("#input").on('click', function(){
    message.text = $("input").val()
    app.addMessage(message)
    console.log(message.text)
})

$("#clear").on("click", function(){
  app.clearMessages();
  console.log('clear')
})

$("#newMessages").on('click', function(){
  app.fetch()
  console.log('clicked')
})


})
