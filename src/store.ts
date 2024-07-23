import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const storageModule = {
  name: "kanban-board-storage",
  storage: createJSONStorage(() => sessionStorage),
};

type store = {
  token: string;
  displayName: string;
  setToken: (newToken: string) => void;
  setDisplayName: (name: string) => void;
  logout: () => void;
  reset: () => void;
};

const useKanbanStore = create<store>()(
  persist(
    (set) => ({
      token: "",
      displayName: "",
      setToken: (newToken) => set(() => ({ token: newToken })),
      setDisplayName: (name: string) => set(() => ({ displayName: name })),
      logout: () => {
        set(() => ({
          token: "",
          displayName: "",
        }));
      },
      reset: () => {
        set(() => ({
          token: "",
          displayName: "",
        }));
      },
    }),
    storageModule,
  ),
);
export default useKanbanStore;
