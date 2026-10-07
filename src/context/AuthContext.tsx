import React, { createContext, useContext, useState, useEffect } from 'react';
import { InternalStaff, CustomerAccount } from '../types/backend';
import { INITIAL_STAFF_ACCOUNTS, INITIAL_CUSTOMERS } from '../data/initialBackendData';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  role: string;
  sector: string;
  userType: 'internal' | 'customer';
  // Optional customer details
  companyAddress?: string;
  contactPerson?: string;
  // Optional internal staff details
  department?: string;
  staffRole?: 'Administrator Full Access' | 'Staff Access';
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isInternalStaff: boolean;
  isAdmin: boolean;
  isCustomer: boolean;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'signup';
  authModalTab: 'customer' | 'staff';
  openAuthModal: (mode?: 'login' | 'signup', tab?: 'customer' | 'staff') => void;
  closeAuthModal: () => void;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  loginStaff: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginCustomer: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  registerCustomer: (data: {
    companyName: string;
    picName: string;
    email: string;
    password: string;
    companyAddress: string;
    phone: string;
    contactPerson: string;
    industrySector?: string;
  }) => Promise<{ success: boolean; error?: string }>;
  signup: (userData: Omit<UserProfile, 'id' | 'userType'>, password?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updatePassword: (newPassword: string) => Promise<{ success: boolean; error?: string }>;
}

