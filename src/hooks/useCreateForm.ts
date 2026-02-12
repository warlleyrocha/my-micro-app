import { useState } from "react";
import { useNotification } from "../hooks/useNotification";

export const useCreateForm = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const { createNotification, loading, error } = useNotification();

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim() || !message.trim()) {
      alert("Preencha todos os campos");
      return;
    }

    const result = await createNotification({ title, message });

    if (result) {
      setSuccess(true);
      setTitle("");
      setMessage("");
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  return {
    title,
    setTitle,
    message,
    setMessage,
    success,
    setSuccess,
    loading,
    error,
    handleSubmit,
  };
};
