import React, { useState, useEffect } from 'react';
import { Wifi, CheckCircle2, X, Sparkles, Smartphone, Usb, Volume2, AlertCircle } from 'lucide-react';

export default function NfcScannerModal({ isOpen, onClose, onAbsensiSuccess }) {
  const [isNfcSupported, setIsNfcSupported] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedResult, setScannedResult] = useState(null);
  const [manualUidInput, setManualUidInput] = useState('');
  const [scanMode, setScanMode] = useState('usb'); // 'usb' (ACR122U / Keyboard wedge) or 'mobile' (Web NFC API)

  // Dummy database mapping NFC UID ke Santri
  const nfcDatabase = [
    { nfcUid: '04A1B2C3D4', nis: '2024001', nama: 'Ahmad Fauzi', kelas: '1 Ulya A', kamar: 'Al-Farabi 01' },
    { nfcUid: '04E5F6A7B8', nis: '2024002', nama: 'Muhammad Rizky', kelas: '1 Ulya A', kamar: 'Al-Farabi 01' },
    { nfcUid: '04C9D0E1F2', nis: '2024003', nama: 'Siti Nurhaliza', kelas: '1 Ulya B', kamar: 'Khadijah 02' },
  ];

  useEffect(() => {
    // Check if Web NFC API (Android Chrome) is supported
    if ('NDEFReader' in window) {
      setIsNfcSupported(true);
    }
  }, []);

  // Listen for USB Reader keystroke input (ACR122U in keyboard mode)
  useEffect(() => {
    if (!isOpen || scanMode !== 'usb') return;

    let buffer = '';
    let timeoutId = null;

    const handleKeyDown = (e) => {
      // If enter key pressed or line break (end of RFID/NFC scan)
      if (e.key === 'Enter') {
        if (buffer.trim().length >= 4) {
          processCardUid(buffer.trim());
        }
        buffer = '';
      } else if (e.key.length === 1) {
        buffer += e.key;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          buffer = '';
        }, 500);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timeoutId);
    };
  }, [isOpen, scanMode]);

  const processCardUid = (uid) => {
    setIsScanning(true);
    setScannedResult(null);

    // Audio Beep Effect
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime); // 880Hz Beep
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } catch (e) {
      console.log('Audio Context error', e);
    }

    setTimeout(() => {
      setIsScanning(false);
      // Find matching santri or create fallback demo match
      const matched = nfcDatabase.find(s => s.nfcUid.toLowerCase() === uid.toLowerCase()) || {
        nfcUid: uid,
        nis: '2024009',
        nama: 'Santri Pemegang Kartu NFC (' + uid.slice(0, 6) + ')',
        kelas: '1 Ulya A',
        kamar: 'Al-Farabi 02'
      };

      setScannedResult(matched);
      if (onAbsensiSuccess) {
        onAbsensiSuccess(matched);
      }
    }, 600);
  };

  // Start Mobile Web NFC API Scanner
  const startMobileNfcScan = async () => {
    if (!('NDEFReader' in window)) {
      alert('Browser HP ini belum mendukung Web NFC API. Gunakan Google Chrome di Android.');
      return;
    }

    try {
      setIsScanning(true);
      const ndef = new window.NDEFReader();
      await ndef.scan();
      
      ndef.addEventListener("reading", ({ serialNumber }) => {
        processCardUid(serialNumber || '04A1B2C3D4');
      });
    } catch (error) {
      setIsScanning(false);
      alert('Gagal memulai NFC: ' + error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md text-white shadow-2xl space-y-5 relative overflow-hidden">
        
        {/* Glow decoration */}
        <div className="absolute -top-20 -left-20 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="w-9 h-9 object-contain drop-shadow" />
            <div>
              <h3 className="font-bold text-base text-white">Presensi Kartu NFC Santri</h3>
              <p className="text-[11px] text-emerald-400 font-semibold">USB Reader ACR122U & Smartphone NFC</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Device Mode Switcher */}
        <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 text-xs">
          <button
            onClick={() => setScanMode('usb')}
            className={`py-2 px-3 rounded-xl font-semibold flex items-center justify-center gap-1.5 transition ${
              scanMode === 'usb' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Usb className="w-4 h-4" />
            <span>USB Reader ACR122U</span>
          </button>

          <button
            onClick={() => setScanMode('mobile')}
            className={`py-2 px-3 rounded-xl font-semibold flex items-center justify-center gap-1.5 transition ${
              scanMode === 'mobile' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>NFC HP (Android)</span>
          </button>
        </div>

        {/* Tap Card Visual Area */}
        <div className="relative aspect-video w-full bg-slate-950 rounded-2xl border-2 border-emerald-500/40 flex flex-col items-center justify-center overflow-hidden p-4 text-center">
          
          {/* Animated Signal Waves */}
          <div className="absolute w-32 h-32 rounded-full border border-emerald-500/30 animate-ping pointer-events-none"></div>
          <div className="absolute w-48 h-48 rounded-full border border-emerald-500/15 pointer-events-none"></div>

          {scannedResult ? (
            <div className="z-10 space-y-2 animate-fade-in">
              <div className="w-14 h-14 bg-emerald-500 text-slate-950 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/40">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div>
                <h4 className="font-bold text-white text-lg">{scannedResult.nama}</h4>
                <p className="text-xs text-emerald-400 font-mono">NIS: {scannedResult.nis} • UID: {scannedResult.nfcUid}</p>
                <p className="text-xs text-slate-400">{scannedResult.kelas} • {scannedResult.kamar}</p>
              </div>
              <span className="inline-block bg-emerald-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-full shadow">
                ✓ ABSENSI HADIR HARI INI
              </span>
            </div>
          ) : isScanning ? (
            <div className="z-10 space-y-2">
              <Wifi className="w-12 h-12 text-emerald-400 animate-pulse mx-auto" />
              <p className="text-sm font-bold text-emerald-300">Membaca Chip Kartu NFC...</p>
            </div>
          ) : (
            <div className="z-10 space-y-2">
              <div className="w-14 h-14 bg-emerald-950/80 border border-emerald-500/50 rounded-2xl flex items-center justify-center mx-auto text-emerald-400">
                <Wifi className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-white text-sm">
                {scanMode === 'usb' ? 'Tempelkan Kartu Santri ke Reader USB ACR122U' : 'Dekatkan Kartu Santri ke Belakang HP'}
              </h4>
              <p className="text-xs text-slate-400 max-w-xs">
                {scanMode === 'usb'
                  ? 'Ketik/Tap kartu NFC pada reader. Sistem akan mendeteksi UID secara otomatis.'
                  : 'Pastikan fitur NFC di pengaturan Android HP sudah aktif.'}
              </p>
            </div>
          )}

        </div>

        {/* Demo Fast Tap Controls */}
        <div className="space-y-3 pt-1">
          <div className="text-center">
            <p className="text-[11px] text-slate-400 font-medium mb-2">Simulasi Pengujian Tap Kartu NFC (Klik ID):</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {nfcDatabase.map((item) => (
                <button
                  key={item.nfcUid}
                  type="button"
                  onClick={() => processCardUid(item.nfcUid)}
                  className="text-xs bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700 px-3 py-1.5 rounded-xl transition"
                >
                  💳 {item.nama.split(' ')[0]} ({item.nfcUid.slice(0, 6)})
                </button>
              ))}
            </div>
          </div>

          {scanMode === 'mobile' && isNfcSupported && (
            <button
              onClick={startMobileNfcScan}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-2xl shadow-lg shadow-emerald-600/30 text-xs flex items-center justify-center gap-2 transition"
            >
              <Smartphone className="w-4 h-4" />
              <span>Mulai Pindai NFC HP Android</span>
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold py-2.5 rounded-2xl transition"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
}
