import React, { useState } from 'react';
import {
  Home,
  ClipboardCheck,
  FileSpreadsheet,
  Users,
  LogOut,
  BookOpen,
  Bell,
  Wifi,
  ChevronLeft,
  ChevronRight,
  Settings,
  BarChart3,
  Menu,
  X
} from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Beranda', icon: Home },
  { id: 'absensi', label: 'Input Presensi', icon: ClipboardCheck },
  { id: 'rekap', label: 'Rekap & Laporan', icon: FileSpreadsheet },
  { id: 'santri', label: 'Data Santri', icon: Users },
];

export default function Sidebar({ activeTab, setActiveTab, user, onLogout, onOpenNfc }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const roleLabel = user?.role === 'admin' ? 'Pengurus' : user?.role === 'ustadz' ? 'Ustadz' : 'Santri';
  const roleBadgeColor = user?.role === 'admin'
    ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
    : user?.role === 'ustadz'
    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
    : 'bg-sky-500/20 text-sky-300 border-sky-500/30';

  const SidebarContent = ({ mobile = false }) => (
    <div className="flex flex-col h-full">

      {/* Logo & Brand */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-slate-800 ${collapsed && !mobile ? 'justify-center px-3' : ''}`}>
        <img
          src="/logo.png"
          alt="Logo"
          className={`object-contain flex-shrink-0 transition-all duration-300 ${collapsed && !mobile ? 'w-8 h-8' : 'w-10 h-10'}`}
        />
        {(!collapsed || mobile) && (
          <div className="overflow-hidden">
            <h1 className="font-bold text-sm text-white leading-snug whitespace-nowrap">
              Absensi Santri
            </h1>
            <p className="text-[10px] text-emerald-400 font-semibold whitespace-nowrap">
              Al-Munawwir • Blok 10
            </p>
          </div>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => {
                setActiveTab(id);
                setMobileOpen(false);
              }}
              title={collapsed && !mobile ? label : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group relative ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              } ${collapsed && !mobile ? 'justify-center px-2' : ''}`}
            >
              <Icon className={`flex-shrink-0 transition-all ${isActive ? 'w-5 h-5' : 'w-4.5 h-4.5 w-5 h-5'}`} />
              {(!collapsed || mobile) && <span>{label}</span>}
              {isActive && (!collapsed || mobile) && (
                <span className="ml-auto w-1.5 h-1.5 bg-white rounded-full"></span>
              )}
              {/* Tooltip on collapsed */}
              {collapsed && !mobile && (
                <div className="absolute left-full ml-3 px-2 py-1 bg-slate-700 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 border border-slate-600">
                  {label}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Quick Actions Divider */}
      <div className="px-4 pb-2">
        {(!collapsed || mobile) && (
          <p className="text-[10px] uppercase font-bold text-slate-600 tracking-widest mb-2">
            Aksi Cepat
          </p>
        )}
        <button
          onClick={() => { onOpenNfc(); setMobileOpen(false); }}
          className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-emerald-400 hover:bg-emerald-950/60 border border-emerald-500/20 hover:border-emerald-500/40 transition-all ${collapsed && !mobile ? 'justify-center px-2' : ''}`}
          title={collapsed && !mobile ? 'Tap Kartu NFC' : undefined}
        >
          <Wifi className="w-4 h-4 flex-shrink-0" />
          {(!collapsed || mobile) && <span>Tap Kartu NFC Santri</span>}
        </button>
      </div>

      {/* User Profile Footer */}
      <div className={`px-3 py-4 border-t border-slate-800 space-y-3 ${collapsed && !mobile ? 'px-2' : ''}`}>
        {/* Bell Notification */}
        {(!collapsed || mobile) && (
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Notifikasi</span>
            <button className="relative p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition">
              <Bell className="w-4 h-4" />
              <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            </button>
          </div>
        )}

        {/* User Info */}
        <div className={`flex items-center gap-2.5 ${collapsed && !mobile ? 'justify-center' : ''}`}>
          <div className="w-9 h-9 rounded-xl bg-emerald-700 border-2 border-emerald-500 text-white font-bold flex items-center justify-center text-sm shadow-md flex-shrink-0">
            {user?.nama ? user.nama.charAt(0) : 'U'}
          </div>
          {(!collapsed || mobile) && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate leading-tight">
                {user?.nama || 'Pengguna'}
              </p>
              <span className={`inline-block mt-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded border ${roleBadgeColor}`}>
                {roleLabel}
              </span>
            </div>
          )}
        </div>

        {/* Logout */}
        <button
          onClick={onLogout}
          className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition ${collapsed && !mobile ? 'justify-center px-2' : ''}`}
          title={collapsed && !mobile ? 'Keluar' : undefined}
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {(!collapsed || mobile) && <span>Keluar dari Aplikasi</span>}
        </button>
      </div>

    </div>
  );

  return (
    <>
      {/* ─── DESKTOP SIDEBAR ─── */}
      <aside
        className={`hidden md:flex flex-col h-screen sticky top-0 bg-slate-900 border-r border-slate-800 transition-all duration-300 ease-in-out flex-shrink-0 ${
          collapsed ? 'w-16' : 'w-60'
        }`}
      >
        {/* Collapse toggle button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-6 z-30 w-6 h-6 bg-slate-700 border border-slate-600 rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-600 transition shadow-lg"
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>

        <SidebarContent />
      </aside>

      {/* ─── MOBILE TOPBAR ─── */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-4">
        <div className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
          <div>
            <p className="text-sm font-bold text-white leading-none">Absensi Santri</p>
            <p className="text-[10px] text-emerald-400 font-semibold">Al-Munawwir • Blok 10</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenNfc}
            className="p-2 text-emerald-400 hover:bg-slate-800 rounded-xl transition"
          >
            <Wifi className="w-5 h-5" />
          </button>
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 text-slate-300 hover:bg-slate-800 rounded-xl transition"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ─── MOBILE DRAWER ─── */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer Panel */}
          <div className="relative w-72 h-full bg-slate-900 border-r border-slate-800 flex flex-col shadow-2xl">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <SidebarContent mobile />
          </div>
        </div>
      )}

      {/* ─── MOBILE BOTTOM NAVIGATION ─── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 px-2 py-1.5">
        <div className="grid grid-cols-4 gap-1">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition ${
                activeTab === id ? 'text-emerald-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] truncate">{label.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
