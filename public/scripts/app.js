/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/


$(document).ready(function() {

// Fake data taken from tweets.json
// var data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": {
//         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//       },
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": {
//         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//       },
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   },
//   {
//     "user": {
//       "name": "Johann von Goethe",
//       "avatars": {
//         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//       },
//       "handle": "@johann49"
//     },
//     "content": {
//       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//     },
//     "created_at": 1461113796368
//   }
// ];

loadTweets();
$('.new-tweet').hide();
$(".compose").click(function(){
    $(".new-tweet").toggle(function(){
      $('.textSpace').select();
    });
});

function renderTweets(tweets) {
  // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
  $('#all-tweet').empty();
  for(var i = 0; i < tweets.length; i++){
    var tweetElement = createTweetElement(tweets[i]);

    $('#all-tweet').prepend(tweetElement);
  }
  return;
}


function createTweetElement(tweet) {
  // var $tweet = $('<article>').addClass('tweet');
  // // ...
  // return $tweet;

  //create an article element
      var $article = $('<article>').addClass('tweet');
      var $header = $('<header>');
      var $img = $(`<img src="${tweet.user.avatars.small}">`);
      var $username = $('<p>').addClass('username');
      var $userfields = $('<p>').addClass('userfields');
      var $content = $('<p>').addClass('content');
      var $footer = $('<footer>');
      //days is the p tag
      var $days = $('<p>');
      var $heart = $('<i>').addClass('fa fa-heart fa-lag');
      var $flag = $('<i>').addClass('fa fa-flag fa-lag');
      var $bell = $('<i>').addClass('fa fa-bell fa-lag');

      $username.text(tweet.user.name);
      $userfields.text(tweet.user.handle);
      $content.text(tweet.content.text);
      $days.text(moment(tweet.created_at).fromNow());

      $header.append($img);
      $header.append($username);
      $header.append($userfields);
      $footer.append($days);
      $footer.append($heart);
      $footer.append($flag);
      $footer.append($bell);

      $article.append($header);
      $article.append($content);
      $article.append($footer);


      return $article;
}

//renderTweets(data);

$( ".tweetForm" ).submit(function( event ) {

  event.preventDefault();

  var tweetLength = $('.textSpace').val().length;

  if(tweetLength === 0 || tweetLength > 140){
    // alert("Invalid input length");
    // return;
    $('#Error').slideDown(function() {
    setTimeout(function() {
        $('#Error').slideUp();
    }, 5000);
    });
  }
  else{

      $.ajax({
        method: "POST",
        url: '/tweets',
        data: $(this).serialize()
      }).done(loadTweets);

  }

      // coffeesList.empty();
      // for (var id in coffees) {
      //   var li = $('<li>');
      //   li.text(coffees[id].type);
      //   coffeesList.prepend(li);
      // }

});

 function loadTweets(){
    $.ajax({
      method: 'GET',
      url: '/tweets'
    }).done(function(data) {
      renderTweets(data);
    })
  }

});

