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

    document.addEventListener('click', function(e){
        if(e.target.nodeName !== 'A')
            return;

        var href = e.target.attributes.href.nodeValue;
        e.preventDefault();

        if (href !== window.location.pathname){
            navigateOnClick(e);
        }
    });

    const defaultRoute = "/one";
    let view = document.getElementById('view');
    let currentPath = window.location.pathname;

    if (currentPath == "/") {
        window.location.pathname = defaultRoute;
    }

    setView(currentPath);

    function getContent(route) {

        let content = Cache.load('page' + route);
        if (content) {
            console.log("Cache: hit");
            return Promise.resolve(content);
        }
        else {
            console.log("Cache: not hit");
            return fetchContent(route);
        }
    }

    function fetchContent(route){
        return fetch('/views' + route + '.html', {})
            .then(res => res.text())
            .then(function (data)  {

                if (route != '/four')
                {
                    Cache.save(data,'page' + route);
                }

                return data;
            });
    }

    function updateUI(content) {
        view.innerHTML = content;
    }

    function setView(route) {
        getContent(route).then(data => updateUI(data));
        pushRouteToWindowHistory(route);
    }

    function pushRouteToWindowHistory(path) {
        window.history.pushState({}, path, window.location.origin + path);
    }

    function navigateOnClick(e) {
        const route = e.target.pathname;
        setView(route);
    };

    window.addEventListener('popstate', function() {
        setView(window.location.pathname);
    });

})