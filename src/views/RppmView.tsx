import React, { useState } from 'react';
import { 
  Sparkles, 
  Printer, 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  Calendar, 
  BookOpen, 
  Layers,
  Wand2
} from 'lucide-react';
import { RppmItem, SchoolProfile, ClassType, SemesterType } from '../types';
import { fireJoyfulConfetti } from '../utils/confetti';

interface RppmViewProps {
  rppmList: RppmItem[];
  schoolProfile: SchoolProfile;
  activeClass: ClassType;
  onSaveRppmList: (list: RppmItem[]) => void;
  onNavigateToRpphWithTopic?: (rppm: RppmItem) => void;
}

export const RppmView: React.FC<RppmViewProps> = ({
  rppmList,
  schoolProfile,
  activeClass,
  onSaveRppmList,
  onNavigateToRpphWithTopic
}) => {
  const [selectedRppmId, setSelectedRppmId] = useState<string>(rppmList[0]?.id || '');
  const [isEditing, setIsEditing] = useState(false);

  const currentRppm = rppmList.find(r => r.id === selectedRppmId) || rppmList[0];
  const [formData, setFormData] = useState<RppmItem>(currentRppm);

  // Sync formData when selection changes
  React.useEffect(() => {
    if (currentRppm) {
      setFormData(currentRppm);
      setIsEditing(false);
    }
  }, [selectedRppmId, rppmList]);

  const handleSave = () => {
    const updated = rppmList.map(item => item.id === formData.id ? formData : item);
    onSaveRppmList(updated);
    setIsEditing(false);
    fireJoyfulConfetti();
  };

  const handleAddNewRppm = () => {
    const nextWeek = (rppmList.length > 0 ? Math.max(...rppmList.map(r => r.mingguKe)) : 0) + 1;
    const newRppm: RppmItem = {
      id: `rppm-gen-${Date.now()}`,
      semester: schoolProfile.semesterAktif,
      bulan: 'Oktober 2026',
      mingguKe: nextWeek,
      kelompok: activeClass,
      rentangTanggal: '19 - 23 Oktober 2026',
      tema: 'Tanaman Ceria & Subur',
      subTema: 'Tanaman Buah Sehat',
      topik: 'Jeruk Manis & Apel Merah',
      tujuanPembelajaran: [
        'Anak bersyukur atas karunia buah sehat ciptaan Tuhan',
        'Mengenal warna, rasa, dan bentuk buah-buahan segar',
        'Terampil meremas, mengecap, dan mengupas buah dengan aman',
        'Senang berbagi buah bekal bersama teman sebaya'
      ],
      rencanaSenin: [
        'Mengamati aneka buah asli di kelas',
        'Mengecap irisan apel dengan pewarna makanan di kertas gambar',
        'Membangun toko buah sehat di sentra balok'
      ],
      rencanaSelasa: [
        'Mencicipi rasa manis, asam jeruk dengan mata tertutup',
        'Menghitung jumlah biji jeruk (angka 1-5)',
        'Bermain peran kasir buah cilik'
      ],
      rencanaRabu: [
        'Praktik memeras jeruk manis mandiri',
        'Membuat kolase kulit jeruk kering di atas pola pola buah',
        'Senam gerak lagu "Buah Sehat Bervitamin"'
      ],
      rencanaKamis: [
        'Membaca buku cerita bergambar "Pohon Apel yang Baik Hati"',
        'Meronce pola warna potongan spons buah',
        'Menyusun balok gerobak buah keliling'
      ],
      rencanaJumat: [
        'Makan salad buah bersama bunda di kelas',
        'Memilah sampah kulit buah organik ke komposter',
        'Refleksi dan apresiasi karya mingguan anak'
      ],
      alatBahan: [
        'Buah jeruk dan apel segar',
        'Cat air food-grade, kertas gambar A4',
        'Alat peras jeruk plastik manual',
        'Balok kayu unit sentra rancang bangun'
      ],
      teknikAsesmen: [
        'Ceklis Ketercapaian Pembelajaran',
        'Catatan Anekdot Sikap',
        'Dokumentasi Foto Hasil Karya'
      ]
    };

    onSaveRppmList([...rppmList, newRppm]);
    setSelectedRppmId(newRppm.id);
    fireJoyfulConfetti();
  };

  const handlePrint = () => {
    window.print();
  };

  if (!currentRppm) {
    return (
      <div className="bg-white p-8 rounded-3xl text-center border border-slate-200">
        <p className="text-slate-500 mb-4">Belum ada dokumen RPPM.</p>
        <button
          onClick={handleAddNewRppm}
          className="px-5 py-2.5 rounded-full bg-emerald-600 text-white font-bold text-xs"
        >
          + Buat RPPM Baru
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-500 text-white flex items-center justify-center text-2xl shadow-sm shadow-emerald-200">
            📝
          </div>
          <div>
            <h1 className="font-display font-extrabold text-xl text-slate-800">
              RPPM (Rencana Pelaksanaan Pembelajaran Mingguan)
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Desain kegiatan ragam main Senin s/d Jumat • Kurikulum Merdeka PAUD
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button
                onClick={() => { setFormData(currentRppm); setIsEditing(false); }}
                className="px-4 py-2 rounded-full border border-slate-300 text-slate-600 hover:bg-slate-100 font-bold text-xs"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-200 flex items-center gap-1.5 transition-transform hover:scale-105"
              >
                <Check className="w-4 h-4" />
                <span>Simpan RPPM</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleAddNewRppm}
                className="px-4 py-2 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs flex items-center gap-1.5 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Buat Minggu Baru</span>
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-all"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit RPPM</span>
              </button>
              <button
                onClick={handlePrint}
                className="px-5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-200 flex items-center gap-1.5 transition-transform hover:scale-105"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak 1 Lembar</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Week Selector Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-print">
        {rppmList.map((rppm) => (
          <button
            key={rppm.id}
            onClick={() => setSelectedRppmId(rppm.id)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-2 ${
              selectedRppmId === rppm.id
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Minggu ke-{rppm.mingguKe}: {rppm.subTema}</span>
          </button>
        ))}
      </div>

      {/* Printable RPPM 1-Page Layout */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200/80 shadow-xs print-container">
        
        {/* Header Kop Surat (Official PAUD layout) */}
        <div className="border-b-2 border-slate-800 pb-3 mb-4 text-center">
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-600">
            {schoolProfile.namaSekolah}
          </h2>
          <h1 className="font-display font-extrabold text-base lg:text-lg text-slate-900 uppercase">
            RENCANA PELAKSANAAN PEMBELAJARAN MINGGUAN (RPPM)
          </h1>
          <p className="text-[11px] text-slate-500 font-medium">
            Tahun Ajaran {schoolProfile.tahunAjaran} • Semester {currentRppm.semester} • Kelompok {currentRppm.kelompok} (Usia 4-5 Th)
          </p>
        </div>

        {/* Identity Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-amber-50/60 p-4 rounded-2xl border border-amber-200/60 text-xs mb-5">
          <div>
            <span className="text-slate-500 text-[10px] uppercase font-bold block">Minggu Ke-</span>
            <span className="font-extrabold text-slate-800">Minggu {currentRppm.mingguKe} ({currentRppm.rentangTanggal})</span>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] uppercase font-bold block">Tema Besar</span>
            <span className="font-extrabold text-emerald-800">{currentRppm.tema}</span>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] uppercase font-bold block">Sub Tema</span>
            <span className="font-extrabold text-slate-800">{currentRppm.subTema}</span>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] uppercase font-bold block">Topik / Fokus</span>
            <span className="font-extrabold text-orange-700">{currentRppm.topik}</span>
          </div>
        </div>

        {/* Tujuan Pembelajaran */}
        <div className="mb-5">
          <h3 className="font-display font-bold text-xs uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
            <span>🎯</span> Tujuan Pembelajaran Minggu Ini:
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

        {/* 5-Day Weekly Breakdown Table (Senin - Jumat) */}
        <div className="mb-5">
          <h3 className="font-display font-bold text-xs uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
            <span>🗓️</span> Matriks Ragam Main Senin s/d Jumat:
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
            
            {/* SENIN */}
            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col justify-between">
              <div>
                <div className="font-display font-bold text-xs text-amber-900 border-b border-amber-200 pb-1 mb-2">
                  SENIN
                </div>
                <ul className="space-y-1.5 text-slate-700 text-[11px]">
                  {formData.rencanaSenin.map((act, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* SELASA */}
            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col justify-between">
              <div>
                <div className="font-display font-bold text-xs text-emerald-900 border-b border-emerald-200 pb-1 mb-2">
                  SELASA
                </div>
                <ul className="space-y-1.5 text-slate-700 text-[11px]">
                  {formData.rencanaSelasa.map((act, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* RABU */}
            <div className="p-3.5 rounded-2xl bg-sky-50/70 border border-sky-200 flex flex-col justify-between">
              <div>
                <div className="font-display font-bold text-xs text-sky-900 border-b border-sky-200 pb-1 mb-2">
                  RABU
                </div>
                <ul className="space-y-1.5 text-slate-700 text-[11px]">
                  {formData.rencanaRabu.map((act, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-sky-600 font-bold">•</span>
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* KAMIS */}
            <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-200 flex flex-col justify-between">
              <div>
                <div className="font-display font-bold text-xs text-purple-900 border-b border-purple-200 pb-1 mb-2">
                  KAMIS
                </div>
                <ul className="space-y-1.5 text-slate-700 text-[11px]">
                  {formData.rencanaKamis.map((act, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-purple-600 font-bold">•</span>
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* JUMAT */}
            <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200 flex flex-col justify-between">
              <div>
                <div className="font-display font-bold text-xs text-rose-900 border-b border-rose-200 pb-1 mb-2">
                  JUMAT
                </div>
                <ul className="space-y-1.5 text-slate-700 text-[11px]">
                  {formData.rencanaJumat.map((act, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-rose-600 font-bold">•</span>
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>

        {/* Alat & Bahan + Rencana Asesmen */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mb-6">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-800 block mb-1">📦 Alat, Media & Bahan Ajar Loose Parts:</span>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              {formData.alatBahan.join(', ')}
            </p>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-800 block mb-1">⭐ Rencana Teknik Asesmen:</span>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              {formData.teknikAsesmen.join(', ')}
            </p>
          </div>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-2 text-center text-xs pt-4 border-t border-slate-200">
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
              {schoolProfile.kota}, {currentRppm.rentangTanggal.split('-')[0]}<br />
              Guru Kelas {currentRppm.kelompok}
            </p>
            <p className="font-bold underline text-slate-900">
              {currentRppm.kelompok === 'A' ? 'Siti Nurhaliza, S.Pd' : 'Dewi Anggraeni, S.Pd'}
            </p>
            <p className="text-[10px] text-slate-500">Guru Kelas PAUD Merdeka</p>
          </div>
        </div>

      </div>

    </div>
  );
};
