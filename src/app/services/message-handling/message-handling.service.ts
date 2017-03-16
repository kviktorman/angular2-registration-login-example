import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class MessageHandlingService {

    private headers: Headers;
    private messageResponse: any;

    constructor(private http: Http) { }

    //post message based on input paramters
    postMessage(requestURL: string, message: any): Promise<void> {

        //prepare post message header
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        this.headers.append('Accept', 'application/json');

        //post message and store response into messageResponse variable
        return this.http
            .post(requestURL, JSON.stringify(message), { headers: this.headers })
            .toPromise()
            .then((response) => {
                this.messageResponse = response.json()
            })
            .catch(this.handleError);
    }

    //return response if requested
    getResponse(): any {
        return this.messageResponse;
    }

    postMessageObservable(requestURL: string, message: any) {
        //prepare post message header
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        this.headers.append('Accept', 'application/json');

        //this.headers.append('Access-Control-Allow-Methods', 'POST');
        //this.headers.append('Access-Control-Allow-Origin', '*');
        //this.headers.append('Access-Control-Allow-Headers', '*');
        //this.headers.append('Access-Control-Expose-Headers', 'Authorization');
        //this.headers.append('Authorization', "my-token");
        console.log('beleptem');

        //post message and return post response
        return this.http
            .post(requestURL, JSON.stringify(message), { headers: this.headers })
            .map((response: Response) => {
                return response.json();
            }).catch(this.handleError);
    }


    //error handling for post 
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}