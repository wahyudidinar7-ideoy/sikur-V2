import React, { useState } from 'react';
import { 
  Sparkles, 
  Printer, 
  Plus, 
  Trash2, 
  Copy, 
  Check, 
  Calendar, 
  BookOpen, 
  Smile, 
  Wand2, 
  Layers, 
  Edit3,
  Clock,
  ArrowRight,
  Info
} from 'lucide-react';
import { RpphItem, ActivityStep, PlayAreaType, SchoolProfile, ClassType, SemesterType, BankActivityItem } from '../types';
import { generateAutoRpph } from '../utils/aiGenerator';
import { fireJoyfulConfetti } from '../utils/confetti';

interface RpphViewProps {
  rpphList: RpphItem[];
  schoolProfile: SchoolProfile;
  activeClass: ClassType;
  bankActivities: BankActivityItem[];
  onSaveRpphList: (list: RpphItem[]) => void;
  onNavigateToBank: () => void;
}

export const RpphView: React.FC<RpphViewProps> = ({
  rpphList,
  schoolProfile,
  activeClass,
  bankActivities,
  onSaveRpphList,
  onNavigateToBank
}) => {
  // Filter RPPH by active class
  const classRpphList = rpphList.filter(r => r.kelompok === activeClass);
  const [selectedRpphId, setSelectedRpphId] = useState<string>(classRpphList[0]?.id || rpphList[0]?.id || '');

  const activeRpph = rpphList.find(r => r.id === selectedRpphId) || classRpphList[0] || rpphList[0];

  const [formData, setFormData] = useState<RpphItem>(activeRpph);
  const [isEditing, setIsEditing] = useState(false);
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  // AI Modal State
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiTheme, setAiTheme] = useState('Binatang Sahabat Kita');
  const [aiSubTheme, setAiSubTheme] = useState('Kucing Peliharaan Lucu');
  const [aiSubSubTheme, setAiSubSubTheme] = useState('Mengenal Anggota Tubuh & Perilaku Kucing');

  // Bank Picker Modal State
  const [showBankPicker, setShowBankPicker] = useState(false);

  // Sync form when active selection changes
  React.useEffect(() => {
    if (activeRpph) {
      setFormData(activeRpph);
      setIsEditing(false);
    }
  }, [selectedRpphId, rpphList]);

  const handleSave = () => {
    const exists = rpphList.some(r => r.id === formData.id);
    let updated: RpphItem[];
    if (exists) {
      updated = rpphList.map(item => item.id === formData.id ? formData : item);
    } else {
      updated = [formData, ...rpphList];
    }
    onSaveRpphList(updated);
    setIsEditing(false);
    fireJoyfulConfetti();
  };

  const handleDuplicateYesterday = () => {
    if (!activeRpph) return;
    const duplicated: RpphItem = {
      ...activeRpph,
      id: `rpph-dup-${Date.now()}`,
      hari: 'Selasa',
      tanggal: new Date().toISOString().split('T')[0],
      subSubTema: `${activeRpph.subSubTema} (Lanjutan Eksplorasi)`,
      catatanGuru: 'Duplikasi dari pembelajaran sebelumnya dengan pendalaman konsep.'
    };
    onSaveRpphList([duplicated, ...rpphList]);
    setSelectedRpphId(duplicated.id);
    fireJoyfulConfetti();
  };

  const handleRunAiHelper = async () => {
    setIsAiGenerating(true);
    try {
      const generated = await generateAutoRpph({
        kelompok: activeClass,
        semester: schoolProfile.semesterAktif,
        mingguKe: activeRpph ? activeRpph.mingguKe : 6,
        hari: 'Senin',
        tanggal: new Date().toISOString().split('T')[0],
        tema: aiTheme,
        subTema: aiSubTheme,
        subSubTema: aiSubSubTheme
      });

      onSaveRpphList([generated, ...rpphList]);
      setSelectedRpphId(generated.id);
      setFormData(generated);
      setShowAiModal(false);
      fireJoyfulConfetti();
    } catch (e) {
      console.error(e);
      alert('Gagal membuat RPPH otomatis.');
    } finally {
      setIsAiGenerating(false);
    }
  };

  const handleAddActivityStep = (activityFromBank?: BankActivityItem) => {
    const newStep: ActivityStep = activityFromBank ? {
      id: `act-${Date.now()}`,
      nama: activityFromBank.namaKegiatan,
      area: activityFromBank.area,
      alatBahan: activityFromBank.alatBahan,
      langkah: activityFromBank.langkah,
      tujuanTerkait: activityFromBank.tujuan,
      teknikAsesmen: activityFromBank.asesmenTerkait
    } : {
      id: `act-${Date.now()}`,
      nama: 'Kegiatan Main Baru',
      area: 'Main Seni & Kreativitas',
      alatBahan: 'Kertas gambar, cat air, kuas, loose parts',
      langkah: 'Anak bereksplorasi membuat kreasi sesuai imajinasi dan menceritakannya.',
      tujuanTerkait: 'Mengembangkan motorik halus dan daya imajinasi.',
      teknikAsesmen: 'Hasil Karya'
    };

    setFormData({
      ...formData,
      kegiatanInti: [...formData.kegiatanInti, newStep]
    });
    setShowBankPicker(false);
  };

  const handleDeleteActivityStep = (id: string) => {
    setFormData({
      ...formData,
      kegiatanInti: formData.kegiatanInti.filter(a => a.id !== id)
    });
  };

  const handlePrint = () => {
    window.print();
  };

  if (!formData) {
    return (
      <div className="bg-white p-8 rounded-3xl text-center border border-slate-200">
        <p className="text-slate-500 mb-4">Belum ada modul RPPH.</p>
        <button
          onClick={() => setShowAiModal(true)}
          className="px-5 py-2.5 rounded-full bg-emerald-600 text-white font-bold text-xs"
        >
          ✨ Buatkan RPPH Otomatis
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Top Banner (MENU UTAMA) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-3xl border border-rose-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-500 to-orange-400 text-white flex items-center justify-center text-2xl shadow-sm shadow-rose-200">
            🎨
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-extrabold text-xl text-slate-800">
                RPPH (Rencana Pelaksanaan Pembelajaran Harian)
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                Menu Utama Guru
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Satu klik buat modul bermain harian sentra terpadu Kurikulum Merdeka PAUD
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setShowAiModal(true)}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-amber-950 font-extrabold text-xs shadow-sm flex items-center gap-1.5 transition-transform hover:scale-105"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>✨ Buat RPPH Otomatis</span>
          </button>

          <button
            onClick={handleDuplicateYesterday}
            className="px-3.5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-all"
            title="Salin isi RPPH sebelumnya untuk hari berikutnya"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Salin RPPH Kemarin</span>
          </button>

          {isEditing ? (
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-200 flex items-center gap-1.5 transition-transform hover:scale-105"
            >
              <Check className="w-4 h-4" />
              <span>Simpan RPPH</span>
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-all"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Form RPPH</span>
            </button>
          )}

          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-full bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs shadow-sm flex items-center gap-1.5 transition-transform hover:scale-105"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak RPPH</span>
          </button>
        </div>
      </div>

      {/* RPPH List Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-print">
        {rpphList.map((rpph) => (
          <button
            key={rpph.id}
            onClick={() => setSelectedRpphId(rpph.id)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-2 ${
              selectedRpphId === rpph.id
                ? 'bg-rose-500 text-white shadow-xs font-extrabold'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{rpph.hari}, {rpph.tanggal} • {rpph.subSubTema.slice(0, 24)}...</span>
          </button>
        ))}
      </div>

      {/* Main RPPH Printable Sheet */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200/80 shadow-xs print-container space-y-6">
        
        {/* Header Kop RPPH PAUD Resmi */}
        <div className="border-b-2 border-slate-800 pb-3 text-center">
          <h2 className="text-xs uppercase font-bold tracking-widest text-slate-600">
            {schoolProfile.namaSekolah}
          </h2>
          <h1 className="font-display font-extrabold text-base lg:text-lg text-slate-900 uppercase">
            MODUL AJAR / RENCANA PELAKSANAAN PEMBELAJARAN HARIAN (RPPH)
          </h1>
          <p className="text-[11px] text-slate-500 font-medium">
            Kurikulum Merdeka PAUD • Tahun Ajaran {schoolProfile.tahunAjaran} • Semester {formData.semester}
          </p>
        </div>

        {/* Identitas Pembelajaran Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-amber-50/70 p-4 rounded-2xl border border-amber-200/70 text-xs">
          <div>
            <span className="text-slate-500 text-[10px] uppercase font-bold block">Hari & Tanggal</span>
            {isEditing ? (
              <div className="flex gap-1 mt-1">
                <input
                  type="text"
                  value={formData.hari}
                  onChange={(e) => setFormData({ ...formData, hari: e.target.value })}
                  className="w-20 px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs"
                />
                <input
                  type="date"
                  value={formData.tanggal}
                  onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
                  className="flex-1 px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs"
                />
              </div>
            ) : (
              <span className="font-extrabold text-slate-800">{formData.hari}, {formData.tanggal}</span>
            )}
          </div>

          <div>
            <span className="text-slate-500 text-[10px] uppercase font-bold block">Kelompok / Usia</span>
            {isEditing ? (
              <select
                value={formData.kelompok}
                onChange={(e) => setFormData({ ...formData, kelompok: e.target.value as ClassType })}
                className="mt-1 px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs"
              >
                <option value="A">Kelompok A (4-5 Tahun)</option>
                <option value="B">Kelompok B (5-6 Tahun)</option>
              </select>
            ) : (
              <span className="font-extrabold text-slate-800">
                Kelompok {formData.kelompok} ({formData.kelompok === 'A' ? 'Usia 4-5 Tahun' : 'Usia 5-6 Tahun'})
              </span>
            )}
          </div>

          <div>
            <span className="text-slate-500 text-[10px] uppercase font-bold block">Tema & Sub-Tema</span>
            {isEditing ? (
              <div className="space-y-1 mt-1">
                <input
                  type="text"
                  value={formData.tema}
                  onChange={(e) => setFormData({ ...formData, tema: e.target.value })}
                  className="w-full px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs"
                />
                <input
                  type="text"
                  value={formData.subTema}
                  onChange={(e) => setFormData({ ...formData, subTema: e.target.value })}
                  className="w-full px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs"
                />
              </div>
            ) : (
              <span className="font-extrabold text-emerald-800 block">
                {formData.tema} / {formData.subTema}
              </span>
            )}
          </div>

          <div>
            <span className="text-slate-500 text-[10px] uppercase font-bold block">Topik / Sub-sub Tema</span>
            {isEditing ? (
              <input
                type="text"
                value={formData.subSubTema}
                onChange={(e) => setFormData({ ...formData, subSubTema: e.target.value })}
                className="w-full mt-1 px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-orange-800"
              />
            ) : (
              <span className="font-extrabold text-orange-700 block">
                {formData.subSubTema}
              </span>
            )}
          </div>
        </div>

        {/* Tujuan Pembelajaran */}
        <div>
          <h3 className="font-display font-bold text-xs uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
            <span>🎯</span> Tujuan Pembelajaran Harian:
          </h3>
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 text-xs space-y-1 text-slate-700">
            {formData.tujuanPembelajaran.map((tp, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold shrink-0">✓</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={tp}
                    onChange={(e) => {
                      const newTP = [...formData.tujuanPembelajaran];
                      newTP[idx] = e.target.value;
                      setFormData({ ...formData, tujuanPembelajaran: newTP });
                    }}
                    className="flex-1 px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs"
                  />
                ) : (
                  <span>{tp}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 4 STRUKTUR UTAMA RPPH: Pembuka, Inti, Istirahat, Penutup */}
        <div className="space-y-4">
          
          {/* 1. KEGIATAN PEMBUKA */}
          <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/80">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display font-bold text-sm text-amber-950 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-amber-400 text-amber-950 flex items-center justify-center font-bold text-xs">
                  1
                </span>
                <span>Kegiatan Pembuka (Apersepsi & Gerak Fisik)</span>
              </h3>
              <span className="text-[11px] font-bold text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{formData.kegiatanPembuka.waktu}</span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700">
              <div className="space-y-2">
                <div>
                  <span className="font-bold text-slate-800">SOP Penyambutan & Berbaris:</span>
                  <p className="text-slate-600 text-[11px] mt-0.5">{formData.kegiatanPembuka.sopPenyambutan}</p>
                </div>
                <div>
                  <span className="font-bold text-slate-800">Salam & Doa Sebelum Belajar:</span>
                  <p className="text-slate-600 text-[11px] mt-0.5">{formData.kegiatanPembuka.salamDanDoa}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <span className="font-bold text-slate-800">Apersepsi, Kotak Misteri & Literasi:</span>
                  <p className="text-slate-600 text-[11px] mt-0.5">{formData.kegiatanPembuka.apersepsiDanLiterasi}</p>
                </div>
                <div>
                  <span className="font-bold text-slate-800">Gerak Lagu & Fisik Motorik:</span>
                  <p className="text-slate-600 text-[11px] mt-0.5">{formData.kegiatanPembuka.gerakLaguFisik}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 2. KEGIATAN INTI (3-4 SENTRA BERMAIN) */}
          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-display font-bold text-sm text-emerald-950 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-bold text-xs">
                    2
                  </span>
                  <span>Kegiatan Inti (Ragam Main Sentra Bermain PAUD)</span>
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Anak memilih 3-4 aktivitas bermain bermakna sesuai minat dan tahapan perkembangannya.
                </p>
              </div>

              {isEditing && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowBankPicker(true)}
                    className="px-3 py-1.5 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-900 font-bold text-[11px] flex items-center gap-1"
                  >
                    <span>💡 Pilih dari Bank Kegiatan</span>
                  </button>
                  <button
                    onClick={() => handleAddActivityStep()}
                    className="px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Main</span>
                  </button>
                </div>
              )}
            </div>

            {/* List 3-4 Kegiatan Inti */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {formData.kegiatanInti.map((step, idx) => {
                const areaColors: Record<PlayAreaType, string> = {
                  'Main Balok': 'bg-amber-100 text-amber-900 border-amber-300',
                  'Main Peran': 'bg-pink-100 text-pink-900 border-pink-300',
                  'Main Sensorimotor': 'bg-sky-100 text-sky-900 border-sky-300',
                  'Main Seni & Kreativitas': 'bg-purple-100 text-purple-900 border-purple-300',
                  'Literasi & STEAM': 'bg-emerald-100 text-emerald-900 border-emerald-300',
                  'Keaksaraan Awal': 'bg-orange-100 text-orange-900 border-orange-300'
                };

                return (
                  <div
                    key={step.id}
                    className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2 text-xs relative group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="font-display font-extrabold text-sm text-slate-800">
                          {idx + 1}. {step.nama}
                        </span>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${areaColors[step.area] || 'bg-slate-100 text-slate-700'}`}>
                        {step.area}
                      </span>
                    </div>

                    {isEditing ? (
                      <div className="space-y-1.5 pt-1">
                        <input
                          type="text"
                          value={step.nama}
                          onChange={(e) => {
                            const updated = [...formData.kegiatanInti];
                            updated[idx].nama = e.target.value;
                            setFormData({ ...formData, kegiatanInti: updated });
                          }}
                          className="w-full px-2 py-1 border border-slate-200 rounded-lg text-xs"
                          placeholder="Nama Kegiatan"
                        />
                        <input
                          type="text"
                          value={step.alatBahan}
                          onChange={(e) => {
                            const updated = [...formData.kegiatanInti];
                            updated[idx].alatBahan = e.target.value;
                            setFormData({ ...formData, kegiatanInti: updated });
                          }}
                          className="w-full px-2 py-1 border border-slate-200 rounded-lg text-xs"
                          placeholder="Alat & Bahan"
                        />
                        <textarea
                          rows={2}
                          value={step.langkah}
                          onChange={(e) => {
                            const updated = [...formData.kegiatanInti];
                            updated[idx].langkah = e.target.value;
                            setFormData({ ...formData, kegiatanInti: updated });
                          }}
                          className="w-full px-2 py-1 border border-slate-200 rounded-lg text-xs"
                          placeholder="Langkah-langkah Kegiatan"
                        />
                        <button
                          onClick={() => handleDeleteActivityStep(step.id)}
                          className="text-rose-600 hover:text-rose-800 text-[11px] font-bold flex items-center gap-1 mt-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Hapus Kegiatan Ini
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="text-[11px] text-slate-600">
                          <span className="font-bold text-slate-700">📦 Alat & Bahan: </span>
                          <span>{step.alatBahan}</span>
                        </div>
                        <div className="text-[11px] text-slate-600 leading-relaxed">
                          <span className="font-bold text-slate-700">👣 Langkah: </span>
                          <span>{step.langkah}</span>
                        </div>
                        <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[10px] text-slate-500">
                          <span>🎯 {step.tujuanTerkait}</span>
                          <span className="font-bold text-emerald-700">⭐ {step.teknikAsesmen}</span>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. ISTIRAHAT & MAKAN */}
          <div className="p-4 rounded-2xl bg-sky-50/50 border border-sky-200/80">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display font-bold text-sm text-sky-950 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-sky-500 text-white flex items-center justify-center font-bold text-xs">
                  3
                </span>
                <span>Istirahat, Makan Sehat & Bermain Bebas</span>
              </h3>
              <span className="text-[11px] font-bold text-sky-800 bg-sky-100/80 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{formData.istirahatMakan.waktu}</span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-700">
              <div className="bg-white p-2.5 rounded-xl border border-sky-100">
                <span className="font-bold text-sky-900 block mb-0.5">🧼 SOP Cuci Tangan 6 Langkah:</span>
                <p className="text-[11px] text-slate-600">{formData.istirahatMakan.sopCuciTangan}</p>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-sky-100">
                <span className="font-bold text-sky-900 block mb-0.5">🍎 Doa Makan & Bekal Bergizi:</span>
                <p className="text-[11px] text-slate-600">{formData.istirahatMakan.doaMakanDanBekal}</p>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-sky-100">
                <span className="font-bold text-sky-900 block mb-0.5">🤸 Main Bebas Outdoor:</span>
                <p className="text-[11px] text-slate-600">{formData.istirahatMakan.mainBebasMotorik}</p>
              </div>
            </div>
          </div>

          {/* 4. KEGIATAN PENUTUP */}
          <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-200/80">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display font-bold text-sm text-purple-950 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-purple-500 text-white flex items-center justify-center font-bold text-xs">
                  4
                </span>
                <span>Kegiatan Penutup (Recalling, Refleksi & Doa)</span>
              </h3>
              <span className="text-[11px] font-bold text-purple-800 bg-purple-100/80 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{formData.kegiatanPenutup.waktu}</span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700">
              <div className="space-y-1.5">
                <div>
                  <span className="font-bold text-slate-800">Recalling & Refleksi Perasaan:</span>
                  <p className="text-slate-600 text-[11px]">{formData.kegiatanPenutup.recallingDanRefleksi}</p>
                </div>
                <div>
                  <span className="font-bold text-slate-800">Pesan Moral & Karakter Baik:</span>
                  <p className="text-slate-600 text-[11px]">{formData.kegiatanPenutup.pesanKebaikanMoral}</p>
                </div>
              </div>
              <div className="space-y-1.5">
                <div>
                  <span className="font-bold text-slate-800">Doa Pulang & Sop Penjemputan:</span>
                  <p className="text-slate-600 text-[11px]">{formData.kegiatanPenutup.doaPenutupDanSalam}</p>
                </div>
                <div>
                  <span className="font-bold text-slate-800">Info Kegiatan Besok:</span>
                  <p className="text-slate-600 text-[11px]">{formData.kegiatanPenutup.infoKegiatanBesok}</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Media Belajar & Teknik Asesmen */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-800 block mb-1">📚 Media & Sumber Belajar:</span>
            <ul className="list-disc list-inside space-y-0.5 text-slate-600 text-[11px]">
              {formData.mediaSumberBelajar.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-800 block mb-1">⭐ Teknik Asesmen yang Digunakan:</span>
            <ul className="list-disc list-inside space-y-0.5 text-slate-600 text-[11px]">
              {formData.teknikAsesmen.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Catatan Refleksi Guru */}
        {formData.catatanGuru && (
          <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs">
            <span className="font-bold text-amber-900 block mb-0.5">📝 Catatan Evaluasi Guru:</span>
            <p className="text-slate-700 text-[11px] italic">{formData.catatanGuru}</p>
          </div>
        )}

        {/* Lembar Tanda Tangan Resmi */}
        <div className="grid grid-cols-2 text-center text-xs pt-6 border-t border-slate-200">
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
          <div>
            <p className="text-slate-600 mb-14">
              {schoolProfile.kota}, {formData.tanggal}<br />
              Guru Pamong / Kelas {formData.kelompok}
            </p>
            <p className="font-bold underline text-slate-900">
              {formData.kelompok === 'A' ? 'Siti Nurhaliza, S.Pd' : 'Dewi Anggraeni, S.Pd'}
            </p>
            <p className="text-[10px] text-slate-500">Guru Kelas PAUD</p>
          </div>
        </div>

      </div>

      {/* AI Generator Helper Modal */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-amber-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-2xl">✨</span>
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-800">
                    AI Helper: Buat RPPH Otomatis
                  </h3>
                  <span className="text-xs text-slate-500">
                    Sistem menyusun 4 kegiatan main terpadu instan tanpa mengetik ulang
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowAiModal(false)}
                className="w-8 h-8 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3.5 my-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Pilih / Ketik Tema Besar
                </label>
                <div className="flex gap-2 flex-wrap mb-2">
                  {['Binatang Sahabat Kita', 'Tanaman Ceria & Subur', 'Kendaraan Transportasi', 'Diriku & Pancaindra', 'Alam Semesta'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => {
                        setAiTheme(t);
                        if (t.includes('Binatang')) {
                          setAiSubTheme('Binatang Peliharaan Kucing');
                          setAiSubSubTheme('Mengenal Cara Merawat Kucing');
                        } else if (t.includes('Tanaman')) {
                          setAiSubTheme('Tanaman Buah Sehat');
                          setAiSubSubTheme('Memeras Buah Jeruk Manis');
                        } else if (t.includes('Kendaraan')) {
                          setAiSubTheme('Kendaraan Darat Kereta Api');
                          setAiSubSubTheme('Membangun Jalur Rel Kereta Cepat');
                        }
                      }}
                      className={`px-3 py-1 rounded-full text-[11px] font-bold border transition-all ${
                        aiTheme === t
                          ? 'bg-amber-400 text-amber-950 border-amber-400'
                          : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={aiTheme}
                  onChange={(e) => setAiTheme(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Sub-Tema</label>
                <input
                  type="text"
                  value={aiSubTheme}
                  onChange={(e) => setAiSubTheme(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Topik Spesifik Hari Ini</label>
                <input
                  type="text"
                  value={aiSubSubTheme}
                  onChange={(e) => setAiSubSubTheme(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-200 text-emerald-900 text-[11px] flex items-start gap-2">
                <Info className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
                <span>
                  Sistem akan otomatis meracik 4 kegiatan sentra bermain lengkap (Balok, Peran, Sensori, Seni) beserta alat/bahan, langkah, tujuan capaian, dan teknik asesmen sesuai standar BSKAP PAUD.
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowAiModal(false)}
                className="px-4 py-2 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-xs"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={isAiGenerating}
                onClick={handleRunAiHelper}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-extrabold text-xs shadow-md shadow-emerald-200 flex items-center gap-2"
              >
                <Wand2 className={`w-4 h-4 ${isAiGenerating ? 'animate-spin' : ''}`} />
                <span>{isAiGenerating ? 'Meracik Modul RPPH...' : 'Generate RPPH Sekarang 🎉'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pick Activity from Bank Modal */}
      {showBankPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-amber-200 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-display font-bold text-base text-slate-800">
                Pilih Aktivitas dari 100+ Bank Kegiatan PAUD
              </h3>
              <button
                onClick={() => setShowBankPicker(false)}
                className="w-8 h-8 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-3 space-y-2 pr-1">
              {bankActivities.slice(0, 15).map((act) => (
                <div 
                  key={act.id} 
                  className="p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50/50 border border-slate-200/80 transition-colors flex items-center justify-between gap-3 text-xs"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-bold text-slate-800 truncate">{act.namaKegiatan}</span>
                      <span className="text-[10px] bg-slate-200 text-slate-800 px-2 py-0.5 rounded-full font-semibold shrink-0">
                        {act.area}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate">
                      Bahan: {act.alatBahan}
                    </p>
                  </div>
                  <button
                    onClick={() => handleAddActivityStep(act)}
                    className="px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shrink-0"
                  >
                    + Masukkan
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setShowBankPicker(false)}
                className="px-4 py-2 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
