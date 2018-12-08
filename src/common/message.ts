import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Message } from 'primeng/api';

@Injectable()
export class MessageConfirm {
    msgs: Message[] = [];

    constructor(private route: Router, private confirmationService: ConfirmationService) {
    }

    confirm(message: any) {
        this.confirmationService.confirm({
            message: message,
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.msgs = [{severity: 'info', summary: 'Confirmed', detail: 'You have accepted'}];
            },
            reject: () => {
                this.msgs = [{severity: 'info', summary: 'Rejected', detail: 'You have rejected'}];
            }
        });
    }

    alert(userMessage) {
        this.confirmationService.confirm({
            message: userMessage,
            header: 'Message'
        });
    }

    pampletmessage() {
        alert(true);
        this.msgs.length = 0;
        this.msgs.push({severity: 'info', summary: 'First Step', detail: 'lol'});
    }

}
