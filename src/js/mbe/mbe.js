define(['jquery', 'mcs'], function ($,mcs) {
    //define MCS mobile backend connection details
    var mcs_config = {
        "logLevel": mcs.logLevelInfo,
        "defaultMbe":"CFI",
        "mobileBackends": {
            "CFI": {
                "default": true,
                "binCheckUrl":"/mobile/custom/CFICustomAPI",
                "usersUrl" : "/mobile/platform/users",
                "storageUrl" : "/mobile/platform/storage",
                "baseUrl": typeof cordova == "object"? "https://mobile-mcsdem121217.mobileenv.us2.oraclecloud.com:443":"http://localhost:8100",
            
                "applicationKey": "0fc655f4-5ebb-4876-b9e4-352be9a2f491",
                "authorization": {
                    "basicAuth": {
                        "backendId": "d371bf95-b151-4d47-8820-d6f7a0b0c674",
                        "anonymousToken": "TUNTREVNMTIxMjE3X01PQklMRV9NT0JJTEVfQU5PTllNT1VTX0FQUElEOmRFZWFmbmN1NXp5LjNs"
                    },
                    "oAuth": {
                        "clientId": "d3dafc6f-b5a1-4291-b404-a508bf7df19f",
                        "clientSecret": "wEGQEiToAZhJhUbvxUG3",
                        "tokenEndpoint": "https://mcsdem121217.identity.us.oraclecloud.com/oam/oauth2/tokens"
                    }
                }
            }
        },
        "syncExpress": {
            "policies": [
                {
                    "path": '/mobile/custom/CFICustomAPI/updateUserData'
                  }
                //   ,
                //   {
                //     "path": '/mobile/custom/CFICustomAPI/getUserData',
                //   }
            ]
        }
        
    };

    function MobileBackend() {
        var self = this;
        self.mobileBackend;
        
        function init() {
            mcs.MobileBackendManager.setConfig(mcs_config);
            //MCS backend name for example is CFI. 
            self.mobileBackend = mcs.MobileBackendManager.getMobileBackend('CFI');
            self.mobileBackend.setAuthenticationType("basicAuth");            
        }

        //Handles the success and failure callbacks defined here
        //Not using anonymous login for this example but including here. 
        self.authAnonymous = function () {
            console.log("Authenticating anonymously");
            self.mobileBackend.Authorization.authenticateAnonymous(
                    function (response, data) {                        
                        console.log("Success authenticating against mobile backend");
                    },
                    function (statusCode, data) {
                        console.log("Failure authenticating against mobile backend");
                    }
            );
        };

        //This handles success and failure callbacks using parameters (unlike the authAnonymous example)
        self.authenticate = function (username, password, successCallback, failureCallback) {
            self.mobileBackend.Authorization.authenticate(username, password, successCallback, failureCallback);
        };

        //this handles success and failure callbacks using parameters
        self.logout = function (successCallback, failureCallback) {
            self.mobileBackend.Authorization.logout();
        };

        self.invokeCustomAPI = function(uri,method,payload) {
            //uri = self.apiMap[uri];
            method = method || 'GET';
            payload = payload || {};
            return self.mobileBackend.CustomCode.invokeCustomCodeJSONRequest(uri , method , payload);
         }

       
        init();
    }

    return new MobileBackend();
});
