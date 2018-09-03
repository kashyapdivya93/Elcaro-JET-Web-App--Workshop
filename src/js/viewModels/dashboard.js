/**
* Copyright (c) 2014, 2017, Oracle and/or its affiliates.
* The Universal Permissive License (UPL), Version 1.0
*/
/*
* Your dashboard ViewModel code goes here
*/
define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'ojs/ojbutton'],
function (oj, ko, $, app) {

  function DashboardViewModel() {
    var self = this;
     
    let payload = {
      "userId" : "amy.marlin"
    };
    
    self.Success = function (response) {
      console.log(response);
  };

  self.Failure = function (statusCode) {
      //self.isLoggedIn(false);
      console.log(statusCode);
  };
    //console.log(checkInStatus);
    // Header Config
   // self.headerConfig = { 'viewName': 'header', 'viewModelFactory': app.getHeaderModel() };
    // var checkInStatus = localStorage.getItem("checkInStatus");
    // checkInStatus = localStorage.getItem("checkInStatus");
    // if (checkInStatus == 'YES') {
    //  $("#chekin").hide();
    //   $("#chekout").show();
     
    // }
    // else {
    //   $("#chekin").show();
    //   $("#chekout").hide();
    // }
    // Drawer setup
    self.toggleDrawer = function() {
      return oj.OffcanvasUtils.toggle({selector: '#navDrawer', modality: 'modal', content: '#pageContent'});
    }
    // Add a close listener so we can move focus back to the toggle button when the drawer closes
    $("#navDrawer").on("ojclose", function() { $('#drawerToggleButton').focus(); });
    
    self.checkInBtn = function () {
      localStorage.setItem("checkInStatus", "NO");
      oj.Router.rootInstance.go('checkinDetails');
    };
    
   
    self.chekout = function () {
      $('#myModal').css('display', 'block');
 
    };
    
    self.handleActivated = function (info) {
      // Implement if needed
    };

    self.handleAttached = function (info) {
       
    };
   
    self.handleBindingsApplied = function (info) {
      // Implement if needed
    };

    /*
     * Optional ViewModel method invoked after the View is removed from the
     * document DOM.
     * @param {Object} info - An object with the following key-value pairs:
     * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
     * @param {Function} info.valueAccessor - The binding's value accessor.
     * @param {Array} info.cachedNodes - An Array containing cached nodes for the View if the cache is enabled.
     */
    self.handleDetached = function (info) {
      // Implement if needed
    };
  }

  /*
   * Returns a constructor for the ViewModel so that the ViewModel is constructed
   * each time the view is displayed.  Return an instance of the ViewModel if
   * only one instance of the ViewModel is needed.
   */
  return new DashboardViewModel();
}
);


