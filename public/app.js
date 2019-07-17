// Run code when DOM loads
window.onload = function() {
    console.log("DOM has loaded.");

    // Create variable for main view id and array of all routes
    var view = document.getElementById('view');
    var activeRoutes = Array.from(document.querySelectorAll('[route]'));
    
    // Assign route to the value on click, return value, if not a defined route error else show that routes content.
    function navigate(event) {
        var route = event.target.attributes[0].value;
        var routeInfo = myFirstRouter.routes.filter(function(r) {
            return r.path === route;
        })[0];
        
        if (!routeInfo) {
            window.history.pushState({}, '', '404');
            view.innerHTML = 'No route exists with this path'
        } else {
            window.history.pushState({}, 'name', routeInfo.path);
            view.innerHTML = 'You have clicked the ' + routeInfo.name + ' route';
        }
    };

    // Bind navigate functions to click event of all route buttons
    activeRoutes.forEach(function(route) {
        route.addEventListener('click', navigate, false);
    });

    // Create router
    var Router = function(name, routes) {
        return {
            name: name,
            routes: routes
        }
    };

    // Initialise new router named myFirstRouter
    var myFirstRouter = new Router('myFirstRouter', 
    [
        {
            path: '/one',
            name: 'one'
        },
        {
            path: '/two',
            name: 'two'
        },
        {
            path: '/three',
            name: 'three'
        }
    ]);
    
    // Set variable currentPath to / or /whatever
    var currentPath = window.location.pathname;
    
    // Filter through routes, if currentPath is that route then display that specific content
    var route = myFirstRouter.routes.filter(function(r) {
        return r.path === currentPath
    })[0];
    
    if (route) {
        view.innerHTML = `You are on page ${route.name}`;
    } else {
        // If currentPath doesn't equal a set route, display the 404 page content
        view.innerHTML = '404 - Page not found';
    }
    
}