export type ApiConfig = {
  apiUrl: string;
};

export const apiConfig: ApiConfig = {
  apiUrl: import.meta.env.VITE_API_URL,
};
