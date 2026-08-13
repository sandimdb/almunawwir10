import React from 'react';
import { 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  UserX, 
  Calendar, 
  ArrowUpRight, 
  QrCode, 
  BookOpen, 
  Sparkles,
  Award,
  ChevronRight,
  Wifi
} from 'lucide-react';

export default function Dashboard({ setActiveTab, onOpenQrScanner }) {
  const todayDate = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const stats = [
    {
      title: 'Total Santri Aktif',
      count: '342',
      badge: '100%',
      icon: Users,
      color: 'from-blue-600 to-indigo-600',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50 border-blue-200'
    },
    {
      title: 'Hadir Hari Ini',
      count: '318',
      badge: '93%',
      icon: CheckCircle2,
      color: 'from-emerald-600 to-teal-600',
      textColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50 border-emerald-200'
    },
    {
      title: 'Sakit (Poskestren)',
      count: '8',
      badge: '2.3%',
      icon: AlertCircle,
      color: 'from-amber-500 to-yellow-600',
      textColor: 'text-amber-600',
      bgColor: 'bg-amber-50 border-amber-200'
    },
    {
      title: 'Izin Pulang / Acara',
      count: '12',
      badge: '3.5%',
      icon: Clock,
      color: 'from-sky-500 to-cyan-600',
      textColor: 'text-sky-600',
      bgColor: 'bg-sky-50 border-sky-200'
    },
    {
      title: 'Alpha (Tanpa Keterangan)',
      count: '4',
      badge: '1.2%',
      icon: UserX,
      color: 'from-rose-600 to-pink-600',
      textColor: 'text-rose-600',
      bgColor: 'bg-rose-50 border-rose-200'
    }
  ];

  const recentLogs = [
    { id: 1, nama: 'Ahmad Fauzi', kelas: '1 Ulya A', kamar: 'Al-Farabi 01', kegiatan: 'Madrasah Diniyah', status: 'Hadir', jam: '07:30' },
    { id: 2, nama: 'Muhammad Rizky', kelas: '1 Ulya A', kamar: 'Al-Farabi 01', kegiatan: 'Madrasah Diniyah', status: 'Hadir', jam: '07:28' },
    { id: 3, nama: 'Badrus Sholeh', kelas: '2 Ulya A', kamar: 'Al-Ghazali 03', kegiatan: 'Madrasah Diniyah', status: 'Izin', keterangan: 'Keluarga Intim', jam: '07:25' },
    { id: 4, nama: 'Fatimatuz Zahra', kelas: '1 Ulya B', kamar: 'Khadijah 01', kegiatan: 'Madrasah Diniyah', status: 'Sakit', keterangan: 'Poskestren', jam: '07:15' },
    { id: 5, nama: 'Fikri Haikal', kelas: '1 Ulya A', kamar: 'Al-Farabi 03', kegiatan: 'Madrasah Diniyah', status: 'Alpha', jam: '-' },
  ];

  const jadwalKegiatan = [
    { nama: 'Kajian Kitab Subuh (Imriti & Alfiyah)', jam: '05:00 - 06:15 WIB', status: 'Selesai', ustadz: 'KH. Ahmad Muhtadi' },
    { nama: 'Madrasah Diniyah Pagi', jam: '07:30 - 11:30 WIB', status: 'Berlangsung', ustadz: 'Ustadz Abdullah, S.Pd.I' },
    { nama: 'Jamaah Shalat Dzuhur & Sorogan', jam: '12:00 - 13:30 WIB', status: 'Akan Datang', ustadz: 'Ustadz M. Syukron' },
    { nama: 'Jamaah Maghrib & Musyawarah Fiqih', jam: '18:00 - 19:45 WIB', status: 'Akan Datang', ustadz: 'Ustadz Bahrul Ulum' }
  ];

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      
      {/* Banner Selamat Datang */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-emerald-700/50">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-20 h-20 bg-emerald-950/60 rounded-2xl p-2 flex items-center justify-center shadow-lg border border-emerald-500/30 flex-shrink-0 backdrop-blur-md">
              <img src="/logo.png" alt="Logo Asrama Al-Munawwir" className="w-16 h-16 object-contain filter drop-shadow-md" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold mb-2 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Assalamu'alaikum Warahmatullahi Wabarakatuh</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Sistem Absensi Santri Digital
              </h2>
              <p className="text-emerald-200/90 text-sm mt-1 max-w-xl">
                Asrama Al-Munawwir • Blok 10 / Blok Agung — Presensi pengajian, madrasah diniyah & shalat berjamaah.
              </p>
            </div>
          </div>

          {/* Quick Action Button */}
          <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-0">
            <button
              onClick={() => setActiveTab('absensi')}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-3 rounded-2xl shadow-lg shadow-emerald-500/20 transition-all duration-200 flex items-center gap-2 text-sm"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Input Presensi Sekarang</span>
            </button>

            <button
              onClick={onOpenQrScanner}
              className="bg-slate-800/80 hover:bg-slate-800 text-white border border-emerald-500/40 px-4 py-3 rounded-2xl transition-all duration-200 flex items-center gap-2 text-sm"
            >
              <Wifi className="w-5 h-5 text-emerald-400" />
              <span className="hidden sm:inline">Tempel Kartu NFC</span>
            </button>
          </div>
        </div>

        {/* Date Bar */}
        <div className="mt-6 pt-4 border-t border-emerald-700/60 flex items-center gap-2 text-emerald-300 text-xs sm:text-sm font-medium">
          <Calendar className="w-4 h-4 text-amber-400" />
          <span>{todayDate}</span>
          <span className="mx-2 text-emerald-600">•</span>
          <span className="text-amber-300">Tahun Ajaran 1447 - 1448 H / 2026</span>
        </div>
      </div>

      {/* Grid Cards Statistik Kehadiran */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-900">
            Ringkasan Kehadiran Hari Ini
          </h3>
          <span className="text-xs text-slate-500">Pembaruan Otomatis</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${item.color} text-white flex items-center justify-center shadow-md`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${item.bgColor} ${item.textColor}`}>
                    {item.badge}
                  </span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900 leading-tight">
                    {item.count}
                  </p>
                  <p className="text-xs text-slate-500 font-medium mt-1 truncate">
                    {item.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content Layout: Live Activity + Today's Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Activity Feed */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping"></div>
              <h3 className="font-bold text-slate-900 text-base">
                Aktivitas Presensi Terbaru
              </h3>
            </div>
            <button
              onClick={() => setActiveTab('rekap')}
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              <span>Lihat Rekap Lengkap</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {recentLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-center justify-between p-3 sm:p-4 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/60 transition"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-sm border border-emerald-300">
                    {log.nama.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">
                      {log.nama}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {log.kelas} • {log.kamar}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-xl ${
                      log.status === 'Hadir'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : log.status === 'Sakit'
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : log.status === 'Izin'
                        ? 'bg-sky-100 text-sky-800 border border-sky-300'
                        : 'bg-rose-100 text-rose-800 border border-rose-300'
                    }`}
                  >
                    {log.status}
                  </span>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {log.jam !== '-' ? `Jam ${log.jam}` : log.keterangan || '-'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Jadwal Kegiatan & Ustadz In Charge */}
        <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-6 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-400" />
              <span>Jadwal Kegiatan Hari Ini</span>
            </h3>
          </div>

          <div className="space-y-3">
            {jadwalKegiatan.map((j, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-400">
                    {j.jam}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      j.status === 'Berlangsung'
                        ? 'bg-emerald-500 text-slate-950 animate-pulse'
                        : j.status === 'Selesai'
                        ? 'bg-slate-700 text-slate-300'
                        : 'bg-slate-700/60 text-slate-400'
                    }`}
                  >
                    {j.status}
                  </span>
                </div>
                <h4 className="font-semibold text-sm text-white leading-snug">
                  {j.nama}
                </h4>
                <p className="text-xs text-slate-400">
                  Pembimbing: <span className="text-slate-300 font-medium">{j.ustadz}</span>
                </p>
              </div>
            ))}
          </div>

          {/* Poskestren Info Card */}
          <div className="mt-4 p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800/80 text-emerald-200 text-xs">
            <div className="flex items-center gap-2 font-bold text-emerald-400 mb-1">
              <Award className="w-4 h-4" />
              <span>Catatan Kedisiplinan & Kesehatan</span>
            </div>
            <span>Santri yang dalam perawatan Poskestren otomatis terdata Izin/Sakit untuk kegiatan jamaah.</span>
          </div>

        </div>

      </div>

    </div>
  );
}
