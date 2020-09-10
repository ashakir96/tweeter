$(document).ready(function() {
  $('#error').hide();
  $('.new-tweet').hide();


 // making text input safe to post

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  const createTweetElement = (tweet) => {
    const $tweet = $(
    `<article class= "tweet"> 
      <header class="random-tweeter">
          <img src=${escape(tweet.user.avatars)}>
          <div class="handle">
            <span> ${escape(tweet.user.name)}</span> 
            <span class="tag">${escape(tweet.user.handle)}</span>
          </div>
      </header>
      <p class="existing-text">${escape(tweet.content.text)}</p>
      <hr>
      <footer>${moment(tweet.created_at).fromNow()} <span class="symbols"> &#127988 	&#128257 	&#128153</span></footer>
    </article>`);
    return $tweet;
  };

  // Adding tweets to the article tag

  const renderTweets = function(tweets) {
    for (let $tweet of tweets) {
      let newTweet = createTweetElement($tweet);
      $("#tweets-container").prepend(newTweet);
    }
  };

  // writing a new tweet: toggle
  
  $("#toggle").on('click', () => {
    $(".new-tweet").slideToggle(1000);
    $("#tweet-text").focus();
  })
  
  // get request from /tweets
  
  const loadTweets = () => {
    $.get('/tweets', (tweet) => {
      renderTweets(tweet);
    })
  };
  
  // loading all tweets when site starts 

  loadTweets();

  // post request to /tweets
  
  const $postTweet = $('#post-tweet');
  $postTweet.on('submit', function (event) {
    event.preventDefault();
    if ($("#tweet-text").val().length >= 140 || $("#tweet-text").val() === "") {
      $("#error").slideDown(1000);
      return;
    }

    const serializedData = $($postTweet).serialize();
    $.post('/tweets', serializedData)
    .then((response) => {
      loadTweets();
      $('textarea').val('');
      $('.counter').val('140');
    }); 
  });

  $("#tweet-text").click(() => {
    $("#error").hide();
  })

});