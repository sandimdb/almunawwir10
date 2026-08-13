import React, { useState } from 'react';
import { ShieldCheck, User, Lock, Eye, EyeOff, BookOpen, UserCheck, GraduationCap, CheckCircle2, ChevronRight } from 'lucide-react';
import ParticleBackground from './ParticleBackground';

export default function Login({ onLoginSuccess }) {
  const [role, setRole] = useState('ustadz'); // 'admin', 'ustadz', 'santri'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleQuickFill = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === 'admin') {
      setUsername('admin.pengurus');
      setPassword('admin123');
    } else if (selectedRole === 'ustadz') {
      setUsername('ustadz.abdullah');
      setPassword('ustadz123');
    } else {
      setUsername('wali.fauzi');
      setPassword('santri123');
    }
    setErrorMsg('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username || !password) {
      setErrorMsg('Harap masukkan nama pengguna dan kata sandi.');
      return;
    }

    setLoading(true);

    // Simulasi Login API
    setTimeout(() => {
      setLoading(false);
      const userData = {
        id: Date.now(),
        nama: role === 'admin' ? 'Pengurus Pusat (Admin)' : role === 'ustadz' ? 'Ustadz Abdullah, S.Pd.I' : 'H. Ridwan (Wali Santri Ahmad Fauzi)',
        role: role,
        username: username,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
        nisOrNip: role === 'ustadz' ? 'NIP. 198504122026' : role === 'admin' ? 'ADM-2026-001' : 'NIS. 2024001'
      };

      onLoginSuccess(userData);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">

      {/* Animated Particle Background - Snow/Star Drift */}
      <ParticleBackground />

      {/* Background Decorative Glow Orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" style={{zIndex: 1}}></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" style={{zIndex: 1}}></div>

      {/* Container Login Card */}
      <div className="w-full max-w-md" style={{zIndex: 2}}>
        
        {/* Header Branding */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center p-3 bg-slate-800/80 border border-emerald-500/40 rounded-3xl mb-3 shadow-2xl backdrop-blur-md">
            <img src="/logo.png" alt="Logo Asrama Al-Munawwir Blok 10" className="w-24 h-24 object-contain filter drop-shadow-[0_4px_12px_rgba(16,185,129,0.3)]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
            Absensi Santri
          </h1>
          <p className="text-emerald-400 font-semibold text-sm mt-1">
            Asrama Al-Munawwir - Blok 10 / Blok Agung
          </p>
          <p className="text-slate-400 text-xs mt-1">
            Sistem Presensi & Kedisiplinan Santri Digital
          </p>
        </div>

        {/* Card Main */}
        <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl">
          
          {/* Role Selector Tabs */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Pilih Akses Peran
            </label>
            <div className="grid grid-cols-3 gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-700/60">
              <button
                type="button"
                onClick={() => handleQuickFill('ustadz')}
                className={`py-2 px-1 text-xs sm:text-sm font-medium rounded-xl transition-all duration-200 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 ${
                  role === 'ustadz'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>Ustadz</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill('admin')}
                className={`py-2 px-1 text-xs sm:text-sm font-medium rounded-xl transition-all duration-200 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 ${
                  role === 'admin'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Pengurus</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill('santri')}
                className={`py-2 px-1 text-xs sm:text-sm font-medium rounded-xl transition-all duration-200 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 ${
                  role === 'santri'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Wali/Santri</span>
              </button>
            </div>
          </div>

          {/* Form Login */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Error Message */}
            {errorMsg && (
              <div className="bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs sm:text-sm p-3 rounded-xl flex items-start gap-2">
                <span className="font-bold">!</span>
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Input Username */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Nama Pengguna / NIP / NIS
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan nama pengguna..."
                  className="w-full bg-slate-900/90 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 transition-all"
                />
              </div>
            </div>

            {/* Input Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Kata Sandi
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi..."
                  className="w-full bg-slate-900/90 border border-slate-700 rounded-xl pl-11 pr-11 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Options Remember & Forgot */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center text-slate-400 hover:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-emerald-600 focus:ring-emerald-500/40"
                />
                <span className="ml-2">Ingat Akun Saya</span>
              </label>
              <a href="#lupa-password" onClick={(e) => { e.preventDefault(); alert('Silakan hubungi sekretariat pengurus ponpes untuk reset password.'); }} className="text-emerald-400 hover:underline">
                Lupa Password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-emerald-600/30 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Memproses Masuk...</span>
                </>
              ) : (
                <>
                  <span>Masuk ke Aplikasi</span>
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>

          </form>

          {/* Quick Demo Login Preset Helper */}
          <div className="mt-6 pt-5 border-t border-slate-700/60">
            <p className="text-xs text-slate-400 font-medium mb-2 text-center">
              Akses Uji Coba Cepat (Klik untuk Otomatis):
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                type="button"
                onClick={() => handleQuickFill('ustadz')}
                className="text-xs bg-slate-900 hover:bg-slate-700 text-emerald-400 border border-slate-700 px-3 py-1.5 rounded-lg flex items-center gap-1 transition"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Ustadz Pengajar</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('admin')}
                className="text-xs bg-slate-900 hover:bg-slate-700 text-amber-400 border border-slate-700 px-3 py-1.5 rounded-lg flex items-center gap-1 transition"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Pengurus (Admin)</span>
              </button>
            </div>
          </div>

        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-500 mt-6">
          © 2026 Ponpes Al Munawwir - Blok Agung. Hak Cipta Dilindungi.
        </p>

      </div>
    </div>
  );
}
