import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const storageModule = {
  name: "kanban-board-storage",
  storage: createJSONStorage(() => sessionStorage),
};

type store = {
  token: string;
  displayName: string;
  email: string;
  setToken: (newToken: string) => void;
  setDisplayName: (name: string) => void;
  setEmail: (email: string) => void;
  logout: () => void;
  reset: () => void;
};

const useKanbanStore = create<store>()(
  persist(
    (set) => ({
      token: "",
      displayName: "",
      email: "",
      setToken: (newToken) => set(() => ({ token: newToken })),
      setDisplayName: (name: string) => set(() => ({ displayName: name })),
      setEmail: (email: string) => set(() => ({ email })),
      logout: () => {
        set(() => ({
          token: "",
          displayName: "",
          email: "",
        }));
      },
      reset: () => {
        set(() => ({
          token: "",
          displayName: "",
          email: "",
        }));
      },
    }),
    storageModule,
  ),
);
export default useKanbanStore;
