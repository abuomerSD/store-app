import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material"; // Import Button from MUI
import { useAuth } from "../context/auth/useAuth"; // Assuming useAuth is correctly typed
import ConfirmationDialog from "./dialogs/ConfirmationDialog";

// Define a type for the User object coming from the context
// (You should replace this with the exact IUser interface from your AuthContext)
interface IUser {
  username: string;
  role: string;
  // Add other properties if they exist
}

const languages = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  // Ensure useAuth returns a strongly typed user
  const { user, logout } = useAuth() as {
    user: IUser | null;
    logout: () => void;
  };

  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState(i18n.language || "en");
  const [openLogoutConfirm, setOpenLogoutConfirm] = useState(false);

  const navLinks = [
    { name: t("navbar.home"), path: "/" },
    { name: t("navbar.categories"), path: "/categories" },
    { name: t("navbar.products"), path: "/products" },
  ];

  useEffect(() => {
    const dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.body.dir = dir;
    // TypeScript check: Ensure style property is accessed safely
    document.body.style.fontFamily =
      i18n.language === "ar" ? "Cairo, sans-serif" : "Roboto, sans-serif";
  }, [i18n.language]);

  const handleChangeLanguage = (selectedLang: string) => {
    i18n.changeLanguage(selectedLang);
    setLang(selectedLang);
  };

  const handleLogout = () => {
    setOpenLogoutConfirm(true);
  };

  const handleCloseConfirm = (confirmed: boolean) => {
    setOpenLogoutConfirm(false);

    if (confirmed) {
      logout();
    } else {
      console.log("User cancelled the action.");
    }
  };

  return (
    <nav className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-around">
        <div className="flex justify-between h-16 items-center w-[80%]">
          {/* Logo */}
          <Link to="/" className="font-bold text-lg">
            StoreApp
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex gap-2 space-x-4 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="px-3 py-2 rounded hover:bg-blue-500"
              >
                {link.name}
              </Link>
            ))}

            {/* Language selector */}
            <div className="relative">
              <select
                value={lang}
                onChange={(e) => handleChangeLanguage(e.target.value)}
                className="bg-blue-600 text-white border border-white rounded px-2 py-1"
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.flag} {l.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Username and Logout (NEW) */}
            {user && (
              <div className="flex items-center gap-3 space-x-2">
                {/* TypeScript check: user is not null here */}
                <h3 className="font-semibold text-sm">{user.username}</h3>
                <Button
                  onClick={handleLogout}
                  variant="contained"
                  size="small"
                  sx={{
                    backgroundColor: "#ef4444", // Tailwind red-500
                    "&:hover": { backgroundColor: "#dc2626" }, // Tailwind red-600
                  }}
                >
                  {t("navbar.logout")}
                </Button>
              </div>
            )}
            {/* End Username and Logout */}
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-blue-500 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-700 px-2 pt-2 pb-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded hover:bg-blue-500"
            >
              {link.name}
            </Link>
          ))}

          {/* Mobile Logout (NEW) */}
          {user && (
            <div className="px-3 py-2">
              <p className="font-semibold text-sm mb-1">{user.username}</p>
              <Button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                variant="contained"
                size="small"
                fullWidth
                sx={{
                  backgroundColor: "#ef4444",
                  "&:hover": { backgroundColor: "#dc2626" },
                }}
              >
                {t("navbar.logout")}
              </Button>
            </div>
          )}

          {/* Mobile language selector */}
          <div className="mt-2">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => {
                  handleChangeLanguage(l.code);
                  setIsOpen(false);
                }}
                className="block w-full text-left px-3 py-2 hover:bg-blue-500 rounded"
              >
                <span className="mr-2">{l.flag}</span>
                {l.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* dialogs */}
      <ConfirmationDialog
        open={openLogoutConfirm}
        onClose={handleCloseConfirm}
        title={t("navbar.dialog.logout")}
        message={t("navbar.dialog.doYouWantToLogout")}
        confirmText={t("navbar.dialog.logout")}
        cancelText={t("navbar.dialog.cancel")}
      />
    </nav>
  );
}
