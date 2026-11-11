import React from 'react';
import { 
  Sparkles, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  BookOpen, 
  Smile, 
  Clock, 
  Award,
  ChevronRight
} from 'lucide-react';
import { RpphItem, Student, AssessmentRecord, RppmItem } from '../types';
import { ActiveTabType } from '../components/Sidebar';

interface DashboardViewProps {
  rpphList: RpphItem[];
  students: Student[];
  assessments: AssessmentRecord[];
  rppmList: RppmItem[];
  activeClass: 'A' | 'B';
  onNavigate: (tab: ActiveTabType) => void;
  onSelectStudentForAssessment: (studentId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  rpphList,
  students,
  assessments,
  rppmList,
  activeClass,
  onNavigate,
  onSelectStudentForAssessment,
}) => {
  // Filter by active class
  const classStudents = students.filter(s => s.kelompok === activeClass);
  const classAssessments = assessments.filter(a => a.kelompok === activeClass);
  const classRpph = rpphList.filter(r => r.kelompok === activeClass);

  // Stats calculation
  const totalRpphMonth = classRpph.length;
  const totalAssessed = new Set(classAssessments.map(a => a.studentId)).size;
  const unassessedStudents = classStudents.filter(
    s => !classAssessments.some(a => a.studentId === s.id)
  );

  const currentRppm = rppmList[0] || {
    tema: 'Binatang Sahabat Kita',
    subTema: 'Binatang Peliharaan',
    topik: 'Kucing Manisku',
    mingguKe: 6,
    rentangTanggal: '12 - 16 Oktober 2026'
  };

  const latestRpph = classRpph[0];

  return (
    <div className="space-y-6">
      
      {/* Top Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 rounded-3xl p-6 lg:p-8 text-white shadow-xl shadow-emerald-100">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold mb-3 border border-white/20">
            <span>✨</span>
            <span>Selamat Datang Guru Hebat PAUD</span>
          </div>
          <h1 className="font-display font-extrabold text-2xl lg:text-3xl tracking-tight leading-tight mb-2">
            Administrasi Ceria, Mengajar Lebih Bermakna!
          </h1>
          <p className="text-emerald-50 text-xs lg:text-sm leading-relaxed mb-5">
            Semua dokumen Kurikulum Merdeka PAUD: PROTA, PROMES, RPPM, RPPH sentra bermain, dan Raport Narasi otomatis tersinkronisasi rapi.
          </p>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => onNavigate('rpph')}
              className="px-5 py-2.5 rounded-full bg-white text-emerald-800 font-extrabold text-xs shadow-md hover:bg-amber-100 transition-all hover:scale-105 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Buat RPPH Hari Ini</span>
            </button>
            <button
              onClick={() => onNavigate('asesmen')}
              className="px-5 py-2.5 rounded-full bg-emerald-700/80 hover:bg-emerald-700 text-white font-bold text-xs border border-white/20 transition-all flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-amber-300" />
              <span>Asesmen Cepat 1 Kelas</span>
            </button>
            <button
              onClick={() => onNavigate('raport')}
              className="px-4 py-2.5 rounded-full bg-sky-600/80 hover:bg-sky-600 text-white font-bold text-xs border border-white/20 transition-all flex items-center gap-1.5"
            >
              <span>📜 Cetak Raport Narasi</span>
            </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute right-4 -bottom-6 text-8xl opacity-20 pointer-events-none select-none">
          🎨
        </div>
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        
        {/* Card 1: RPPH Bulan Ini */}
        <div className="bg-white p-4 lg:p-5 rounded-3xl border border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl">
              📝
            </span>
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              Kelas {activeClass}
            </span>
          </div>
          <div className="font-display font-extrabold text-2xl lg:text-3xl text-slate-800">
            {totalRpphMonth}
          </div>
          <div className="text-xs font-semibold text-slate-500 mt-0.5">
            RPPH Siap Pakai
          </div>
        </div>

        {/* Card 2: Total Asesmen */}
        <div className="bg-white p-4 lg:p-5 rounded-3xl border border-sky-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center text-xl">
              ⭐
            </span>
            <span className="text-[11px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">
              Aspek PAUD
            </span>
          </div>
          <div className="font-display font-extrabold text-2xl lg:text-3xl text-slate-800">
            {classAssessments.length}
          </div>
          <div className="text-xs font-semibold text-slate-500 mt-0.5">
            Catatan Penilaian Siswa
          </div>
        </div>

        {/* Card 3: Anak Belum Dinilai */}
        <div className="bg-white p-4 lg:p-5 rounded-3xl border border-amber-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-xl">
              👀
            </span>
            <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
              Perhatian
            </span>
          </div>
          <div className="font-display font-extrabold text-2xl lg:text-3xl text-amber-600">
            {unassessedStudents.length} Anak
          </div>
          <div className="text-xs font-semibold text-slate-500 mt-0.5">
            Belum Dinilai Pekan Ini
          </div>
        </div>

        {/* Card 4: Tema Minggu Ini */}
        <div className="bg-white p-4 lg:p-5 rounded-3xl border border-rose-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center text-xl">
              🐾
            </span>
            <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full">
              Minggu ke-{currentRppm.mingguKe}
            </span>
          </div>
          <div className="font-display font-bold text-base text-slate-800 truncate" title={currentRppm.tema}>
            {currentRppm.tema}
          </div>
          <div className="text-[11px] font-semibold text-slate-500 truncate">
            Sub: {currentRppm.subTema}
          </div>
        </div>

      </div>

      {/* 2-Column Split: Progress Asesmen Siswa + Tema & Kegiatan Hari Ini */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2 Cols): Student Assessment Progress & Attention List */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Card: Student Assessment Progress */}
          <div className="bg-white rounded-3xl p-5 lg:p-6 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  📊
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-slate-800">
                    Progress Penilaian Siswa Kelas {activeClass}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Capaian asesmen harian (Ceklis, Anekdot & Portofolio Hasil Karya)
                  </p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('asesmen')}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 group"
              >
                <span>Buka Asesmen</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            <div className="divide-y divide-slate-100 mt-2">
              {classStudents.map((student) => {
                const studentAss = classAssessments.filter(a => a.studentId === student.id);
                const hasAssessed = studentAss.length > 0;
                const latest = studentAss[0];

                return (
                  <div key={student.id} className="py-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={student.fotoUrl}
                        alt={student.namaLengkap}
                        className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 p-0.5 object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="font-bold text-xs text-slate-800 truncate">
                          {student.namaLengkap}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Panggilan: <span className="font-semibold text-slate-700">{student.namaPanggilan}</span> • NISN: {student.nisn}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {hasAssessed ? (
                        <div className="text-right">
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{studentAss.length} Asesmen</span>
                          </span>
                          <div className="text-[10px] text-slate-400 mt-0.5">
                            Terakhir: {latest?.tanggal}
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => onSelectStudentForAssessment(student.id)}
                          className="px-3 py-1 rounded-full bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-xs shadow-xs transition-transform hover:scale-105 flex items-center gap-1"
                        >
                          <span>+ Beri Nilai</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Children Needing Attention Alert */}
          {unassessedStudents.length > 0 && (
            <div className="bg-amber-50/80 border border-amber-200 rounded-3xl p-5 flex items-start gap-3.5">
              <div className="p-2 bg-amber-100 text-amber-800 rounded-2xl shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-display font-bold text-sm text-amber-900">
                  {unassessedStudents.length} Siswa Belum Dinilai Minggu Ini
                </h4>
                <p className="text-xs text-amber-800/90 mt-0.5 leading-relaxed">
                  Kurikulum Merdeka menganjurkan asesmen autentik berkala. Klik tombol berikut untuk mengisikan pengamatan anekdot atau ceklis kegiatan:
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {unassessedStudents.map(child => (
                    <button
                      key={child.id}
                      onClick={() => onSelectStudentForAssessment(child.id)}
                      className="px-3 py-1 rounded-full bg-white hover:bg-amber-100 text-amber-900 font-bold text-[11px] border border-amber-300 shadow-2xs transition-all"
                    >
                      ⭐ Nilai {child.namaPanggilan}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Theme & Activities Today + Fast Link to RPPH */}
        <div className="space-y-6">
          
          {/* Card: Tema & Kegiatan Minggu Ini */}
          <div className="bg-gradient-to-br from-white to-amber-50/40 rounded-3xl p-5 border border-amber-200/80 shadow-xs">
            <div className="flex items-center gap-2 pb-3 border-b border-amber-200/50 mb-3">
              <span className="text-xl">📅</span>
              <div>
                <h3 className="font-display font-bold text-sm text-slate-800">
                  Tema & Agenda Minggu Ini
                </h3>
                <span className="text-[11px] text-slate-500 font-medium">
                  {currentRppm.rentangTanggal}
                </span>
              </div>
            </div>

            <div className="bg-amber-100/60 p-3.5 rounded-2xl border border-amber-200/60 mb-3">
              <div className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
                Tema / Topik Utama:
              </div>
              <div className="font-display font-bold text-base text-slate-800">
                {currentRppm.tema}
              </div>
              <div className="text-xs font-semibold text-emerald-700 mt-0.5">
                Topik: {currentRppm.topik}
              </div>
            </div>

            {/* List 4 Centers / Play Areas from latest RPPH */}
            <div className="space-y-2">
              <div className="text-[11px] font-bold text-slate-600">
                Rencana 4 Kegiatan Main Anak:
              </div>
              {latestRpph?.kegiatanInti ? (
                latestRpph.kegiatanInti.map((act, idx) => (
                  <div 
                    key={act.id} 
                    className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800 truncate">
                        {idx + 1}. {act.nama}
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full shrink-0 ml-1">
                        {act.area}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 truncate mt-0.5">
                      Bahan: {act.alatBahan}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-xs text-slate-400 italic py-2">
                  Belum ada RPPH aktif hari ini.
                </div>
              )}
            </div>

            <button
              onClick={() => onNavigate('rpph')}
              className="w-full mt-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm shadow-emerald-200 flex items-center justify-center gap-1.5 transition-all"
            >
              <span>Buka Modul RPPH Lengkap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Bank Idea Widget */}
          <div className="bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-sky-500/10 p-5 rounded-3xl border border-pink-200/60 shadow-xs">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">💡</span>
              <h4 className="font-display font-bold text-sm text-slate-800">
                Inspirasi Sentra Bermain
              </h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              Bingung mencari ide kegiatan bermain peran, sensorimotor, atau balok? Ada 100+ ide terkurasi di Bank Kegiatan!
            </p>
            <button
              onClick={() => onNavigate('bank-kegiatan')}
              className="w-full py-2 rounded-full bg-white hover:bg-pink-50 text-pink-700 font-bold text-xs border border-pink-300 shadow-2xs transition-all flex items-center justify-center gap-1"
            >
              <span>Jelajahi 100+ Bank Kegiatan</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
