import api from "./api";
import {
  Notification,
  NotificationPostRequest,
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

  // PATCH - Marcar uma notificação como lida
};
