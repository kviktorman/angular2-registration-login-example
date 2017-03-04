import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';

import { MessageHandlingService } from '../message-handling/message-handling.service';
import { GENERALSETTINGS } from '../../sharedObjects/generalSettings';

@Injectable()
export class SessionCheckService {
    constructor(private messageHandlingService: MessageHandlingService) { }
    private response: any;

    getResponse(): any {
        return this.response;
    }

    checkSession(): Promise<boolean> {

        let json = {
            messageName: "getSession"
        };

        return new Promise(resolve => {
            //check session with promised way
            this.messageHandlingService.postMessage(GENERALSETTINGS.sessionURL, json).then(() => {

                this.response = this.messageHandlingService.getResponse();
                if (this.response.idUser > 0) {

                    //if there is an active user session from that machine 
                    resolve("true");
                } else {
                    //if there is no active user session from that machine 
                    resolve("false");
                }

            }).catch(() => {
                //if session check failed for some reason
                resolve("false");
            });
        });
    }

}