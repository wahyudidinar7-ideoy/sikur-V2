export type SemesterType = 'Ganjil' | 'Genap';
export type ClassType = 'A' | 'B';

export type AssessmentRating = 'BB' | 'MB' | 'BSH' | 'BSB';
// BB: Belum Berkembang, MB: Mulai Berkembang, BSH: Berkembang Sesuai Harapan, BSB: Berkembang Sangat Baik

export type PlayAreaType = 
  | 'Main Balok' 
  | 'Main Peran' 
  | 'Main Sensorimotor' 
  | 'Main Seni & Kreativitas' 
  | 'Literasi & STEAM'
  | 'Keaksaraan Awal';

export interface SchoolProfile {
  namaSekolah: string;
  npsn: string;
  alamat: string;
  kelurahan: string;
  kecamatan: string;
  kota: string;
  provinsi: string;
  kodePos: string;
  telepon: string;
  email: string;
  website: string;
  namaKepalaSekolah: string;
  nipKepalaSekolah: string;
  tahunAjaran: string;
  semesterAktif: SemesterType;
  kelompokAktif: ClassType;
}

export interface KospData {
  visi: string;
  misi: string[];
  tujuan: string[];
  karakteristik: string;
  dimensiP5: {
    nama: string;
    deskripsi: string;
    fokusPaud: string;
  }[];
  kalenderRingkas: {
    bulan: string;
    kegiatan: string;
    keterangan: string;
  }[];
}

export interface ProtaItem {
  id: string;
  semester: SemesterType;
  bulan: string;
  alokasiMinggu: number;
  tema: string;
  subTema: string[];
  tujuanPembelajaran: string[];
  proyekP5: string;
}

export interface PromesItem {
  id: string;
  semester: SemesterType;
  bulan: string;
  mingguKe: number;
  tema: string;
  subTema: string;
  topik: string;
  alokasiHari: number;
  tujuanPembelajaran: string;
  kegiatanUtama: string;
}

export interface RppmItem {
  id: string;
  semester: SemesterType;
  bulan: string;
  mingguKe: number;
  kelompok: ClassType;
  rentangTanggal: string;
  tema: string;
  subTema: string;
  topik: string;
  tujuanPembelajaran: string[];
  rencanaSenin: string[];
  rencanaSelasa: string[];
  rencanaRabu: string[];
  rencanaKamis: string[];
  rencanaJumat: string[];
  alatBahan: string[];
  teknikAsesmen: string[];
}

export interface ActivityStep {
  id: string;
  nama: string;
  area: PlayAreaType;
  alatBahan: string;
  langkah: string;
  tujuanTerkait: string;
  teknikAsesmen: string;
}

export interface RpphItem {
  id: string;
  rppmId?: string;
  kelompok: ClassType;
  semester: SemesterType;
  mingguKe: number;
  hari: string;
  tanggal: string; // YYYY-MM-DD
  tema: string;
  subTema: string;
  subSubTema: string;
  tujuanPembelajaran: string[];
  kegiatanPembuka: {
    salamDanDoa: string;
    sopPenyambutan: string;
    apersepsiDanLiterasi: string;
    gerakLaguFisik: string;
    waktu: string;
  };
  kegiatanInti: ActivityStep[];
  istirahatMakan: {
    sopCuciTangan: string;
    doaMakanDanBekal: string;
    mainBebasMotorik: string;
    waktu: string;
  };
  kegiatanPenutup: {
    recallingDanRefleksi: string;
    pesanKebaikanMoral: string;
    doaPenutupDanSalam: string;
    infoKegiatanBesok: string;
    waktu: string;
  };
  mediaSumberBelajar: string[];
  teknikAsesmen: string[];
  catatanGuru?: string;
}

export interface BankActivityItem {
  id: string;
  tema: string;
  subTema: string;
  kelompok: 'A' | 'B' | 'Semua';
  area: PlayAreaType;
  namaKegiatan: string;
  alatBahan: string;
  tujuan: string;
  langkah: string;
  asesmenTerkait: string;
}

export interface Student {
  id: string;
  nisn: string;
  namaLengkap: string;
  namaPanggilan: string;
  jenisKelamin: 'Laki-laki' | 'Perempuan';
  tempatTanggalLahir: string;
  kelompok: ClassType;
  namaAyah: string;
  namaIbu: string;
  pekerjaanOrtu: string;
  alamat: string;
  teleponOrtu: string;
  fotoUrl: string;
}

export interface Teacher {
  id: string;
  nama: string;
  nip: string;
  jabatan: 'Kepala Sekolah' | 'Guru Kelas A' | 'Guru Kelas B' | 'Guru Pendamping';
  pendidikanTerakhir: string;
  telepon: string;
  fotoUrl: string;
}

export interface AssessmentRecord {
  id: string;
  studentId: string;
  kelompok: ClassType;
  tanggal: string;
  rpphId?: string;
  kegiatanNama: string;
  ratings: {
    agamaBudiPekerti: AssessmentRating;
    jatiDiri: AssessmentRating;
    literasiSteam: AssessmentRating;
    motorik: AssessmentRating;
    sosialEmosional: AssessmentRating;
    bahasa: AssessmentRating;
  };
  catatanAnekdot: string;
  hasilKarya?: {
    namaKarya: string;
    fotoUrl: string;
    deskripsi: string;
    analisisCapaian: string;
  };
  portofolio?: string;
}

export interface RaportNarrative {
  studentId: string;
  semester: SemesterType;
  tahunAjaran: string;
  narasiAgamaBudiPekerti: string;
  narasiJatiDiri: string;
  narasiLiterasiSteam: string;
  narasiMotorik: string;
  narasiSosialEmosional: string;
  narasiBahasa: string;
  proyekP5: {
    judul: string;
    deskripsi: string;
    capaian: string;
  };
  pertumbuhanFisik: {
    tinggiBadan: number;
    beratBadan: number;
    lingkarKepala: number;
    kesehatanGigi: string;
    statusGizi: string;
  };
  kehadiran: {
    sakit: number;
    izin: number;
    tanpaKeterangan: number;
  };
  refleksiGuru: string;
  saranOrangTua: string;
  tempatTanggalRapor: string;
  tandaTangan: {
    guruKelas: string;
    kepalaSekolah: string;
  };
}

export interface DailyTeacherJournal {
  id: string;
  tanggal: string;
  kelompok: ClassType;
  guruNama: string;
  kegiatanTerlaksana: string;
  kendalaHambatan: string;
  solusiTindakLanjut: string;
  catatanSiswaKhusus: string;
  fotoDokumentasi?: string;
}
