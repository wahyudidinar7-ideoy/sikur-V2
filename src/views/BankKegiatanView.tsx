import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  Plus, 
  Filter, 
  Check, 
  Trash2, 
  BookOpen, 
  Layers, 
  ArrowRight,
  Smile
} from 'lucide-react';
import { BankActivityItem, PlayAreaType } from '../types';
import { fireJoyfulConfetti } from '../utils/confetti';

interface BankKegiatanViewProps {
  bankActivities: BankActivityItem[];
  onSaveBankActivities: (list: BankActivityItem[]) => void;
  onSelectActivityForRpph?: (activity: BankActivityItem) => void;
}

export const BankKegiatanView: React.FC<BankKegiatanViewProps> = ({
  bankActivities,
  onSaveBankActivities,
  onSelectActivityForRpph
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTema, setSelectedTema] = useState<string>('Semua');
  const [selectedArea, setSelectedArea] = useState<string>('Semua');

  // Modal Add Activity
  const [showAddModal, setShowAddModal] = useState(false);
  const [newNama, setNewNama] = useState('');
  const [newTema, setNewTema] = useState('Binatang Sahabat Kita');
  const [newSubTema, setNewSubTema] = useState('Binatang Peliharaan');
  const [newArea, setNewArea] = useState<PlayAreaType>('Main Seni & Kreativitas');
  const [newAlatBahan, setNewAlatBahan] = useState('');
  const [newTujuan, setNewTujuan] = useState('');
  const [newLangkah, setNewLangkah] = useState('');

  // Extract unique themes
  const uniqueThemes = ['Semua', ...Array.from(new Set(bankActivities.map(b => b.tema)))];
  const uniqueAreas: ('Semua' | PlayAreaType)[] = [
    'Semua',
    'Main Balok',
    'Main Peran',
    'Main Sensorimotor',
    'Main Seni & Kreativitas',
    'Literasi & STEAM'
  ];

  // Filtering
  const filteredActivities = bankActivities.filter(act => {
    const matchSearch = act.namaKegiatan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.alatBahan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.tujuan.toLowerCase().includes(searchQuery.toLowerCase());
    const matchTema = selectedTema === 'Semua' || act.tema === selectedTema;
    const matchArea = selectedArea === 'Semua' || act.area === selectedArea;
    return matchSearch && matchTema && matchArea;
  });

  const handleSaveNewActivity = () => {
    if (!newNama.trim()) {
      alert('Mohon isi nama kegiatan.');
      return;
    }

    const newItem: BankActivityItem = {
      id: `bank-${Date.now()}`,
      tema: newTema,
      subTema: newSubTema,
      kelompok: 'Semua',
      area: newArea,
      namaKegiatan: newNama,
      alatBahan: newAlatBahan || 'Bahan alam loose parts',
      tujuan: newTujuan || 'Mengeksplorasi sensorik dan kreativitas anak',
      langkah: newLangkah || 'Anak berkreasi mandiri didampingi fasilitasi guru.',
      asesmenTerkait: 'Dokumentasi Hasil Karya'
    };

    onSaveBankActivities([newItem, ...bankActivities]);
    setShowAddModal(false);
    // Reset
    setNewNama('');
    setNewAlatBahan('');
    setNewTujuan('');
    setNewLangkah('');
    fireJoyfulConfetti();
  };

  const handleDeleteActivity = (id: string) => {
    if (confirm('Hapus ide kegiatan ini dari bank?')) {
      onSaveBankActivities(bankActivities.filter(b => b.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-3xl border border-pink-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-400 via-rose-400 to-amber-300 text-white flex items-center justify-center text-2xl shadow-sm shadow-pink-200">
            💡
          </div>
          <div>
            <h1 className="font-display font-extrabold text-xl text-slate-800">
              Bank Ide Tema & Sentra Kegiatan Bermain PAUD
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              100+ referensi kegiatan loose parts, bermain peran, balok, sensori, seni & STEAM Kurikulum Merdeka
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 rounded-full bg-pink-600 hover:bg-pink-700 text-white font-extrabold text-xs shadow-md shadow-pink-200 flex items-center gap-1.5 transition-transform hover:scale-105 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Tambah Ide Kegiatan</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-2xs space-y-3">
        
        <div className="flex flex-col md:flex-row items-center gap-3 justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Cari ide kegiatan, bahan loose parts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-full text-xs focus:ring-2 focus:ring-pink-400 focus:outline-hidden"
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 self-end md:self-auto">
            <span>Ditemukan: <strong className="text-pink-600">{filteredActivities.length}</strong> Kegiatan</span>
          </div>
        </div>

        {/* Filter Chips by Area */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
            Sentra:
          </span>
          {uniqueAreas.map((area) => (
            <button
              key={area}
              onClick={() => setSelectedArea(area)}
              className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all whitespace-nowrap shrink-0 ${
                selectedArea === area
                  ? 'bg-pink-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {area}
            </button>
          ))}
        </div>

      </div>

      {/* Grid of Activity Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredActivities.length > 0 ? (
          filteredActivities.map((act) => {
            const areaBadgeStyles: Record<string, string> = {
              'Main Balok': 'bg-amber-100 text-amber-900 border-amber-300',
              'Main Peran': 'bg-pink-100 text-pink-900 border-pink-300',
              'Main Sensorimotor': 'bg-sky-100 text-sky-900 border-sky-300',
              'Main Seni & Kreativitas': 'bg-purple-100 text-purple-900 border-purple-300',
              'Literasi & STEAM': 'bg-emerald-100 text-emerald-900 border-emerald-300',
            };

            return (
              <div
                key={act.id}
                className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${areaBadgeStyles[act.area] || 'bg-slate-100 text-slate-700'}`}>
                      {act.area}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md">
                      {act.tema.slice(0, 16)}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-sm text-slate-800 group-hover:text-pink-600 transition-colors leading-snug mb-2">
                    {act.namaKegiatan}
                  </h3>

                  <div className="space-y-1.5 text-xs text-slate-600 mb-3">
                    <div className="text-[11px]">
                      <strong className="text-slate-700">📦 Alat/Bahan: </strong>
                      <span className="text-slate-600">{act.alatBahan}</span>
                    </div>
                    <div className="text-[11px]">
                      <strong className="text-slate-700">🎯 Capaian: </strong>
                      <span className="text-slate-600">{act.tujuan}</span>
                    </div>
                    <div className="text-[11px] bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-slate-600 italic">
                      " {act.langkah} "
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    ⭐ {act.asesmenTerkait}
                  </span>
                  
                  <button
                    onClick={() => handleDeleteActivity(act.id)}
                    className="p-1 rounded-md text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                    title="Hapus Ide"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-12 text-center bg-white rounded-3xl border border-slate-200">
            <span className="text-3xl block mb-2">🔍</span>
            <p className="text-slate-500 font-semibold text-xs">
              Tidak ada ide kegiatan yang cocok dengan pencarian Anda.
            </p>
          </div>
        )}
      </div>

      {/* Modal Add Activity */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-pink-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-display font-bold text-lg text-slate-800">
                Tambah Ide Kegiatan Main Baru
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 my-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nama Kegiatan Main</label>
                <input
                  type="text"
                  placeholder="Contoh: Meronce Manik Bunga dari Sedotan Warna"
                  value={newNama}
                  onChange={(e) => setNewNama(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Sentra / Area Bermain</label>
                  <select
                    value={newArea}
                    onChange={(e) => setNewArea(e.target.value as PlayAreaType)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:outline-hidden"
                  >
                    <option value="Main Balok">Main Balok</option>
                    <option value="Main Peran">Main Peran</option>
                    <option value="Main Sensorimotor">Main Sensorimotor</option>
                    <option value="Main Seni & Kreativitas">Main Seni & Kreativitas</option>
                    <option value="Literasi & STEAM">Literasi & STEAM</option>
                    <option value="Keaksaraan Awal">Keaksaraan Awal</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tema Terkait</label>
                  <input
                    type="text"
                    placeholder="Contoh: Tanaman Ceria"
                    value={newTema}
                    onChange={(e) => setNewTema(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Alat & Bahan Main Loose Parts</label>
                <input
                  type="text"
                  placeholder="Contoh: Potongan sedotan aneka warna, benang wol, gunting aman"
                  value={newAlatBahan}
                  onChange={(e) => setNewAlatBahan(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Tujuan Capaian Anak</label>
                <input
                  type="text"
                  placeholder="Contoh: Melatih kekuatan jemari tangan dan pola warna berselang-seling"
                  value={newTujuan}
                  onChange={(e) => setNewTujuan(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Langkah-langkah Ringkas</label>
                <textarea
                  rows={3}
                  placeholder="Anak memilih sedotan, memasukkan benang ke lubang sedotan secara bergantian..."
                  value={newLangkah}
                  onChange={(e) => setNewLangkah(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-xs"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSaveNewActivity}
                className="px-5 py-2 rounded-full bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs shadow-md shadow-pink-200 flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                Simpan ke Bank Ide
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
