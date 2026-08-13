import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock Database Santri dengan Kartu NFC UID
const dataSantri = [
  { id: 1, nis: '2024001', nfcUid: '04A1B2C3D4', nama: 'Ahmad Fauzi', kelas: '1 Ulya A', kamar: 'Al-Farabi 01', statusDefault: 'Hadir' },
  { id: 2, nis: '2024002', nfcUid: '04E5F6A7B8', nama: 'Muhammad Rizky', kelas: '1 Ulya A', kamar: 'Al-Farabi 01', statusDefault: 'Hadir' },
  { id: 3, nis: '2024003', nfcUid: '04C9D0E1F2', nama: 'Siti Nurhaliza', kelas: '1 Ulya B', kamar: 'Khadijah 02', statusDefault: 'Hadir' },
  { id: 4, nis: '2024004', nfcUid: '04F3E2D1C0', nama: 'Badrus Sholeh', kelas: '2 Ulya A', kamar: 'Al-Ghazali 03', statusDefault: 'Izin' },
  { id: 5, nis: '2024005', nfcUid: '04B9A8C7D6', nama: 'Fatimatuz Zahra', kelas: '1 Ulya B', kamar: 'Khadijah 01', statusDefault: 'Sakit' },
  { id: 6, nis: '2024006', nfcUid: '04E1D2C3B4', nama: 'Zaidan Arifin', kelas: '2 Ulya A', kamar: 'Al-Farabi 02', statusDefault: 'Hadir' },
];

// Mock Kehadiran Database
let logAbsensi = [
  { id: 1, santriId: 1, tanggal: new Date().toISOString().split('T')[0], kegiatan: 'Kajian Subuh', status: 'Hadir', jam: '05:15' },
  { id: 2, santriId: 2, tanggal: new Date().toISOString().split('T')[0], kegiatan: 'Kajian Subuh', status: 'Hadir', jam: '05:12' },
  { id: 3, santriId: 4, tanggal: new Date().toISOString().split('T')[0], kegiatan: 'Kajian Subuh', status: 'Izin', keterangan: 'Pulang acara keluarga', jam: '05:00' },
  { id: 4, santriId: 5, tanggal: new Date().toISOString().split('T')[0], kegiatan: 'Kajian Subuh', status: 'Sakit', keterangan: 'Demam di Poskestren', jam: '05:05' },
];

// Endpoint Check Health
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    pesan: 'Backend Absensi Santri Ponpes Al Munawwir - Blok Agung Berjalan',
    waktu: new Date().toLocaleString('id-ID')
  });
});

// Endpoint Auth Login
app.post('/api/auth/login', (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username dan password wajib diisi!' });
  }

  // Dummy Authentication
  return res.json({
    success: true,
    message: 'Login berhasil!',
    user: {
      id: 101,
      nama: role === 'admin' ? 'Pengurus Pusat (Admin)' : role === 'ustadz' ? 'Ustadz Abdullah, S.Pd.I' : 'Wali Santri (Ahmad Fauzi)',
      username,
      role: role || 'ustadz',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
    },
    token: 'jwt-token-ponpes-al-munawwir-blok-agung-2026'
  });
});

// Endpoint List Santri
app.get('/api/santri', (req, res) => {
  const { kelas, search } = req.query;
  let result = [...dataSantri];

  if (kelas && kelas !== 'Semua') {
    result = result.filter(s => s.kelas === kelas);
  }

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(s => s.nama.toLowerCase().includes(q) || s.nis.includes(q));
  }

  res.json({ success: true, count: result.length, data: result });
});

// Endpoint Dashboard Stats
app.get('/api/stats', (req, res) => {
  const totalSantri = dataSantri.length;
  const hadir = 5;
  const sakit = 1;
  const izin = 1;
  const alpha = 1;
  const persentaseHadir = Math.round((hadir / totalSantri) * 100);

  res.json({
    success: true,
    data: {
      totalSantri,
      hadir,
      sakit,
      izin,
      alpha,
      persentaseHadir,
      kegiatanAktif: 'Madrasah Diniyah Sore',
      tanggal: new Date().toISOString().split('T')[0]
    }
  });
});

// Endpoint Simpan / Bulk Absensi
app.post('/api/absensi', (req, res) => {
  const { kegiatan, tanggal, dataAbsensi } = req.body;
  if (!kegiatan || !dataAbsensi) {
    return res.status(400).json({ success: false, message: 'Data absensi tidak lengkap' });
  }

  // Process & save simulation
  dataAbsensi.forEach(item => {
    logAbsensi.unshift({
      id: Date.now() + Math.random(),
      santriId: item.santriId,
      tanggal: tanggal || new Date().toISOString().split('T')[0],
      kegiatan,
      status: item.status,
      jam: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    });
  });

  res.json({
    success: true,
    message: `Berhasil menyimpan absensi ${dataAbsensi.length} santri untuk kegiatan ${kegiatan}`
  });
});

// Endpoint Instant NFC Card Tap Absensi
app.post('/api/absensi/nfc-tap', (req, res) => {
  const { nfcUid, kegiatan } = req.body;
  if (!nfcUid) {
    return res.status(400).json({ success: false, message: 'NFC Card UID wajib dikirim!' });
  }

  const santri = dataSantri.find(s => s.nfcUid.toLowerCase() === nfcUid.toLowerCase());
  const now = new Date();
  const jam = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  const tanggal = now.toISOString().split('T')[0];

  if (santri) {
    const newLog = {
      id: Date.now(),
      santriId: santri.id,
      nama: santri.nama,
      nis: santri.nis,
      kelas: santri.kelas,
      tanggal,
      kegiatan: kegiatan || 'Madrasah Diniyah',
      status: 'Hadir',
      jam
    };
    logAbsensi.unshift(newLog);

    return res.json({
      success: true,
      message: `Presensi HADIR berhasil dicatat via NFC Kartu!`,
      santri,
      log: newLog
    });
  } else {
    return res.status(404).json({
      success: false,
      message: `Kartu NFC (UID: ${nfcUid}) belum terdaftar pada sistem database santri!`
    });
  }
});

// Endpoint Rekap Absensi
app.get('/api/absensi/rekap', (req, res) => {
  res.json({
    success: true,
    data: logAbsensi
  });
});

app.listen(PORT, () => {
  console.log(`Server Backend Ponpes Al Munawwir Berjalan di port http://localhost:${PORT}`);
});
