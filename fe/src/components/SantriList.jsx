import React, { useState } from 'react';
import { Users, Search, Phone, Home, BookOpen, GraduationCap, ShieldCheck, UserCheck, Plus, CheckCircle2 } from 'lucide-react';

export default function SantriList() {
  const [search, setSearch] = useState('');
  const [selectedSantri, setSelectedSantri] = useState(null);

  const listSantri = [
    { id: 1, nis: '2024001', nama: 'Ahmad Fauzi', kelas: '1 Ulya A', kamar: 'Al-Farabi 01', wali: 'H. Ridwan', hpWali: '0812-3456-7890', alamat: 'Banyuwangi', statusSantri: 'Aktif' },
    { id: 2, nis: '2024002', nama: 'Muhammad Rizky', kelas: '1 Ulya A', kamar: 'Al-Farabi 01', wali: 'H. M. Syukri', hpWali: '0813-9876-5432', alamat: 'Jember', statusSantri: 'Aktif' },
    { id: 3, nis: '2024003', nama: 'Siti Nurhaliza', kelas: '1 Ulya B', kamar: 'Khadijah 02', wali: 'Hj. Aminah', hpWali: '0821-1122-3344', alamat: 'Surabaya', statusSantri: 'Aktif' },
    { id: 4, nis: '2024004', nama: 'Badrus Sholeh', kelas: '2 Ulya A', kamar: 'Al-Ghazali 03', wali: 'H. Mufid', hpWali: '0852-5566-7788', alamat: 'Banyuwangi', statusSantri: 'Aktif' },
    { id: 5, nis: '2024005', nama: 'Fatimatuz Zahra', kelas: '1 Ulya B', kamar: 'Khadijah 01', wali: 'H. Basri', hpWali: '0819-4455-6677', alamat: 'Malang', statusSantri: 'Aktif' },
    { id: 6, nis: '2024006', nama: 'Zaidan Arifin', kelas: '2 Ulya A', kamar: 'Al-Farabi 02', wali: 'H. Arifin', hpWali: '0812-9900-1122', alamat: 'Sidoarjo', statusSantri: 'Aktif' },
  ];

  const filtered = listSantri.filter(s =>
    s.nama.toLowerCase().includes(search.toLowerCase()) || s.nis.includes(search)
  );

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="w-9 h-9 object-contain drop-shadow" />
          <div>
            <h2 className="text-xl font-bold text-slate-900 leading-snug">
              Data Santri Asrama Al-Munawwir
            </h2>
            <p className="text-xs text-slate-500">
              Blok 10 / Blok Agung — Informasi santri, kelas & kontak wali.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Cari Santri..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-sm text-slate-800"
            />
          </div>
          <button
            onClick={() => alert('Fitur Tambah Santri Baru')}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold p-2.5 rounded-xl shadow-sm text-xs flex items-center gap-1 transition"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Tambah</span>
          </button>
        </div>
      </div>

      {/* Grid Santri Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((santri) => (
          <div
            key={santri.id}
            onClick={() => setSelectedSantri(santri)}
            className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-emerald-300 cursor-pointer transition space-y-3"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-bold text-base flex items-center justify-center shadow-md">
                {santri.nama.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base leading-snug">
                  {santri.nama}
                </h3>
                <span className="text-xs text-emerald-600 font-semibold font-mono">
                  NIS: {santri.nis}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-500">
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                  Kelas:
                </span>
                <span className="font-semibold text-slate-800">{santri.kelas}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-500">
                  <Home className="w-3.5 h-3.5 text-emerald-600" />
                  Kamar:
                </span>
                <span className="font-semibold text-slate-800">{santri.kamar}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-500">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  Wali:
                </span>
                <span className="font-semibold text-slate-800">{santri.wali}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Santri Modal */}
      {selectedSantri && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md border border-slate-200 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-lg text-slate-900">
                Profil Detail Santri
              </h3>
              <button
                onClick={() => setSelectedSantri(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="text-center py-2">
              <div className="w-16 h-16 rounded-full bg-emerald-600 text-white font-bold text-2xl flex items-center justify-center mx-auto mb-2 shadow-lg shadow-emerald-600/30">
                {selectedSantri.nama.charAt(0)}
              </div>
              <h4 className="font-bold text-xl text-slate-900">{selectedSantri.nama}</h4>
              <p className="text-xs text-emerald-600 font-mono font-semibold">NIS: {selectedSantri.nis}</p>
            </div>

            <div className="space-y-2 bg-slate-50 p-4 rounded-2xl text-xs sm:text-sm">
              <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                <span className="text-slate-500">Kelas Diniyah:</span>
                <span className="font-bold text-slate-800">{selectedSantri.kelas}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                <span className="text-slate-500">Komplek / Kamar:</span>
                <span className="font-bold text-slate-800">{selectedSantri.kamar}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                <span className="text-slate-500">Wali Santri:</span>
                <span className="font-bold text-slate-800">{selectedSantri.wali}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                <span className="text-slate-500">Kontak Wali:</span>
                <span className="font-bold text-emerald-600">{selectedSantri.hpWali}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Asal Daerah:</span>
                <span className="font-bold text-slate-800">{selectedSantri.alamat}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedSantri(null)}
              className="w-full bg-slate-900 text-white font-semibold py-2.5 rounded-xl text-xs"
            >
              Tutup Profil
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
