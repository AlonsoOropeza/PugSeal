declare var $: any;
export class NotificationsService {

  constructor() { }

  public showNotification(message?: string, success?: boolean, from?, align?) {
    const type = ['', 'info', 'success', 'warning', 'danger'];
    const icon = success ? 'pe-7s-bell' : 'pe-7s-close-circle';
    const color = success ? 'success' : 'danger';
    $.notify({
        icon: icon,
        message: message
    }, {
        type: type[color],
        timer: 1000,
        placement: {
            from: from,
            align: align
        }
    });
}
}
