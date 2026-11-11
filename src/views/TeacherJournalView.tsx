import React, { useState } from 'react';
import { 
  Sparkles, 
  Printer, 
  Plus, 
  Calendar, 
  Check, 
  Trash2, 
  Edit3, 
  Camera, 
  FileText,
  AlertCircle
} from 'lucide-react';
import { DailyTeacherJournal, ClassType, SchoolProfile } from '../types';
import { fireJoyfulConfetti } from '../utils/confetti';

interface TeacherJournalViewProps {
  journals: DailyTeacherJournal[];
  schoolProfile: SchoolProfile;
  activeClass: ClassType;
  onSaveJournals: (list: DailyTeacherJournal[]) => void;
}

export const TeacherJournalView: React.FC<TeacherJournalViewProps> = ({
  journals,
  schoolProfile,
  activeClass,
  onSaveJournals
}) => {
  const classJournals = journals.filter(j => j.kelompok === activeClass);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [tanggal, setTanggal] = useState(new Date().toISOString().split('T')[0]);
  const [guruNama, setGuruNama] = useState(activeClass === 'A' ? 'Siti Nurhaliza, S.Pd' : 'Dewi Anggraeni, S.Pd');
  const [kegiatanTerlaksana, setKegiatanTerlaksana] = useState('');
  const [kendala, setKendala] = useState('');
  const [solusi, setSolusi] = useState('');
  const [catatanKhusus, setCatatanKhusus] = useState('');
  const [fotoUrl, setFotoUrl] = useState('');

  const handleOpenAdd = () => {
    setEditingId(null);
    setTanggal(new Date().toISOString().split('T')[0]);
    setGuruNama(activeClass === 'A' ? 'Siti Nurhaliza, S.Pd' : 'Dewi Anggraeni, S.Pd');
    setKegiatanTerlaksana('Melaksanakan pembelajaran sentra bermain sesuai RPPH: Apersepsi kotak misteri, bermain balok, menempel kumis topeng piring kertas, dan makan bersama.');
    setKendala('Beberapa anak masih berebut gunting tumpul saat membuat topeng.');
    setSolusi('Menambah jumlah gunting anak di meja kelompok dan mengingatkan budaya antre berbagi.');
    setCatatanKhusus('Rayyan menunjukkan inisiatif meminjamkan gunting kepada Kenzo.');
    setFotoUrl('https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80');
    setShowAddModal(true);
  };

  const handleOpenEdit = (jrn: DailyTeacherJournal) => {
    setEditingId(jrn.id);
    setTanggal(jrn.tanggal);
    setGuruNama(jrn.guruNama);
    setKegiatanTerlaksana(jrn.kegiatanTerlaksana);
    setKendala(jrn.kendalaHambatan);
    setSolusi(jrn.solusiTindakLanjut);
    setCatatanKhusus(jrn.catatanSiswaKhusus);
    setFotoUrl(jrn.fotoDokumentasi || '');
    setShowAddModal(true);
  };

  const handleSave = () => {
    if (!kegiatanTerlaksana.trim()) {
      alert('Mohon isi kegiatan yang terlaksana.');
      return;
    }

    if (editingId) {
      const updated = journals.map(j => j.id === editingId ? {
        ...j,
        tanggal,
        guruNama,
        kegiatanTerlaksana,
        kendalaHambatan: kendala,
        solusiTindakLanjut: solusi,
        catatanSiswaKhusus: catatanKhusus,
        fotoDokumentasi: fotoUrl
      } : j);
      onSaveJournals(updated);
    } else {
      const newJrn: DailyTeacherJournal = {
        id: `jrn-${Date.now()}`,
        tanggal,
        kelompok: activeClass,
        guruNama,
        kegiatanTerlaksana,
        kendalaHambatan: kendala,
        solusiTindakLanjut: solusi,
        catatanSiswaKhusus: catatanKhusus,
        fotoDokumentasi: fotoUrl
      };
      onSaveJournals([newJrn, ...journals]);
    }

    setShowAddModal(false);
    fireJoyfulConfetti();
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus catatan jurnal ini?')) {
      onSaveJournals(journals.filter(j => j.id !== id));
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-3xl border border-amber-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-400 text-white flex items-center justify-center text-2xl shadow-sm shadow-amber-200">
            📖
          </div>
          <div>
            <h1 className="font-display font-extrabold text-xl text-slate-800">
              Jurnal Harian Guru & Rekam Refleksi Kelas
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Catatan harian keterlaksanaan RPPH, kendala di kelas, tindak lanjut dan dokumentasi visual
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleOpenAdd}
            className="px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs shadow-md shadow-amber-200 flex items-center gap-1.5 transition-transform hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>+ Catat Jurnal Hari Ini</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-200 flex items-center gap-1.5 transition-transform hover:scale-105"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Jurnal 1 Bulan</span>
          </button>
        </div>
      </div>

      {/* Journal Cards List */}
      <div className="space-y-4 print-container">
        
        {/* Printable Month Header */}
        <div className="hidden print:block border-b-2 border-slate-900 pb-3 mb-6 text-center">
          <h2 className="text-xs uppercase font-bold tracking-widest text-slate-600">
            {schoolProfile.namaSekolah}
          </h2>
          <h1 className="font-display font-extrabold text-lg text-slate-900 uppercase">
            JURNAL HARIAN PEMBELAJARAN GURU PAUD
          </h1>
          <p className="text-[11px] text-slate-500">
            Kelas {activeClass} • Tahun Ajaran {schoolProfile.tahunAjaran}
          </p>
        </div>

        {classJournals.length > 0 ? (
          classJournals.map((jrn) => (
            <div
              key={jrn.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs hover:shadow-sm transition-all text-xs space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 font-bold flex items-center justify-center text-xs">
                    📅
                  </span>
                  <div>
                    <h3 className="font-display font-bold text-sm text-slate-800">
                      Tanggal: {jrn.tanggal}
                    </h3>
                    <span className="text-[11px] text-slate-500">
                      Guru Pamong: <strong>{jrn.guruNama}</strong> • Kelas {jrn.kelompok}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 no-print">
                  <button
                    onClick={() => handleOpenEdit(jrn)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                    title="Edit Jurnal"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(jrn.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Hapus Jurnal"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-3">
                  <div>
                    <span className="font-bold text-slate-800 block mb-0.5">
                      ✅ Kegiatan yang Terlaksana:
                    </span>
                    <p className="text-slate-700 leading-relaxed text-[11px] bg-emerald-50/50 p-3 rounded-2xl border border-emerald-100">
                      {jrn.kegiatanTerlaksana}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-amber-50/50 p-3 rounded-2xl border border-amber-100">
                      <span className="font-bold text-amber-900 block mb-0.5">
                        ⚠️ Kendala / Hambatan:
                      </span>
                      <p className="text-slate-700 leading-relaxed text-[11px]">
                        {jrn.kendalaHambatan || '-'}
                      </p>
                    </div>

                    <div className="bg-sky-50/50 p-3 rounded-2xl border border-sky-100">
                      <span className="font-bold text-sky-900 block mb-0.5">
                        💡 Solusi & Tindak Lanjut:
                      </span>
                      <p className="text-slate-700 leading-relaxed text-[11px]">
                        {jrn.solusiTindakLanjut || '-'}
                      </p>
                    </div>
                  </div>

                  {jrn.catatanSiswaKhusus && (
                    <div className="bg-purple-50/50 p-2.5 rounded-xl border border-purple-100 text-[11px] text-purple-900">
                      <strong>Catatan Khusus Murid: </strong> {jrn.catatanSiswaKhusus}
                    </div>
                  )}
                </div>

                {/* Right: Documentation Photo */}
                <div>
                  <span className="font-bold text-slate-700 block mb-1">
                    📸 Dokumentasi Kegiatan:
                  </span>
                  <div className="h-44 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center">
                    {jrn.fotoDokumentasi ? (
                      <img
                        src={jrn.fotoDokumentasi}
                        alt="Dokumentasi Kelas"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center text-slate-400 p-3">
                        <Camera className="w-6 h-6 mx-auto mb-1 opacity-40" />
                        <span className="text-[10px]">Tanpa foto dokumentasi</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>
          ))
        ) : (
          <div className="bg-white p-8 rounded-3xl text-center border border-slate-200">
            <span className="text-3xl block mb-2">📖</span>
            <p className="text-slate-500 font-semibold text-xs mb-3">
              Belum ada catatan jurnal harian untuk Kelas {activeClass}.
            </p>
            <button
              onClick={handleOpenAdd}
              className="px-5 py-2 rounded-full bg-amber-500 text-white font-bold text-xs"
            >
              + Buat Catatan Pertama
            </button>
          </div>
        )}

      </div>

      {/* Add / Edit Journal Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-amber-200 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-display font-bold text-lg text-slate-800">
                {editingId ? 'Edit Jurnal Harian' : 'Catat Jurnal Pembelajaran Guru'}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 my-4 text-xs max-h-[70vh] overflow-y-auto pr-1">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tanggal</label>
                  <input
                    type="date"
                    value={tanggal}
                    onChange={(e) => setTanggal(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nama Guru</label>
                  <input
                    type="text"
                    value={guruNama}
                    onChange={(e) => setGuruNama(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Kegiatan yang Terlaksana</label>
                <textarea
                  rows={3}
                  value={kegiatanTerlaksana}
                  onChange={(e) => setKegiatanTerlaksana(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Kendala / Hambatan</label>
                <input
                  type="text"
                  value={kendala}
                  onChange={(e) => setKendala(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Solusi / Tindak Lanjut Besok</label>
                <input
                  type="text"
                  value={solusi}
                  onChange={(e) => setSolusi(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Catatan Siswa Tertentu (Opsional)</label>
                <input
                  type="text"
                  placeholder="Contoh: Kenzo butuh pendampingan ekstra saat berbaris"
                  value={catatanKhusus}
                  onChange={(e) => setCatatanKhusus(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">URL Foto Dokumentasi</label>
                <input
                  type="text"
                  value={fotoUrl}
                  onChange={(e) => setFotoUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
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
                onClick={handleSave}
                className="px-5 py-2 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md shadow-amber-200 flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                Simpan Jurnal
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
