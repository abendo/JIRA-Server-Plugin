var prefs = new gadgets.Prefs(); // Access to UserPref in .xml file

var currYear = new Date().getFullYear(); // Get current year
// Setting the year
var year;
if (prefs.getInt("year") != null) {
    year = prefs.getInt("year"); // Set year
}
// Setting an exception
try {
    if (year < 2017) throw "Year is to low for the corresponding data!";
    if (year > currYear) throw "Year is to large for the corresponding data!";
} catch (err) {
    alert(err);
}

// If is not null (the text) then assign it to the var
var myDateField = "";
if (prefs.getString("datefield") != "") {
    myDateField = prefs.getString("datefield");
}

// Get the Sub-Category
var subCategory = "";
if (prefs.getString("subCategory") != "") {
    subCategory = prefs.getString("subCategory");
}

var filter = "http://url/rest/api/2/search?jql="

var jan_value = filter + myDateField + "%20%3E%3D%20%27" + year + "%2D01%2D01%27%20AND%20" + myDateField + "%20%3C%20%27" + year + "%2D02%2D01%27%20AND%20"; // '>= year-01-01' AND '< year-02-01'
var feb_value = filter + myDateField + "%20%3E%3D%20%27" + year + "%2D02%2D01%27%20AND%20" + myDateField + "%20%3C%20%27" + year + "%2D03%2D01%27%20AND%20"; // '>= year-02-01' AND '< year-03-01'
var mar_value = filter + myDateField + "%20%3E%3D%20%27" + year + "%2D03%2D01%27%20AND%20" + myDateField + "%20%3C%20%27" + year + "%2D04%2D01%27%20AND%20"; // '>= year-03-01' AND '< year-04-01'
var apr_value = filter + myDateField + "%20%3E%3D%20%27" + year + "%2D04%2D01%27%20AND%20" + myDateField + "%20%3C%20%27" + year + "%2D05%2D01%27%20AND%20"; // '>= year-04-01' AND '< year-05-01'
var may_value = filter + myDateField + "%20%3E%3D%20%27" + year + "%2D05%2D01%27%20AND%20" + myDateField + "%20%3C%20%27" + year + "%2D06%2D01%27%20AND%20"; // '>= year-05-01' AND '< year-06-01'
var jun_value = filter + myDateField + "%20%3E%3D%20%27" + year + "%2D06%2D01%27%20AND%20" + myDateField + "%20%3C%20%27" + year + "%2D07%2D01%27%20AND%20"; // '>= year-06-01' AND '< year-07-01'
var jul_value = filter + myDateField + "%20%3E%3D%20%27" + year + "%2D07%2D01%27%20AND%20" + myDateField + "%20%3C%20%27" + year + "%2D08%2D01%27%20AND%20"; // '>= year-07-01' AND '< year-08-01'
var aug_value = filter + myDateField + "%20%3E%3D%20%27" + year + "%2D08%2D01%27%20AND%20" + myDateField + "%20%3C%20%27" + year + "%2D09%2D01%27%20AND%20"; // '>= year-08-01' AND '< year-09-01'
var sep_value = filter + myDateField + "%20%3E%3D%20%27" + year + "%2D09%2D01%27%20AND%20" + myDateField + "%20%3C%20%27" + year + "%2D10%2D01%27%20AND%20"; // '>= year-09-01' AND '< year-10-01'
var oct_value = filter + myDateField + "%20%3E%3D%20%27" + year + "%2D10%2D01%27%20AND%20" + myDateField + "%20%3C%20%27" + year + "%2D11%2D01%27%20AND%20"; // '>= year-10-01' AND '< year-11-01'
var nov_value = filter + myDateField + "%20%3E%3D%20%27" + year + "%2D11%2D01%27%20AND%20" + myDateField + "%20%3C%20%27" + year + "%2D12%2D01%27%20AND%20"; // '>= year-11-01' AND '< year-12-01'
var dec_value = filter + myDateField + "%20%3E%3D%20%27" + year + "%2D12%2D01%27%20AND%20" + myDateField + "%20%3C%3D%20%27" + year + "%2D12%2D31%27%20AND%20"; // '>= year-12-01' AND '<= year-12-31'

