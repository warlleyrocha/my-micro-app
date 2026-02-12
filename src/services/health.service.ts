import api from "./api";

export const healthService = {
  // GET - Verificar saúde do serviço
  async check(): Promise<{ status: string }> {
    try {
      const response = await api.get<{ status: string }>("/health");
      console.log("Saúde do serviço:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao verificar saúde do serviço:", error);
      throw error;
    }
  },
};
