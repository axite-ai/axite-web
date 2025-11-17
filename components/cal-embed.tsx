"use client";

import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { useTheme } from "next-themes";

export function CalEmbed() {
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "15min" });

      // Determine the current theme (light or dark)
      const currentTheme = theme === "system" ? resolvedTheme : theme;
      const isDark = currentTheme === "dark";

      cal("floatingButton", {
        calLink: "axite/discovery",
        config: {
          layout: "month_view",
          theme: currentTheme || "light"
        },
        buttonText: "Book Discovery Call",
        hideButtonIcon: false,
      });

      cal("ui", {
        theme: currentTheme || "light",
        cssVarsPerTheme: {
          light: {
            "cal-brand": "#292929", // Black for light mode
          },
          dark: {
            "cal-brand": "#ffffff", // White for dark mode
          }
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, [theme, resolvedTheme]);

  return null;
}
