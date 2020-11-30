import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private notification: ToastrService) { }

  public showNotification(message: string, success: boolean) {
    const title = success ? 'Éxito' : 'Error';
    const type = success ? 'success' : 'danger';

    this.notification.show(
      `<span class="alert-title" data-notify="title">${title}</span>
      <div class="alert-text" data-notify="message">${message}</div>`,
      '',
      {
        timeOut: 8000,
        closeButton: true,
        enableHtml: true,
        tapToDismiss: true,
        titleClass: 'alert-title',
        positionClass: 'toast-top-center',
        toastClass:
          'ngx-toastr alert alert-dismissible alert-'
          + type
          + ' alert-notify'
      }
    );

  }

  public showWarning(message: string) {
    const title = 'Alerta';
    const type = 'warning';

    this.notification.show(
      `<span class="alert-title" data-notify="title">${title}</span>
      <div class="alert-text" data-notify="message">${message}</div>`,
      '',
      {
        timeOut: 8000,
        closeButton: true,
        enableHtml: true,
        tapToDismiss: true,
        titleClass: 'alert-title',
        positionClass: 'toast-top-center',
        toastClass:
          'ngx-toastr alert alert-dismissible alert-'
          + type
          + ' alert-notify'
      }
    );

  }
}
