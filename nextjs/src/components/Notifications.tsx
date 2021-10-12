import React, { useEffect, useState } from "react";
import Toast from "./Toast";
import { useStore } from "effector-react";
import {
  $notificationStore,
  addNotification,
  deleteNotification,
} from "../effector/notification-state";
import uid from "../utils/uid";

interface Props {}

const Notifications = (props: Props) => {
  const { items } = useStore($notificationStore);

  return (
    <div>
      {items.map((notification, index) => (
        <Toast
          {...notification}
          key={notification.id}
          style={{
            zIndex: 100 + (items.length - index),
            transform: `scale(${1 - index * 0.1}) translateY(-${index * 15}px)`,
          }}
          onClose={() => deleteNotification(notification.id)}
        />
      ))}
    </div>
  );
};

export default Notifications;