const STORAGE_USER_KEY = 'pttid_active_session_v2';
const STORAGE_STAFF_KEY = 'pttid_staff_accounts_v2';
const STORAGE_CUSTOMERS_KEY = 'pttid_customers_data_v1';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_USER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');
  const [authModalTab, setAuthModalTab] = useState<'customer' | 'staff'>('customer');

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_USER_KEY);
      }
    } catch {
      // ignore
    }
  }, [user]);

  const openAuthModal = (mode: 'login' | 'signup' = 'login', tab: 'customer' | 'staff' = 'customer') => {
    setAuthModalMode(mode);
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  // Helper to read current staff accounts from storage or fallback
  const getStaffAccounts = (): InternalStaff[] => {
    try {
      const saved = localStorage.getItem(STORAGE_STAFF_KEY);
      return saved ? JSON.parse(saved) : INITIAL_STAFF_ACCOUNTS;
    } catch {
      return INITIAL_STAFF_ACCOUNTS;
    }
  };

  // Helper to read current customers from storage or fallback
  const getCustomerAccounts = (): CustomerAccount[] => {
    try {
      const saved = localStorage.getItem(STORAGE_CUSTOMERS_KEY);
      return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
    } catch {
      return INITIAL_CUSTOMERS;
    }
  };

  // Login Internal Staff
  const loginStaff = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const staffList = getStaffAccounts();
    const cleanEmail = email.toLowerCase().trim();
    let staff = staffList.find((s) => s.email.toLowerCase() === cleanEmail);

    // Fallback check against INITIAL_STAFF_ACCOUNTS for official accounts like ikaandy@pttid.com
    if (!staff) {
      staff = INITIAL_STAFF_ACCOUNTS.find((s) => s.email.toLowerCase() === cleanEmail);
    }

    if (!staff) {
      return {
        success: false,
        error: `Email "${email}" tidak terdaftar dalam direktori staf PT. Prima Teknik Trada. Pastikan menggunakan email resmi @pttid.com.`,
      };
    }

    // Allow password matching either current storage or initial default for director
    const isPasswordValid =
      staff.password === password ||
      (cleanEmail === 'ikaandy@pttid.com' && password === 'PTT-Admin#9901');

    if (!isPasswordValid) {
      return {
        success: false,
        error: 'Kata sandi salah. Silakan periksa password hasil generate sistem untuk akun ini.',
      };
    }

    const userProfile: UserProfile = {
      id: staff.id,
      name: staff.name,
      email: staff.email,
      company: 'PT. PRIMA TEKNIK TRADA (Internal)',
      phone: staff.phone,
      role: staff.role,
      sector: staff.department,
      userType: 'internal',
      department: staff.department,
      staffRole: staff.role,
    };

    setUser(userProfile);
    setIsAuthModalOpen(false);
    return { success: true };
  };

  // Login Customer
  const loginCustomer = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const custList = getCustomerAccounts();
    const cleanEmail = email.toLowerCase().trim();
    let cust = custList.find((c) => c.email.toLowerCase() === cleanEmail);

    if (!cust) {
      cust = INITIAL_CUSTOMERS.find((c) => c.email.toLowerCase() === cleanEmail);
    }

    if (!cust) {
      return {
        success: false,
        error: `Email "${email}" belum terdaftar sebagai akun customer. Silakan mendaftar terlebih dahulu pada tab "Daftar Akun Customer".`,
      };
    }

    const isPasswordValid =
      cust.password === password ||
      (cleanEmail === 'hendra.wijaya@ahm.astra.co.id' && password === 'Cust-AHM#2026');

    if (!isPasswordValid) {
      return {
        success: false,
        error: 'Kata sandi customer tidak cocok. Silakan coba lagi atau gunakan password terdaftar.',
      };
    }

    const userProfile: UserProfile = {
      id: cust.id,
      name: cust.picName,
      email: cust.email,
      company: cust.companyName,
      phone: cust.phone,
      role: 'Client Partner & Project Owner',
      sector: cust.industrySector,
      userType: 'customer',
      companyAddress: cust.companyAddress,
      contactPerson: cust.contactPerson,
    };

    setUser(userProfile);
    setIsAuthModalOpen(false);
    return { success: true };
  };

  // Universal Login (handles both internal staff and customer)
  const login = async (email: string, password?: string): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = email.toLowerCase().trim();
    const enteredPass = password || '';

    // If email is @pttid.com -> Staff flow
    if (cleanEmail.endsWith('@pttid.com')) {
      return loginStaff(cleanEmail, enteredPass);
    }

    // Otherwise check customer list
    const custList = getCustomerAccounts();
    const existingCust = custList.find((c) => c.email.toLowerCase() === cleanEmail);
    if (existingCust) {
      return loginCustomer(cleanEmail, enteredPass);
    }

    // If password not provided or customer doesn't exist, provide clear error
    if (!enteredPass) {
      return {
        success: false,
        error: 'Mohon masukkan kata sandi.',
      };
    }

    return {
      success: false,
      error: 'Akun tidak ditemukan. Silakan daftarkan perusahaan Anda pada formulir Registrasi Customer.',
    };
  };

  // Register Customer
  const registerCustomer = async (data: {
    companyName: string;
    picName: string;
    email: string;
    password: string;
    companyAddress: string;
    phone: string;
    contactPerson: string;
    industrySector?: string;
  }): Promise<{ success: boolean; error?: string }> => {
    const custList = getCustomerAccounts();
    const cleanEmail = data.email.toLowerCase().trim();

    if (custList.some((c) => c.email.toLowerCase() === cleanEmail)) {
      return {
        success: false,
        error: `Email "${data.email}" sudah terdaftar. Silakan login langsung.`,
      };
    }

    const newCustomer: CustomerAccount = {
      id: `cust-${Date.now()}`,
      companyName: data.companyName,
      picName: data.picName,
      email: data.email,
      password: data.password,
      companyAddress: data.companyAddress,
      phone: data.phone,
      contactPerson: data.contactPerson || `${data.picName} (${data.phone})`,
      industrySector: data.industrySector || 'Industrial Precision Manufacturing',
      registeredAt: new Date().toISOString().split('T')[0],
      status: 'verified',
    };

    // Save to storage
    const updatedList = [newCustomer, ...custList];
    try {
      localStorage.setItem(STORAGE_CUSTOMERS_KEY, JSON.stringify(updatedList));
    } catch {
      // ignore
    }

    // Set active user session
    const userProfile: UserProfile = {
      id: newCustomer.id,
      name: newCustomer.picName,
      email: newCustomer.email,
      company: newCustomer.companyName,
      phone: newCustomer.phone,
      role: 'Client Partner & Project Owner',
      sector: newCustomer.industrySector,
      userType: 'customer',
      companyAddress: newCustomer.companyAddress,
      contactPerson: newCustomer.contactPerson,
    };

    setUser(userProfile);
    setIsAuthModalOpen(false);
    return { success: true };
  };

  // Backward compatible signup
  const signup = async (
    userData: Omit<UserProfile, 'id' | 'userType'>,
    password?: string
  ): Promise<{ success: boolean; error?: string }> => {
    return registerCustomer({
      companyName: userData.company,
      picName: userData.name,
      email: userData.email,
      password: password || 'PTT#Cust2026!',
      companyAddress: userData.companyAddress || 'Alamat Perusahaan Terdaftar',
      phone: userData.phone,
      contactPerson: userData.contactPerson || userData.name,
      industrySector: userData.sector,
    });
  };

  // Change password for active user
  const updatePassword = async (newPassword: string): Promise<{ success: boolean; error?: string }> => {
    if (!user) return { success: false, error: 'Tidak ada sesi login aktif.' };

    if (user.userType === 'internal') {
      const staffList = getStaffAccounts();
      const updated = staffList.map((s) => (s.id === user.id ? { ...s, password: newPassword } : s));
      try {
        localStorage.setItem(STORAGE_STAFF_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return { success: true };
    } else {
      const custList = getCustomerAccounts();
      const updated = custList.map((c) => (c.id === user.id ? { ...c, password: newPassword } : c));
      try {
        localStorage.setItem(STORAGE_CUSTOMERS_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return { success: true };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isInternalStaff: user?.userType === 'internal',
        isAdmin:
          Boolean(
            (user?.userType === 'internal' &&
              user?.staffRole === 'Administrator Full Access' &&
              user?.department !== 'General Admin') ||
              user?.email?.toLowerCase() === 'ikaandy@pttid.com'
          ),
        isCustomer: user?.userType === 'customer',
        isAuthModalOpen,
        authModalMode,
        authModalTab,
        openAuthModal,
        closeAuthModal,
        login,
        loginStaff,
        loginCustomer,
        registerCustomer,
        signup,
        logout,
        updatePassword,
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
