import React, { useState, useEffect } from 'react';
import { Navbar, AppPage } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { FacilitiesPage } from './pages/FacilitiesPage';
import { AboutPage } from './pages/AboutPage';
import { Footer } from './components/Footer';
import { MachineDetailModal } from './components/MachineDetailModal';
import { MachineCompareModal } from './components/MachineCompareModal';
import { MachineItem, MachineCategory, RfqItem } from './types';
import { FileText, CheckCircle2, MessageSquare } from 'lucide-react';
import { COMPANY_INFO } from './data/company';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProjectDataProvider } from './context/ProjectDataContext';
import { AuthModal } from './components/AuthModal';
import { BackendAdminPage } from './pages/BackendAdminPage';
import { CustomerPortalPage } from './pages/CustomerPortalPage';

function AppContent() {
  const { theme } = useTheme();
  const { language, t } = useLanguage();
  const isDark = theme === 'dark';
  const { isAuthenticated } = useAuth();

  const [activePage, setActivePage] = useState<AppPage>(() => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (hash === 'katalog' || hash === 'spesifikasi') return 'katalog';
    if (hash === 'fasilitas') return 'fasilitas';
    if (hash === 'tentang' || hash === 'kontak') return 'tentang';
    if (hash === 'admin' || hash === 'backend' || hash === 'backend-admin') return 'backend-admin';
    if (hash === 'portal-customer' || hash === 'customer' || hash === 'orderan' || hash === 'customer-portal')
      return 'customer-portal';
    return 'beranda';
  });

  const [selectedCategory, setSelectedCategory] = useState<MachineCategory>('all');
  const [activeDetailMachine, setActiveDetailMachine] = useState<MachineItem | null>(null);
  const [compareMachines, setCompareMachines] = useState<MachineItem[]>([]);
  const [rfqItems, setRfqItems] = useState<RfqItem[]>([
    {
      machineId: 'spm-assembly-line',
      machineName: 'Automated Assembly & Packaging Line Machine',
      categoryName: 'Automation & Customized Machines',
      quantity: 1,
    },
  ]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync hash changes with active page
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'katalog' || hash === 'spesifikasi') {
        setActivePage('katalog');
      } else if (hash === 'fasilitas') {
        setActivePage('fasilitas');
      } else if (hash === 'tentang' || hash === 'kontak') {
        setActivePage('tentang');
      } else if (hash === 'admin' || hash === 'backend' || hash === 'backend-admin') {
        setActivePage('backend-admin');
      } else if (hash === 'portal-customer' || hash === 'customer' || hash === 'orderan' || hash === 'customer-portal') {
        setActivePage('customer-portal');
      } else if (hash === 'beranda' || hash === '') {
        setActivePage('beranda');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Automatic redirect to homepage on logout if currently on dashboard
  useEffect(() => {
    if (!isAuthenticated && (activePage === 'backend-admin' || activePage === 'customer-portal')) {
      setActivePage('beranda');
      window.history.replaceState(null, '', window.location.pathname);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isAuthenticated, activePage]);

  const navigateToPage = (page: AppPage, targetSection?: string) => {
    setActivePage(page);
    if (page === 'beranda') {
      window.history.replaceState(null, '', window.location.pathname);
    } else {
      window.location.hash = page;
    }
    if (targetSection) {
      setTimeout(() => {
        const el = document.getElementById(targetSection);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleAddToRfq = (machine: MachineItem) => {
    const exists = rfqItems.find((i) => i.machineId === machine.id);
    if (exists) {
      showToast(
        language === 'en'
          ? `Machine "${machine.name}" is already in your RFQ list`
          : `Mesin "${machine.name}" sudah ada dalam daftar RFQ`
      );
      return;
    }

    const newItem: RfqItem = {
      machineId: machine.id,
      machineName: machine.name,
      categoryName: machine.categoryName,
      quantity: 1,
    };
    setRfqItems([...rfqItems, newItem]);
    showToast(
      language === 'en'
        ? `Added "${machine.name}" to your RFQ list`
        : `Berhasil menambahkan "${machine.name}" ke daftar RFQ`
    );
  };

  const handleDirectQuoteFromModal = (machine: MachineItem) => {
    const exists = rfqItems.find((i) => i.machineId === machine.id);
    if (!exists) {
      setRfqItems([
        ...rfqItems,
        {
          machineId: machine.id,
          machineName: machine.name,
          categoryName: machine.categoryName,
          quantity: 1,
        },
      ]);
    }
    setActiveDetailMachine(null);
    navigateToPage('tentang', 'kontak');
    showToast(
      language === 'en'
        ? `Opening RFQ form for "${machine.name}"`
        : `Membuka form RFQ untuk "${machine.name}"`
    );
  };

  const handleRemoveRfqItem = (machineId: string) => {
    setRfqItems(rfqItems.filter((i) => i.machineId !== machineId));
    showToast(
      language === 'en'
        ? 'Item removed from RFQ list'
        : 'Item dihapus dari daftar RFQ'
    );
  };

  const handleUpdateRfqQuantity = (machineId: string, delta: number) => {
    setRfqItems((prev) =>
      prev
        .map((item) => {
          if (item.machineId === machineId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as RfqItem[]
    );
  };

  const handleAddQuickItem = (machine: MachineItem) => {
    handleAddToRfq(machine);
  };

  const rfqItemIds = rfqItems.map((i) => i.machineId);

  if (activePage === 'backend-admin') {
    return (
      <BackendAdminPage
        onBackToHome={() => navigateToPage('beranda')}
        onOpenCustomerPortal={() => navigateToPage('customer-portal')}
      />
    );
  }

  if (activePage === 'customer-portal') {
    return (
      <CustomerPortalPage
        onBackToHome={() => navigateToPage('beranda')}
        onOpenBackendAdmin={() => navigateToPage('backend-admin')}
      />
    );
  }

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
        isDark ? 'bg-[#080a0f] text-neutral-100' : 'bg-white text-slate-900'
      }`}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:right-6 z-50 animate-fade-slide">
          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border text-xs font-semibold backdrop-blur-md ${
              isDark
                ? 'bg-neutral-900/95 border-amber-400/40 text-white'
                : 'bg-white/95 border-amber-400/60 text-slate-900 shadow-slate-300'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Main Unified Navigation Bar */}
      <Navbar
        activePage={activePage}
        rfqCount={rfqItems.length}
        onSelectPage={(page) => navigateToPage(page)}
        onOpenRfqModal={() => navigateToPage('tentang', 'kontak')}
      />

      {/* Dynamic Main Page Content */}
      <main className="flex-1">
        {activePage === 'beranda' && (
          <HomePage
            onSelectPage={(page) => navigateToPage(page)}
            onSelectCategory={(category) => {
              setSelectedCategory(category);
              navigateToPage('katalog');
            }}
            onOpenRfq={() => navigateToPage('tentang', 'kontak')}
          />
        )}

        {activePage === 'katalog' && (
          <CatalogPage
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onOpenMachineDetail={(m) => setActiveDetailMachine(m)}
            onAddToRfq={handleAddToRfq}
            rfqItemIds={rfqItemIds}
            onOpenCompare={(machines) => setCompareMachines(machines)}
            onSelectPage={(page) => navigateToPage(page)}
          />
        )}

        {activePage === 'fasilitas' && (
          <FacilitiesPage
            onSelectPage={(page) => navigateToPage(page)}
            onOpenRfq={() => navigateToPage('tentang', 'kontak')}
          />
        )}

        {activePage === 'tentang' && (
          <AboutPage
            onSelectPage={(page) => navigateToPage(page)}
            rfqItems={rfqItems}
            onRemoveItem={handleRemoveRfqItem}
            onUpdateQuantity={handleUpdateRfqQuantity}
            onAddQuickItem={handleAddQuickItem}
          />
        )}
      </main>

      {/* Quiet Corporate Footer */}
      <Footer
        onSelectPage={(page) => navigateToPage(page)}
        onOpenRfq={() => navigateToPage('tentang', 'kontak')}
      />

      {/* Machine Technical Detail Modal */}
      <MachineDetailModal
        machine={activeDetailMachine}
        onClose={() => setActiveDetailMachine(null)}
        onAddToRfq={handleAddToRfq}
        isAddedToRfq={
          activeDetailMachine ? rfqItemIds.includes(activeDetailMachine.id) : false
        }
        onDirectQuote={handleDirectQuoteFromModal}
      />

      {/* Machine Comparison Modal */}
      {compareMachines.length > 0 && (
        <MachineCompareModal
          machines={compareMachines}
          onClose={() => setCompareMachines([])}
          onAddToRfq={handleAddToRfq}
          rfqItemIds={rfqItemIds}
        />
      )}

      {/* Floating Login / Sign Up Modal */}
      <AuthModal
        onNavigateHome={() => navigateToPage('beranda')}
        onNavigateToRfq={() => navigateToPage('tentang', 'kontak')}
        onOpenBackendAdmin={() => navigateToPage('backend-admin')}
        onOpenCustomerPortal={() => navigateToPage('customer-portal')}
      />

      {/* Sticky Bottom WhatsApp RFQ Shortcut Button on Mobile */}
      <div className="sm:hidden fixed bottom-4 right-4 z-40">
        <a
          href={`https://wa.me/${COMPANY_INFO.whatsappDirect}?text=${encodeURIComponent(COMPANY_INFO.whatsappDefaultMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-full shadow-2xl shadow-emerald-600/40 active:scale-95 transition-all cursor-pointer"
        >
          <MessageSquare className="w-4 h-4 shrink-0" />
          <span>Request RFQ (WhatsApp)</span>
        </a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ProjectDataProvider>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </ProjectDataProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