var q1_value = filter + myDateField + "%20%3E%3D%20%27" + year + "%2D01%2D01%27%20AND%20" + myDateField + "%20%3C%20%27" + year + "%2D04%2D01%27%20AND%20"; // '>= year-01-01' AND '< year-04-01'
var q2_value = filter + myDateField + "%20%3E%3D%20%27" + year + "%2D04%2D01%27%20AND%20" + myDateField + "%20%3C%20%27" + year + "%2D07%2D01%27%20AND%20"; // '>= year-04-01' AND '< year-07-01'
var q3_value = filter + myDateField + "%20%3E%3D%20%27" + year + "%2D07%2D01%27%20AND%20" + myDateField + "%20%3C%20%27" + year + "%2D10%2D01%27%20AND%20"; // '>= year-07-01' AND '< year-10-01'
var q4_value = filter + myDateField + "%20%3E%3D%20%27" + year + "%2D10%2D01%27%20AND%20" + myDateField + "%20%3C%3D%20%27" + year + "%2D12%2D31%27%20AND%20"; // '>= year-10-01' AND '<= year-12-31'

var myValues = []; // Store the values to build up the graph
var myPeriod = []; // Monthly or Quarterly
var myBenchmark = []; // Values of the benchmark

var countRequest = 0; // A count var for REQ
var myFieldID = ""; // Store the field ID 
var filterJQL = ""; // getURI() function to encode it to html content
var filterName = ""; // Get the filter name

/**
 * There was a bug with the euro symbol (€).
 * For the first iteration it would work fine but after that (after Save the other filters) Nope.
 * 
 * What happend was:
 * input (user) -> ..'€/d'  -> getString returns '€/d' | but stores it as the html entity '&euro;/d' in the text field
 *              -> ..'&euro/d' -> getString return '&euro/d' | but stores it as the html entity '&amp;euro;/d' 
 *  and it goes to a loop. 
 * 
 * Solution:
 * input (user) -> ..'€/d'  -> getString returns '€/d' AND we store it ourself with the .set() command what the getString returns
 *              -> ..'€/d'  -> getString returns '€/d'  -> we store ..'€/d'
 */
var fieldName = gadgets.util.unescapeString(prefs.getString("field"));
prefs.set("field", fieldName);

// Call the function => START    
getFilterName();

/**
 * If you enter a favourite filter, take it's JQL and apply it to the filter var.
 * If you don't enter a favourite filter go to getField() and continue normally.
 */
function getFilterName() {
    if (prefs.getString("filterName") != "") {
        filterName = prefs.getString("filterName");
        getFilterJQL(filterName);
    } else {
        getField();
    }
}

/**
 * Take the list of favourite filters with the REST API stored at favouriteFilterURL
 * Send a REQ and store the JQL to filterJQL to append it later to the filter var
 * AJS.$.ajax() recommended
 */
function getFilterJQL(filterName) {

    var favouriteFilterURL = "http://localhost:8080/rest/api/2/filter/favourite"; 

    AJS.$.ajax({
        url: favouriteFilterURL,
        type: "GET",
        dataType: "json",
        success: function(storeFilter) {
            for (var i = 0; i < storeFilter.length; i++) {
                if (filterName == storeFilter[i]['name']) {
                    filterJQL = storeFilter[i]['jql'];
                    getField();
                    break;
                } else if (i == storeFilter.length - 1 && filterName != storeFilter[i]['name']) {
                    filterJQL = "undefined";
                    alert("Filter you entered does not exist!");
                } else if (storeFilter.length == 0) {
                    alert("You have no favourite filter.");
                }
            }
        }
    });
}

/**
 * -> Create a new request
 * -> Open the request with the specific URL (fieldURL)
 * -> Set the type (.json)
 * -> Specify what to do onload:
 *      store the request (storeRequest)
 *      loop through the elements to find the fieldName
 *      when you find it take its ID and break
 *      if not found alert
 * -> Add an addEventListener('load', ..) which means when is done call this function
 * -> Send the request
 */
