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

    responseJSON = '';

    processUserAction(): void {
        this.authenticationHandlingService.userAction().subscribe(
            data => {
                this.responseJSON = JSON.stringify(data);
            },
            error => {
                this.responseJSON = JSON.stringify(error);
            });
    }
    processLogin(email: string, password: string): void {
        console.log('Login called');
        let hashedPassword = CryptoJS.enc.Hex.stringify(CryptoJS.SHA512(password));

        this.authenticationHandlingService.login(email, hashedPassword).subscribe(
            data => {
                this.responseJSON = JSON.stringify(data);
            },
            error => {
                this.responseJSON = JSON.stringify(error);
            });
    }

    processLogout(): void {
        console.log('Logout called');
        this.authenticationHandlingService.logout().subscribe(
            data => {
                this.responseJSON = JSON.stringify(data);
            },
            error => {
                this.responseJSON = JSON.stringify(error);
            });

    }

    ngOnInit() {
        this.sessionCheck();
    }


    sessionCheck(): void {
        this.sessionCheckService.checkSession().then(() => {

            let response = this.sessionCheckService.getResponse();

            console.log("session check");
            this.responseJSON = JSON.stringify(response);
        }
        );
    }
}