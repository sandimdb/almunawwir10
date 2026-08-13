import React, { useState } from 'react';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AbsensiInput from './components/AbsensiInput';
import RekapAbsensi from './components/RekapAbsensi';
import SantriList from './components/SantriList';
import NfcScannerModal from './components/NfcScannerModal';

export default function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isNfcOpen, setIsNfcOpen] = useState(false);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    // Full-screen flex layout: sidebar on left, main content on right
    <div className="flex h-screen w-screen overflow-hidden bg-slate-100 text-slate-900 font-sans">

      {/* ─── Collapsible Sidebar (Desktop) / Drawer (Mobile) ─── */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onLogout={handleLogout}
        onOpenNfc={() => setIsNfcOpen(true)}
      />

      {/* ─── Main Content Panel ─── */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">

        {/* Sticky Top Header Bar (Desktop) */}
        <div className="hidden md:flex items-center justify-between px-8 py-3 bg-white/80 backdrop-blur-sm border-b border-slate-200/80 sticky top-0 z-20 flex-shrink-0">
          <div>
            <h2 className="text-base font-bold text-slate-900 leading-tight">
              {activeTab === 'dashboard' && '📊 Beranda & Ringkasan'}
              {activeTab === 'absensi' && '📋 Input Presensi Santri'}
              {activeTab === 'rekap' && '📁 Rekap & Laporan Kehadiran'}
              {activeTab === 'santri' && '👥 Data Santri & Profil'}
            </h2>
            <p className="text-xs text-slate-500">
              {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              🟢 Server Online
            </span>
            <button
              onClick={() => setIsNfcOpen(true)}
              className="flex items-center gap-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-xl shadow-sm shadow-emerald-600/20 transition"
            >
              <span>⚡ Tap Kartu</span>
            </button>
          </div>
        </div>

        {/* Scrollable page area */}
        <main className="flex-1 overflow-y-auto">
          {/* Top padding for mobile topbar */}
          <div className="md:hidden h-14" />

          {/* Page Content */}
          <div className="p-4 sm:p-6 lg:p-8 pb-24 md:pb-8">
            {activeTab === 'dashboard' && (
              <Dashboard
                setActiveTab={setActiveTab}
                onOpenQrScanner={() => setIsNfcOpen(true)}
              />
            )}
            {activeTab === 'absensi' && (
              <AbsensiInput onOpenQrScanner={() => setIsNfcOpen(true)} />
            )}
            {activeTab === 'rekap' && (
              <RekapAbsensi />
            )}
            {activeTab === 'santri' && (
              <SantriList />
            )}
          </div>
        </main>

      </div>

      {/* ─── NFC Scanner Modal ─── */}
      <NfcScannerModal
        isOpen={isNfcOpen}
        onClose={() => setIsNfcOpen(false)}
      />

    </div>
  );
}