function getField() {
    var fieldURL = "http://url/rest/api/2/field";

    var request = new XMLHttpRequest();
    request.open('GET', fieldURL);

    request.responseType = 'json';

    request.onload = function() {
        var storeRequest = request.response;

        for (var i = 0; i < storeRequest.length; i++) {
            if (fieldName == storeRequest[i]['name']) {
                myFieldID = storeRequest[i]['id'];
                break;
            } else if (i == storeRequest.length - 1 && fieldName != storeRequest[i]['name']) {
                myFieldID = "undefined";
                alert("Field you entered does not exist!");
            }
        }
    }
    request.addEventListener('load', getPeriod);

    request.send();
}

/**
 * As the calls and responses are asynchronous by default in JS, it causes to some issues to myValues array.
 * 
 * The values should be in order so can present the graph correctly but asynchronous calls / responses don't allow that,
 * threfore we make each call to a specified month / index 'myMonths[i]' and 'i'
 */
function getPeriod() {
    if (prefs.getString("period") == "Monthly") {
        myPeriod = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var myMonths = [jan_value, feb_value, mar_value, apr_value, may_value, jun_value,
            jul_value, aug_value, sep_value, oct_value, nov_value, dec_value
        ];

        for (var i = 0; i < myMonths.length; i++) {
            getValue(myMonths[i], i); // Calling the function with the URL=Month and Index
        }
    } else if (prefs.getString("period") == "Quarterly") {
        myPeriod = ['1 Quar', '2 Quar', '3 Quar', '4 Quar'];
        var myQuarter = [q1_value, q2_value, q3_value, q4_value];

        for (var i = 0; i < myQuarter.length; i++) {
            getValue(myQuarter[i], i);
        }
    }
}

/**
 * Same approach as getField, instead
 * -> Specify what to do onload:
 *      store the response 'store'
 *      store the total nr of issues 'totalNR'
 *      store the issues list 'issueList'
 * 
 *      if there are no issues add a 0 to the index / month
 *      if there is one issue or more, sum them up and add them to the specific month
 */
function getValue(item, index) {
    if (filterName != "") {
        item += encodeURI(filterJQL);
    } else { // To remove if you don't want Sub-Category
        item += "%22x%22%20%3D%20%22" + encodeURI(subCategory) + "%22%20";
    }
    var request = new XMLHttpRequest();
    request.open('GET', item);

    request.responseType = 'json';

    request.onload = function() {
        var store = request.response;
        var totalNR = store['total'];
        var issueList = store['issues'];

        if (totalNR == 0) {
            myValues[index] = 0;
        } else if (totalNR >= 1) {
            var sum = 0;

            for (var i = 0; i < totalNR; i++) {
                sum += issueList[i]['fields'][myFieldID];
            }
            myValues[index] = sum;
        }
    }

    request.addEventListener('load', onRequestDone);

    request.send();
}

// Simple sumUp function to add the values among months
function sumUp() {
    if (prefs.getString("sumUp") == "Yes") {
        var sumUpField = 0;
        for (var i = 0; i < myValues.length; i++) {
            sumUpField += myValues[i];
            myValues[i] = sumUpField;
        }
    }
}

/**
 * -> Store the value of the benchmark 'storeBenchmark'
 * -> If the period is monthly and you have entered all the values by hand (12 values) *which should be splitted by space
 *      it will split them and add them to myBenchmark array. i.e: [10000, 20000, 30000, ...]
 *      !!! CAREFUL WITH THE SPACES !!! additional spaces will add 0 to the array
 *      If the sumUpBench is set to Yes you have two options
 *          If there is only one value entered it will fill
 *              the array with 12 values summed up to the first one
 *      If the sumUpBench is set to No and there is only one value entered it will fill
 *      the array with 12 values (same values).
 *          If you enter two values then it will add the difference of these two values
 *              to the array. i.e: [0, 10000] -> [0, 10000, 20000, 30000, 40000, 50000]
 *      this is helpful to decide the sumUp value!
 * -> Same approach to the Quarterly period
 */
