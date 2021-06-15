const base_url = "https://handy.cs.colman.ac.il:2222/notification";

export const notificationURL = () => `${base_url}/`;
export const deleteNotificationURL = (id) => `${base_url}/deleteAllNotificationsOfUser/${id}`;

export const getNotificationsByUserIduRL = (id) => `${base_url}/getNotificationsByUserId/${id}`;


