import { createContext, useContext, useState, type ReactNode } from "react";

interface AuthContextType {
    showAuthModal: boolean;
    setShowAuthModal: (show: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [showAuthModal, setShowAuthModal] = useState(false);

    return (
        <AuthContext.Provider value={{  showAuthModal, setShowAuthModal }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};