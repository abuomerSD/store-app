import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Simple emoji flags
const languages = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [direction, setDirection] = useState<"ltr" | "rtl">("ltr");
  const [lang, setLang] = useState(i18n.language || "en");

  const navLinks = [
    { name: t("navbar.home"), path: "/" },
    { name: t("categories"), path: "/categories" },
    { name: t("products"), path: "/products" },
  ];

  // Update direction when language changes
  useEffect(() => {
    const dir = i18n.language === "ar" ? "rtl" : "ltr";
    setDirection(dir);
    document.body.dir = dir;
    const font =
      i18n.language === "ar" ? "Cairo, sans-serif" : "Roboto, sans-serif";
    document.body.style.fontFamily = font;
  }, [i18n.language]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => setAnchorEl(null);

  const handleChangeLanguage = (selectedLang: string) => {
    i18n.changeLanguage(selectedLang);
    setLang(selectedLang);
  };

  return (
    <AppBar position="static" className="bg-blue-600" sx={{ direction }}>
      <Toolbar className="flex justify-between">
        {/* Logo / Brand */}
        <Typography variant="h6" className="font-bold text-white">
          StoreApp
        </Typography>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-4">
          {navLinks.map((link) => (
            <Button
              key={link.name}
              color="inherit"
              component={Link}
              to={link.path}
              className="hover:bg-blue-500 rounded"
            >
              {link.name}
            </Button>
          ))}

          {/* Language Selector */}
          <FormControl variant="standard" className="text-white">
            <Select
              value={lang}
              onChange={(e) => handleChangeLanguage(e.target.value)}
              sx={{
                color: "white",
                ".MuiSvgIcon-root": { color: "white" },
                "&:before": { borderColor: "white" },
                "&:after": { borderColor: "white" },
              }}
            >
              {languages.map((l) => (
                <MenuItem key={l.code} value={l.code}>
                  <span className="mr-2">{l.flag}</span>
                  {l.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center space-x-2">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            keepMounted
            sx={{ direction }}
          >
            {navLinks.map((link) => (
              <MenuItem
                key={link.name}
                component={Link}
                to={link.path}
                onClick={handleMenuClose}
              >
                {link.name}
              </MenuItem>
            ))}

            {/* Mobile language selector */}
            {languages.map((l) => (
              <MenuItem
                key={l.code}
                onClick={() => {
                  handleChangeLanguage(l.code); // no `any` needed
                  handleMenuClose();
                }}
              >
                <span className="mr-2">{l.flag}</span>
                {l.label}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}
