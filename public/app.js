// Run code when DOM loads
window.addEventListener('DOMContentLoaded', function() {
    console.log("DOM has loaded.");

    // Create variable for main view id and array of all routes
    var view = document.getElementById('view');
    var activeRoutes = Array.from(document.querySelectorAll('[route]'));

    function fetchContent(route) {
        fetch('/views/' + route + '.html', {})
        .then( res => res.text())
        .then((data) => {
             console.log(data);
        });
    }
    
    // Assign route to the value on click, return value, if not a defined route error else show that routes content.
    function navigateOnClick(event) {
        var route = event.target.attributes[0].value;
        fetchContent(route);
        // todo: Fetch content for this route
    };

    // Bind navigate functions to click event of all route buttons
    activeRoutes.forEach(function(route) {
        route.addEventListener('click', navigateOnClick, false);
    });

    // Set variable currentPath to / or /whatever
    var currentPath = window.location.pathname;
    
    // Change content when URL changes
    window.addEventListener('HashChangeEvent', fetchContent(currentPath));
    
})