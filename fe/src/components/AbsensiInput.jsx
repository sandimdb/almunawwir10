import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  UserX, 
  Search, 
  Filter, 
  Calendar, 
  Save, 
  CheckCheck, 
  QrCode, 
  BookOpen, 
  RefreshCw,
  Sparkles
} from 'lucide-react';

export default function AbsensiInput({ onOpenQrScanner }) {
  const [kegiatan, setKegiatan] = useState('Madrasah Diniyah');
  const [tanggal, setTanggal] = useState(new Date().toISOString().split('T')[0]);
  const [selectedKelas, setSelectedKelas] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Initial Santri List State
  const [santriList, setSantriList] = useState([
    { id: 1, nis: '2024001', nama: 'Ahmad Fauzi', kelas: '1 Ulya A', kamar: 'Al-Farabi 01', status: 'Hadir', catatan: '' },
    { id: 2, nis: '2024002', nama: 'Muhammad Rizky', kelas: '1 Ulya A', kamar: 'Al-Farabi 01', status: 'Hadir', catatan: '' },
    { id: 3, nis: '2024003', nama: 'Siti Nurhaliza', kelas: '1 Ulya B', kamar: 'Khadijah 02', status: 'Hadir', catatan: '' },
    { id: 4, nis: '2024004', nama: 'Badrus Sholeh', kelas: '2 Ulya A', kamar: 'Al-Ghazali 03', status: 'Izin', catatan: 'Pulang acara keluarga' },
    { id: 5, nis: '2024005', nama: 'Fatimatuz Zahra', kelas: '1 Ulya B', kamar: 'Khadijah 01', status: 'Sakit', catatan: 'Demam di Poskestren' },
    { id: 6, nis: '2024006', nama: 'Zaidan Arifin', kelas: '2 Ulya A', kamar: 'Al-Farabi 02', status: 'Hadir', catatan: '' },
    { id: 7, nis: '2024007', nama: 'Lailatul Badriyah', kelas: '1 Ulya B', kamar: 'Khadijah 02', status: 'Hadir', catatan: '' },
    { id: 8, nis: '2024008', nama: 'Fikri Haikal', kelas: '1 Ulya A', kamar: 'Al-Farabi 03', status: 'Alpha', catatan: '' },
  ]);

  // Handle status toggle for a student
  const handleStatusChange = (id, newStatus) => {
    setSantriList(prev =>
      prev.map(item => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  // Bulk mark all visible as Present
  const handleMarkAllHadir = () => {
    setSantriList(prev =>
      prev.map(item => {
        if (matchesFilter(item)) {
          return { ...item, status: 'Hadir' };
        }
        return item;
      })
    );
    showToast('Semua santri yang ditampilkan berhasil ditandai HADIR');
  };

  // Filter helper
  const matchesFilter = (item) => {
    const matchesKelas = selectedKelas === 'Semua' || item.kelas === selectedKelas || item.kamar.includes(selectedKelas);
    const matchesQuery = item.nama.toLowerCase().includes(searchQuery.toLowerCase()) || item.nis.includes(searchQuery);
    return matchesKelas && matchesQuery;
  };

  const filteredSantri = santriList.filter(matchesFilter);

  // Counter calculation for current view
  const countHadir = filteredSantri.filter(s => s.status === 'Hadir').length;
  const countSakit = filteredSantri.filter(s => s.status === 'Sakit').length;
  const countIzin = filteredSantri.filter(s => s.status === 'Izin').length;
  const countAlpha = filteredSantri.filter(s => s.status === 'Alpha').length;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSaveAbsensi = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showToast(`Data Presensi [${kegiatan}] berhasil disimpan ke server!`);
    }, 700);
  };

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-slate-900 text-white border border-emerald-500/50 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 animate-bounce">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header Form Settings */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm space-y-4">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="w-9 h-9 object-contain drop-shadow" />
            <div>
              <h2 className="text-xl font-bold text-slate-900 leading-snug">
                Form Input Presensi Santri
              </h2>
              <p className="text-xs text-slate-500">
                Asrama Al-Munawwir Blok 10 — Catat kehadiran santri per kegiatan.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenQrScanner}
              className="bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-700 font-semibold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 transition"
            >
              <QrCode className="w-4 h-4 text-emerald-600" />
              <span>Pindai Kartu Santri</span>
            </button>

            <button
              onClick={handleSaveAbsensi}
              disabled={isSaving}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-xl shadow-md shadow-emerald-600/30 text-xs flex items-center gap-2 transition disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Simpan Presensi</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Filters Controls Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          
          {/* Select Kegiatan */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Kegiatan / Pengajian
            </label>
            <select
              value={kegiatan}
              onChange={(e) => setKegiatan(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            >
              <option value="Kajian Subuh">Kajian Subuh (Kitab Kuning)</option>
              <option value="Madrasah Diniyah">Madrasah Diniyah Pagi</option>
              <option value="Jamaah Maghrib">Shalat Jamaah Maghrib & Musyawarah</option>
              <option value="Setoran Hafalan">Setoran Hafalan Qur'an</option>
              <option value="Cek Kamar Asrama">Absensi Malam Komplek Asrama</option>
            </select>
          </div>

          {/* Select Tanggal */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Tanggal Presensi
            </label>
            <div className="relative">
              <input
                type="date"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>

          {/* Select Kelas / Komplek */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Kelas / Komplek Kamar
            </label>
            <select
              value={selectedKelas}
              onChange={(e) => setSelectedKelas(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            >
              <option value="Semua">Semua Kelas & Komplek</option>
              <option value="1 Ulya A">1 Ulya A</option>
              <option value="1 Ulya B">1 Ulya B</option>
              <option value="2 Ulya A">2 Ulya A</option>
              <option value="Al-Farabi">Komplek Al-Farabi (Putra)</option>
              <option value="Khadijah">Komplek Khadijah (Putri)</option>
            </select>
          </div>

          {/* Input Search */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Cari Nama / NIS Santri
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Ketik nama atau NIS..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>

        </div>

      </div>

      {/* Summary Counter Bar */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-lg">
        
        <div className="flex items-center gap-4 flex-wrap text-xs sm:text-sm">
          <div className="flex items-center gap-1.5 font-semibold text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>Hadir: {countHadir}</span>
          </div>
          <div className="flex items-center gap-1.5 font-semibold text-amber-400">
            <AlertCircle className="w-4 h-4" />
            <span>Sakit: {countSakit}</span>
          </div>
          <div className="flex items-center gap-1.5 font-semibold text-sky-400">
            <Clock className="w-4 h-4" />
            <span>Izin: {countIzin}</span>
          </div>
          <div className="flex items-center gap-1.5 font-semibold text-rose-400">
            <UserX className="w-4 h-4" />
            <span>Alpha: {countAlpha}</span>
          </div>
        </div>

        <button
          onClick={handleMarkAllHadir}
          className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 shadow-sm"
        >
          <CheckCheck className="w-4 h-4" />
          <span>Tandai Semua Hadir</span>
        </button>

      </div>

      {/* Santri Cards / List View */}
      <div className="space-y-3">
        {filteredSantri.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-slate-200/80">
            <Search className="w-12 h-12 text-slate-300 mx-auto mb-2" />
            <h4 className="font-bold text-slate-700">Tidak ada data santri ditemukan</h4>
            <p className="text-xs text-slate-400">Coba ubah kata kunci pencarian atau filter kelas.</p>
          </div>
        ) : (
          filteredSantri.map((santri) => (
            <div
              key={santri.id}
              className={`bg-white rounded-2xl p-4 border transition-all duration-150 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                santri.status === 'Hadir'
                  ? 'border-emerald-200 bg-emerald-50/20'
                  : santri.status === 'Sakit'
                  ? 'border-amber-200 bg-amber-50/20'
                  : santri.status === 'Izin'
                  ? 'border-sky-200 bg-sky-50/20'
                  : 'border-rose-200 bg-rose-50/20'
              }`}
            >
              
              {/* Santri Info */}
              <div className="flex items-center space-x-3">
                <div className={`w-11 h-11 rounded-full font-bold flex items-center justify-center text-sm shadow-sm border ${
                  santri.status === 'Hadir' ? 'bg-emerald-600 text-white border-emerald-500' :
                  santri.status === 'Sakit' ? 'bg-amber-500 text-white border-amber-400' :
                  santri.status === 'Izin' ? 'bg-sky-500 text-white border-sky-400' :
                  'bg-rose-600 text-white border-rose-500'
                }`}>
                  {santri.nama.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-sm">
                      {santri.nama}
                    </h3>
                    <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                      NIS: {santri.nis}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {santri.kelas} • <span className="text-slate-600 font-medium">{santri.kamar}</span>
                  </p>
                  {santri.catatan && (
                    <p className="text-[11px] text-amber-700 italic mt-1 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block">
                      Ket: {santri.catatan}
                    </p>
                  )}
                </div>
              </div>

              {/* Attendance Status Buttons */}
              <div className="grid grid-cols-4 gap-1.5 sm:w-auto w-full">
                
                <button
                  onClick={() => handleStatusChange(santri.id, 'Hadir')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 ${
                    santri.status === 'Hadir'
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                      : 'bg-slate-100 text-slate-600 hover:bg-emerald-100 hover:text-emerald-800'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Hadir</span>
                </button>

                <button
                  onClick={() => handleStatusChange(santri.id, 'Sakit')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 ${
                    santri.status === 'Sakit'
                      ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30'
                      : 'bg-slate-100 text-slate-600 hover:bg-amber-100 hover:text-amber-800'
                  }`}
                >
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Sakit</span>
                </button>

                <button
                  onClick={() => handleStatusChange(santri.id, 'Izin')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 ${
                    santri.status === 'Izin'
                      ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30'
                      : 'bg-slate-100 text-slate-600 hover:bg-sky-100 hover:text-sky-800'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Izin</span>
                </button>

                <button
                  onClick={() => handleStatusChange(santri.id, 'Alpha')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 ${
                    santri.status === 'Alpha'
                      ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                      : 'bg-slate-100 text-slate-600 hover:bg-rose-100 hover:text-rose-800'
                  }`}
                >
                  <UserX className="w-3.5 h-3.5" />
                  <span>Alpha</span>
                </button>

              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
}
