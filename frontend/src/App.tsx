import { useMemo, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import router from "./router/router.tsx";
import i18n from "i18next";

export default function App() {
  // Update body direction on language change
  useEffect(() => {
    const handleLanguageChange = () => {
      document.body.dir = i18n.language === "ar" ? "rtl" : "ltr";
    };

    handleLanguageChange();
    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, []);

  // Create MUI theme dynamically based on language
  const theme = useMemo(() => {
    return createTheme({
      typography: {
        fontFamily:
          i18n.language === "ar" ? "Cairo, sans-serif" : "Roboto, sans-serif",
      },
    });
  }, [i18n.language]);

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
