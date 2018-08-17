(function () {
    
    "use strict";
    
    function checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    function startTime() {
        var today = new Date(),
            h = today.getHours(),
            m = today.getMinutes(),
            t = setTimeout(startTime, 500),
            lon = " AM";
        
        m = checkTime(m);
        
        if (h > 12) {
            h = (h - 12);
            lon = " PM";
        }
        
        document.getElementById('time').innerHTML = h + ":" + m + " " + lon;
    }
    
    function setLocation() {
        var p, input, text;
        
        p = event.target;

        if (p && p.tagName.toUpperCase() === "P") {
            p.style.display = "none";
            
            text = p.innerHTML;
            
            input = document.createElement("input");
            input.type = "text";
            input.value = "Rome, GA";
            input.name = "location";
            input.size = Math.max(text.length / 4 * 5, 4);
            
            p.parentNode.insertBefore(input, p);

            input.focus();
            
            input.onblur = function () {
                p.parentNode.removeChild(input);
                p.innerHTML = input.value;
                p.style.display = "";
            };
        }
    }
     
    window.onload = function () {
        document.getElementById('location').onclick = setLocation;
        startTime();
    };
    
}());