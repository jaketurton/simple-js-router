
window.addEventListener('DOMContentLoaded', function() {
    
    caches.open('test-cache').then(function(cache) {
        console.log("cache created");
    });

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

        caches.match('/views' + route + '.html').then(function(response) {
            console.log(response);

            if (response) {
                console.log('Cache found for /views' + route + '.html');
                console.log(response);
                fetch(response, {})
                .then( res => res.text())
                .then((data) => {
                    console.log('loaded from cache');
                    console.log(data);
                    changeContent(data);
                });
            } else {
                fetch('/views' + route + '.html', {})
                .then( res => res.text())
                .then((data) => {
                    caches.open('test-cache').then(function(cache) {
                        cache.add('/views' + route + '.html');
                    });
                    console.log('NOT loaded from cache');
                    changeContent(data);
                });
            }
        });

    
        // .catch(function() {
        //     fetch('/views' + route + '.html', {})
        //     .then( res => res.text())
        //     .then((data) => {
        //         caches.open('test-cache').then(function(cache) {
        //             cache.add('/views' + route + '.html');
        //         });
        //         console.log('NOT loaded from cache');
        //         changeContent(data);
        //     });
        // });
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