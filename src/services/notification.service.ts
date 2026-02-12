import api from "./api";
import {
  Notification,
  NotificationPostRequest,
  NotificationStatus,
} from "../types/notification.types";

export const notificationService = {
  // GET - Listar todas as notificações
  async getAll(): Promise<Notification[]> {
    try {
      const response = await api.get<Notification[]>("/notifications");
      console.log(
        "Notificações listadas com sucesso no service:",
        response.data,
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao listar notificações:", error);
      throw error;
    }
  },

  // POST - Criar uma nova notificação
  async create(data: NotificationPostRequest): Promise<Notification> {
    try {
      const response = await api.post<Notification>("/notifications", data);

      console.log("Notificação criada com sucesso no service:", response.data);

      return response.data;
    } catch (error) {
      console.error("Erro ao criar notificação:", error);
      throw error;
    }
  },

  // PATCH - Atualiza o status da notificação
  async updateStatusNotification(data: {
    id: string;
    status: NotificationStatus;
  }): Promise<Notification> {
    try {
      const response = await api.patch<Notification>(
        `/notifications/${data.id}`,
        { status: data.status },
      );

      console.log(
        "Notificação atualizada com sucesso no service:",
        response.data,
      );

      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar notificação:", error);
      throw error;
    }
  },
};
