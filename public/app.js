// Run code when DOM loads
window.addEventListener('DOMContentLoaded', function() {
    console.log("DOM has loaded.");

    // Create variable for main view id and array of all routes
    var view = document.getElementById('view');
    var currentPath = window.location.pathname;

    fetchContent(currentPath);

    function changeContent(content) {
        view.innerHTML = content;
    }

    function fetchContent(route) {
        // Set variable currentPath to / or /whatever
        currentPath = window.location.pathname;

        console.log('After fetch content currentPath is: ' + currentPath);

        fetch('/views/' + route + '.html', {})
        .then( res => res.text())
        .then((data) => {
            changeContent(data);
            pushRouteToWindowHistory(route);
        });
    }

    function pushRouteToWindowHistory(currentPath) {
        window.history.pushState({}, currentPath, window.location.origin + currentPath);
    }

    // Assign route to the value on click, return value, if not a defined route error else show that routes content.
    function navigateOnClick(event) {
        var route = event.target.attributes[0].value;
        fetchContent(route);
        // todo: Fetch content for this route
    };

    var activeRoutes = Array.from(document.querySelectorAll('[route]'));
    
    // Bind navigate functions to click event of all route buttons
    activeRoutes.forEach(function(route) {
        route.addEventListener('click', navigateOnClick, false);
    });

    window.addEventListener('popstate', fetchContent(currentPath));
    
})