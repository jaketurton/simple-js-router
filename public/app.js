
window.addEventListener('DOMContentLoaded', function() {

    let Cache = {
        storage: {},
        load: function(id){
            return (typeof(this.storage[id]) != 'undefined') ? this.storage[id] : false;
        },
        save: function(data,id){
            this.storage[id] = data;
        }
    };

    let view = document.getElementById('view');
    let currentPath = window.location.pathname;

    getContent(currentPath);

    function changeContent(content) {
        view.innerHTML = content;

        let activeRoutes = Array.from(document.querySelectorAll('.navigation'));

        activeRoutes.forEach(function(route) {
            route.addEventListener('click', navigateOnClick, false);
        });
    }

    function getContent(route) {
        if (route == "/") { // todo: dont live in here
            route = "/one";
        }

        let content = Cache.load('page' + route);

        if(content == false) {
            fetch('/views' + route + '.html', {})
            .then( res => res.text())
            .then((data) => {

                if (route != '/four')
                {
                    Cache.save(data,'page' + route); // todo: dont live in here
                }

                console.log('NOT loaded from cache 😢');
                changeContent(data);
            });

        } else {
            changeContent(content);
            console.log('Loaded from cache ✨');
        }
    }

    function pushRouteToWindowHistory(currentPath) {
        window.history.pushState({}, currentPath, window.location.origin + currentPath);
    }

    function changeView(route) {
        getContent(route);

        // promise
        // to do: on success changecontent()
        // else error

        pushRouteToWindowHistory(route);
    }

    function navigateOnClick(e) {
        e.preventDefault();
        const route = e.target.pathname;
        changeView(route);
    };

    window.addEventListener('popstate', function() {
        changeView(window.location.pathname);
    });

})