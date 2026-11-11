import React, { useState } from 'react';
import { 
  Sparkles, 
  Check, 
  Search, 
  Camera, 
  User, 
  CheckCircle2, 
  Clock, 
  Smile, 
  Image as ImageIcon, 
  AlertCircle,
  Zap,
  Printer
} from 'lucide-react';
import { AssessmentRecord, Student, ClassType, AssessmentRating, RpphItem } from '../types';
import { fireJoyfulConfetti } from '../utils/confetti';

interface AssessmentViewProps {
  students: Student[];
  assessments: AssessmentRecord[];
  rpphList: RpphItem[];
  activeClass: ClassType;
  selectedStudentId?: string;
  onSaveAssessment: (record: AssessmentRecord) => void;
  onBatchSaveAssessments: (records: AssessmentRecord[]) => void;
}

export const AssessmentView: React.FC<AssessmentViewProps> = ({
  students,
  assessments,
  rpphList,
  activeClass,
  selectedStudentId,
  onSaveAssessment,
  onBatchSaveAssessments
}) => {
  const classStudents = students.filter(s => s.kelompok === activeClass);
  
  // Selected child
  const [activeStudentId, setActiveStudentId] = useState<string>(
    selectedStudentId || classStudents[0]?.id || ''
  );
  const activeStudent = students.find(s => s.id === activeStudentId) || classStudents[0];

  // Mode: 'single' (detail 1 anak) vs 'quick' (asesmen cepat 1 kelas)
  const [viewMode, setViewMode] = useState<'single' | 'quick'>('single');

  // Form state for single student
  const [tanggal, setTanggal] = useState<string>(new Date().toISOString().split('T')[0]);
  const [kegiatanNama, setKegiatanNama] = useState<string>('Sentra Balok Kandang Kucing & Topeng Wajah');
  
  // 6 Aspect ratings
  const [ratings, setRatings] = useState<AssessmentRecord['ratings']>({
    agamaBudiPekerti: 'BSH',
    jatiDiri: 'BSH',
    literasiSteam: 'BSB',
    motorik: 'BSH',
    sosialEmosional: 'BSH',
    bahasa: 'BSB'
  });

  const [catatanAnekdot, setCatatanAnekdot] = useState<string>('');
  const [namaKarya, setNamaKarya] = useState<string>('');
  const [fotoKarya, setFotoKarya] = useState<string>('');
  const [deskripsiKarya, setDeskripsiKarya] = useState<string>('');
  const [analisisCapaian, setAnalisisCapaian] = useState<string>('');

  // Sample artwork presets for preschool teachers to pick easily
  const SAMPLE_ARTWORKS = [
    {
      nama: 'Topeng Kucing Kuning Ceria',
      url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80',
      deskripsi: 'Piring kertas diwarnai spons kuning rapi dengan 3 kumis benang wol di kanan-kiri simetris.',
      analisis: 'Koordinasi motorik halus dan ketelitian menempel sangat baik.'
    },
    {
      nama: 'Menara Balok Kayu 6 Tingkat',
      url: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=400&q=80',
      deskripsi: 'Balok persegi panjang disusun vertikal seimbang dengan gerbang masuk kandang.',
      analisis: 'Konsep keseimbangan gravitasi dan spasial STEAM sangat menonjol.'
    },
    {
      nama: 'Kolase Sayap Kupu-kupu Daun Kering',
      url: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80',
      deskripsi: 'Daun nangka kering digunting membentuk pola sayap kupu-kupu yang rapi.',
      analisis: 'Apresiasi seni visual dan pemanfaatan bahan alam loose parts.'
    },
    {
      nama: 'Ikan Playdough Plastisin Berwarna',
      url: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=400&q=80',
      deskripsi: 'Plastisin dibulatkan dan dipipihkan dengan telapak tangan membentuk badan ikan.',
      analisis: 'Kekuatan genggaman jari dan eksplorasi tekstur kenyal plastisin.'
    }
  ];

  // Load existing assessment for activeStudent if any
  React.useEffect(() => {
    if (activeStudent) {
      const existing = assessments.find(a => a.studentId === activeStudent.id && a.tanggal === tanggal);
      if (existing) {
        setRatings(existing.ratings);
        setCatatanAnekdot(existing.catatanAnekdot);
        setKegiatanNama(existing.kegiatanNama);
        if (existing.hasilKarya) {
          setNamaKarya(existing.hasilKarya.namaKarya);
          setFotoKarya(existing.hasilKarya.fotoUrl);
          setDeskripsiKarya(existing.hasilKarya.deskripsi);
          setAnalisisCapaian(existing.hasilKarya.analisisCapaian);
        }
      } else {
        // Default clean state
        setRatings({
          agamaBudiPekerti: 'BSH',
          jatiDiri: 'BSH',
          literasiSteam: 'BSB',
          motorik: 'BSH',
          sosialEmosional: 'BSH',
          bahasa: 'BSB'
        });
        setCatatanAnekdot(`Saat kegiatan ${kegiatanNama}, ${activeStudent.namaPanggilan} terlihat antusias, mandiri memilih bahan bermain, dan mampu menyelesaikan tugas dengan gembira.`);
        setNamaKarya('');
        setFotoKarya('');
        setDeskripsiKarya('');
        setAnalisisCapaian('');
      }
    }
  }, [activeStudentId, tanggal]);

  const handleSaveSingle = () => {
    if (!activeStudent) return;

    const newRecord: AssessmentRecord = {
      id: `asm-${activeStudent.id}-${Date.now()}`,
      studentId: activeStudent.id,
      kelompok: activeClass,
      tanggal,
      kegiatanNama,
      ratings,
      catatanAnekdot: catatanAnekdot || `Ananda ${activeStudent.namaPanggilan} mengikuti kegiatan sentra dengan tertib dan ceria.`,
      hasilKarya: fotoKarya || namaKarya ? {
        namaKarya: namaKarya || 'Karya Seni Bermain',
        fotoUrl: fotoKarya || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80',
        deskripsi: deskripsiKarya || 'Karya dibuat dengan mandiri',
        analisisCapaian: analisisCapaian || 'Berkembang Sesuai Harapan'
      } : undefined
    };

    onSaveAssessment(newRecord);
    fireJoyfulConfetti();
  };

  // Quick assessment matrix state: studentId -> aspect -> rating
  const [quickRatings, setQuickRatings] = useState<Record<string, AssessmentRecord['ratings']>>(() => {
    const init: Record<string, AssessmentRecord['ratings']> = {};
    classStudents.forEach(s => {
      const exist = assessments.find(a => a.studentId === s.id);
      init[s.id] = exist ? { ...exist.ratings } : {
        agamaBudiPekerti: 'BSH',
        jatiDiri: 'BSH',
        literasiSteam: 'BSH',
        motorik: 'BSH',
        sosialEmosional: 'BSH',
        bahasa: 'BSH'
      };
    });
    return init;
  });

  const handleSaveQuickClass = () => {
    const newRecords: AssessmentRecord[] = classStudents.map(student => {
      const studentRates = quickRatings[student.id] || {
        agamaBudiPekerti: 'BSH',
        jatiDiri: 'BSH',
        literasiSteam: 'BSH',
        motorik: 'BSH',
        sosialEmosional: 'BSH',
        bahasa: 'BSH'
      };
      return {
        id: `asm-quick-${student.id}-${Date.now()}`,
        studentId: student.id,
        kelompok: activeClass,
        tanggal,
        kegiatanNama,
        ratings: studentRates,
        catatanAnekdot: `Penilaian berkala kelas ${activeClass} pada kegiatan ${kegiatanNama}. Ananda ${student.namaPanggilan} menunjukkan keterlibatan aktif.`
      };
    });

    onBatchSaveAssessments(newRecords);
    fireJoyfulConfetti();
    alert(`Berhasil menyimpan asesmen cepat untuk seluruh siswa Kelas ${activeClass}! 🎉`);
  };

  const RATING_DESCRIPTIONS = {
    BB: { label: 'BB', title: 'Belum Berkembang', color: 'bg-rose-100 text-rose-800 border-rose-300' },
    MB: { label: 'MB', title: 'Mulai Berkembang', color: 'bg-amber-100 text-amber-900 border-amber-300' },
    BSH: { label: 'BSH', title: 'Berkembang Sesuai Harapan', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
    BSB: { label: 'BSB', title: 'Berkembang Sangat Baik', color: 'bg-sky-100 text-sky-800 border-sky-300' },
  };

  const ASPEK_LIST: { key: keyof AssessmentRecord['ratings']; label: string; desc: string }[] = [
    { key: 'agamaBudiPekerti', label: '1. Nilai Agama & Budi Pekerti', desc: 'Doa, adab sopan santun, menyayangi ciptaan Tuhan' },
    { key: 'jatiDiri', label: '2. Jati Diri', desc: 'Kemandirian, percaya diri, kebersihan diri, regulasi emosi' },
    { key: 'literasiSteam', label: '3. Literasi & STEAM', desc: 'Membilang, nalar kritis, pola balok, sains & loose parts' },
    { key: 'motorik', label: '4. Keterampilan Motorik', desc: 'Motorik kasar (melompat, seimbang) & halus (gunting, meronce)' },
    { key: 'sosialEmosional', label: '5. Sosial Emosional', desc: 'Berbagi alat main, mengantre giliran, empati pada teman' },
    { key: 'bahasa', label: '6. Kemampuan Bahasa', desc: 'Berbicara runtut, menjawab pertanyaan, menyimak cerita' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-3xl border border-sky-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-400 via-blue-500 to-indigo-500 text-white flex items-center justify-center text-2xl shadow-sm shadow-sky-200">
            ⭐
          </div>
          <div>
            <h1 className="font-display font-extrabold text-xl text-slate-800">
              Asesmen & Penilaian Autentik Anak (PAUD Merdeka)
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Ceklis 6 aspek capaian, catatan anekdot perilaku, dan dokumentasi foto hasil karya anak
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Mode switch */}
          <div className="flex items-center bg-slate-100 p-1 rounded-full border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setViewMode('single')}
              className={`px-3.5 py-1.5 rounded-full transition-all ${
                viewMode === 'single'
                  ? 'bg-sky-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              👤 Nilai 1 Anak Detail
            </button>
            <button
              onClick={() => setViewMode('quick')}
              className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1 ${
                viewMode === 'quick'
                  ? 'bg-amber-400 text-amber-950 shadow-2xs font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>⚡ Asesmen Cepat 1 Kelas</span>
            </button>
          </div>
        </div>
      </div>

      {/* MODE 1: SINGLE STUDENT DETAILED ASSESSMENT */}
      {viewMode === 'single' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Left Column: Children list */}
          <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 px-2">
              <span className="font-display font-bold text-xs text-slate-700 uppercase tracking-wider">
                Daftar Anak Kelas {activeClass}
              </span>
              <span className="text-[11px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">
                {classStudents.length} Siswa
              </span>
            </div>

            <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
              {classStudents.map((child) => {
                const isSelected = child.id === activeStudent?.id;
                const childAssessments = assessments.filter(a => a.studentId === child.id);
                const hasAssessed = childAssessments.length > 0;

                return (
                  <button
                    key={child.id}
                    onClick={() => setActiveStudentId(child.id)}
                    className={`w-full p-2.5 rounded-2xl text-left flex items-center justify-between gap-2.5 transition-all ${
                      isSelected
                        ? 'bg-sky-500 text-white shadow-md shadow-sky-200 font-bold scale-[1.01]'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={child.fotoUrl}
                        alt={child.namaLengkap}
                        className="w-8 h-8 rounded-full bg-white border border-slate-200 p-0.5 object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-bold truncate">
                          {child.namaPanggilan}
                        </div>
                        <div className={`text-[10px] truncate ${isSelected ? 'text-sky-100' : 'text-slate-400'}`}>
                          {child.namaLengkap}
                        </div>
                      </div>
                    </div>

                    {hasAssessed ? (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        ✓ {childAssessments.length}
                      </span>
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" title="Belum dinilai" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column (3 Cols): Assessment Form for Active Child */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Student Identity Card */}
            <div className="bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600 rounded-3xl p-5 text-white shadow-md flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3.5">
                <img
                  src={activeStudent?.fotoUrl}
                  alt={activeStudent?.namaLengkap}
                  className="w-14 h-14 rounded-full bg-white p-1 border-2 border-white/60 object-cover shadow-sm"
                />
                <div>
                  <h2 className="font-display font-extrabold text-lg tracking-tight">
                    {activeStudent?.namaLengkap} ({activeStudent?.namaPanggilan})
                  </h2>
                  <div className="text-xs text-sky-100 flex items-center gap-2 mt-0.5">
                    <span>NISN: {activeStudent?.nisn}</span>
                    <span>•</span>
                    <span>Kelompok {activeStudent?.kelompok}</span>
                    <span>•</span>
                    <span>{activeStudent?.tempatTanggalLahir}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={tanggal}
                  onChange={(e) => setTanggal(e.target.value)}
                  className="px-3 py-1.5 bg-white/20 text-white rounded-xl text-xs font-bold border border-white/30 focus:outline-hidden"
                />
              </div>
            </div>

            {/* Assessment Input Sheet */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-6">
              
              {/* Context activity */}
              <div>
                <label className="block font-display font-bold text-xs uppercase tracking-wider text-slate-700 mb-1">
                  Kegiatan Main yang Diamati:
                </label>
                <input
                  type="text"
                  value={kegiatanNama}
                  onChange={(e) => setKegiatanNama(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-sky-400 focus:outline-hidden"
                />
              </div>

              {/* SECTION 1: CHECKLIST 6 ASPEK PERKEMBANGAN PAUD */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-display font-bold text-sm text-slate-800">
                    A. Skala Capaian Perkembangan 6 Aspek PAUD
                  </h3>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold">
                    <span className="text-rose-600">BB = Belum</span>
                    <span className="text-amber-600">MB = Mulai</span>
                    <span className="text-emerald-600">BSH = Sesuai</span>
                    <span className="text-sky-600">BSB = Sangat Baik</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {ASPEK_LIST.map((asp) => {
                    const currentRating = ratings[asp.key];

                    return (
                      <div 
                        key={asp.key}
                        className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
                      >
                        <div className="min-w-0">
                          <span className="font-bold text-slate-800 block text-xs">
                            {asp.label}
                          </span>
                          <span className="text-[11px] text-slate-500">
                            {asp.desc}
                          </span>
                        </div>

                        {/* 4 Rating Buttons */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          {(['BB', 'MB', 'BSH', 'BSB'] as AssessmentRating[]).map((r) => {
                            const isSelected = currentRating === r;
                            const meta = RATING_DESCRIPTIONS[r];

                            return (
                              <button
                                key={r}
                                type="button"
                                onClick={() => setRatings({ ...ratings, [asp.key]: r })}
                                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all border ${
                                  isSelected
                                    ? r === 'BSB' 
                                      ? 'bg-sky-500 text-white border-sky-500 shadow-xs font-extrabold scale-105'
                                      : r === 'BSH'
                                      ? 'bg-emerald-500 text-white border-emerald-500 shadow-xs font-extrabold scale-105'
                                      : r === 'MB'
                                      ? 'bg-amber-400 text-amber-950 border-amber-400 shadow-xs font-extrabold scale-105'
                                      : 'bg-rose-500 text-white border-rose-500 shadow-xs font-extrabold scale-105'
                                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                                }`}
                                title={meta.title}
                              >
                                {r}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 2: CATATAN ANEKDOT */}
              <div className="space-y-2 pt-2">
                <h3 className="font-display font-bold text-sm text-slate-800 flex items-center gap-2">
                  <span>📖</span>
                  <span>B. Catatan Anekdot Harian (Perilaku Unik & Otentik)</span>
                </h3>
                <p className="text-[11px] text-slate-500">
                  Tuliskan interaksi nyata anak, ucapan/dialog menarik, atau respon emosi saat menyelesaikan tantangan main.
                </p>
                <textarea
                  rows={3}
                  value={catatanAnekdot}
                  onChange={(e) => setCatatanAnekdot(e.target.value)}
                  placeholder="Contoh: Saat bermain peran dokter hewan, Rayyan berinisiatif menenangkan boneka kucing yang menangis sambil berbisik: Jangan takut ya meong, ini obatnya manis..."
                  className="w-full p-3.5 border border-slate-200 rounded-2xl text-xs leading-relaxed focus:ring-2 focus:ring-sky-400 focus:outline-hidden"
                />
              </div>

              {/* SECTION 3: HASIL KARYA ANAK */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-sm text-slate-800 flex items-center gap-2">
                    <span>🖼️</span>
                    <span>C. Penilaian Hasil Karya Anak</span>
                  </h3>
                  <span className="text-[10px] text-slate-400 font-semibold">
                    Opsional jika ada produk seni/balok
                  </span>
                </div>

                {/* Quick preset artwork selector */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
                    Contoh Karya:
                  </span>
                  {SAMPLE_ARTWORKS.map((sample, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setNamaKarya(sample.nama);
                        setFotoKarya(sample.url);
                        setDeskripsiKarya(sample.deskripsi);
                        setAnalisisCapaian(sample.analisis);
                      }}
                      className="px-3 py-1 rounded-full bg-slate-100 hover:bg-sky-50 hover:text-sky-700 text-slate-700 text-[11px] font-semibold border border-slate-200 whitespace-nowrap shrink-0 transition-all"
                    >
                      + {sample.nama}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 text-xs mb-1">Nama Hasil Karya</label>
                    <input
                      type="text"
                      placeholder="Contoh: Topeng Wajah Kucing Kuning"
                      value={namaKarya}
                      onChange={(e) => setNamaKarya(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                    />

                    <label className="block font-semibold text-slate-700 text-xs mt-2.5 mb-1">URL Foto Karya / Dokumentasi</label>
                    <input
                      type="text"
                      placeholder="https://..."
                      value={fotoKarya}
                      onChange={(e) => setFotoKarya(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                    />

                    <label className="block font-semibold text-slate-700 text-xs mt-2.5 mb-1">Deskripsi Hasil Karya</label>
                    <textarea
                      rows={2}
                      placeholder="Apa yang dibuat anak, warna yang dipilih..."
                      value={deskripsiKarya}
                      onChange={(e) => setDeskripsiKarya(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 text-xs mb-1">Pratinjau Foto Karya</label>
                    <div className="h-40 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center relative">
                      {fotoKarya ? (
                        <img
                          src={fotoKarya}
                          alt="Hasil Karya"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center text-slate-400 p-4">
                          <ImageIcon className="w-8 h-8 mx-auto mb-1 opacity-50" />
                          <span className="text-[11px]">Belum ada foto karya terpilih</span>
                        </div>
                      )}
                    </div>

                    <label className="block font-semibold text-slate-700 text-xs mt-2.5 mb-1">Analisis Capaian Guru</label>
                    <input
                      type="text"
                      placeholder="Contoh: Koordinasi motorik halus berkembang sangat baik"
                      value={analisisCapaian}
                      onChange={(e) => setAnalisisCapaian(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveSingle}
                  className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-200 flex items-center gap-2 transition-transform hover:scale-105"
                >
                  <Check className="w-4 h-4" />
                  <span>Simpan Asesmen {activeStudent?.namaPanggilan} 🎉</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* MODE 2: QUICK ASSESSMENT 1 CLASS (5 MINUTES) */}
      {viewMode === 'quick' && (
        <div className="bg-white rounded-3xl p-6 border border-amber-200/80 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">⚡</span>
                <h2 className="font-display font-extrabold text-base text-slate-800">
                  Asesmen Cepat Satu Kelas (5 Menit Selesai)
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Klik tombol nilai (BB, MB, BSH, BSB) pada baris masing-masing anak, lalu simpan sekaligus dalam 1 klik!
              </p>
            </div>

            <button
              onClick={handleSaveQuickClass}
              className="px-6 py-2.5 rounded-full bg-amber-400 hover:bg-amber-500 text-amber-950 font-extrabold text-xs shadow-md flex items-center gap-2 transition-transform hover:scale-105 shrink-0"
            >
              <Check className="w-4 h-4" />
              <span>Simpan Asesmen Cepat 1 Kelas 🎉</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-amber-50/70 border-b border-amber-100 text-amber-950 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-3 w-40">Siswa</th>
                  <th className="py-3 px-3 text-center">1. Agama & Moral</th>
                  <th className="py-3 px-3 text-center">2. Jati Diri</th>
                  <th className="py-3 px-3 text-center">3. STEAM</th>
                  <th className="py-3 px-3 text-center">4. Motorik</th>
                  <th className="py-3 px-3 text-center">5. Sosial Emosional</th>
                  <th className="py-3 px-3 text-center">6. Bahasa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {classStudents.map((child) => {
                  const currentRates = quickRatings[child.id] || {
                    agamaBudiPekerti: 'BSH',
                    jatiDiri: 'BSH',
                    literasiSteam: 'BSH',
                    motorik: 'BSH',
                    sosialEmosional: 'BSH',
                    bahasa: 'BSH'
                  };

                  return (
                    <tr key={child.id} className="hover:bg-amber-50/30 transition-colors">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <img
                            src={child.fotoUrl}
                            alt={child.namaPanggilan}
                            className="w-7 h-7 rounded-full bg-white border border-slate-200 object-cover"
                          />
                          <div>
                            <span className="font-bold text-slate-800 block">{child.namaPanggilan}</span>
                            <span className="text-[10px] text-slate-400 truncate max-w-[120px] block">{child.namaLengkap}</span>
                          </div>
                        </div>
                      </td>

                      {/* 6 Aspects */}
                      {ASPEK_LIST.map((asp) => {
                        const val = currentRates[asp.key];

                        return (
                          <td key={asp.key} className="py-3 px-2 text-center">
                            <div className="inline-flex rounded-lg p-0.5 bg-slate-100 border border-slate-200">
                              {(['MB', 'BSH', 'BSB'] as AssessmentRating[]).map((r) => {
                                const isSel = val === r;
                                return (
                                  <button
                                    key={r}
                                    type="button"
                                    onClick={() => {
                                      setQuickRatings({
                                        ...quickRatings,
                                        [child.id]: {
                                          ...currentRates,
                                          [asp.key]: r
                                        }
                                      });
                                    }}
                                    className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                                      isSel
                                        ? r === 'BSB'
                                          ? 'bg-sky-500 text-white font-extrabold shadow-2xs'
                                          : r === 'BSH'
                                          ? 'bg-emerald-500 text-white font-extrabold shadow-2xs'
                                          : 'bg-amber-400 text-amber-950 font-extrabold shadow-2xs'
                                        : 'text-slate-600 hover:text-slate-900'
                                    }`}
                                  >
                                    {r}
                                  </button>
                                );
                              })}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
