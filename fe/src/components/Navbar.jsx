import React from 'react';
import { 
  Home, 
  ClipboardCheck, 
  FileSpreadsheet, 
  Users, 
  LogOut, 
  BookOpen, 
  Bell, 
  Sparkles,
  QrCode,
  Wifi
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, user, onLogout, onOpenQrScanner }) {
  return (
    <>
      {/* DESKTOP HEADER & SIDEBAR */}
      <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo & Ponpes Title */}
          <div className="flex items-center space-x-3">
            <img src="/logo.png" alt="Logo Asrama Al-Munawwir" className="w-10 h-10 object-contain drop-shadow-md" />
            <div>
              <h1 className="font-bold text-base sm:text-lg leading-tight tracking-wide text-white">
                Absensi Santri
              </h1>
              <p className="text-xs text-emerald-400 font-semibold">
                Asrama Al-Munawwir • Blok 10
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === 'dashboard'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Beranda</span>
            </button>

            <button
              onClick={() => setActiveTab('absensi')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === 'absensi'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <ClipboardCheck className="w-4 h-4" />
              <span>Input Presensi</span>
            </button>

            <button
              onClick={() => setActiveTab('rekap')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === 'rekap'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Rekap & Laporan</span>
            </button>

            <button
              onClick={() => setActiveTab('santri')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === 'santri'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Data Santri</span>
            </button>
          </nav>

          {/* User Profile & Right Actions */}
          <div className="flex items-center space-x-3">
            
            {/* Scan / Tap NFC Quick Trigger Button */}
            <button
              onClick={onOpenQrScanner}
              className="hidden sm:flex items-center gap-1.5 bg-emerald-950/80 hover:bg-emerald-900 text-emerald-400 border border-emerald-500/40 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition shadow-sm"
              title="Pindai / Tempel Kartu NFC Santri"
            >
              <Wifi className="w-4 h-4 text-emerald-400" />
              <span>Tap Kartu NFC</span>
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
                <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full"></span>
              </button>
            </div>

            {/* Profile Avatar Card */}
            <div className="flex items-center space-x-2 pl-2 border-l border-slate-800">
              <div className="w-9 h-9 rounded-full bg-emerald-700 border-2 border-emerald-500 text-white font-bold flex items-center justify-center text-sm shadow-md">
                {user?.nama ? user.nama.charAt(0) : 'U'}
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-xs font-bold text-white leading-none truncate max-w-[130px]">
                  {user?.nama || 'Ustadz Pengajar'}
                </p>
                <span className="inline-block mt-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  {user?.role === 'admin' ? 'Pengurus' : user?.role === 'ustadz' ? 'Ustadz' : 'Santri'}
                </span>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-xl transition"
              title="Keluar"
            >
              <LogOut className="w-5 h-5" />
            </button>

          </div>

        </div>
      </header>

      {/* MOBILE BOTTOM NAVIGATION BAR (Fixed at bottom for mobile screens) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 px-3 py-2">
        <div className="grid grid-cols-4 gap-1">
          
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition ${
              activeTab === 'dashboard'
                ? 'text-emerald-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Home className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">Beranda</span>
          </button>

          <button
            onClick={() => setActiveTab('absensi')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition ${
              activeTab === 'absensi'
                ? 'text-emerald-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ClipboardCheck className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">Input</span>
          </button>

          <button
            onClick={() => setActiveTab('rekap')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition ${
              activeTab === 'rekap'
                ? 'text-emerald-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileSpreadsheet className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">Rekap</span>
          </button>

          <button
            onClick={() => setActiveTab('santri')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition ${
              activeTab === 'santri'
                ? 'text-emerald-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">Santri</span>
          </button>

        </div>
      </div>
    </>
  );
}
