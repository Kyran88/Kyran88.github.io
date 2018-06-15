$(document).ready(function() {

    //Set variables for use

    var weight = 0;
    var fiveSecPower = 0;
    var sixtySecPower = 0;
    var fiveMinPower = 0;
    var sixtyMinPower = 0;
    var gender = "";
    var fiveSecRatio = 0;
    var sixtySecRatio = 0;
    var fiveMinRatio = 0;
    var sixtyMinRatio = 0;
    var highlight;

    //Five seconds for men

    var maleFiveSecondArray = [
        [39, 13.71],
        [38, 13.98],
        [37, 14.25],
        [36, 14.52],
        [35, 14.79],
        [34, 15.07],
        [33, 15.34],
        [32, 15.61],
        [31, 15.88],
        [30, 16.15],
        [29, 16.43],
        [28, 16.7],
        [27, 16.97],
        [26, 17.24],
        [25, 17.51],
        [24, 17.79],
        [23, 18.06],
        [22, 18.33],
        [21, 18.16],
        [20, 18.87],
        [19, 19.15],
        [18, 19.42],
        [17, 19.69],
        [16, 19.96],
        [15, 20.23],
        [14, 20.51],
        [13, 20.78],
        [12, 21.05],
        [11, 21.32],
        [10, 21.59],
        [9, 21.86],
        [8, 22.14],
        [7, 22.41],
        [6, 22.68],
        [5, 22.95],
        [4, 23.22],
        [3, 23.5],
        [2, 23.77],
        [1, 24.04]
    ];

    function changeMaleFiveSeconds() {
        for (var i = 0; i < maleFiveSecondArray.length; i++) {
            if (maleFiveSecondArray[i][1] <= fiveSecRatio) {
                highlight = maleFiveSecondArray[i][0];
                clearThenHighlight(".male-5s", "#male-5s-");
            }
        }
    }

    //Sixty seconds for men

    var maleSixtySecondArray = [
        [39, 7.13],
        [38, 7.25],
        [37, 7.36],
        [36, 7.48],
        [35, 7.59],
        [34, 7.71],
        [33, 7.82],
        [32, 7.94],
        [31, 8.05],
        [30, 8.17],
        [29, 8.28],
        [28, 8.40],
        [27, 8.51],
        [26, 8.63],
        [25, 8.74],
        [24, 8.86],
        [23, 8.97],
        [22, 9.09],
        [21, 9.20],
        [20, 9.32],
        [19, 9.43],
        [18, 9.55],
        [17, 9.66],
        [16, 9.78],
        [15, 9.89],
        [14, 10.01],
        [13, 10.12],
        [12, 10.24],
        [11, 10.35],
        [10, 10.47],
        [9, 10.58],
        [8, 10.70],
        [7, 10.81],
        [6, 10.93],
        [5, 11.04],
        [4, 11.16],
        [3, 11.27],
        [2, 11.39],
        [1, 11.50]
    ];

    function changeMaleSixtySeconds() {
        for (var i = 0; i < maleSixtySecondArray.length; i++) {
            if (maleSixtySecondArray[i][1] <= sixtySecRatio) {
                highlight = maleSixtySecondArray[i][0];
                clearThenHighlight(".male-60s", "#male-60s-");
            }
        }
    }

    //Five mins for me

    var maleFiveMinutesArray = [
        [39, 3.67],
        [38, 3.77],
        [37, 3.88],
        [36, 3.98],
        [35, 4.08],
        [34, 4.19],
        [33, 4.29],
        [32, 4.39],
        [31, 4.50],
        [30, 4.60],
        [29, 4.70],
        [28, 4.81],
        [27, 4.91],
        [26, 5.01],
        [25, 5.12],
        [24, 5.22],
        [23, 5.33],
        [22, 5.43],
        [21, 5.53],
        [20, 5.64],
        [19, 5.74],
        [18, 5.84],
        [17, 5.95],
        [16, 6.05],
        [15, 6.15],
        [14, 6.26],
        [13, 6.36],
        [12, 6.46],
        [11, 6.57],
        [10, 6.67],
        [9, 6.77],
        [8, 6.88],
        [7, 6.98],
        [6, 7.08],
        [5, 7.19],
        [4, 7.29],
        [3, 7.39],
        [2, 7.50],
        [1, 7.60]
    ];

    function changeMaleFiveMinutes() {
        for (var i = 0; i < maleFiveMinutesArray.length; i++) {
            if (maleFiveMinutesArray[i][1] <= fiveMinRatio) {
                highlight = maleFiveMinutesArray[i][0];
                clearThenHighlight(".male-5m", "#male-5m-");
            }
        }
    }

    //Sixty mins for men

    var maleSixtyMinutesArray = [
        [39, 3.02],
        [38, 3.11],
        [37, 3.20],
        [36, 3.29],
        [35, 3.38],
        [34, 3.47],
        [33, 3.55],
        [32, 3.64],
        [31, 3.73],
        [30, 3.82],
        [29, 3.91],
        [28, 4.00],
        [27, 4.09],
        [26, 4.18],
        [25, 4.27],
        [24, 4.35],
        [23, 4.44],
        [22, 4.53],
        [21, 4.62],
        [20, 4.71],
        [19, 4.80],
        [18, 4.89],
        [17, 4.98],
        [16, 5.07],
        [15, 5.15],
        [14, 5.24],
        [13, 5.33],
        [12, 5.42],
        [11, 5.51],
        [10, 5.60],
        [9, 5.69],
        [8, 5.78],
        [7, 5.87],
        [6, 5.96],
        [5, 6.04],
        [4, 6.13],
        [3, 6.22],
        [2, 6.31],
        [1, 6.40],
    ];

    function changeMaleSixtyMinutes() {
        for (var i = 0; i < maleSixtyMinutesArray.length; i++) {
            if (maleSixtyMinutesArray[i][1] <= sixtyMinRatio) {
                highlight = maleSixtyMinutesArray[i][0];
                clearThenHighlight(".male-60m", "#male-60m-");
            }
        }
    }

    //For women

    //Five secs for women

    var femaleFiveSecondArray = [
        [39, 11.23],
        [38, 11.45],
        [37, 11.66],
        [36, 11.88],
        [35, 12.09],
        [34, 12.31],
        [33, 12.52],
        [32, 12.74],
        [31, 12.95],
        [30, 13.17],
        [29, 13.39],
        [28, 13.60],
        [27, 13.82],
        [26, 14.03],
        [25, 14.25],
        [24, 14.46],
        [23, 14.68],
        [22, 14.89],
        [21, 15.11],
        [20, 15.32],
        [19, 15.54],
        [18, 15.78],
        [17, 15.97],
        [16, 16.19],
        [15, 16.40],
        [14, 16.62],
        [13, 16.83],
        [12, 17.05],
        [11, 17.26],
        [10, 17.48],
        [9, 17.70],
        [8, 17.91],
        [7, 18.13],
        [6, 18.34],
        [5, 18.56],
        [4, 18.77],
        [3, 18.99],
        [2, 19.20],
        [1, 19.42],
    ];

    function changeFemaleFiveSeconds() {
        for (var i = 0; i < femaleFiveSecondArray.length; i++) {
            if (femaleFiveSecondArray[i][1] <= fiveSecRatio) {
                highlight = femaleFiveSecondArray[i][0];
                clearThenHighlight(".female-5s", "#female-5s-");
            }
        }
    }

    //Sixty secs for women

    var femaleSixtySecondArray = [
        [39, 5.66],
        [38, 5.76],
        [37, 5.85],
        [36, 5.94],
        [35, 6.03],
        [34, 6.12],
        [33, 6.21],
        [32, 6.30],
        [31, 6.39],
        [30, 6.48],
        [29, 6.75],
        [28, 6.84],
        [27, 6.93],
        [26, 7.02],
        [25, 7.11],
        [24, 7.21],
        [23, 7.30],
        [22, 7.39],
        [21, 7.48],
        [20, 7.57],
        [19, 7.66],
        [18, 7.75],
        [17, 7.84],
        [16, 7.93],
        [15, 8.02],
        [14, 8.11],
        [13, 8.20],
        [12, 8.29],
        [11, 8.38],
        [10, 8.47],
        [9, 8.56],
        [8, 8.66],
        [7, 8.75],
        [6, 8.84],
        [5, 8.93],
        [4, 9.02],
        [3, 9.11],
        [2, 9.20],
        [1, 9.29],
    ];

    function changeFemaleSixtySeconds() {
        for (var i = 0; i < femaleSixtySecondArray.length; i++) {
            if (femaleSixtySecondArray[i][1] <= sixtySecRatio) {
                highlight = femaleSixtySecondArray[i][0];
                clearThenHighlight(".female-60s", "#female-60s-");
            }
        }
    }

    //Five mins for women

    var femaleFiveMinutesArray = [
        [39, 3.09],
        [38, 3.19],
        [37, 3.28],
        [36, 3.37],
        [35, 3.46],
        [34, 3.56],
        [33, 3.65],
        [32, 3.74],
        [31, 3.83],
        [30, 3.93],
        [29, 4.02],
        [28, 4.11],
        [27, 4.20],
        [26, 4.30],
        [25, 4.39],
        [24, 4.48],
        [23, 4.57],
        [22, 4.67],
        [21, 4.76],
        [20, 4.85],
        [19, 4.94],
        [18, 5.04],
        [17, 5.13],
        [16, 5.22],
        [15, 5.31],
        [14, 5.41],
        [13, 5.50],
        [12, 5.59],
        [11, 5.68],
        [10, 5.78],
        [9, 5.87],
        [8, 5.96],
        [7, 6.05],
        [6, 6.15],
        [5, 6.24],
        [4, 6.33],
        [3, 6.42],
        [2, 6.52],
        [1, 6.61],
    ];

    function changeFemaleFiveMinutes() {
        for (var i = 0; i < femaleFiveMinutesArray.length; i++) {
            if (femaleFiveMinutesArray[i][1] <= fiveMinRatio) {
                highlight = femaleFiveMinutesArray[i][0];
                clearThenHighlight(".female-5m", "#female-5m-");
            }
        }
    }

    //Sixty mins for women

    var femaleSixtyMinutesArray = [
        [39, 2.57],
        [38, 2.65],
        [37, 2.73],
        [36, 2.82],
        [35, 2.90],
        [34, 2.98],
        [33, 3.06],
        [32, 3.14],
        [31, 3.23],
        [30, 3.31],
        [29, 3.39],
        [28, 3.47],
        [27, 3.55],
        [26, 3.64],
        [25, 3.72],
        [24, 3.80],
        [23, 3.88],
        [22, 3.97],
        [21, 4.05],
        [20, 4.13],
        [19, 4.21],
        [18, 4.29],
        [17, 4.38],
        [16, 4.46],
        [15, 4.54],
        [14, 4.62],
        [13, 4.70],
        [12, 4.79],
        [11, 4.87],
        [10, 4.95],
        [9, 5.03],
        [8, 5.12],
        [7, 5.20],
        [6, 5.28],
        [5, 5.36],
        [4, 5.44],
        [3, 5.53],
        [2, 5.61],
        [1, 5.69],
    ];

    function changeFemaleSixtyMinutes() {
        for (var i = 0; i < femaleSixtyMinutesArray.length; i++) {
            if (femaleSixtyMinutesArray[i][1] <= sixtyMinRatio) {
                highlight = femaleSixtyMinutesArray[i][0];
                clearThenHighlight(".female-60m", "#female-60m-");
            }
        }
    }

    //Declaring a function for clearing then highlighting the relevant cells as we iterate over the table values.

    function clearThenHighlight(ratioClass, ratioID) {
        $(ratioClass).removeClass('greenBg');
        $(ratioID + highlight).addClass('greenBg');
    }

    // Change relevant cell background colors
    function run() {
        $("#results").show();
        console.log(gender);
        if (gender === "Female") {
            changeFemaleFiveSeconds();
            changeFemaleSixtySeconds();
            changeFemaleFiveMinutes();
            changeFemaleSixtyMinutes();
        } else if (gender === "Male") {
            changeMaleFiveSeconds();
            changeMaleSixtySeconds();
            changeMaleFiveMinutes();
            changeMaleSixtyMinutes();
        }
    }

    //On submitting the form, variables set to the correct ratio
    $("#results").hide();
    $("#submitInfo").submit(function() {
        weight = parseInt($("#weight").val());
        gender = $('input[name="gender"]:checked').val();
        fiveSecPower = parseInt($("#fiveSecPower").val());
        sixtySecPower = parseInt($("#sixtySecPower").val());
        fiveMinPower = parseInt($("#fiveMinPower").val());
        sixtyMinPower = parseInt($("#sixtyMinPower").val());

        //Set power ratios

        fiveSecRatio = (fiveSecPower / weight).toFixed(2);
        sixtySecRatio = (sixtySecPower / weight).toFixed(2);
        fiveMinRatio = (fiveMinPower / weight).toFixed(2);
        sixtyMinRatio = (sixtyMinPower / weight).toFixed(2);

        //Clear previous highlights every time we click submit again

        $(".male-5s, .male-60s, .male-5m, .male-60m, .female-5s, .female-60s, .female-5m, .female-60m").removeClass('greenBg');

        //Only run the function if all data fields completed, else return alert

        if (fiveSecRatio === "NaN" || sixtySecRatio === "NaN" || fiveMinRatio === "NaN" || sixtyMinRatio === "NaN") {
            alert("You must enter all of your information to continue.");
        } else {

            run();

            //display power ratios

            $("#fiveSecRatio").html("<b>5 Second Power Ratio:</b> <br>" + fiveSecRatio + " w/kg");
            $("#sixtySecRatio").html("<b>60 Second Power Ratio:</b> <br>" + sixtySecRatio + " w/kg");
            $("#fiveMinRatio").html("<b>5 Minute Power Ratio:</b> <br>" + fiveMinRatio + " w/kg");
            $("#sixtyMinRatio").html("<b>60 Minute Power Ratio:</b> <br>" + sixtyMinRatio + " w/kg");
            return false;

        }
    });
});
