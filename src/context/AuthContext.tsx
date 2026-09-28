import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  role: string;
  sector: string;
}

export const DEMO_ACCOUNTS: UserProfile[] = [
  {
    id: 'usr-ahm-1',
    name: 'Ir. Hendra Wijaya',
    company: 'PT. Astra Honda Motor (AHM)',
    email: 'hendra.wijaya@ahm.astra.co.id',
    phone: '+62 812-8899-2341',
    role: 'Lead Tooling & Fixture Engineer',
    sector: 'Automotive 2W OEM',
  },
  {
    id: 'usr-kalbe-2',
    name: 'Dr. Siti Rahmawati',
    company: 'PT. Kalbe Farma Tbk',
    email: 'siti.rahmawati@kalbefarma.com',
    phone: '+62 813-7722-9011',
    role: 'Packaging Automation Manager',
    sector: 'Pharmaceutical & Healthcare',
  },
  {
    id: 'usr-epson-3',
    name: 'Kenjiro Takahashi',
    company: 'EPSON Robotics Indonesia',
    email: 'k.takahashi@epson.co.id',
    phone: '+62 811-9922-3145',
    role: 'Technical Integration Specialist',
    sector: 'Industrial Automation & Robotics',
  },
];

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'signup';
  openAuthModal: (mode?: 'login' | 'signup') => void;
  closeAuthModal: () => void;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  signup: (userData: Omit<UserProfile, 'id'>, password?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  loginWithDemo: (demoUser: UserProfile) => void;
}

const STORAGE_KEY = 'pt_prima_teknik_auth_user';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // ignore storage errors
    }
  }, [user]);

  const openAuthModal = (mode: 'login' | 'signup' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = async (email: string, _password?: string) => {
    // Check if matches a demo account
    const matched = DEMO_ACCOUNTS.find((d) => d.email.toLowerCase() === email.toLowerCase());
    if (matched) {
      setUser(matched);
      setIsAuthModalOpen(false);
      return { success: true };
    }

    // Generic login with company domain derivation
    const username = email.split('@')[0] || 'Client Engineer';
    const domain = (email.split('@')[1] || 'company.com').replace('.com', '').replace('.co.id', '');
    const derivedCompany = 'PT. ' + domain.charAt(0).toUpperCase() + domain.slice(1) + ' Industrial';

    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name: username.replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      email,
      company: derivedCompany,
      phone: '+62 812-3456-7890',
      role: 'Engineering & Procurement Representative',
      sector: 'Automotive & Precision Manufacturing',
    };

    setUser(newUser);
    setIsAuthModalOpen(false);
    return { success: true };
  };

  const signup = async (userData: Omit<UserProfile, 'id'>, _password?: string) => {
    const newUser: UserProfile = {
      ...userData,
      id: `usr-${Date.now()}`,
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setIsAuthModalOpen(false);
  };

  const loginWithDemo = (demoUser: UserProfile) => {
    setUser(demoUser);
    setIsAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        login,
        signup,
        logout,
        loginWithDemo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
