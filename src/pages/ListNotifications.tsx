import { useEffect, useState } from "react";
import { useNotification } from "../hooks/useNotification";
import { NotificationStatus } from "../types/notification.types";

export default function ListNotifications() {
  const {
    notifications,
    loading,
    error,
    fetchNotifications,
    updatedStatusNotification,
  } = useNotification();
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [selectedStatusById, setSelectedStatusById] = useState<
    Record<string, NotificationStatus>
  >({});

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const getStatusColor = (status: NotificationStatus) => {
    if (status === NotificationStatus.SENT)
      return "bg-green-100 text-green-800";
    if (status === NotificationStatus.PENDING)
      return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const handleUpdateStatus = async (id: string, currentStatus: NotificationStatus) => {
    const nextStatus = selectedStatusById[id] ?? currentStatus;
    setUpdatingId(id);
    await updatedStatusNotification(id, nextStatus);
    setUpdatingId(null);
  };

  if (loading && notifications.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Notificações</h2>
        <p className="text-gray-600">Carregando...</p>
      </div>
    );
  }

  if (error && notifications.length === 0) {
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

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded text-red-700 text-sm">
          Erro ao atualizar/listar: {error}
        </div>
      )}

      {notifications.length === 0 ? (
        <p className="text-gray-600">Nenhuma notificação ainda.</p>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification, index) => {
            const statusColor = getStatusColor(notification.status);
            const isUpdating = updatingId === notification.id;
            const selectedStatus =
              selectedStatusById[notification.id] ?? notification.status;
            const hasStatusChanged = selectedStatus !== notification.status;
            const itemKey =
              notification.id && notification.createdAt
                ? `${notification.id}-${notification.createdAt}`
                : `notification-${index}`;

            return (
              <div
                key={itemKey}
                className="border border-gray-300 rounded-lg p-4 hover:shadow-md transition"
              >
                <div className="flex justify-between items-start gap-4">
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

                  <div className="flex items-center gap-2">
                    <select
                      value={selectedStatus}
                      onChange={(e) =>
                        setSelectedStatusById((prev) => ({
                          ...prev,
                          [notification.id]: e.target.value as NotificationStatus,
                        }))
                      }
                      disabled={isUpdating || loading}
                      className="px-2 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-700 disabled:bg-gray-100"
                    >
                      <option value={NotificationStatus.PENDING}>pending</option>
                      <option value={NotificationStatus.SENT}>sent</option>
                      <option value={NotificationStatus.FAILED}>failed</option>
                    </select>

                    <button
                      type="button"
                      onClick={() =>
                        handleUpdateStatus(notification.id, notification.status)
                      }
                      disabled={isUpdating || loading || !hasStatusChanged}
                      className="px-3 py-2 text-sm font-medium rounded-lg bg-green-500 text-white hover:bg-green-600 disabled:bg-gray-400"
                    >
                      {isUpdating ? "Atualizando..." : "Salvar status"}
                    </button>
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
