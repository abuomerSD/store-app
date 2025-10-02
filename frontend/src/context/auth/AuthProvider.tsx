import { useEffect, useState, type ReactNode } from "react";
// Assuming AuthContext (and its type definition) is defined elsewhere and now includes `isLoading`
import { AuthContext, type IUser } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Initialize user state to null
  const [user, setUser] = useState<IUser | null>(null);
  // NEW: Add loading state, true initially
  const [isLoading, setIsLoading] = useState(true);

  // 1. INITIALIZATION EFFECT: Check local storage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    try {
      if (storedUser) {
        // Parse the JSON string and set the user state
        const userData: IUser = JSON.parse(storedUser);
        setUser(userData);
        console.log("Session restored for user:", userData.username);
      }
    } catch (e) {
      // Handle potential errors if the stored JSON is corrupted
      console.error("Error parsing stored user data:", e);
      localStorage.removeItem("user"); // Clear corrupted storage
    } finally {
      // IMPORTANT: Set loading to false once the check is complete, regardless of outcome
      setIsLoading(false);
    }
  }, []); // Runs only once on mount

  // Optional: Logging to observe state changes
  useEffect(() => {
    console.log("user state updated:", user);
  }, [user]);

  const login = (userData: IUser) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    // Pass the new isLoading state through the context
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
