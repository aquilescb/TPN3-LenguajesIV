import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
   plugins: [react()],
   base: mode === "production" ? "/TPN3-LenguajesIV/" : "/", // <– nombre del repo, con misma mayúsc/minúscula
}));
