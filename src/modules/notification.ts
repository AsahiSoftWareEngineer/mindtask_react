

export  class NotificationService {
    isAllowedNotification = ()  => {
        try {
            Notification.requestPermission().then();
          } catch (e) {
            return false;
          }
          return true;
    }
    generateNotification =  (title:string) => {
        const notification = new Notification(title)
        return notification;
    }
  }

