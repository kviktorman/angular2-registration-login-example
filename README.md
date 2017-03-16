This solution is based on the cornflourblue's "angular2-registration-login-example".
The original solution can be found here:
https://github.com/cornflourblue/angular2-registration-login-example
To see a demo and further details about the original solution:
http://jasonwatmore.com/post/2016/09/29/angular-2-user-registration-and-login-example-tutorial

The forked solution folder structure has been re-generated with angular-cli version 1.0.0-beta.32.3.
In order to use this code you have to generate a new project and copy the src folder content into it otherwise the node_modules and the other angular2 requirements are going to miss.

More info about angular-cli install:
https://github.com/angular/angular-cli

project creation:
~ > ng new PROJECT_NAME
~ > cd PROJECT_NAME
~ > ng serve

In order to use this solution you have to use a back-end API which does the authentication via JSON message handling.
A simple back-end API example can be found here:
https://github.com/kviktorman/phpSecureLogin

Currently on login screen there is 2 button login and logout and during page init there is a session check request.
Login workflow sends a (currenlty hardcoded message) to back-end API, if u/p matched back-end creates a session and sends back the successful authentication message.
Logout sends session destroy request.

The current solution is going to send the token in the message body not in the header as usually the jwt token are sent.
This is because in the current state i will not resolve the CORS issues for header authorization. 
Later its going to be developed in it, but now the focus is different.
