import React, { useState } from 'react';
import { 
  Sparkles, 
  Printer, 
  Plus, 
  Edit3, 
  Trash2, 
  Copy, 
  Search, 
  Check, 
  CalendarRange, 
  BookOpen,
  Filter
} from 'lucide-react';
import { ProtaItem, PromesItem, SchoolProfile, SemesterType } from '../types';
import { fireJoyfulConfetti } from '../utils/confetti';

interface ProtaPromesViewProps {
  protaList: ProtaItem[];
  promesList: PromesItem[];
  schoolProfile: SchoolProfile;
  onSaveProta: (list: ProtaItem[]) => void;
  onSavePromes: (list: PromesItem[]) => void;
}

export const ProtaPromesView: React.FC<ProtaPromesViewProps> = ({
  protaList,
  promesList,
  schoolProfile,
  onSaveProta,
  onSavePromes
}) => {
  const [activeTab, setActiveTab] = useState<'prota' | 'promes'>('prota');
  const [selectedSemester, setSelectedSemester] = useState<SemesterType>(schoolProfile.semesterAktif);
  const [searchQuery, setSearchQuery] = useState('');

  // Prota Editing Modal State
  const [showProtaModal, setShowProtaModal] = useState(false);
  const [editingProta, setEditingProta] = useState<ProtaItem | null>(null);

  // Form State
  const [tema, setTema] = useState('');
  const [bulan, setBulan] = useState('');
  const [alokasiMinggu, setAlokasiMinggu] = useState(3);
  const [subTemaText, setSubTemaText] = useState('');
  const [tujuanText, setTujuanText] = useState('');
  const [proyekP5, setProyekP5] = useState('');

  // Filtered lists
  const filteredProta = protaList.filter(item => {
    const matchSem = item.semester === selectedSemester;
    const matchSearch = item.tema.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subTema.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchSem && matchSearch;
  });

  const filteredPromes = promesList.filter(item => {
    const matchSem = item.semester === selectedSemester;
    const matchSearch = item.tema.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subTema.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSem && matchSearch;
  });

  const handleOpenAddProta = () => {
    setEditingProta(null);
    setTema('');
    setBulan(selectedSemester === 'Ganjil' ? 'Juli - Agustus' : 'Januari - Februari');
    setAlokasiMinggu(3);
    setSubTemaText('Sub tema 1, Sub tema 2, Sub tema 3');
    setTujuanText('Anak mampu mengenal topik ini dengan rasa ingin tahu yang tinggi.');
    setProyekP5('Aku Sayang Bumi PAUD');
    setShowProtaModal(true);
  };

  const handleOpenEditProta = (item: ProtaItem) => {
    setEditingProta(item);
    setTema(item.tema);
    setBulan(item.bulan);
    setAlokasiMinggu(item.alokasiMinggu);
    setSubTemaText(item.subTema.join(', '));
    setTujuanText(item.tujuanPembelajaran.join('\n'));
    setProyekP5(item.proyekP5);
    setShowProtaModal(true);
  };

  const handleSaveProtaModal = () => {
    const subTemaArray = subTemaText.split(',').map(s => s.trim()).filter(Boolean);
    const tujuanArray = tujuanText.split('\n').map(t => t.trim()).filter(Boolean);

    if (editingProta) {
      const updated = protaList.map(item => item.id === editingProta.id ? {
        ...item,
        tema,
        bulan,
        alokasiMinggu: Number(alokasiMinggu),
        subTema: subTemaArray,
        tujuanPembelajaran: tujuanArray,
        proyekP5
      } : item);
      onSaveProta(updated);
    } else {
      const newItem: ProtaItem = {
        id: `prota-${Date.now()}`,
        semester: selectedSemester,
        bulan,
        alokasiMinggu: Number(alokasiMinggu),
        tema,
        subTema: subTemaArray,
        tujuanPembelajaran: tujuanArray,
        proyekP5
      };
      onSaveProta([...protaList, newItem]);
    }

    setShowProtaModal(false);
    fireJoyfulConfetti();
  };

  const handleDeleteProta = (id: string) => {
    if (confirm('Yakin ingin menghapus tema ini dari PROTA?')) {
      onSaveProta(protaList.filter(p => p.id !== id));
    }
  };

  const handleDuplicateToNewYear = () => {
    if (confirm(`Duplikasi seluruh PROTA & PROMES ke tahun ajaran baru?`)) {
      fireJoyfulConfetti();
      alert('Berhasil! Seluruh perencanaan tema telah disalin dan siap disesuaikan untuk kalender akademik berikutnya.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 text-white flex items-center justify-center text-2xl shadow-sm shadow-orange-200">
            🗓️
          </div>
          <div>
            <h1 className="font-display font-extrabold text-xl text-slate-800">
              Program Tahunan (PROTA) & Semester (PROMES)
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Pemetaan alokasi waktu tema, sub-tema & proyek P5 Kurikulum Merdeka PAUD
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDuplicateToNewYear}
            className="px-4 py-2 rounded-full border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs flex items-center gap-1.5 transition-all"
            title="Salin rencana ke tahun ajaran baru"
          >
            <Copy className="w-3.5 h-3.5 text-amber-700" />
            <span>Duplikasi ke Tahun Baru</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-200 flex items-center gap-1.5 transition-transform hover:scale-105"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak {activeTab === 'prota' ? 'PROTA' : 'PROMES'}</span>
          </button>
        </div>
      </div>

      {/* Control Bar: Sub Tabs (PROTA vs PROMES) & Semester Switcher & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        
        {/* Toggle PROTA / PROMES */}
        <div className="flex items-center p-1 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <button
            onClick={() => setActiveTab('prota')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'prota'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🗓️ Program Tahunan (PROTA)
          </button>
          <button
            onClick={() => setActiveTab('promes')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'promes'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            📅 Program Semester (PROMES)
          </button>
        </div>

        {/* Semester & Search */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Semester Selector */}
          <div className="flex items-center bg-white p-1 rounded-2xl border border-slate-200 shadow-2xs text-xs font-bold">
            <button
              onClick={() => setSelectedSemester('Ganjil')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                selectedSemester === 'Ganjil'
                  ? 'bg-amber-400 text-amber-950 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semester 1 (Ganjil)
            </button>
            <button
              onClick={() => setSelectedSemester('Genap')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                selectedSemester === 'Genap'
                  ? 'bg-amber-400 text-amber-950 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semester 2 (Genap)
            </button>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Cari tema / sub tema..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-2 bg-white border border-slate-200 rounded-2xl text-xs focus:ring-2 focus:ring-emerald-400 focus:outline-hidden w-44 md:w-56"
            />
          </div>

          {activeTab === 'prota' && (
            <button
              onClick={handleOpenAddProta}
              className="px-4 py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 transition-all hover:scale-105"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Tema</span>
            </button>
          )}
        </div>

      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        
        {/* TAB 1: PROTA */}
        {activeTab === 'prota' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-emerald-50/70 border-b border-emerald-100 text-emerald-950 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-4 w-12 text-center">No</th>
                  <th className="py-3.5 px-4 w-32">Bulan & Alokasi</th>
                  <th className="py-3.5 px-4 w-48">Tema Pembelajaran</th>
                  <th className="py-3.5 px-4">Sub Tema & Topik</th>
                  <th className="py-3.5 px-4 w-60">Tujuan Pembelajaran (TP)</th>
                  <th className="py-3.5 px-4 w-44">Proyek Profil P5</th>
                  <th className="py-3.5 px-4 w-20 text-center no-print">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProta.length > 0 ? (
                  filteredProta.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-amber-50/40 transition-colors">
                      <td className="py-4 px-4 text-center font-bold text-slate-500">
                        {idx + 1}
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-bold text-emerald-800">{item.bulan}</div>
                        <span className="inline-block mt-0.5 text-[10px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                          {item.alokasiMinggu} Minggu
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-display font-bold text-sm text-slate-800">
                          {item.tema}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1">
                          {item.subTema.map((sub, i) => (
                            <span 
                              key={i} 
                              className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium"
                            >
                              • {sub}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-slate-600 leading-relaxed">
                        <ul className="list-disc list-inside space-y-0.5">
                          {item.tujuanPembelajaran.slice(0, 3).map((tp, i) => (
                            <li key={i} className="truncate" title={tp}>{tp}</li>
                          ))}
                        </ul>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-[11px] font-semibold text-sky-800 bg-sky-50 px-2.5 py-1 rounded-xl border border-sky-200 block">
                          ⭐ {item.proyekP5}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center no-print">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => handleOpenEditProta(item)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                            title="Edit Tema"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProta(item.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Hapus Tema"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-400 italic">
                      Tidak ada tema ditemukan untuk Semester {selectedSemester}.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 2: PROMES */}
        {activeTab === 'promes' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-sky-50/70 border-b border-sky-100 text-sky-950 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-4 w-12 text-center">Mgu</th>
                  <th className="py-3.5 px-4 w-28">Bulan</th>
                  <th className="py-3.5 px-4 w-36">Tema</th>
                  <th className="py-3.5 px-4 w-40">Sub Tema</th>
                  <th className="py-3.5 px-4 w-44">Topik Harian</th>
                  <th className="py-3.5 px-4">Tujuan Pembelajaran</th>
                  <th className="py-3.5 px-4">Rencana Kegiatan Utama</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPromes.length > 0 ? (
                  filteredPromes.map((p, idx) => (
                    <tr key={p.id} className="hover:bg-sky-50/30 transition-colors">
                      <td className="py-4 px-4 text-center font-bold text-sky-700 bg-sky-50/40">
                        W-{p.mingguKe}
                      </td>
                      <td className="py-4 px-4 font-bold text-slate-700">
                        {p.bulan}
                      </td>
                      <td className="py-4 px-4 font-display font-bold text-slate-800">
                        {p.tema}
                      </td>
                      <td className="py-4 px-4 text-slate-700 font-medium">
                        {p.subTema}
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                          {p.topik}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-slate-600 leading-relaxed">
                        {p.tujuanPembelajaran}
                      </td>
                      <td className="py-4 px-4 text-slate-600 leading-relaxed">
                        {p.kegiatanUtama}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-400 italic">
                      Data PROMES untuk Semester {selectedSemester} belum diisi.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* Edit / Add Prota Modal */}
      {showProtaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-amber-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-display font-bold text-lg text-slate-800">
                {editingProta ? 'Edit Tema PROTA' : 'Tambah Tema PROTA Baru'}
              </h3>
              <button
                onClick={() => setShowProtaModal(false)}
                className="w-8 h-8 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 my-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Tema Besar</label>
                <input
                  type="text"
                  placeholder="Contoh: Binatang Sahabat Kita"
                  value={tema}
                  onChange={(e) => setTema(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Alokasi Bulan</label>
                  <input
                    type="text"
                    placeholder="Contoh: Oktober - November"
                    value={bulan}
                    onChange={(e) => setBulan(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Alokasi Minggu</label>
                  <input
                    type="number"
                    min={1}
                    max={8}
                    value={alokasiMinggu}
                    onChange={(e) => setAlokasiMinggu(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Sub-Tema (Pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  placeholder="Kucing Lucu, Burung Berkicau, Ikan di Kolam"
                  value={subTemaText}
                  onChange={(e) => setSubTemaText(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Tujuan Pembelajaran (Satu baris per tujuan)
                </label>
                <textarea
                  rows={3}
                  placeholder="Anak mampu menyayangi hewan ciptaan Tuhan&#10;Anak terampil menirukan suara dan gerak hewan"
                  value={tujuanText}
                  onChange={(e) => setTujuanText(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Judul Proyek P5 PAUD</label>
                <input
                  type="text"
                  placeholder="Contoh: Menyayangi Hewan Ciptaan Tuhan (Aku Sayang Bumi)"
                  value={proyekP5}
                  onChange={(e) => setProyekP5(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowProtaModal(false)}
                className="px-4 py-2 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-xs"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSaveProtaModal}
                className="px-5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-200 flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                Simpan Tema
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
