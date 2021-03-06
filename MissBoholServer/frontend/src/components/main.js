'use strict';

var FrontendApp = require('./FrontendApp');
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var Login = require('./public/Login');
var Index = require('./Index');
var Unauthorized = require('./public/Unauthorized');
var Final = require('./secured/Final');
var Preliminary = require('./secured/Preliminary');
var Candidates = require('./secured/Candidates');
var Judges = require('./secured/Judges');

var PrelimRound = require('./secured/PrelimRound');
var FinalRound = require('./secured/FinalRound');


var BestGown = require('./secured/BestGown');
var BestSwimsuit = require('./secured/BestSwimsuit');
var BestInterview = require('./secured/BestInterview');


require('script!jquery/dist/jquery.min.js');
require('bootstrap/dist/css/bootstrap.min.css');
require('script!bootstrap/dist/js/bootstrap.min.js');
require('script!bootbox/bootbox.js');
require('sweetalert/dist/sweetalert.css');
require('script!sweetalert/dist/sweetalert.min.js');

var SessionStore =  require('../sessionmanager/SessionStore');
var SessionActionCreators = require('../sessionmanager/SessionActionCreators');

var injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();


var content = document.getElementById('content');

var Routes = (
    <Route>
        <Route path ="/" handler={FrontendApp}>
            <Route  path ="/login" handler={Login}/>
            <Route  path ="/unauthorized" handler={Unauthorized}/>
            <Route  path ="/judges" handler={Judges}/>
            <Route  path ="/candidates" handler={Candidates}/>
            <Route  path ="/prelim" handler={Preliminary}/>
            <Route  path ="/final" handler={Final}/>
            <Route  path ="/prelimround" handler={PrelimRound}/>
            <Route  path ="/finalround" handler={FinalRound}/>
            <Route  path ="/bestswimsuit" handler={BestSwimsuit}/>
            <Route  path ="/bestgown" handler={BestGown}/>
            <Route  path ="/bestinterview" handler={BestInterview}/>
            <DefaultRoute handler={Index}/>
        </Route>
    </Route>
);

var router = Router.run(Routes, Router.HashLocation, function (Handler) {
    React.render(<Handler/>, content);
});

SessionStore.router = router;
SessionActionCreators.Ping();
