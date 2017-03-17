import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SessionCheckService } from '../../services/session-check/session-check.service';
import { AuthenticationHandlingService } from '../../services/authentication-handling/authentication-handling.service';

import * as CryptoJS from 'crypto-js';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css'],
})
export class LoginComponent implements OnInit {

    constructor(
        private sessionCheckService: SessionCheckService,
        private authenticationHandlingService: AuthenticationHandlingService
    ) { }


    processUserAction(): void {
        this.authenticationHandlingService.userAction().subscribe(
            data => {
                console.log(data);
            },
            error => {
                console.log(error);
            });
    }
    processLogin(email: string, password: string): void {
        console.log('Login called');
        let hashedPassword = CryptoJS.enc.Hex.stringify(CryptoJS.SHA512(password));

        this.authenticationHandlingService.login(email, hashedPassword).subscribe(
            data => {
                console.log(data);
            },
            error => {
                console.log(error);
            });
    }

    processLogout(): void {
        console.log('Logout called');
        this.authenticationHandlingService.logout().subscribe(
            data => {
                console.log(data);
            },
            error => {
                console.log(error);
            });

    }

    ngOnInit() {
        this.sessionCheck();
    }


    sessionCheck(): void {
        this.sessionCheckService.checkSession().then(() => {

            let response = this.sessionCheckService.getResponse();

            console.log("session check");
            console.log(JSON.stringify(response));
        }
        );
    }
}