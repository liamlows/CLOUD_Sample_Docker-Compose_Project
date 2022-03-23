(app => {

    app.loggedInView = {
    
    load: () => {
        app._changeView('loggedInView');
    }
    }

})(app || (app = {}));