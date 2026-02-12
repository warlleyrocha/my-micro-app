import { useEffect } from "react";
import { useNotification } from "../hooks/useNotification";

export default function ListNotifications() {
  const { notifications, loading, error, fetchNotifications } =
    useNotification();

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Notificações</h2>
        <p className="text-gray-600">Carregando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Notificações</h2>
        <p className="text-red-600">Erro: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Notificações</h2>
      {notifications.length === 0 ? (
        <p className="text-gray-600">Nenhuma notificação ainda.</p>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => {
            const getStatusColor = (status: string) => {
              if (status === "sent") return "bg-green-100 text-green-800";
              if (status === "pending") return "bg-yellow-100 text-yellow-800";
              return "bg-red-100 text-red-800";
            };
            const statusColor = getStatusColor(notification.status);

            return (
              <div
                key={notification.id}
                className="border border-gray-300 rounded-lg p-4 hover:shadow-md transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-800">
                      {notification.title}
                    </h3>
                    <p className="text-gray-600 mt-1">{notification.message}</p>
                    <span
                      className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full ${statusColor}`}
                    >
                      {notification.status}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(notification.createdAt).toLocaleString()}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
