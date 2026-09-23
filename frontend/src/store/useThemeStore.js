import { create } from "zustand";

const useThemeStore = create((set) => ({
    theme: localStorage.getItem("peerly-theme") || "light",
    setTheme: (theme) => {
        localStorage.setItem("peerly-theme", theme);
        set({theme});
    },
}));

export default useThemeStore;