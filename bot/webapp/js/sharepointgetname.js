ExecuteOrDelayUntilScriptLoaded(init,'sp.js');
var currentUser;
var title;
var trimmed;
var titleAry;
var currentDate;
var currentHours;

function init(){
    this.clientContext = new SP.ClientContext.get_current();
    this.oWeb = clientContext.get_web();
    currentUser = clientContext.get_web().get_currentUser();
    this.clientContext.load(currentUser);
    this.clientContext.executeQueryAsync(Function.createDelegate(this,this.onQuerySucceeded),Function.createDelegate(this,this.onQueryFailed));
}

 function onQuerySucceeded() {
    currentDate = new Date();
    currentHours = currentDate.getHours();
    if (currentHours >= 5 && currentHours < 12) { greeting = "Good morning"; }
    else if (currentHours >= 12 && currentHours <= 17) { greeting = "Good afternoon"; }
    else if (currentHours < 5 || currentHours > 17) { greeting = "Good evening"; }

    title = currentUser.get_title();
    trimmed = title.replace(/^\s+|\s+$/g, '');
    titleAry = trimmed.split(" ");
    document.getElementById('userTitle').innerHTML = greeting + ", " + titleAry[0] + "." + " Please select which library you would like to access below.";
}

 function onQueryFailed(sender, args) {
    alert('Request failed. \nError: ' + args.get_message() + '\nStackTrace: ' + args.get_stackTrace());
}
