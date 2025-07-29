import { Check, PaletteIcon } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";
import { THEMES } from "../constants";

const ThemeSelector = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="dropdown dropdown-end">
      <button tabIndex={0} className="btn btn-ghost btn-circle">
        <PaletteIcon className="size-5" />
      </button>

      <div
        tabIndex={0}
        className="dropdown-content mt-2 p-2 shadow-2xl bg-base-200 backdrop-blur-lg rounded-2xl w-64 border border-base-content/10 max-h-80 overflow-y-auto"
      >
        <div className="space-y-3">
          {THEMES.map((themeOption) => {
            const isActive = theme === themeOption.name;
            return (
              <button
                key={themeOption.name}
                data-theme={themeOption.name}
                className={`w-full px-3 py-2 rounded-lg flex items-center justify-between gap-3 transition-colors ${
                  theme === themeOption.name
                    ? "bg-primary/10 text-primary font-semibold"
                    : ""
                }`}
                onClick={() => setTheme(themeOption.name)}
              >
                <span className="flex items-center gap-2 capitalize font-medium">
                  {themeOption.label}
                  {isActive && <Check className="w-4 h-4 text-primary" />}
                </span>
                <div className="flex gap-1">
                  {themeOption.colors.map((color, i) => (
                    <span
                      key={i}
                      className="w-2.5 h-5 rounded-sm"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;
