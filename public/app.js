
window.addEventListener('DOMContentLoaded', function() {

    console.log('Is this keeping happening?')

    var view = document.getElementById('view');
    var currentPath = window.location.pathname;


    
    fetchContent(currentPath);

    function changeContent(content) {
        view.innerHTML = content;

        var activeRoutes = Array.from(document.querySelectorAll('[route]'));

        activeRoutes.forEach(function(route) {
            route.addEventListener('click', navigateOnClick, false);
        });
    }

    function fetchContent(route) {

        // default route
        if (route == "/") {
            route = "/one";
        }

        fetch('/views/' + route + '.html', {})
        .then( res => res.text())
        .then((data) => {
            changeContent(data);
        });
    }

    function pushRouteToWindowHistory(currentPath) {
        //console.log(currentPath, window.location.origin + currentPath);
        window.history.pushState({}, currentPath, window.location.origin + currentPath);
    }

    function navigateOnClick(e) {
        var route = event.target.attributes[0].value;
        fetchContent(route);
        pushRouteToWindowHistory(route);

        currentPath = route;

        console.log('Currentpath set to: ' + currentPath);
    };

    window.addEventListener('popstate', function() {
        console.log(window.location.pathname);

        fetchContent(window.location.pathname);
    });
    
})