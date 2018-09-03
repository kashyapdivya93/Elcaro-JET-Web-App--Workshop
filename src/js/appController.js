/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */
var total=0;
var selected=0;
var totalBath=0;
var selectedBath=0;
var otherRequest="";

var dashBoardData={};
define(['knockout','ojs/ojcore', 
 'ojs/ojrouter', 'ojs/ojarraytabledatasource',
 'ojs/ojoffcanvas', 'ojs/ojbutton'],
  function(ko,oj) {
     function ControllerViewModel() {
      var self = this;
     
      // Router setup
      self.router = oj.Router.rootInstance;
      self.router.configure({ 
       'dashboard': {label: 'Dashboard', isDefault:true}, 
       'checkOut': {label: 'checkOut'}, 
      });
      oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();
      self.moduleConfig = self.router.moduleConfig;

      
      self.toggleDrawer = function() {
        return oj.OffcanvasUtils.toggle({selector: '#navDrawer', modality: 'modal', content: '#pageContent'});
      }
      document.addEventListener("deviceready", onDeviceReady, false);
      function onDeviceReady() {

        console.log(localStorage.getItem("checkInStatus"))
        $("#onDemandServiceNav").hide();
        if (localStorage.getItem("checkInStatus") == 'YES') {
          $("#onDemandServiceNav").show();
        }
          document.addEventListener('backbutton', function (evt) {
            if (cordova.platformId == 'android') {
              if (window.location.href == 'file:///android_asset/www/index.html') {
                navigator.app.exitApp();
              }
              else if (window.location.href != 'file:///android_asset/www/index.html?root=dashboard') {
                  window.history.back();
              } else {
                navigator.app.exitApp(); // This will suspend the app
              }
          }
         

        }, false);

     
        $( "#dashboardNav").click(function(){
          oj.Router.rootInstance.go('dashboard');
        });
        $( "#onDemandServiceNav").click(function(){
          oj.Router.rootInstance.go('servicesDemand');
        }); 
      }
      //self.loginSuccess = 
      // // Header Setup
      // self.getHeaderModel = function() {
        
      //   var headerFactory = {
      //     createViewModel: function(params, valueAccessor) {
      //       var model =  {
      //         pageTitle: self.router.currentState().label,
      //         handleBindingsApplied: function(info) {
      //           // Adjust content padding after header bindings have been applied
      //           self.adjustContentPadding();
      //         },
      //         toggleDrawer: self.toggleDrawer
      //       };
      //       return Promise.resolve(model);
      //     }
      //   }
      //   return headerFactory;
      // }
      // this.buttonRegion = ko.observableArray();
      // Method for adjusting the content area top/bottom paddings to avoid overlap with any fixed regions. 
      // This method should be called whenever your fixed region height may change.  The application
      // can also adjust content paddings with css classes if the fixed region height is not changing between 
      // views.
      self.adjustContentPadding = function () {
        var topElem = document.getElementsByClassName('oj-applayout-fixed-top')[0];
        var contentElem = document.getElementsByClassName('oj-applayout-content')[0];
        var bottomElem = document.getElementsByClassName('oj-applayout-fixed-bottom')[0];

        if (topElem) {
          contentElem.style.paddingTop = topElem.offsetHeight+'px';
        }
        if (bottomElem) {
          contentElem.style.paddingBottom = bottomElem.offsetHeight+'px';
        }
        // Add oj-complete marker class to signal that the content area can be unhidden.
        // See the override.css file to see when the content area is hidden.
        contentElem.classList.add('oj-complete');
      }
    }

    return new ControllerViewModel();
  }
);
