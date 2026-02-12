import { useCreateForm } from "../hooks/useCreateForm";

export default function CreateNotification() {
  const {
    title,
    setTitle,
    message,
    setMessage,
    success,
    loading,
    error,
    handleSubmit,
  } = useCreateForm();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Criar Notificação
      </h2>

      {success && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          ✓ Notificação criada com sucesso!
        </div>
      )}

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          Erro: {error}
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="titulo"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Título
          </label>
          <input
            id="titulo"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
            placeholder="Digite o título"
          />
        </div>
        <div>
          <label
            htmlFor="mensagem"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Mensagem
          </label>
          <textarea
            id="mensagem"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={loading}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
            rows={4}
            placeholder="Digite a mensagem"
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition disabled:bg-gray-400 cursor-pointer"
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </div>
  );
}
