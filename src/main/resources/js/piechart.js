var prefs = new gadgets.Prefs(); // Getting acces to UserPref 

var currYear = new Date().getFullYear();
// Setting the year
var year;
if (prefs.getInt("year") != "") {
    year = prefs.getInt("year");
}
// Setting an exception
try {
    if (year < 2017) throw "Year is to low for the corresponding data!";
    if (year > currYear) throw "Year is to large for the corresponding data!";
} catch (err) {
    alert(err);
}

// If is not null (the text) then assign it to the var
var myDateField = ""; // myDateField to store the value (i.e.: resolutiondate, duedate...)
if (prefs.getString("datefield") != "") {
    myDateField = prefs.getString("datefield");
} else {
    alert("Please enter a Date Field.");
}

// Here can be entered the url of your work
var filter = "http://url/rest/api/2/search?jql=";

// Here can be entered the html format of the url
// i.e.:
var x = filter + "" + myDateField + "" + year + "" + myDateField + "" + year + "";
var y = filter + "" + myDateField + "" + year + "" + myDateField + "" + year + "";

var mySubCategories = [x, y]; // Array of Sub-Categories
var myValues = []; // Values stored

var countRequests = 0;
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
 * 
 * Here is an implementation of AJS.$.ajax() req. -> recommended
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
 * url -> is your work url (i.e.:jira.xyz.local)
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
    request.addEventListener('load', callMyValues);

    request.send();
}

function callMyValues() {
    for (var i = 0; i < mySubCategories.length; i++) {
        getValue(mySubCategories[i], i);
    }
}

function getValue(item, index) {
    if (filterName != "") {
        item += "%20AND%20" + encodeURI(filterJQL);
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

    request.addEventListener('load', onRequestDone); // Keep track when is done

    request.send();
}

function onRequestDone() {
    if (countRequests == 4) {
        effortGadget();
        gadgets.window.adjustHeight();
    } else {
        countRequests++;
    }
}

function effortGadget() {
    new Chart(document.getElementById('pie-chart'), {
        type: 'doughnut',
        data: {
            labels: ['x', 'y'],
            datasets: [{
                weight: 2,
                backgroundColor: ['#7d818c', '#076911', '#9e0606', '#0761ab', '#e6ed1c'],
                hoverBorderWidth: 2,

                data: myValues
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Year (' + year + ')'
            },
            cutoutPercentage: 30,

            legend: {
                position: 'top'
            }
        }
    });
}