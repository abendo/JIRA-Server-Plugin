(function() {

    var gadget = AJS.Gadget({
        baseUrl: "__ATLASSIAN_BASE_URL__",
        useOauth: "/rest/gadget/1.0/currentUser",

        view: {
            enableReload: true,
            onResizeReload: true,
            onResizeAdjustHeight: true,

            template: function(args) {

                /*============================================================= TITLE FUNCTION =============================================================*/

                var gad_title = [{
                    id: "gadget-key",
                    title: ""
                }];

                gad_title.forEach(function(item) {
                    var element = parent.document.getElementById(item.id); // element is the title we insert                
                    if (element) { // If there is an input, title = element
                        item.title = prefs.getString("name"); // prefs.getString() is a JS function, Gadget API
                    }
                });

                /*============================================================= INTERVAL-REFRESH FUNCTION =============================================================*/

                var prefs = new gadgets.Prefs(); // Gadget API, to connect with the UserPref field

                if (prefs.getString("refresh") == "Never") {
                    return;
                } else if (prefs.getString("refresh") == "Every 15 min") {
                    setInterval('window.location.reload()', 900000); // Time is in milliseconds
                } else if (prefs.getString("refresh") == "Every 30 min") {
                    setInterval('window.location.reload()', 1800000);
                } else if (prefs.getString("refresh") == "Every 1 hour") {
                    setInterval('window.location.reload()', 3600000);
                } else if (prefs.getString("refresh") == "Every 2 hours") {
                    setInterval('window.location.reload()', 7200000);
                } else if (prefs.getString("refresh") == "Every day") {
                    setInterval('window.location.reload()', 86400000);
                }
            }
        }
    });
    gadgets.window.adjustHeight();
})();