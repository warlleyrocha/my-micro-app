import { useState, useCallback } from "react";
import { healthService } from "../services/health.service";

interface UseHealthReturn {
  status: string | null;
  loading: boolean;
  error: string | null;
  checkHealth: () => Promise<void>;
}

export const useHealth = (): UseHealthReturn => {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkHealth = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await healthService.check();
      setStatus(response.status);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Erro ao verificar saúde do serviço";
      setError(errorMessage);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }, []);

  return { status, loading, error, checkHealth };
};
