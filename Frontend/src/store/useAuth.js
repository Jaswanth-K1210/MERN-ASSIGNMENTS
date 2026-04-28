import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

// Set globally so ALL axios requests include cookies
axios.defaults.withCredentials = true;

const API_URL = "http://localhost:3000";

export const useAuth = create(
  persist(
    (set) => ({
      currentUser: null,
      loading: false,
      isAuthenticated: false,
      error: null,

      login: async (userCredentials) => {
        set({ loading: true, error: null });
        try {
          const res = await axios.post(
            `${API_URL}/common-api/login`,
            userCredentials,
          );
          let response = res.data;
          set({
            isAuthenticated: true,
            loading: false,
            error: null,
            currentUser: response.payload,
          });
        } catch (err) {
          console.log(err);
          set({
            loading: false,
            error:
              err.response?.data?.error || err.response?.data?.message || "An error occurred during login",
          });
        }
      },

      logout: async () => {
        try {
          set({ loading: true, error: null });
          await axios.post(`${API_URL}/common-api/logout`);
          set({ loading: false, isAuthenticated: false, currentUser: null, error: null });
        } catch (err) {
          console.log(err);
          set({
            loading: false,
            isAuthenticated: false,
            currentUser: null,
            error:
              err.response?.data?.message || "An error occurred during logout",
          });
        }
      },

      register: async (userData) => {
        set({ loading: true, error: null });
        try {
          const res = await axios.post(
            `${API_URL}/common-api/register`,
            userData,
          );
          if (res.status === 201) {
            set({ loading: false, error: null });
            return true;
          } else {
            set({ loading: false, error: "Registration failed" });
            return false;
          }
        } catch (err) {
          console.log(err);
          set({
            loading: false,
            error:
              err.response?.data?.error || err.response?.data?.message ||
              "An error occurred during registration",
          });
          return false;
        }
      },

      registerAuthor: async (formData) => {
        set({ loading: true, error: null });
        try {
          const res = await axios.post(
            `${API_URL}/author-api/register/authors`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } },
          );
          if (res.status === 201) {
            set({ loading: false, error: null });
            return true;
          } else {
            set({ loading: false, error: "Registration failed" });
            return false;
          }
        } catch (err) {
          console.log(err);
          set({
            loading: false,
            error:
              err.response?.data?.error || err.response?.data?.message ||
              "An error occurred during registration",
          });
          return false;
        }
      },

      checkAuth: async () => {
        set({ loading: true, error: null });
        try {
          const res = await axios.get(`${API_URL}/common-api/check-auth`);
          set({
            isAuthenticated: true,
            currentUser: res.data.payload,
            loading: false,
            error: null,
          });
        } catch (err) {
          set({
            isAuthenticated: false,
            currentUser: null,
            loading: false,
            error: null,
          });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
