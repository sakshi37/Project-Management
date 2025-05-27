export interface NotificationModel {

  notificationId:number;
  subject: string;
  message: string;
  // fk_EmpId exists in the response, but we simply don’t use it
  isRead: boolean;
  isDeleted:boolean;
}

export interface ReadAndDelNotifications{
  notificationId:number;
}
