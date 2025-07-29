import {create} from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("crypchat-theme") || "light",
  setTheme: (theme) => {
    localStorage.setItem("crypchat-theme", theme);
    set({theme});
  }
}));
