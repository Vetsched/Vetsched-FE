import { Injectable } from '@angular/core';
import * as jQuery from 'jquery';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor() {}
  ni = 0;
  notifi_out(ni: number): void {
    const notificationTimeOut = 6000;
    setTimeout(() => {
      jQuery(`.notifi_item[id_ni="${ni}"]`).removeClass('active');
    }, notificationTimeOut - 300);

    setTimeout(() => {
      jQuery(`.notifi_item[id_ni="${ni}"]`).remove();
    }, notificationTimeOut);
  }
  notification_func(status: number, text: string): void {
    this.ni++;
    let statusVal;
    if (status === 0) {
      statusVal = 'notifi_error';
    }
    if (status === 1) {
      statusVal = 'notifi_success';
    }
    const notifiHtml =
      '<div class="notifi_item ' +
      statusVal +
      '" id_ni="' +
      this.ni +
      '"><div class="notifi_icon"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i><i aria-hidden="true" class="fa fa-check"></i></div><div class="notifi_text">' +
      text +
      '</div><div class="notifi_close">X</div></div>';
    jQuery('.notification_main').prepend(notifiHtml);
    setTimeout(() => {
      jQuery(`.notifi_item[id_ni="${this.ni}"]`).addClass('active');
    }, 100);
    this.notifi_out(this.ni);
  }
}
