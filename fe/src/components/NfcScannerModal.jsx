import React, { useState, useEffect, useRef } from 'react';
import { Wifi, CheckCircle2, X, Smartphone, Usb, AlertTriangle, Copy, Check } from 'lucide-react';

export default function NfcScannerModal({ isOpen, onClose, onAbsensiSuccess }) {
  const [isNfcSupported, setIsNfcSupported] = useState(false);
  const [isListeningNfc, setIsListeningNfc] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedResult, setScannedResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [manualInput, setManualInput] = useState('');
  const [scanMode, setScanMode] = useState('mobile'); // 'mobile' (Web NFC API) or 'usb' (ACR122U)
  const [nfcError, setNfcError] = useState(null);
  
  const ndefRef = useRef(null);

  // Database referensi santri (Sample DB)
  const nfcDatabase = [
    { nfcUid: '04A1B2C3D4', nis: '2024001', nama: 'RAFIF IZUL MUBAROK ADZ DZIKRA', kelas: '1 Ulya A', kamar: 'Al-Farabi 01' },
    { nfcUid: '04E5F6A7B8', nis: '2024002', nama: 'Muhammad Rizky', kelas: '1 Ulya A', kamar: 'Al-Farabi 01' },
    { nfcUid: '04C9D0E1F2', nis: '2024003', nama: 'Siti Nurhaliza', kelas: '1 Ulya B', kamar: 'Khadijah 02' },
    { nfcUid: 'EFC18A2B', nis: '2024004', nama: 'Ahmad Fauzi', kelas: '1 Ulya A', kamar: 'Al-Farabi 02' },
  ];

  useEffect(() => {
    // Detect Web NFC API (Supported on Chrome for Mobile over HTTPS)
    if (typeof window !== 'undefined' && 'NDEFReader' in window) {
      setIsNfcSupported(true);
      setScanMode('mobile');
    } else {
      setIsNfcSupported(false);
      setScanMode('usb');
    }
  }, []);

  // Listen for USB Reader keystroke input (ACR122U USB reader in keyboard emulation mode)
  useEffect(() => {
    if (!isOpen || scanMode !== 'usb') return;

    let buffer = '';
    let timeoutId = null;

    const handleKeyDown = (e) => {
      // Ignore if typing in text inputs
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === 'Enter') {
        if (buffer.trim().length >= 4) {
          processRealNfcUid(buffer.trim(), 'USB Reader ACR122U');
        }
        buffer = '';
      } else if (e.key.length === 1) {
        buffer += e.key;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          buffer = '';
        }, 400);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timeoutId);
    };
  }, [isOpen, scanMode]);

  // Auto-start Mobile NFC scanner when modal opens in mobile mode
  useEffect(() => {
    if (isOpen && scanMode === 'mobile' && isNfcSupported && !isListeningNfc) {
      startMobileNfcScan();
    }
  }, [isOpen, scanMode, isNfcSupported]);

  // Process Scanned NFC Card UID
  const processRealNfcUid = (rawUid, source = 'NFC HP') => {
    if (!rawUid) return;

    setIsScanning(true);
    setScannedResult(null);
    setNfcError(null);

    // 1. Clean UID string (e.g. "04:a1:b2:c3" -> "04A1B2C3")
    const cleanUid = rawUid.replace(/[^a-fA-F0-9]/g, '').toUpperCase();
    const formattedUid = rawUid.includes(':') ? rawUid.toUpperCase() : (cleanUid.match(/.{1,2}/g)?.join(':') || cleanUid);

    // 2. Audio & Haptic Feedback
    playBeepSound();
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100]); // Vibrates on mobile device!
    }

    setTimeout(() => {
      setIsScanning(false);

      // 3. Search in santri database by UID
      const matchedSantri = nfcDatabase.find(
        (s) => s.nfcUid.replace(/[^a-fA-F0-9]/g, '').toUpperCase() === cleanUid
      );

      const result = {
        rawUid: rawUid,
        cleanUid: cleanUid,
        formattedUid: formattedUid,
        source: source,
        scannedAt: new Date().toLocaleTimeString('id-ID'),
        isRegistered: !!matchedSantri,
        santri: matchedSantri || null
      };

      setScannedResult(result);

      if (matchedSantri && onAbsensiSuccess) {
        onAbsensiSuccess({
          nfcUid: cleanUid,
          nis: matchedSantri.nis,
          nama: matchedSantri.nama,
          kelas: matchedSantri.kelas,
          kamar: matchedSantri.kamar
        });
      }
    }, 400);
  };

  // Web Audio BEEP feedback
  const playBeepSound = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1046.5, audioCtx.currentTime); // C6 Note Beep
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.12);
    } catch (e) {
      console.log('Audio Context error', e);
    }
  };

  // Start Real Mobile Web NFC API Reader
  const startMobileNfcScan = async () => {
    if (!('NDEFReader' in window)) {
      setNfcError('Browser HP ini tidak mendukung Web NFC API. Gunakan Google Chrome di HP (akses HTTPS).');
      return;
    }

    try {
      setNfcError(null);
      const ndef = new window.NDEFReader();
      ndefRef.current = ndef;
      await ndef.scan();
      setIsListeningNfc(true);

      ndef.addEventListener('reading', ({ serialNumber }) => {
        if (serialNumber) {
          processRealNfcUid(serialNumber, 'NFC HP Web NFC');
        } else {
          processRealNfcUid('04' + Math.random().toString(16).substr(2, 8).toUpperCase(), 'NFC HP Tag');
        }
      });

      ndef.addEventListener('readingerror', () => {
        setNfcError('Gagal membaca kartu NFC. Coba tempelkan kembali ke sensor HP.');
      });

    } catch (error) {
      setIsListeningNfc(false);
      if (error.name === 'NotAllowedError') {
        setNfcError('Izin akses NFC ditolak. Izinkan akses NFC pada Chrome HP Anda.');
      } else {
        setNfcError('Gagal mengaktifkan NFC: ' + error.message);
      }
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 w-full max-w-md text-white shadow-2xl space-y-4 relative overflow-hidden">
        
        {/* Glow decoration */}
        <div className="absolute -top-20 -left-20 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain drop-shadow" />
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
            onClick={() => { setScanMode('usb'); setNfcError(null); }}
            className={`py-2.5 px-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition ${
              scanMode === 'usb' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Usb className="w-4 h-4" />
            <span>USB Reader ACR122U</span>
          </button>

          <button
            onClick={() => { setScanMode('mobile'); setNfcError(null); }}
            className={`py-2.5 px-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition ${
              scanMode === 'mobile' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>NFC HP</span>
          </button>
        </div>

        {/* Real NFC Scan Banner Status */}
        {scanMode === 'mobile' && (
          <div className="text-xs">
            {isNfcSupported ? (
              <div className={`p-2.5 rounded-2xl border flex items-center justify-between gap-3 ${
                isListeningNfc 
                  ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300' 
                  : 'bg-amber-950/60 border-amber-500/40 text-amber-300'
              }`}>
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${isListeningNfc ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`}></span>
                  <span className="font-semibold">{isListeningNfc ? 'Sensor NFC HP Aktif & Siap Tap' : 'Sensor NFC Belum Aktif'}</span>
                </div>
                {!isListeningNfc && (
                  <button
                    onClick={startMobileNfcScan}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3 py-1 rounded-xl text-[11px] transition shrink-0"
                  >
                    Aktifkan
                  </button>
                )}
              </div>
            ) : (
              <div className="p-2.5 bg-amber-950/60 border border-amber-500/40 text-amber-300 rounded-2xl flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Web NFC didukung pada <b>Chrome di HP</b> (akses HTTPS). Anda juga bisa menguji via USB / Manual Input.</span>
              </div>
            )}
          </div>
        )}

        {/* Tap Card Visual Container */}
        <div className="relative aspect-video w-full bg-slate-950 rounded-2xl border-2 border-emerald-500/40 flex flex-col items-center justify-center overflow-hidden p-4 text-center">
          
          {/* Animated Signal Waves */}
          <div className="absolute w-36 h-36 rounded-full border border-emerald-500/30 animate-ping pointer-events-none"></div>
          <div className="absolute w-52 h-52 rounded-full border border-emerald-500/15 pointer-events-none"></div>

          {scannedResult ? (
            <div className="z-10 space-y-2 animate-fade-in w-full px-1">
              {scannedResult.isRegistered ? (
                <>
                  <div className="w-10 h-10 bg-emerald-500 text-slate-950 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/40">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-[11px] text-emerald-400 font-semibold tracking-wide uppercase">
                      Santri Pemegang Kartu:
                    </p>
                    <h4 className="font-bold text-white text-sm sm:text-base leading-snug break-words max-w-full px-2">
                      {scannedResult.santri.nama}
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      {scannedResult.santri.kelas} • {scannedResult.santri.kamar}
                    </p>
                  </div>

                  <div className="pt-1 flex flex-wrap items-center justify-center gap-2 text-xs">
                    <span className="bg-slate-900 border border-emerald-500/40 px-2.5 py-1 rounded-xl text-emerald-300 font-mono font-bold">
                      NIS: {scannedResult.santri.nis}
                    </span>
                    <span className="bg-emerald-950/80 border border-emerald-500/50 px-2.5 py-1 rounded-xl text-emerald-400 font-mono font-bold tracking-wider">
                      UID: {scannedResult.formattedUid}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-10 h-10 bg-amber-500 text-slate-950 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-amber-500/40">
                    <Wifi className="w-6 h-6 animate-pulse" />
                  </div>

                  <div className="space-y-1">
                    <p className="text-[11px] text-amber-400 font-semibold tracking-wide uppercase">
                      Kartu NFC Fisik Terbaca
                    </p>
                    <h4 className="font-bold text-white text-xs sm:text-sm leading-snug break-words px-2">
                      Santri Pemegang Kartu: <span className="text-amber-300">{scannedResult.santri?.nama || 'NFC Tag Fisik (Belum Terdaftar)'}</span>
                    </h4>
                  </div>

                  <div className="bg-slate-900 border border-amber-500/50 p-2 rounded-xl flex items-center justify-between gap-2 max-w-xs mx-auto">
                    <span className="font-mono text-emerald-400 font-bold text-xs tracking-wider break-all">
                      UID: {scannedResult.formattedUid}
                    </span>
                    <button
                      onClick={() => copyToClipboard(scannedResult.cleanUid)}
                      className="p-1 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-lg transition shrink-0"
                      title="Salin UID"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : isScanning ? (
            <div className="z-10 space-y-2">
              <Wifi className="w-10 h-10 text-emerald-400 animate-pulse mx-auto" />
              <p className="text-xs font-bold text-emerald-300">Membaca UID Chip NFC...</p>
            </div>
          ) : (
            <div className="z-10 space-y-1.5">
              <div className="w-11 h-11 bg-emerald-950/80 border border-emerald-500/50 rounded-2xl flex items-center justify-center mx-auto text-emerald-400">
                <Wifi className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-white text-sm">
                {scanMode === 'mobile' ? 'Dekatkan Kartu Santri ke Belakang HP' : 'Tempelkan Kartu Santri ke Reader USB ACR122U'}
              </h4>
              <p className="text-xs text-slate-400 max-w-xs">
                {scanMode === 'mobile'
                  ? 'Pastikan fitur NFC di pengaturan HP sudah aktif.'
                  : 'NFC Reader USB akan mendeteksi chip secara otomatis.'}
              </p>
            </div>
          )}

        </div>

        {/* Error Alert if any */}
        {nfcError && (
          <div className="p-2.5 bg-red-950/70 border border-red-500/50 text-red-300 text-xs rounded-2xl flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{nfcError}</span>
          </div>
        )}

        {/* Manual Test UID Input Form & Presets */}
        <div className="space-y-3 pt-1 border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (manualInput.trim()) {
                processRealNfcUid(manualInput.trim(), 'Input Manual UID');
                setManualInput('');
              }
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              placeholder="Atau tes simulasikan ketik UID (mis: 04A1B2C3D4)"
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
            />
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-2 rounded-xl text-xs transition shrink-0"
            >
              Tes Read
            </button>
          </form>

          {/* Quick Preset Test Chips */}
          <div className="text-center">
            <p className="text-[11px] text-slate-400 font-medium mb-1.5">Simulasi Pengujian Tap Kartu NFC (Klik ID):</p>
            <div className="flex flex-wrap gap-1.5 justify-center">
              {nfcDatabase.map((item) => (
                <button
                  key={item.nfcUid}
                  type="button"
                  onClick={() => processRealNfcUid(item.nfcUid, 'Tes Tap Simulator')}
                  className="text-[11px] bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700 px-2.5 py-1 rounded-xl transition"
                >
                  💳 {item.nama.split(' ')[0]} ({item.nfcUid.slice(0, 8)})
                </button>
              ))}
            </div>
          </div>

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

