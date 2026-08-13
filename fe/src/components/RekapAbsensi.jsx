import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Download, 
  Printer, 
  Search, 
  Filter, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  UserX,
  FileText,
  Sparkles
} from 'lucide-react';

export default function RekapAbsensi() {
  const [bulan, setBulan] = useState('Agustus 2026');
  const [kegiatan, setKegiatan] = useState('Semua');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua');

  const rekapData = [
    { id: 1, nis: '2024001', nama: 'Ahmad Fauzi', kelas: '1 Ulya A', kamar: 'Al-Farabi 01', totalHadir: 28, totalSakit: 1, totalIzin: 1, totalAlpha: 0, persentase: 93 },
    { id: 2, nis: '2024002', nama: 'Muhammad Rizky', kelas: '1 Ulya A', kamar: 'Al-Farabi 01', totalHadir: 30, totalSakit: 0, totalIzin: 0, totalAlpha: 0, persentase: 100 },
    { id: 3, nis: '2024003', nama: 'Siti Nurhaliza', kelas: '1 Ulya B', kamar: 'Khadijah 02', totalHadir: 29, totalSakit: 1, totalIzin: 0, totalAlpha: 0, persentase: 96 },
    { id: 4, nis: '2024004', nama: 'Badrus Sholeh', kelas: '2 Ulya A', kamar: 'Al-Ghazali 03', totalHadir: 24, totalSakit: 2, totalIzin: 4, totalAlpha: 0, persentase: 80 },
    { id: 5, nis: '2024005', nama: 'Fatimatuz Zahra', kelas: '1 Ulya B', kamar: 'Khadijah 01', totalHadir: 22, totalSakit: 6, totalIzin: 2, totalAlpha: 0, persentase: 73 },
    { id: 6, nis: '2024006', nama: 'Zaidan Arifin', kelas: '2 Ulya A', kamar: 'Al-Farabi 02', totalHadir: 29, totalSakit: 0, totalIzin: 1, totalAlpha: 0, persentase: 96 },
    { id: 7, nis: '2024007', nama: 'Lailatul Badriyah', kelas: '1 Ulya B', kamar: 'Khadijah 02', totalHadir: 30, totalSakit: 0, totalIzin: 0, totalAlpha: 0, persentase: 100 },
    { id: 8, nis: '2024008', nama: 'Fikri Haikal', kelas: '1 Ulya A', kamar: 'Al-Farabi 03', totalHadir: 20, totalSakit: 2, totalIzin: 3, totalAlpha: 5, persentase: 66 },
  ];

  const filtered = rekapData.filter(item => {
    const matchSearch = item.nama.toLowerCase().includes(search.toLowerCase()) || item.nis.includes(search);
    return matchSearch;
  });

  const handleExportExcel = () => {
    alert('Mengunduh Laporan Rekap Absensi Santri format Excel (.xlsx)...');
  };

  const handleCetakPDF = () => {
    alert('Membuka pratinjau cetak Laporan Rekap Presensi PDF...');
  };

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="w-9 h-9 object-contain drop-shadow" />
            <div>
              <h2 className="text-xl font-bold text-slate-900 leading-snug">
                Rekapitulasi Presensi Santri
              </h2>
              <p className="text-xs text-slate-500">
                Asrama Al-Munawwir Blok 10 — Laporan statistik kedisiplinan santri.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportExcel}
              className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold border border-emerald-300 px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition"
            >
              <Download className="w-4 h-4 text-emerald-600" />
              <span>Export Excel</span>
            </button>

            <button
              onClick={handleCetakPDF}
              className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span>Cetak Laporan</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Periode Bulan
            </label>
            <select
              value={bulan}
              onChange={(e) => setBulan(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-800"
            >
              <option value="Agustus 2026">Agustus 2026 (Bulan Ini)</option>
              <option value="Juli 2026">Juli 2026</option>
              <option value="Juni 2026">Juni 2026</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Jenis Kegiatan
            </label>
            <select
              value={kegiatan}
              onChange={(e) => setKegiatan(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-800"
            >
              <option value="Semua">Semua Kegiatan (Akumulasi)</option>
              <option value="Kajian Subuh">Kajian Kitab Subuh</option>
              <option value="Madrasah Diniyah">Madrasah Diniyah Pagi</option>
              <option value="Jamaah Maghrib">Shalat Jamaah Maghrib</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Pencarian Santri
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Cari nama atau NIS..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 text-sm font-medium text-slate-800"
              />
            </div>
          </div>
        </div>

      </div>

      {/* Table Container */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white text-xs font-semibold uppercase tracking-wider">
                <th className="py-4 px-4">Santri</th>
                <th className="py-4 px-3">Kelas & Kamar</th>
                <th className="py-4 px-3 text-center">Hadir</th>
                <th className="py-4 px-3 text-center">Sakit</th>
                <th className="py-4 px-3 text-center">Izin</th>
                <th className="py-4 px-3 text-center">Alpha</th>
                <th className="py-4 px-4 text-center">Persentase</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filtered.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/80 transition">
                  
                  {/* Santri Name */}
                  <td className="py-3.5 px-4 font-medium text-slate-900">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center border border-emerald-300">
                        {row.nama.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{row.nama}</p>
                        <p className="text-[11px] text-slate-400 font-mono">NIS: {row.nis}</p>
                      </div>
                    </div>
                  </td>

                  {/* Class */}
                  <td className="py-3.5 px-3 text-xs text-slate-600">
                    <span className="font-semibold text-slate-800">{row.kelas}</span>
                    <span className="block text-[11px] text-slate-400">{row.kamar}</span>
                  </td>

                  {/* Hadir */}
                  <td className="py-3.5 px-3 text-center">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      {row.totalHadir}
                    </span>
                  </td>

                  {/* Sakit */}
                  <td className="py-3.5 px-3 text-center">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                      {row.totalSakit}
                    </span>
                  </td>

                  {/* Izin */}
                  <td className="py-3.5 px-3 text-center">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-100 text-sky-800 border border-sky-300">
                      {row.totalIzin}
                    </span>
                  </td>

                  {/* Alpha */}
                  <td className="py-3.5 px-3 text-center">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      row.totalAlpha > 0 ? 'bg-rose-100 text-rose-800 border border-rose-300' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {row.totalAlpha}
                    </span>
                  </td>

                  {/* Percentage Indicator */}
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-16 bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                        <div
                          className={`h-full rounded-full ${
                            row.persentase >= 90 ? 'bg-emerald-500' : row.persentase >= 75 ? 'bg-amber-500' : 'bg-rose-500'
                          }`}
                          style={{ width: `${row.persentase}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-bold text-slate-800">{row.persentase}%</span>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
