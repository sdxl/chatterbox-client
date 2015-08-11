// YOUR CODE HERE:
var app= {};


app.server = 'https://api.parse.com/1/classes/chatterbox';

app.init = function(){

};

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

  var fetchedObj = $.ajax({
    url: app.server,
    type: 'GET',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      app.addSelector(data);            //add selector choice on load after fetch
      // app.postMessages(data);
      var datum = data;
      // console.log(datum)
      // console.log(data)
      console.log('chatterbox: Message sent');

    },
    error: function (data) {
    console.error('chatterbox: Failed to send message');
  }
});
  return fetchedObj;
}


app.addMessage =function(message){
  //gets txt property, appends to chat box
   var $post = $('<div class= chat>@'+ message.username + ' ' + message.text + '</div>')
   $("#chats").append($post)
   app.send(message);
   console.log(message.roomname);
   console.log(app.fetch());
}


app.clearMessages = function(){
  $('#chats').empty()     //takes out children and text chats
}


app.postMessages = function(data){
  console.log(data, "now posting")                    //posts messages from data called by app.fetch (refactor?)
   // console.log(data.responseJSON.results.length, "helloooo")
   for(var i=0; i< data.length; i++){
   var $chat = '<div class=chat>' +
        data[i].username + " " + data[i].text + " "+ data[i].createdAt+"</div>";
          $('#chats').append($chat);
         console.log($chat)
       }
} //

app.addSelector = function(data){                //posts room from data called by app.fetch (on load)
    var roomName = {}

    for (var i = 0; i<data.results.length; i++){
      if(roomName[data.results[i].roomname]=== undefined ){
        roomName[data.results[i].roomname] = data.results[i].roomname;
      }
    }
    console.log(roomName)
    for (var key in roomName){
    var $room = $('<option value =' +roomName[key]+ ' class = room>' + roomName[key] + '</option>')
    $('select').append($room);
  }
}

var currentRoom = "yo yo yo"

 var message = {
  username: window.location.search.substr(10),
  text: undefined,
  roomname: currentRoom
  }

 var totalPosts = app.fetch();
$(document).ready(function(){


$('select').on('change',function(){
  var currentRoom  = $(this).val()
  console.log(currentRoom)
  app.clearMessages();
  // var fetchObj = app.fetch(); //gets AJAX object
  // var directData = fetchObj.responseJSON.results //gets AJAX results
  console.log(totalPosts, 'jon')
  var rooms = _.filter(totalPosts.responseJSON.results, function(datum){
    return datum.roomname === currentRoom;
  })
   app.postMessages(rooms);
})


$("#input").on('click', function(){
    message.text = $("input").val()
    console.log('clicked', message);
    message.roomname = currentRoom;
    app.addMessage(message);
    console.log(message.text)
})

$("#clear").on("click", function(){
  app.clearMessages();
  console.log('clear')
})

$("#newMessages").on('click', function(){

  console.log(totalPosts)
  var posted = totalPosts.responseJSON.results;
  console.log("hi", posted);
  app.postMessages(posted);
  console.log('clicked');
})


})
