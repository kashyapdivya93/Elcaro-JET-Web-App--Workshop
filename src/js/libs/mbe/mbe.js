define(['jquery', 'mcs'], function ($) {
    //define MCS mobile backend connection details
    console.log(typeof cordova);
    var mcs_config = {
        "logLevel": mcs.logLevelInfo,
        "mobileBackends": {
            "CVS": {
                "default": true,
                "baseUrl": typeof cordova === "object" ? "https://mcsdem082817-mcsdem082817.mobileenv.us2.oraclecloud.com:443" : "http://localhost:8100",
                "userUrl": "/mobile/platform/users/~",
                "applicationKey": "b6e9a8ef-2a77-4dfb-8119-8d19fcc29ff2",
                "authorization": {
                    "basicAuth": {
                        "backendId": "07ef214a-456a-49e4-a0df-f8b0e9c4b7bc",
                        "anonymousToken": "TUNTREVNMDgyODE3X01DU0RFTTA4MjgxN19NT0JJTEVfQU5PTllNT1VTX0FQUElEOndnMHlyX2ZwUmprdTRu"
                    }
                }
            }
        }
    };

    function MobileBackend() {
        var self = this;
        self.mcs_config = mcs_config;
        self.mobileBackend;
        function init() {
            mcs.MobileBackendManager.platform = new mcs.CordovaPlatform();
            mcs.MobileBackendManager.setConfig(mcs_config);
            self.mobileBackend = mcs.MobileBackendManager.getMobileBackend('CVS');
            self.mobileBackend.setAuthenticationType("basicAuth");
        }

        //Handles the success and failure callbacks defined here
        //Not using anonymous login for this example but including here. 
        self.authAnonymous = function (sc, fc) {
            console.log("Authenticating anonymously");
            self.mobileBackend.Authorization.authenticateAnonymous(
                function (response, data) {
                    console.log("Success authenticating against mobile backend");
                    if (sc) {
                        sc();
                    }
                },
                function (statusCode, data) {
                    console.log("Failure authenticating against mobile backend");
                    if (fc) {
                        fc();
                    }
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

        self.isAuthorized = function () {
            return self.mobileBackend.Authorization.isAuthorized;
        };

        self.registerNotification = function (registrationID, appId, appVersion) {
            self.mobileBackend.Notifications.registerForNotifications(registrationID, appId, appVersion,
                function (statusCode, headers, data) {
                    var success_msg = "sucess:statusCode=" + statusCode + ",data=" + data + "headers=" + headers;
                    console.log(success_msg);
                },
                function (statusCode, data) {
                    var failure_msg = "failure:statusCode=" + statusCode + ",data=" + data;
                    console.log(failure_msg);
                }
            );
        };

        init();
    }

    return new MobileBackend();
});