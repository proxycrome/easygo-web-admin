import { notification } from "antd";

export const notificationAlert = (type, message, description, placement='topRight') => {
    notification[type]({
      message,
      description,
      placement
    });
  };
