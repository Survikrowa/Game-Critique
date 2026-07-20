import { create } from "zustand";

import type { NotificationData } from "./notification_types";

type StoredNotification = {
  id: string;
  type: NotificationData["type"];
  title: string;
  body: string;
  data: NotificationData;
  receivedAt: string;
  isRead: boolean;
};

type NotificationHistoryStore = {
  notifications: StoredNotification[];
  addNotification: (notification: StoredNotification) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
};

export const useNotificationHistoryStore = create<NotificationHistoryStore>(
  (set) => ({
    notifications: [],
    addNotification: (notification) =>
      set((state) => ({
        notifications: [notification, ...state.notifications],
      })),
    markAsRead: (id) =>
      set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, isRead: true } : n,
        ),
      })),
    markAllAsRead: () =>
      set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
      })),
  }),
);
