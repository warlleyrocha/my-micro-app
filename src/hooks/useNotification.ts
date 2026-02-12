import { useState, useCallback } from "react";
import { notificationService } from "../services/notification.service";
import {
  Notification,
  NotificationPostRequest,
  NotificationStatus,
} from "../types/notification.types";

interface UseNotificationReturn {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
  fetchNotifications: () => Promise<void>;
  createNotification: (
    data: NotificationPostRequest,
  ) => Promise<Notification | null>;
  updatedStatusNotification: (
    id: string,
    status: NotificationStatus,
  ) => Promise<Notification | null>;
}

export const useNotification = (): UseNotificationReturn => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // GET - Buscar todas as notificações
  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await notificationService.getAll();
      setNotifications(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao buscar notificações";
      setError(errorMessage);
      console.error("Erro:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // POST - Criar nova notificação
  const createNotification = useCallback(
    async (data: NotificationPostRequest): Promise<Notification | null> => {
      setLoading(true);
      setError(null);
      try {
        console.log("Criando notificação com dados:", data);

        const newNotification = await notificationService.create(data);
        setNotifications((prev) => [newNotification, ...prev]);
        console.log("Notificação criada no hook:", newNotification);
        return newNotification;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erro ao criar notificação";
        setError(errorMessage);
        console.error("Erro:", err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  // PATCH - Atualiza status da notificação
  const updatedStatusNotification = useCallback(
    async (
      id: string,
      status: NotificationStatus,
    ): Promise<Notification | null> => {
      setLoading(true);
      setError(null);
      try {
        const updatedNotification =
          await notificationService.updateStatusNotification({ id, status });
        setNotifications((prev) =>
          prev.map((notif) => (notif.id === id ? updatedNotification : notif)),
        );
        return updatedNotification;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erro ao atualizar notificação";
        setError(errorMessage);
        console.error("Erro:", err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return {
    notifications,
    loading,
    error,
    fetchNotifications,
    createNotification,
    updatedStatusNotification,
  };
};
