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
import { MACHINES_DATA } from './data/machines';
import { FileText, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activePage, setActivePage] = useState<AppPage>(() => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (hash === 'katalog' || hash === 'spesifikasi') return 'katalog';
    if (hash === 'fasilitas') return 'fasilitas';
    if (hash === 'tentang' || hash === 'kontak') return 'tentang';
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
      } else if (hash === 'beranda' || hash === '') {
        setActivePage('beranda');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToPage = (page: AppPage, targetSection?: string) => {
    setActivePage(page);
    window.location.hash = page;
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
      showToast(`Mesin "${machine.name}" sudah ada dalam daftar RFQ`);
      return;
    }

    const newItem: RfqItem = {
      machineId: machine.id,
      machineName: machine.name,
      categoryName: machine.categoryName,
      quantity: 1,
    };
    setRfqItems([...rfqItems, newItem]);
    showToast(`Berhasil menambahkan "${machine.name}" ke daftar RFQ`);
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
    showToast(`Membuka form RFQ untuk "${machine.name}"`);
  };

  const handleRemoveRfqItem = (machineId: string) => {
    setRfqItems(rfqItems.filter((i) => i.machineId !== machineId));
    showToast('Item dihapus dari daftar RFQ');
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

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-400 selection:text-neutral-950">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 max-w-sm bg-neutral-900 border border-amber-400/40 text-white px-4 py-3 rounded-xl shadow-2xl backdrop-blur-md flex items-center gap-3 animate-fade-slide">
          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Navigation */}
      <Navbar
        activePage={activePage}
        rfqCount={rfqItems.length}
        onSelectPage={(page) => navigateToPage(page)}
        onOpenRfqModal={() => navigateToPage('tentang', 'kontak')}
      />

      {/* Multi-Page Views Rendering */}
      <main className="flex-1">
        {activePage === 'beranda' && (
          <HomePage
            onSelectPage={(page) => navigateToPage(page)}
            onSelectCategory={(cat) => setSelectedCategory(cat)}
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

      {/* Sticky Bottom RFQ Shortcut Button on Mobile */}
      <div className="sm:hidden fixed bottom-4 right-4 z-40">
        <button
          onClick={() => navigateToPage('tentang', 'kontak')}
          className="flex items-center gap-2 px-4 py-3 bg-amber-400 text-neutral-950 font-bold text-xs rounded-full shadow-2xl shadow-amber-500/40 active:scale-95 transition-all cursor-pointer"
        >
          <FileText className="w-4 h-4" />
          <span>Minta Penawaran ({rfqItems.length})</span>
        </button>
      </div>
    </div>
  );
}
