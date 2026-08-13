import React, { useState } from 'react';
import { QrCode, CheckCircle2, X, RefreshCw, Sparkles, Camera } from 'lucide-react';

export default function QrScannerModal({ isOpen, onClose, onScanResult }) {
  const [scanning, setScanning] = useState(false);
  const [scannedSantri, setScannedSantri] = useState(null);

  if (!isOpen) return null;

  const dummySantri = [
    { nis: '2024001', nama: 'Ahmad Fauzi', kelas: '1 Ulya A', kamar: 'Al-Farabi 01' },
    { nis: '2024002', nama: 'Muhammad Rizky', kelas: '1 Ulya A', kamar: 'Al-Farabi 01' },
    { nis: '2024003', nama: 'Siti Nurhaliza', kelas: '1 Ulya B', kamar: 'Khadijah 02' },
  ];

  const handleSimulateScan = () => {
    setScanning(true);
    setScannedSantri(null);

    setTimeout(() => {
      setScanning(false);
      const randomSantri = dummySantri[Math.floor(Math.random() * dummySantri.length)];
      setScannedSantri(randomSantri);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md text-white shadow-2xl space-y-5 relative overflow-hidden">
        
        {/* Decorative Light */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none"></div>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white p-0.5 border border-emerald-400 flex items-center justify-center">
              <img src="/logo.png" alt="Logo Asrama" className="w-7 h-7 object-contain" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Pemindai Kartu Santri</h3>
              <p className="text-[11px] text-emerald-400 font-medium">Asrama Al-Munawwir Blok 10</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scanner Window Simulation */}
        <div className="relative aspect-square w-full bg-slate-950 rounded-2xl border-2 border-emerald-500/50 flex flex-col items-center justify-center overflow-hidden">
          
          {/* Animated Scanning Line */}
          <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-300 to-emerald-500 shadow-lg shadow-emerald-500 animate-scan z-10"></div>
          
          {/* Corner Markers */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-emerald-400 rounded-tl-lg"></div>
          <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-emerald-400 rounded-tr-lg"></div>
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-emerald-400 rounded-bl-lg"></div>
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-emerald-400 rounded-br-lg"></div>

          {scannedSantri ? (
            <div className="z-20 bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-emerald-500 text-center space-y-2 max-w-[85%] animate-fade-in">
              <div className="w-12 h-12 bg-emerald-500 text-slate-950 font-bold rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">{scannedSantri.nama}</h4>
                <p className="text-xs text-emerald-400 font-mono">NIS: {scannedSantri.nis}</p>
                <p className="text-[11px] text-slate-400">{scannedSantri.kelas} • {scannedSantri.kamar}</p>
              </div>
              <span className="inline-block bg-emerald-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-full">
                Presensi Hadir Terdaftar!
              </span>
            </div>
          ) : scanning ? (
            <div className="z-20 text-center space-y-2">
              <RefreshCw className="w-10 h-10 text-emerald-400 animate-spin mx-auto" />
              <p className="text-xs font-semibold text-emerald-300">Membaca Kode QR Kartu...</p>
            </div>
          ) : (
            <div className="z-20 text-center space-y-2 p-4">
              <QrCode className="w-16 h-16 text-emerald-500/40 mx-auto" />
              <p className="text-xs text-slate-400">Posisikan Kartu Santri di tengah area fokus</p>
            </div>
          )}

        </div>

        {/* Control Button */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={handleSimulateScan}
            disabled={scanning}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-2xl shadow-lg shadow-emerald-600/30 text-xs flex items-center justify-center gap-2 transition"
          >
            <Sparkles className="w-4 h-4" />
            <span>Simulasi Pindai Kartu Santri</span>
          </button>
          
          <button
            type="button"
            onClick={onClose}
            className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold py-2.5 rounded-2xl transition"
          >
            Selesai
          </button>
        </div>

      </div>
    </div>
  );
}
