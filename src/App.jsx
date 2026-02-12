import { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import CreateNotification from "./pages/CreateNotification";
import ListNotifications from "./pages/ListNotifications";
import { useHealth } from "./hooks/useHealth";

function App() {
  const { status, loading, checkHealth } = useHealth();

  useEffect(() => {
    checkHealth();
  }, [checkHealth]);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-green-500 shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-white text-2xl font-bold">Notificações</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    status === "ok" ? "bg-green-300" : "bg-red-300"
                  }`}
                ></div>
                <span className="text-white text-sm">
                  {status === "ok" ? "Serviço OK" : "Desconectado"}
                </span>
              </div>
              <button
                onClick={checkHealth}
                disabled={loading}
                className="px-3 py-1 bg-white text-green-500 rounded hover:bg-gray-100 disabled:opacity-50 text-sm font-medium"
              >
                {loading ? "Verificando..." : "Verificar"}
              </button>
            </div>
            <ul className="flex gap-4">
              <li>
                <Link
                  to="/"
                  className="text-white hover:text-gray-200 transition"
                >
                  Listar
                </Link>
              </li>
              <li>
                <Link
                  to="/create"
                  className="text-white hover:text-gray-200 transition"
                >
                  Criar
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<ListNotifications />} />
          <Route path="/create" element={<CreateNotification />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
