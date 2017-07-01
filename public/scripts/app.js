/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$(function() {

  loadTweets();

  // requirement was to have it initially hidden
  // this will find the box and hide it from view
  $('.new-tweet').hide();

  $(".compose").on('click', function() {
    $(".new-tweet").toggle(function() {
      $('.textSpace').select();
    });
  });

  // $(".compose").click(function() {
  //     $(".new-tweet").toggle(function(){
  //       $('.textSpace').select();
  //     });
  // });

  function renderTweets(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
    $('#all-tweet').empty();
    for(var i = 0; i < tweets.length; i++){
      var tweetElement = createTweetElement(tweets[i]);
      $('#all-tweet').prepend(tweetElement);
    }
  }


  function createTweetElement(tweet) {
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

  function doXHR(url, method, data) {
    return $.ajax({ method: method, url: url, data: data})
  }

  function request() {
    return {
      createTweet: function(newTweet) {
        return doXHR('/tweets', "POST", newTweet);
        // return $.ajax({
        //   method: "POST",
        //   url: '/tweets',
        //   data: newTweet
        // })

      },
      getTweets: function() {
        return doXHR('/tweets', 'GET');
        // return $.ajax({
        //   method: 'GET',
        //   url: '/tweets'
        // })
      }
    }
  }

  // using ajax to submit form contents instead of traditional form submit
  // which would refresh the page (thats why we do preventdefault)
  $( ".tweetForm" ).submit(function( event ) {
    event.preventDefault();
    var tweetLength = $('.textSpace').val().length;

    if(tweetLength === 0 || tweetLength > 140){
      var $error = $('#Error');
      $error.slideDown(function() {
        setTimeout(function() {
          $error.slideUp();
        }, 5000);
      });
    } else{
      var newTweet = $(this).serialize();
      request().createTweet(newTweet)
             .then(loadTweets);
        // $.ajax({
        //   method: "POST"
        //   url: '/tweets',
        //   data: $(this).serialize()
        // }).done(loadTweets);

    }

        // coffeesList.empty();
        // for (var id in coffees) {
        //   var li = $('<li>');
        //   li.text(coffees[id].type);
        //   coffeesList.prepend(li);
        // }

  });

  function loadTweets(){
    request().getTweets()
           .then(renderTweets);
  }

});

