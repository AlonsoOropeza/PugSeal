import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  public $:any;

  constructor() { }

  public showNotification(message?: string, success?: boolean, from?, align?) {
    const types = ['', 'info', 'success', 'warning', 'danger'];
    const icon = success ? 'pe-7s-bell' : 'pe-7s-close-circle';
    const color = success ? 'success' : 'danger';
    this.$.notify({
        icon: icon,
        message: message
    }, {
        type: types[color],
        timer: 1000,
        placement: {
            from: from,
            align: align
        }
    });
}
}
