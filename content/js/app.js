angular.module('boxPortal',['ngRoute', 'ui.bootstrap', 'ngAnimate','ngCookies','ngTouch'])
.controller('home',function($scope){})
    .controller('homeController',function($scope, authService){
        var reqtype = "GET";
        var reqPath = "folders/0/items/EHRAnalytics_Dev";
        authService.getAuth(reqtype,reqPath).then(function(response){
            console.log(response.data)
        })

    })
    .controller('alerts',function($scope){})
    .controller('admin',function($scope){})
    .controller('contentController',function($scope,authService){
        var reqtype = "GET";
        //temp path for EHR analytic folders
        var reqPath = "folders/11142081953";
        authService.getAuth(reqtype,reqPath).then(function(response){
            console.log(response.data)
        })

        //temp path for EHR analytic folders
        var reqPath = "/folders/11142081953/items";
        authService.getAuth(reqtype,reqPath).then(function(response){
            console.log(response.data)
        })
    })
    .controller('cubes',function($scope){})
    .controller('favorites',function($scope){})
    .controller('alerts',function($scope){})
    .controller('cubes',function($scope){})
    .controller('favorites',function($scope){})
    .controller('home',function($scope){})
    .controller('landing',function($scope){})
    .controller('resources',function($scope){})
    .controller('sideupdates',function($scope){})
    .controller('updates',function($scope){})
    .controller('welcome',function($scope){})
    .controller('workflow',function($scope){})
    .controller('myaccountController',function($scope,authService){
        var reqtype = "GET";

        var reqPath = "/users/me";
        authService.getAuth(reqtype,reqPath).then(function(response){
            console.log(response.data)
        })
    })
    .directive('topnav',function(displayModeService){
        return {
            restrict: "E",
            templateUrl: "./content/templates/directives/topnav.html",
            scope: {
                selected: "="
            },
            link: function (scope) {
                scope.deskTopHapMenu = [
                    {name:"EHR Analytics & Reporting",url:'/',icon:''},
                    {name:"FAQs",url:'/',icon:''},
                    {name:"Resources",url:'/',icon:''},
                    {name:"BI Launchpad",url:'/',icon:''}
                ];
                scope.utilMenu = [
                    {name:"*EHR Analytics",url:'/',icon:''},
                    {name:"Other Group",url:'/',icon:''}
                ];
                scope.mobileTophapmenu = [];
                scope.tophatMenu = scope.deskTopHapMenu;
            }
        };
    })
    .directive('leftnav',function(displayModeService){
        return {
            restrict: "E",
            templateUrl: "./content/templates/directives/leftnav.html",
            scope: {
                selected: "="
            },
            link: function (scope) {
                scope.leftMenu = [
                    {name:"Folders",url:'/',icon:'fa fa-folder'},
                    {name:"Updates",url:'/',icon:'fa fa-newspaper-o'},
                    {name:"Alerts",url:'/',icon:'fa fa-exclamation-triangle'},
                    {name:"Favorites",url:'/',icon:'fa fa-star'},
                    {name:"Workflow",url:'/',icon:'fa fa-compass'}
                ];
            }
        };
    })
    .directive('search',function(displayModeService){
        return {
            restrict: "E",
            templateUrl: "./content/templates/directives/search.html",
            scope: {
                selected: "="
            },
            link: function (scope) {

            }
        };
    })
    .directive('login',function(displayModeService){
        return {
            restrict: "E",
            templateUrl: "./content/templates/directives/login.html",
            scope: {
                selected: "="
            },
            link: function (scope) {

            }
        };
    })
    .directive('rightnav',function(displayModeService){
        return {
            restrict: "E",
            templateUrl: "./content/templates/directives/rightnav.html",
            scope: {
                selected: "="
            },
            link: function (scope) {
                scope.rightMenu = [
                    {name:"Update 1",url:'/',text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",icon:'fa fa-newspaper-o'},
                    {name:"Update 2",url:'/',text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",icon:'fa fa-newspaper-o'},
                    {name:"Update 3",url:'/',text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",icon:'fa fa-newspaper-o'},
                    {name:"Update 4",url:'/',text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",icon:'fa fa-newspaper-o'}

                ];
            }
        };
    })
    .directive('support',function(displayModeService){
        return {
            restrict: "E",
            templateUrl: "./content/templates/directives/support.html",
            scope: {
                selected: "="
            },
            link: function (scope) {

            }
        };
    })
    .directive('alert',function(){
        return {
            restrict: "E",
            templateUrl: "./content/templates/directives/alert.html",
            scope: {
                selected: "="
            },
            link: function (scope) {
                scope.hideAlert = true;
            }
        };
    })
    .directive('breadcrumb',function($location){
        return {
            restrict: "E",
            templateUrl: "./content/templates/directives/breadcrumb.html",
            scope: {
                selected: "="
            },
            link: function (scope) {



                scope.path = $location.$$path.split('/');
                scope.breadcrumbs = [
                    {name:"home",url:'/home'},
                    {name:$location.$$path.split('/')[1],url:$location.$$path}
                ];

                scope.arrow = function(a){
var breadcrumb = a+1!=scope.breadcrumbs.length?'breadcrumb_arrow':'';
                    return breadcrumb
                }

            }
        };
    })
    .service('authService', function($http){
        var authWorker = {};
        var boxURL = "https://api.box.com/2.0/";
        var reqSpecs = {
            method:'',
            url:'',
            headers:{
                'authorization':'Bearer K7048q1CMnJLHrewVSYAFevM3DFh0wPE',
                'content-type':'application/json',
                'cache-control':'no-cache',
                'postman-token':'efa08288-c297-dfc1-f495-682f19129800'
            }
        };

        authWorker.getAuth = function(type,path){
            reqSpecs.method = type;
            reqSpecs.url = boxURL + path;


            console.log(reqSpecs);
            return $http(reqSpecs);
        };

return authWorker;
    })
    .factory('displayModeService', function ($window) {
        var displayMode = {};
        displayMode.calendarOpen = function(){
            return { items: [] };
        }
        displayMode.detectElementSize = function (elem) {
            var parentSize = 0;
            if (document.getElementsByTagName(elem)[0])
                parentSize = document.getElementsByTagName(elem)[0].getBoundingClientRect();
            return parentSize;
        };
        displayMode.detectWide = function () {
            if ($window.innerWidth > window.innerHeight) {
                if (!navigator.userAgent.match(/Intel Mac OS X/i)
                    || !navigator.userAgent.match(/Windows/i)
                    || !navigator.userAgent.match(/iPad/i)
                    || $window.innerWidth > window.innerHeight
                ) {
                    return true
                }
                else {
                    return false;
                }
            } else {
                return false;
            }

        };
        displayMode.detectlandscapeMode = function () {
            if ($window.innerWidth > window.innerHeight) {
                if (!navigator.userAgent.match(/Intel Mac OS X/i)
                    || !navigator.userAgent.match(/Windows/i)
                    || !navigator.userAgent.match(/iPad/i)
                    || $window.innerWidth > window.innerHeight
                ) {
                    return true
                }
                else {
                    return false;
                }
            } else {
                return false;
            }

        };
        displayMode.detectOrientation = function () {
            if (!navigator.userAgent.match(/Intel Mac OS X/i)
                && !navigator.userAgent.match(/Windows/i)
                && !navigator.userAgent.match(/iPad/i)
                    //&& $window.innerWidth < 768
                && $window.innerWidth > window.innerHeight
            ) {
                return true
            }
            else {
                return false;
            }
        };
        displayMode.returnAgentName = function () {
            var agentName;
            if (navigator.userAgent.match(/Android/i))
                agentName = "Android";
            if (navigator.userAgent.match(/webOS/i))
                agentName = "webOS";
            if (navigator.userAgent.match(/iPhone/i))
                agentName = "iPhone";
            if (navigator.userAgent.match(/iPad/i))
                agentName = "iPad";
            if (navigator.userAgent.match(/iPod/i))
                agentName = "iPod";
            if (navigator.userAgent.match(/BlackBerry/i))
                agentName = "BlackBerry";
            if (navigator.userAgent.match(/Windows Phone/i))
                agentName = "Windows Phone";
            if (navigator.userAgent.match(/Nokia/i))
                agentName = "Nokia";
            if (navigator.userAgent.match(/Intel Mac OS X/i))
                agentName = "Mac";
            if (navigator.userAgent.match(/Windows/i))
                agentName = "Windows";
            return agentName;
        };
        displayMode.detectSize = function () {
            var viewportSize = {};
            viewportSize.height = $window.innerHeight;
            viewportSize.width = $window.innerWidth;
            return viewportSize;
        };
        displayMode.detectAgent = function () {
            var userAgent = "";

            function detectmob() {
                if (navigator.userAgent.match(/Android/i)
                    || navigator.userAgent.match(/webOS/i)
                    || navigator.userAgent.match(/iPhone/i)
                    || navigator.userAgent.match(/iPad/i)
                    || navigator.userAgent.match(/iPod/i)
                    || navigator.userAgent.match(/BlackBerry/i)
                    || navigator.userAgent.match(/Windows Phone/i)
                ) {
                    return true;
                }
                else {
                    return false;
                }
            }

            if (detectmob() && navigator.userAgent.match(/iPad/)) {
                userAgent = navigator.userAgent.match(/iPad/)[0];
            } else if (detectmob() && navigator.userAgent.match(/iPhone/)) {
                userAgent = navigator.userAgent.match(/iPhone/)[0];
            } else if (detectmob() && navigator.userAgent.match(/Android/)) {
                userAgent = navigator.userAgent.match(/Android/)[0];
            }
            return userAgent;
        };
        return displayMode;
    })
.config(function($routeProvider){
        $routeProvider
            .when('/home',{
                templateUrl: './content/templates/home.html',
                controller: 'homeController',
                title: 'Home'
            })
            .when('/admin',{
                templateUrl: './content/templates/admin.html',
                controller: 'admin',
                title: 'Admin'
            })
            .when('/alerts',{
                templateUrl: './content/templates/home.html',
                controller: 'home',
                title: 'Home'
            })
            .when('/content',{
                templateUrl: './content/templates/content.html',
                controller: 'contentController',
                title: 'Content'
            })
            .when('/cubes',{
                templateUrl: './content/templates/cubes.html',
                controller: 'cubes',
                title: 'Cubes'
            })
            .when('/favorites',{
                templateUrl: './content/templates/favorites.html',
                controller: 'favorites',
                title: 'Favorites'
            })
            .when('/landing',{
                templateUrl: './content/templates/landing.html',
                controller: 'landing',
                title: 'Landing'
            })
            .when('/resources',{
                templateUrl: './content/templates/resources.html',
                controller: 'resources',
                title: 'Resources'
            })
            .when('/sideupdates',{
                templateUrl: './content/templates/sideupdates.html',
                controller: 'sideupdates',
                title: 'SideUpdates'
            })
            .when('/updates',{
                templateUrl: './content/templates/updates.html',
                controller: 'updates',
                title: 'Updates'
            })
            .when('/welcome',{
                templateUrl: './content/templates/welcome.html',
                controller: 'welcome',
                title: 'Welcome'
            })
            .when('/workflow',{
                templateUrl: './content/templates/workflow.html',
                controller: 'workflow',
                title: 'Workflow'
            })
            .when('/myaccount',{
                templateUrl: './content/templates/myaccount.html',
                controller: 'myaccountController',
                title: 'myaccount'
            })
            .otherwise({
                redirectTo:'/home'
            })
    });