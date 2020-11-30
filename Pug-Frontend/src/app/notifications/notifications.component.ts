import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  showNotification( from?, align?) {
      const type = ['', 'info', 'success', 'warning', 'danger'];
      const icon = align ? 'pe-7s-bell' : 'pe-7s-close-circle';
      const color = align ? 'success' : 'danger';
      $.notify({
          icon: icon,
          message: 'Hola xd'
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
