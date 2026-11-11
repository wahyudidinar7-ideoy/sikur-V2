import React, { useState } from 'react';
import { 
  Sparkles, 
  Printer, 
  Search, 
  Check, 
  Edit3, 
  User, 
  Award, 
  Layers, 
  Wand2, 
  Download,
  Calendar,
  Smile,
  Heart
} from 'lucide-react';
import { RaportNarrative, Student, AssessmentRecord, SchoolProfile, SemesterType, ClassType } from '../types';
import { generateRaportNarrativeFromAssessments } from '../utils/aiGenerator';
import { fireJoyfulConfetti } from '../utils/confetti';

interface RaportViewProps {
  students: Student[];
  raportList: RaportNarrative[];
  assessments: AssessmentRecord[];
  schoolProfile: SchoolProfile;
  activeClass: ClassType;
  onSaveRaportList: (list: RaportNarrative[]) => void;
}

export const RaportView: React.FC<RaportViewProps> = ({
  students,
  raportList,
  assessments,
  schoolProfile,
  activeClass,
  onSaveRaportList
}) => {
  const classStudents = students.filter(s => s.kelompok === activeClass);
  const [selectedStudentId, setSelectedStudentId] = useState<string>(classStudents[0]?.id || '');
  const [selectedSemester, setSelectedSemester] = useState<SemesterType>(schoolProfile.semesterAktif);
  const [isEditing, setIsEditing] = useState(false);
  const [showCoverPreview, setShowCoverPreview] = useState(false);
  const [isBatchPrinting, setIsBatchPrinting] = useState(false);

  const activeStudent = students.find(s => s.id === selectedStudentId) || classStudents[0];

  // Find or generate raport narrative for active student
  const activeRaport = raportList.find(
    r => r.studentId === activeStudent?.id && r.semester === selectedSemester
  ) || (activeStudent ? generateRaportNarrativeFromAssessments(
    activeStudent,
    selectedSemester,
    assessments,
    activeClass === 'A' ? 'Siti Nurhaliza, S.Pd' : 'Dewi Anggraeni, S.Pd',
    schoolProfile.namaKepalaSekolah
  ) : null);

  const [formData, setFormData] = useState<RaportNarrative | null>(activeRaport);

  // Sync form when student or semester changes
  React.useEffect(() => {
    if (activeStudent) {
      const found = raportList.find(
        r => r.studentId === activeStudent.id && r.semester === selectedSemester
      );
      if (found) {
        setFormData(found);
      } else {
        const auto = generateRaportNarrativeFromAssessments(
          activeStudent,
          selectedSemester,
          assessments,
          activeClass === 'A' ? 'Siti Nurhaliza, S.Pd' : 'Dewi Anggraeni, S.Pd',
          schoolProfile.namaKepalaSekolah
        );
        setFormData(auto);
      }
      setIsEditing(false);
    }
  }, [selectedStudentId, selectedSemester, raportList, assessments]);

  const handleSaveRaport = () => {
    if (!formData) return;
    const exists = raportList.some(
      r => r.studentId === formData.studentId && r.semester === formData.semester
    );
    let updated: RaportNarrative[];
    if (exists) {
      updated = raportList.map(r => 
        r.studentId === formData.studentId && r.semester === formData.semester ? formData : r
      );
    } else {
      updated = [...raportList, formData];
    }
    onSaveRaportList(updated);
    setIsEditing(false);
    fireJoyfulConfetti();
  };

  const handleRegenerateNarrative = () => {
    if (!activeStudent) return;
    const auto = generateRaportNarrativeFromAssessments(
      activeStudent,
      selectedSemester,
      assessments,
      activeClass === 'A' ? 'Siti Nurhaliza, S.Pd' : 'Dewi Anggraeni, S.Pd',
      schoolProfile.namaKepalaSekolah
    );
    setFormData(auto);
    setIsEditing(true);
    fireJoyfulConfetti();
  };

  const handlePrint = () => {
    setIsBatchPrinting(false);
    window.print();
  };

  const handlePrintBatch = () => {
    setIsBatchPrinting(true);
    setTimeout(() => {
      window.print();
      setIsBatchPrinting(false);
    }, 400);
  };

  if (!activeStudent || !formData) {
    return (
      <div className="bg-white p-8 rounded-3xl text-center border border-slate-200">
        <p className="text-slate-500">Tidak ada siswa yang dipilih di Kelas {activeClass}.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-3xl border border-indigo-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white flex items-center justify-center text-2xl shadow-sm shadow-indigo-200">
            📜
          </div>
          <div>
            <h1 className="font-display font-extrabold text-xl text-slate-800">
              Laporan Perkembangan Anak (Raport Narasi PAUD)
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Format resmi Kurikulum Merdeka PAUD Kemendikbudristek • Otomatisasi narasi kekuatan anak
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setShowCoverPreview(!showCoverPreview)}
            className="px-4 py-2 rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs transition-all"
          >
            {showCoverPreview ? '📄 Lihat Isi Raport' : '🎨 Lihat Sampul Raport'}
          </button>

          <button
            onClick={handleRegenerateNarrative}
            className="px-4 py-2 rounded-full bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-transform hover:scale-105"
            title="Racik ulang narasi otomatis dari data ceklis asesmen"
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>Generate Narasi Otomatis</span>
          </button>

          {isEditing ? (
            <button
              onClick={handleSaveRaport}
              className="px-5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-200 flex items-center gap-1.5 transition-transform hover:scale-105"
            >
              <Check className="w-4 h-4" />
              <span>Simpan Narasi</span>
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-all"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Narasi</span>
            </button>
          )}

          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-sm flex items-center gap-1.5 transition-transform hover:scale-105"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Raport Ini</span>
          </button>

          <button
            onClick={handlePrintBatch}
            className="px-4 py-2 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs shadow-sm flex items-center gap-1.5 transition-transform hover:scale-105"
            title="Cetak sekaligus raport seluruh anak kelas ini"
          >
            <span>🖨️ Cetak 1 Kelas (Massal)</span>
          </button>
        </div>
      </div>

      {/* Student Selector Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-print">
        {classStudents.map((child) => (
          <button
            key={child.id}
            onClick={() => setSelectedStudentId(child.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-2 ${
              selectedStudentId === child.id
                ? 'bg-indigo-600 text-white shadow-xs font-extrabold'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <img
              src={child.fotoUrl}
              alt={child.namaPanggilan}
              className="w-5 h-5 rounded-full bg-white object-cover"
            />
            <span>{child.namaPanggilan}</span>
          </button>
        ))}
      </div>

      {/* VIEW: COVER RAPORT TK */}
      {showCoverPreview ? (
        <div className="bg-white rounded-3xl p-8 lg:p-12 border-2 border-amber-300 shadow-xl max-w-2xl mx-auto print-container text-center space-y-8">
          <div className="text-center pt-8">
            <span className="text-6xl filter drop-shadow-sm block mb-4">🌈</span>
            <h3 className="text-xs uppercase font-bold tracking-widest text-slate-500">
              KEMENTERIAN PENDIDIKAN, KEBUDAYAAN, RISET, DAN TEKNOLOGI
            </h3>
            <h1 className="font-display font-extrabold text-2xl lg:text-3xl text-slate-900 mt-2 uppercase tracking-wide">
              LAPORAN CAPAIAN PEMBELAJARAN
            </h1>
            <h2 className="font-display font-bold text-lg text-emerald-700 uppercase">
              TAMAN KANAK-KANAK (PAUD MERDEKA)
            </h2>
          </div>

          <div className="my-10 p-6 rounded-3xl bg-amber-50/80 border-2 border-dashed border-amber-300 max-w-md mx-auto space-y-4">
            <img
              src={activeStudent.fotoUrl}
              alt={activeStudent.namaLengkap}
              className="w-24 h-24 mx-auto rounded-full bg-white p-1 border-2 border-emerald-400 object-cover shadow-sm"
            />
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Nama Lengkap Peserta Didik</span>
              <span className="font-display font-extrabold text-lg text-slate-800 block mt-0.5">
                {activeStudent.namaLengkap}
              </span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Nomor Induk Siswa Nasional (NISN)</span>
              <span className="font-bold text-sm text-slate-700 block mt-0.5">
                {activeStudent.nisn}
              </span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Kelompok Belajar</span>
              <span className="font-bold text-xs text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block mt-1">
                Kelompok {activeStudent.kelompok} (Usia {activeStudent.kelompok === 'A' ? '4-5 Tahun' : '5-6 Tahun'})
              </span>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-200 text-xs text-slate-600">
            <p className="font-bold text-slate-800 uppercase">{schoolProfile.namaSekolah}</p>
            <p>{schoolProfile.alamat}, {schoolProfile.kecamatan}, {schoolProfile.kota}</p>
            <p className="mt-1 font-semibold text-emerald-700">Tahun Ajaran {schoolProfile.tahunAjaran}</p>
          </div>
        </div>
      ) : (
        /* VIEW: OFFICIAL RAPORT NARASI ISI */
        <div className="bg-white rounded-3xl p-6 lg:p-10 border border-slate-200/80 shadow-xs print-container space-y-6">
          
          {/* Header Kop Resmi */}
          <div className="border-b-2 border-slate-900 pb-3 text-center">
            <h2 className="text-xs uppercase font-bold tracking-widest text-slate-600">
              {schoolProfile.namaSekolah}
            </h2>
            <h1 className="font-display font-extrabold text-lg lg:text-xl text-slate-900 uppercase">
              LAPORAN PERKEMBANGAN PESERTA DIDIK
            </h1>
            <p className="text-[11px] text-slate-500 font-medium">
              Semester {formData.semester} • Tahun Ajaran {formData.tahunAjaran} • NPSN: {schoolProfile.npsn}
            </p>
          </div>

          {/* Identitas Siswa Box */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-indigo-50/60 p-4 rounded-2xl border border-indigo-200/70 text-xs">
            <div>
              <span className="text-slate-500 text-[10px] uppercase font-bold block">Nama Lengkap</span>
              <span className="font-extrabold text-slate-900">{activeStudent.namaLengkap}</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] uppercase font-bold block">Nama Panggilan / Kelompok</span>
              <span className="font-extrabold text-indigo-900">{activeStudent.namaPanggilan} / Kelas {activeStudent.kelompok}</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] uppercase font-bold block">NISN</span>
              <span className="font-extrabold text-slate-800">{activeStudent.nisn}</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] uppercase font-bold block">Tempat, Tanggal Lahir</span>
              <span className="font-semibold text-slate-800">{activeStudent.tempatTanggalLahir}</span>
            </div>
          </div>

          {/* 6 ELEMEN NARASI CAPAIAN PEMBELAJARAN */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1 flex items-center gap-2">
              <span>🌟</span>
              <span>I. Capaian Pembelajaran Kurikulum Merdeka PAUD</span>
            </h3>

            {/* Aspek 1: Nilai Agama & Budi Pekerti */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
              <span className="font-bold text-emerald-800 block text-xs">
                1. Nilai Agama dan Budi Pekerti
              </span>
              {isEditing ? (
                <textarea
                  rows={3}
                  value={formData.narasiAgamaBudiPekerti}
                  onChange={(e) => setFormData({ ...formData, narasiAgamaBudiPekerti: e.target.value })}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs leading-relaxed"
                />
              ) : (
                <p className="text-slate-700 leading-relaxed text-justify">
                  {formData.narasiAgamaBudiPekerti}
                </p>
              )}
            </div>

            {/* Aspek 2: Jati Diri */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
              <span className="font-bold text-sky-800 block text-xs">
                2. Jati Diri (Kemandirian & Regulasi Diri)
              </span>
              {isEditing ? (
                <textarea
                  rows={3}
                  value={formData.narasiJatiDiri}
                  onChange={(e) => setFormData({ ...formData, narasiJatiDiri: e.target.value })}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs leading-relaxed"
                />
              ) : (
                <p className="text-slate-700 leading-relaxed text-justify">
                  {formData.narasiJatiDiri}
                </p>
              )}
            </div>

            {/* Aspek 3: Dasar Literasi & STEAM */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
              <span className="font-bold text-purple-800 block text-xs">
                3. Dasar-Dasar Literasi, Matematika, Sains, Teknologi, Rekayasa & Seni (STEAM)
              </span>
              {isEditing ? (
                <textarea
                  rows={3}
                  value={formData.narasiLiterasiSteam}
                  onChange={(e) => setFormData({ ...formData, narasiLiterasiSteam: e.target.value })}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs leading-relaxed"
                />
              ) : (
                <p className="text-slate-700 leading-relaxed text-justify">
                  {formData.narasiLiterasiSteam}
                </p>
              )}
            </div>

            {/* Aspek 4: Keterampilan Motorik */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
              <span className="font-bold text-amber-900 block text-xs">
                4. Keterampilan Fisik Motorik (Kasar & Halus)
              </span>
              {isEditing ? (
                <textarea
                  rows={3}
                  value={formData.narasiMotorik}
                  onChange={(e) => setFormData({ ...formData, narasiMotorik: e.target.value })}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs leading-relaxed"
                />
              ) : (
                <p className="text-slate-700 leading-relaxed text-justify">
                  {formData.narasiMotorik}
                </p>
              )}
            </div>

            {/* Aspek 5: Sosial Emosional */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
              <span className="font-bold text-pink-800 block text-xs">
                5. Sosial Emosional & Gotong Royong
              </span>
              {isEditing ? (
                <textarea
                  rows={3}
                  value={formData.narasiSosialEmosional}
                  onChange={(e) => setFormData({ ...formData, narasiSosialEmosional: e.target.value })}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs leading-relaxed"
                />
              ) : (
                <p className="text-slate-700 leading-relaxed text-justify">
                  {formData.narasiSosialEmosional}
                </p>
              )}
            </div>

            {/* Aspek 6: Bahasa */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
              <span className="font-bold text-blue-800 block text-xs">
                6. Kemampuan Bahasa & Komunikasi
              </span>
              {isEditing ? (
                <textarea
                  rows={3}
                  value={formData.narasiBahasa}
                  onChange={(e) => setFormData({ ...formData, narasiBahasa: e.target.value })}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs leading-relaxed"
                />
              ) : (
                <p className="text-slate-700 leading-relaxed text-justify">
                  {formData.narasiBahasa}
                </p>
              )}
            </div>
          </div>

          {/* II. PROYEK PROFIL PELAJAR PANCASILA (P5) */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs space-y-2">
            <span className="font-display font-bold text-xs uppercase text-amber-900 block">
              II. Proyek Penguatan Profil Pelajar Pancasila (P5)
            </span>
            <div className="font-bold text-slate-800">
              Tema Proyek: {formData.proyekP5.judul}
            </div>
            <p className="text-slate-700 leading-relaxed text-justify text-[11px]">
              {formData.proyekP5.deskripsi}
            </p>
            <div className="text-[11px] font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-lg inline-block">
              Predikat Capaian: {formData.proyekP5.capaian}
            </div>
          </div>

          {/* III. PERTUMBUHAN FISIK & REKAP KEHADIRAN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Pertumbuhan Fisik */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-display font-bold text-xs uppercase text-slate-800 block">
                III. Pertumbuhan Fisik & Kesehatan
              </span>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-white p-2 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Tinggi Badan</span>
                  <span className="font-bold text-slate-800">{formData.pertumbuhanFisik.tinggiBadan} cm</span>
                </div>
                <div className="bg-white p-2 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Berat Badan</span>
                  <span className="font-bold text-slate-800">{formData.pertumbuhanFisik.beratBadan} kg</span>
                </div>
                <div className="bg-white p-2 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Lingkar Kepala</span>
                  <span className="font-bold text-slate-800">{formData.pertumbuhanFisik.lingkarKepala} cm</span>
                </div>
              </div>
              <div className="text-[11px] text-slate-600">
                <strong>Status Gizi: </strong> {formData.pertumbuhanFisik.statusGizi}
              </div>
              <div className="text-[11px] text-slate-600">
                <strong>Kesehatan Gigi: </strong> {formData.pertumbuhanFisik.kesehatanGigi}
              </div>
            </div>

            {/* Kehadiran */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-display font-bold text-xs uppercase text-slate-800 block">
                IV. Rekapitulasi Kehadiran
              </span>
              <div className="grid grid-cols-3 gap-2 text-center pt-2">
                <div className="bg-white p-2 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Sakit</span>
                  <span className="font-bold text-slate-800">{formData.kehadiran.sakit} Hari</span>
                </div>
                <div className="bg-white p-2 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Izin</span>
                  <span className="font-bold text-slate-800">{formData.kehadiran.izin} Hari</span>
                </div>
                <div className="bg-white p-2 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Tanpa Keterangan</span>
                  <span className="font-bold text-slate-800">{formData.kehadiran.tanpaKeterangan} Hari</span>
                </div>
              </div>
            </div>
          </div>

          {/* V. REFLEKSI GURU & SARAN ORANG TUA */}
          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200 text-xs">
              <span className="font-bold text-rose-900 block mb-1">
                Refleksi & Apresiasi Guru Pamong:
              </span>
              {isEditing ? (
                <textarea
                  rows={2}
                  value={formData.refleksiGuru}
                  onChange={(e) => setFormData({ ...formData, refleksiGuru: e.target.value })}
                  className="w-full p-2 bg-white border border-slate-200 rounded-xl text-xs"
                />
              ) : (
                <p className="text-slate-700 italic leading-relaxed text-[11px]">
                  "{formData.refleksiGuru}"
                </p>
              )}
            </div>

            <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-200 text-xs">
              <span className="font-bold text-sky-900 block mb-1">
                Saran & Kolaborasi untuk Orang Tua di Rumah:
              </span>
              {isEditing ? (
                <textarea
                  rows={2}
                  value={formData.saranOrangTua}
                  onChange={(e) => setFormData({ ...formData, saranOrangTua: e.target.value })}
                  className="w-full p-2 bg-white border border-slate-200 rounded-xl text-xs"
                />
              ) : (
                <p className="text-slate-700 leading-relaxed text-[11px]">
                  {formData.saranOrangTua}
                </p>
              )}
            </div>
          </div>

          {/* LEMBAR TANDA TANGAN 3 PIHAK: Ortu, Guru, Kepala Sekolah */}
          <div className="pt-8 border-t border-slate-300 grid grid-cols-3 text-center text-xs font-sans">
            <div>
              <p className="text-slate-600 mb-14">
                Mengetahui,<br />
                Orang Tua / Wali Murid
              </p>
              <p className="font-bold underline text-slate-900">
                ( ......................................... )
              </p>
              <p className="text-[10px] text-slate-500">Tanda Tangan & Nama Terang</p>
            </div>

            <div>
              <p className="text-slate-600 mb-14">
                {formData.tempatTanggalRapor}<br />
                Guru Pamong / Kelas
              </p>
              <p className="font-bold underline text-slate-900">
                {formData.tandaTangan.guruKelas}
              </p>
              <p className="text-[10px] text-slate-500">Guru Kelas {activeStudent.kelompok}</p>
            </div>

            <div>
              <p className="text-slate-600 mb-14">
                Mengetahui,<br />
                Kepala {schoolProfile.namaSekolah}
              </p>
              <p className="font-bold underline text-slate-900">
                {schoolProfile.namaKepalaSekolah}
              </p>
              <p className="text-[10px] text-slate-500">NIP. {schoolProfile.nipKepalaSekolah}</p>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
