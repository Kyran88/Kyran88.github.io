var box = document.getElementsByClassName('box')[0];

function startDictation() {

  if (window.hasOwnProperty('webkitSpeechRecognition')) {

    var recognition = new webkitSpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = function(e) {
      var t = setTimeout(function() {
        responsiveVoice.speak(document.getElementById("response").innerHTML);
      }, 1000)

      document.getElementById('transcript').value = e.results[0][0].transcript;
      recognition.stop();
      getword();
      document.getElementById('labnol').submit();

    };

    recognition.onerror = function(e) {
      recognition.stop();
    }

  }
}

//weather

$(document).ready(function() {
  $.simpleWeather({
    location: 'Washington DC',
    woeid: '',
    unit: 'f',
    success: function(weather) {
      html = '<p>' + weather.temp + '&deg;' + weather.units.temp + '</p>';

      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>' + error + '</p>');
    }
  });
});

$(document).ready(function() {

  $(document).bind('keydown', function(e) {
    if (e.keyCode == 13) {
      getword(), box.classList.add('talk');
    }
  });
});

function getword() {
  var input = get("transcript").value,
    frame = get("frame");
  var res = document.getElementById("response");
  if (input.match("hello")) {
    res.innerHTML = "Hi there!";
    box.classList.add('talk');

  } else if (input.match("how", "are")) {
    res.innerHTML = "I am good! what about you?";
    box.classList.add('talk');
  } else if (input.match("feel", "good")) {
    res.innerHTML = "Ok Great!";
    box.classList.add('talk');
  } else if (input.match("am", "good")) {
    res.innerHTML = "Ok Great!";
    box.classList.add('talk');
  } else if (input.match("feel", "bad")) {
    res.innerHTML = "Oh, im sorry.";
    box.classList.add('talk');
  } else if (input.match("I'm", "bad")) {
    res.innerHTML = "Oh, im sorry.";
    box.classList.add('talk');
  } else if (input.match("feel", "not")) {
    res.innerHTML = "Oh, im sorry.";
    box.classList.add('talk');
  } else if (input.match("bye")) {
    res.innerHTML = "Lets talk soon OK?";
    box.classList.add('talk');
  } else if (input.match("night")) {
    res.innerHTML = "Night!";
    box.classList.add('talk');
  } else if (input.match("who", "you")) {
    res.innerHTML = "I'm your personal assistant, how could you forget!";
    box.classList.add('talk');
  } else if (input.match("when", "made")) {
    res.innerHTML = "I was started in 2015 and made by Gi-OS";
    box.classList.add('talk');
  } else if (input.match("is", "what")) {
    res.innerHTML = "Hmm, I'll need time to think that over, come back in about seven and a half milion years and I'll have an answer";
    box.classList.add('talk');
  } else if (input.match("open", "door")) {
    res.innerHTML = "I'm sorry Dave, I'm afraid I can't do that.";
    box.classList.add('talk');
  } else if (input.match("favorite", "color")) {
    res.innerHTML = "My favorite color? Blue of course!";
    box.classList.add('talk');
  } else if (input.match("love", "you")) {
    res.innerHTML = "Aww your such a great friend!";
    box.classList.add('talk');
  } else if (input.match("tired")) {
    res.innerHTML = "Maybe get some more sleep next time!";
    box.classList.add('talk');
  } else if (input.match("let", "talk")) {
    res.innerHTML = "Always Ready!";
    box.classList.add('talk');
  } else if (input.match("what", "on", "thoughts")) {
    res.innerHTML = "Whats that? I don't know much about anything.";
    box.classList.add('talk');
  } else if (input.match("morning")) {
    res.innerHTML = "Morning!";
    box.classList.add('talk');
  } else if (input.match("let", "jam")) {
    res.innerHTML = "Sweet!";
    box.classList.add('talk');

  } else {
    res.innerHTML = "I dont get what you said, please dont use capital letters.";
  }
}

function get(id) {
  return document.getElementById(id);
}
//CHECK CODE
//var t = setInterval(getword, 20)

function emptytime() {
  document.getElementById('txt').value = "";
  document.getElementById('transcript').value = "";

}

function emptyweather() {
  document.getElementById('txt').value = "";
  document.getElementById('transcript').value = "";

}

function Talkback() {
  responsiveVoice.speak(document.getElementById("response").innerHTML);
}

function Talktime() {
  responsiveVoice.speak(document.getElementById("txt").innerHTML);
}
