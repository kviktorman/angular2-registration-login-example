import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';

import { MessageHandlingService } from '../message-handling/message-handling.service';
import { GENERALSETTINGS } from '../../sharedObjects/generalSettings';

@Injectable()
export class AuthenticationHandlingService {

    constructor(private messageHandlingService: MessageHandlingService) { }

    //login user
    login(username: string, password: string): Observable<any> {

        //prepare user login request
        let loginMessage = {
            messageName: "processLogin",
            txtEmail: "test@example.com",
            hPassword: "445fc3655cede6a6c841d08f0776fac92a0118d1d1597046e09909310b2664538642292515aee4737c39826d70508466f5df36417f09274cb470ca4b6857be7a"
        };

        //store user information into the local storage and return status information as an observable
        return Observable.create((observer) => {
            this.messageHandlingService.postMessageObservable(GENERALSETTINGS.loginURL, loginMessage)
                .subscribe(
                data => {
                    //JSON.stringify(data.userId)
                    localStorage.setItem('jwt-token', data.token);
                    observer.next(data);
                    observer.complete();
                },
                error => {
                    observer.next(error);
                    observer.complete();
                });
        });
    }

    userAction(): Observable<any> {
        let token = localStorage.getItem('jwt-token');
        let timestamp = new Date();

        let logoutMessage = {
            messageName: "processUserAction",
            token: token,
            currentTime: timestamp
        };

        //store user information into the local storage and return status information as an observable
        return Observable.create((observer) => {
            this.messageHandlingService.postMessageObservable(GENERALSETTINGS.userActionURL, logoutMessage)
                .subscribe(
                data => {
                    //localStorage.removeItem('jwt-token');
                    observer.next(data);
                    observer.complete();
                },
                error => {
                    observer.next(error);
                    observer.complete();
                });
        });

    }

    //logout user
    logout(): Observable<any> {

        let token = localStorage.getItem('jwt-token');

        let logoutMessage = {
            messageName: "processLogout",
            token: token
        };

        //store user information into the local storage and return status information as an observable
        return Observable.create((observer) => {
            this.messageHandlingService.postMessageObservable(GENERALSETTINGS.logoutURL, logoutMessage)
                .subscribe(
                data => {
                    localStorage.removeItem('jwt-token');
                    observer.next(data);
                    observer.complete();
                },
                error => {
                    observer.next(error);
                    observer.complete();
                });
        });
    }
}