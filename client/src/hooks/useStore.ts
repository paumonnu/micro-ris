import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { merge } from 'ts-deepmerge';

export type AppStore = {
  auth: {
    token: string | null;
    refreshToken: string | null;
    storeAuth: (authToken: string, refreshToken: string) => void;
    signOut: () => void;
  };
};

export const useStore = create<AppStore>()(
  persist(
    (set, get) => ({
      auth: {
        token: null,
        refreshToken: null,
        user: null,
        storeAuth: (authToken: string, refreshToken: string) =>
          set((state) => ({
            ...state,
            auth: {
              ...state.auth,
              token: authToken,
              refreshToken: refreshToken,
            },
          })),
        signOut: () => {
          set((state) => ({
            ...state,
            auth: {
              ...state.auth,
              token: null,
              refreshToken: null,
            },
          }));
        },
      },
    }),
    {
      name: 'app-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
      merge: (persistedState, currentState) =>
        merge(currentState, persistedState as object),
    },
  ),
);
