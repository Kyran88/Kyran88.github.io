/*   Chatbot Assistant Prototype using dialogflow
 */

var accessToken = '32b97368f168447cb5017b64713a9b23';
var baseUrl = 'https://api.api.ai/api/query?v=20150910';
var sessionId = '1234567890';
var loadingMarkups = '<span class=\'loader\'><span class=\'loader__dot\'></span><span class=\'loader__dot\'></span><span class=\'loader__dot\'></span></span>';
var errorMessage = 'My apologies, I\'m not available at the moment. =^.^=';
var urlPattern = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
var loadingDelay = 700;
var aiReplyDelay = 1800;

var $document = document;
var $chatbot = $document.querySelector('.chatbot');
var $chatbotMessageWindow = $document.querySelector('.chatbot__message-window');
var $chatbotHeader = $document.querySelector('.chatbot__header');
var $chatbotMessages = $document.querySelector('.chatbot__messages');
var $chatbotInput = $document.querySelector('.chatbot__input');
var $chatbotSubmit = $document.querySelector('.chatbot__submit');

document.addEventListener('keypress', function (event) {
  if (event.which == 13) {
    validateMessage();
  }
}, false);

$chatbotHeader.addEventListener('click', function () {
  toggle($chatbot, 'chatbot--closed');
  $chatbotInput.focus();
}, false);

$chatbotSubmit.addEventListener('click', function () {
  validateMessage();
}, false);

var toggle = function toggle(element, klass) {
  var classes = element.className.match(/\S+/g) || [],
      index = classes.indexOf(klass);
  index >= 0 ? classes.splice(index, 1) : classes.push(klass);
  element.className = classes.join(' ');
};

var userMessage = function userMessage(content) {
  $chatbotMessages.innerHTML += '<li class=\'is-user animation\'>\n      <p class=\'chatbot__message\'>\n        ' + content + '\n      </p>\n      <span class=\'chatbot__arrow chatbot__arrow--right\'></span>\n    </li>';
};

var aiMessage = function aiMessage(content) {
  var isLoading = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  setTimeout(function () {
    removeLoader();
    $chatbotMessages.innerHTML += '<li \n      class=\'is-ai animation\' \n      id=\'' + (isLoading ? "is-loading" : "") + '\'>\n        <div class="is-ai__profile-picture">\n          <svg class="icon-avatar" viewBox="0 0 32 32">\n            <use xlink:href="#avatar" />\n          </svg>\n        </div>\n        <span class=\'chatbot__arrow chatbot__arrow--left\'></span>\n        <div class=\'chatbot__message\'>\n          ' + content + '\n        </div>\n      </li>';
    scrollDown();
  }, delay);
};

var removeLoader = function removeLoader() {
  var loadingElem = document.getElementById('is-loading');
  if (loadingElem) {
    $chatbotMessages.removeChild(loadingElem);
  }
};

var escapeScript = function escapeScript(unsafe) {
  var safeString = unsafe.replace(/</g, ' ').replace(/>/g, ' ').replace(/&/g, ' ').replace(/"/g, ' ').replace(/\\/, ' ').replace(/\s+/g, ' ');
  return safeString.trim();
};

var linkify = function linkify(inputText) {
  return inputText.replace(urlPattern, '<a href=\'$1\' target=\'_blank\'>$1</a>');
};

var validateMessage = function validateMessage() {
  var text = $chatbotInput.value;
  var safeText = text ? escapeScript(text) : '';
  if (safeText.length && safeText !== ' ') {
    resetInputField();
    userMessage(safeText);
    send(safeText);
  }
  scrollDown();
  return;
};

var multiChoiceAnswer = function multiChoiceAnswer(text) {
  var decodedText = text.replace(/zzz/g, "'");
  userMessage(decodedText);
  send(decodedText);
  scrollDown();
  return;
};

var processResponse = function processResponse(val) {

  removeLoader();

  if (val.fulfillment) {

    var output = '';
    var messagesLength = val.fulfillment.messages.length;

    for (var i = 0; i < messagesLength; i++) {if (window.CP.shouldStopExecution(2)){break;}

      var message = val.fulfillment.messages[i];
      var type = message.type;

      switch (type) {

        // 0 fulfillment is text
        case 0:
          var parsedText = linkify(message.speech);
          output += '<p>' + parsedText + '</p>';
          break;

        // 1 fulfillment is card
        case 1:
          // let imageUrl = message.imageUrl
          // let imageTitle = message.title
          // let imageSubtitle = message.subtitle
          // output += `<img src='${imageUrl}' alt='${imageTitle}${imageSubtitle}' />`
          break;

        // 2 fulfillment is button list
        case 2:
          var title = message.title;
          var replies = message.replies;
          var repliesLength = replies.length;
          output += '<p>' + title + '</p>';

          for (var _i = 0; _i < repliesLength; _i++) {if (window.CP.shouldStopExecution(1)){break;}
            var reply = replies[_i];
            var encodedText = reply.replace(/'/g, 'zzz');
            output += '<button onclick=\'multiChoiceAnswer("' + encodedText + '")\'>' + reply + '</button>';
          }
window.CP.exitedLoop(1);


          break;

        // 3 fulfillment is image
        case 3:
          // console.log('Fulfillment is image - TODO')
          break;
      }
    }
window.CP.exitedLoop(2);


    return output;
  } else {
    return val;
  }
};

var setResponse = function setResponse(val) {
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  setTimeout(function () {
    aiMessage(processResponse(val));
  }, delay);
};

var resetInputField = function resetInputField() {
  $chatbotInput.value = '';
};

var scrollDown = function scrollDown() {
  var distanceToScroll = $chatbotMessageWindow.scrollHeight - ($chatbotMessages.lastChild.offsetHeight + 60);
  $chatbotMessageWindow.scrollTop = distanceToScroll;
  return false;
};

var send = function send() {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  fetch(baseUrl + '&query=' + text + '&lang=en&sessionId=' + sessionId, {
    method: 'GET',
    dataType: 'json',
    headers: {
      Authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json; charset=utf-8'
    }
  }).then(function (response) {
    return response.json();
  }).then(function (res) {
    if (res.status < 200 || res.status >= 300) {
      var error = new Error(res.statusText);
      throw error;
    }
    return res;
  }).then(function (res) {
    setResponse(res.result, loadingDelay + aiReplyDelay);
  }).catch(function (error) {
    setResponse(errorMessage, loadingDelay + aiReplyDelay);
    resetInputField();
    console.log(error);
  });

  aiMessage(loadingMarkups, true, loadingDelay);
};