function getBenchmark() {
    var storeBenchmark;

    storeBenchmark = prefs.getString("benchmark"); // Get benchmark values

    if (prefs.getString("period") == "Monthly") { // If the period is monthly
        // In case you want to input all elements add more than 1 value
        myBenchmark = storeBenchmark.split(' ', 12); // and the string will be splitted in 12 values 
        if (myBenchmark.length == 1) { // You have the option to fill the array with one value (static)
            if (prefs.getString("sumUpBench") == "Yes") {
                for (var i = 2; i < 13; i++) {
                    myBenchmark.push(storeBenchmark * i);
                }
            } else {
                for (var i = 0; i < 11; i++) {
                    myBenchmark.push(storeBenchmark);
                }
            } // You have the option do decide the sumUp value (diff from the sec value with the first)
        } else if (myBenchmark.length == 2) {
            if (prefs.getString("sumUpBench") == "Yes") {
                myBenchmark = storeBenchmark.split(' ', 2);
                var diff = myBenchmark[1] - myBenchmark[0];

                for (var i = 2; i < 12; i++) {
                    // Used parseInt to keep the var in int not in String
                    myBenchmark.push(parseInt(myBenchmark[i - 1]) + parseInt(diff));
                }
            }
        }
    } else if (prefs.getString("period") == "Quarterly") {
        myBenchmark = storeBenchmark.split(' ', 4);

        if (myBenchmark.length == 1) {
            if (prefs.getString("sumUpBench") == "Yes") {
                for (var i = 2; i < 5; i++) {
                    myBenchmark.push(storeBenchmark * i);
                }
            } else {
                for (var i = 0; i < 3; i++) {
                    myBenchmark.push(storeBenchmark);
                }
            }
        } else if (myBenchmark.length == 2) {
            if (prefs.getString("sumUpBench") == "Yes") {
                myBenchmark = storeBenchmark.split(' ', 2);
                // To get the sumUp value, find the diff 
                var diff = myBenchmark[1] - myBenchmark[0];

                for (var i = 2; i < 4; i++) {
                    myBenchmark.push(parseInt(myBenchmark[i - 1]) + parseInt(diff));
                }
            }
        }
    }
}

/**
 * The graph was not loading at the correct time because the JS file was 
 * running before the canvas was read.
 * 
 * Solution:
 * -> Count each request according to the period (monthly / quarterly) and
 *      when the requests are done then load the graph
 */
function onRequestDone() {
    if (prefs.getString("period") == "Monthly" && countRequest == 11) {
        getBenchmark();
        sumUp();
        loadChart();
        gadgets.window.adjustHeight();
    } else if (prefs.getString("period") == "Quarterly" && countRequest == 3) {
        getBenchmark();
        sumUp();
        loadChart();
        gadgets.window.adjustHeight();
    } else {
        countRequest++; // For each call increment by 1
    }
}

var textName = "";
if (subCategory != "") {
    textName = subCategory;
} else {
    textName = filterName;
}

// Using chart.js library to generate the graph
function loadChart() {
    new Chart(document.getElementById('line-chart'), {
        type: 'line',
        data: {
            labels: myPeriod,
            datasets: [{
                    label: year,
                    borderColor: '#9e0606',
                    pointBackgroundColor: '#9e0606',
                    pointBorderColor: 'black',
                    backgroundColor: '#9e0606',
                    fill: false,

                    data: myValues
                },
                {
                    label: 'Benchmark',
                    borderColor: 'orange',
                    pointBackgroundColor: 'orange',
                    pointBorderColor: 'black',
                    backgroundColor: 'orange',
                    fill: false,

                    data: myBenchmark
                }
            ]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: textName + ' (' + year + ')'
            },

            tooltips: {
                mode: 'index',
                intersect: false
            },

            hover: {
                mode: 'nearest',
                intersect: true
            },

            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Period: ' + prefs.getString("period")
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: fieldName
                    }
                }]
            }
        }
    });
}