// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import { User } from "../types";

// interface AuthState {
//   user: User | null;
//   accessToken: string | null;
//   isAuthenticated: boolean;
//   hasHydrated: boolean;

//   setAuth: (user: User, token: string) => void;
//   logout: () => void;
//   updateUser: (user: Partial<User>) => void;
//   setHasHydrated: (value: boolean) => void;
// }

// export const useAuthStore = create<AuthState>()(
//   persist(
//     (set) => ({
//       user: null,
//       accessToken: null,
//       isAuthenticated: false,
//       hasHydrated: false,

//       setAuth: (user, token) => {
//         localStorage.setItem("accessToken", token);
//         set({ user, accessToken: token, isAuthenticated: true });
//       },

//       logout: () => {
//         localStorage.removeItem("accessToken");
//         set({ user: null, accessToken: null, isAuthenticated: false });
//       },

//       updateUser: (userData) =>
//         set((state) => ({
//           user: state.user ? { ...state.user, ...userData } : null,
//         })),

//       setHasHydrated: (value) => set({ hasHydrated: value }),
//     }),
//     {
//       name: "auth-storage",
//       onRehydrateStorage: () => (state) => {
//         state?.setHasHydrated(true);
//       },
//       partialize: (state) => ({
//         user: state.user,
//         accessToken: state.accessToken,
//         isAuthenticated: state.isAuthenticated,
//       }),
//     }
//   )
// );

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../types";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  hasHydrated: boolean;

  setAuth: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  setHasHydrated: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      hasHydrated: false,

      setAuth: (user, token) => {
        localStorage.setItem("accessToken", token);
        set({ user, accessToken: token, isAuthenticated: true });
      },

      logout: () => {
        localStorage.removeItem("accessToken");
        set({ user: null, accessToken: null, isAuthenticated: false });
      },

      updateUser: (userData) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),

      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        // Re-sync token to localStorage after hydration
        if (state?.accessToken) {
          localStorage.setItem("accessToken", state.accessToken);
        }
        state?.setHasHydrated(true);
      },
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
