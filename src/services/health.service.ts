import api from "./api";

export const healthService = {
  // GET - Verificar saúde do serviço
  async check(): Promise<{ status: string }> {
    try {
      const response = await api.get<{ status: string }>("/health");
      return response.data;
    } catch (error) {
      console.error("Erro ao verificar saúde do serviço:", error);
      throw error;
    }
  },
};
