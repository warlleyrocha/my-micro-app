enum NotificationStatus {
  SENT = "sent",
  PENDING = "pending",
  FAILED = "failed",
}

export interface NotificationPostRequest {
  title: string;
  message: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  status: NotificationStatus;
  createdAt: string;
}
