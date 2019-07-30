
window.addEventListener('DOMContentLoaded', function() {

    var Cache = {
        stack: {}, //Cache stack
        load: function(id){ //Load cache if found
            return (typeof(this.stack[id]) != 'undefined') ? this.stack[id] : false;
        },
        save: function(data,id){ //Cache data with unique id
            this.stack[id] = data;
        },
        remove: function(id){ //Remove cache for identifier
            if(typeof(this.stack[id]) != 'undefined')
                delete this.stack[id];
        }
    };

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

        //We check the cache first.
        var content = Cache.load('page' + route);

        //If cache is empty, it will return false.
        if(content == false) {
            //Retrieve the cache via AJAX request using jQuery
            fetch('/views' + route + '.html', {})
            .then( res => res.text())
            .then((data) => {

                if (route != '/four')
                {
                    //Save the cache, so next time no request is needed.
                    Cache.save(data,'page' + route);
                }

                console.log('NOT loaded from cache 😢');
                changeContent(data);
            });

        //Cache hit, load the content immediately
        } else {
            changeContent(content);
            console.log('Loaded from cache ✨');
        }
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
    };

    window.addEventListener('popstate', function() {
        fetchContent(window.location.pathname);
    });

})