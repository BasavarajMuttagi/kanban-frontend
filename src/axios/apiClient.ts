import axios from "axios";
import useKanbanStore from "../store";

function apiClient() {
  const token = useKanbanStore.getState().token;
  const baseUrl = import.meta.env.VITE_BASE_URL;
  return axios.create({
    baseURL: baseUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export default apiClient();
