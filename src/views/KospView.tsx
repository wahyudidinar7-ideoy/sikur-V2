import React, { useState } from 'react';
import { 
  Sparkles, 
  Printer, 
  BookOpen, 
  Check, 
  Plus, 
  Trash2, 
  Edit3, 
  Award,
  Layers,
  Calendar
} from 'lucide-react';
import { KospData, SchoolProfile } from '../types';
import { fireJoyfulConfetti } from '../utils/confetti';

interface KospViewProps {
  kospData: KospData;
  schoolProfile: SchoolProfile;
  onSaveKosp: (data: KospData) => void;
}

export const KospView: React.FC<KospViewProps> = ({
  kospData,
  schoolProfile,
  onSaveKosp
}) => {
  const [formData, setFormData] = useState<KospData>(kospData);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'karakteristik' | 'visi-misi' | 'p5' | 'kalender'>('karakteristik');
  const [showPrintModal, setShowPrintModal] = useState(false);

  const handleSave = () => {
    onSaveKosp(formData);
    setIsEditing(false);
    fireJoyfulConfetti();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Header bar with Print & Edit Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-400 to-blue-500 text-white flex items-center justify-center text-2xl shadow-sm shadow-sky-200">
            📘
          </div>
          <div>
            <h1 className="font-display font-extrabold text-xl text-slate-800">
              KOSP (Kurikulum Operasional Satuan Pendidikan)
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Dokumen resmi kurikulum tingkat operasional {schoolProfile.namaSekolah} • Kurikulum Merdeka PAUD
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button
                onClick={() => { setFormData(kospData); setIsEditing(false); }}
                className="px-4 py-2 rounded-full border border-slate-300 text-slate-600 hover:bg-slate-100 font-bold text-xs"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-200 flex items-center gap-1.5 transition-transform hover:scale-105"
              >
                <Check className="w-4 h-4" />
                <span>Simpan KOSP</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs flex items-center gap-1.5 transition-all"
              >
                <Edit3 className="w-4 h-4 text-amber-700" />
                <span>Edit Dokumen KOSP</span>
              </button>
              <button
                onClick={() => setShowPrintModal(true)}
                className="px-5 py-2 rounded-full bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs shadow-md shadow-sky-200 flex items-center gap-1.5 transition-transform hover:scale-105"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak Dokumen Resmi</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('karakteristik')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
            activeTab === 'karakteristik'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          🌿 1. Karakteristik Satuan
        </button>
        <button
          onClick={() => setActiveTab('visi-misi')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
            activeTab === 'visi-misi'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          🎯 2. Visi, Misi & Tujuan
        </button>
        <button
          onClick={() => setActiveTab('p5')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
            activeTab === 'p5'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          🌟 3. Enam Dimensi P5 PAUD
        </button>
        <button
          onClick={() => setActiveTab('kalender')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
            activeTab === 'kalender'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          🗓️ 4. Kalender Pendidikan
        </button>
      </div>

      {/* Main Content Sections based on Active Tab */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
        
        {/* TAB 1: Karakteristik Satuan */}
        {activeTab === 'karakteristik' && (
          <div className="space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="font-display font-bold text-lg text-slate-800">
                A. Karakteristik Satuan Pendidikan {schoolProfile.namaSekolah}
              </h2>
              <p className="text-xs text-slate-500">
                Menggambarkan kondisi lingkungan sosial, budaya, dan kekhasan pendekatan bermain di TK.
              </p>
            </div>

            {isEditing ? (
              <textarea
                rows={6}
                value={formData.karakteristik}
                onChange={(e) => setFormData({ ...formData, karakteristik: e.target.value })}
                className="w-full p-4 border border-slate-200 rounded-2xl text-xs leading-relaxed focus:ring-2 focus:ring-emerald-400 focus:outline-hidden"
              />
            ) : (
              <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100 text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                {formData.karakteristik}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs">
                <span className="font-bold text-amber-900 block mb-1">🎮 Play-Based Learning</span>
                <span className="text-slate-600">Sentra bermain peran, sensori, balok, dan kreasi seni alami.</span>
              </div>
              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-xs">
                <span className="font-bold text-sky-900 block mb-1">🌱 Loose Parts Nusantara</span>
                <span className="text-slate-600">Pemanfaatan batu kali, ranting, biji-bijian, dan wadah daur ulang.</span>
              </div>
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs">
                <span className="font-bold text-rose-900 block mb-1">❤️ Budaya 5S & Ramah Anak</span>
                <span className="text-slate-600">Senyum, Salam, Sapa, Sopan, Santun dan perlindungan anak.</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Visi, Misi & Tujuan */}
        {activeTab === 'visi-misi' && (
          <div className="space-y-5">
            <div>
              <h2 className="font-display font-bold text-base text-slate-800 mb-2">
                B. Visi Lembaga
              </h2>
              {isEditing ? (
                <textarea
                  rows={3}
                  value={formData.visi}
                  onChange={(e) => setFormData({ ...formData, visi: e.target.value })}
                  className="w-full p-3 border border-slate-200 rounded-2xl text-xs focus:ring-2 focus:ring-emerald-400 focus:outline-hidden"
                />
              ) : (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 text-xs font-semibold text-slate-800 italic">
                  "{formData.visi}"
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-display font-bold text-base text-slate-800">
                  C. Misi Satuan Pendidikan
                </h2>
                {isEditing && (
                  <button
                    onClick={() => setFormData({ ...formData, misi: [...formData.misi, 'Misi baru...'] })}
                    className="text-xs font-bold text-emerald-600 flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Tambah Misi
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {formData.misi.map((m, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs">
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    {isEditing ? (
                      <div className="flex-1 flex items-center gap-2">
                        <input
                          type="text"
                          value={m}
                          onChange={(e) => {
                            const newM = [...formData.misi];
                            newM[idx] = e.target.value;
                            setFormData({ ...formData, misi: newM });
                          }}
                          className="flex-1 px-3 py-1.5 border border-slate-200 rounded-xl text-xs"
                        />
                        <button
                          onClick={() => {
                            const newM = formData.misi.filter((_, i) => i !== idx);
                            setFormData({ ...formData, misi: newM });
                          }}
                          className="text-rose-500 hover:text-rose-700 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-slate-700 font-medium">{m}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-display font-bold text-base text-slate-800">
                  D. Tujuan Pembelajaran PAUD
                </h2>
                {isEditing && (
                  <button
                    onClick={() => setFormData({ ...formData, tujuan: [...formData.tujuan, 'Tujuan baru...'] })}
                    className="text-xs font-bold text-emerald-600 flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Tambah Tujuan
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {formData.tujuan.map((t, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs">
                    <span className="w-5 h-5 rounded-full bg-sky-500 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    {isEditing ? (
                      <div className="flex-1 flex items-center gap-2">
                        <input
                          type="text"
                          value={t}
                          onChange={(e) => {
                            const newT = [...formData.tujuan];
                            newT[idx] = e.target.value;
                            setFormData({ ...formData, tujuan: newT });
                          }}
                          className="flex-1 px-3 py-1.5 border border-slate-200 rounded-xl text-xs"
                        />
                        <button
                          onClick={() => {
                            const newT = formData.tujuan.filter((_, i) => i !== idx);
                            setFormData({ ...formData, tujuan: newT });
                          }}
                          className="text-rose-500 hover:text-rose-700 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-slate-700 font-medium">{t}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: 6 Dimensi P5 PAUD */}
        {activeTab === 'p5' && (
          <div className="space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="font-display font-bold text-lg text-slate-800">
                E. Penguatan 6 Dimensi Profil Pelajar Pancasila (PAUD)
              </h2>
              <p className="text-xs text-slate-500">
                Konsep integrasi nilai-nilai luhur Pancasila dalam pembiasaan harian dan proyek bermakna anak usia dini.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.dimensiP5.map((dim, idx) => (
                <div key={idx} className="p-4 rounded-3xl bg-slate-50/80 border border-slate-200/80 text-xs space-y-2">
                  <div className="font-display font-bold text-sm text-slate-800 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center font-extrabold text-xs">
                      {idx + 1}
                    </span>
                    <span>{dim.nama}</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    {dim.deskripsi}
                  </p>
                  <div className="bg-white p-2.5 rounded-xl border border-emerald-200 text-emerald-800 text-[11px] font-medium">
                    <span className="font-bold">Aktivitas di TK: </span>
                    {dim.fokusPaud}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Kalender Pendidikan */}
        {activeTab === 'kalender' && (
          <div className="space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="font-display font-bold text-lg text-slate-800">
                F. Kalender Akademik & Agenda Tahunan
              </h2>
              <p className="text-xs text-slate-500">
                Rangkaian kegiatan tema semester ganjil dan genap tahun ajaran {schoolProfile.tahunAjaran}.
              </p>
            </div>

            <div className="divide-y divide-slate-100">
              {formData.kalenderRingkas.map((kal, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between gap-4 text-xs">
                  <div className="font-bold text-emerald-700 w-32 shrink-0">
                    {kal.bulan}
                  </div>
                  <div className="flex-1 text-slate-800 font-semibold">
                    {kal.kegiatan}
                  </div>
                  <div className="text-[11px] text-slate-500 bg-slate-100 px-3 py-1 rounded-full shrink-0">
                    {kal.keterangan}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Official Print Preview Modal */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full p-6 lg:p-8 shadow-2xl my-8 border border-slate-200 max-h-[90vh] overflow-y-auto print-container">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 no-print">
              <div>
                <h3 className="font-display font-bold text-lg text-slate-800">
                  Pratinjau Cetak Dokumen Resmi KOSP
                </h3>
                <span className="text-xs text-slate-500">
                  Format resmi pengesahan kurikulum dinas pendidikan
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <Printer className="w-4 h-4" />
                  <span>Cetak Sekarang (Print / PDF)</span>
                </button>
                <button
                  onClick={() => setShowPrintModal(false)}
                  className="px-3 py-2 rounded-full border border-slate-200 text-slate-500 hover:bg-slate-100 text-xs font-bold"
                >
                  Tutup
                </button>
              </div>
            </div>

            {/* Official KOSP Document Sheet */}
            <div className="mt-6 font-serif text-slate-900 text-sm space-y-6 max-w-3xl mx-auto">
              
              {/* Kop Surat Resmi */}
              <div className="text-center border-b-2 border-slate-900 pb-4">
                <h3 className="text-xs uppercase tracking-widest font-sans font-bold text-slate-600">
                  Pemerintah Kota Depok • Dinas Pendidikan
                </h3>
                <h1 className="text-xl font-bold font-serif uppercase tracking-wider mt-1">
                  {schoolProfile.namaSekolah}
                </h1>
                <p className="text-xs font-sans text-slate-600 mt-1">
                  {schoolProfile.alamat}, {schoolProfile.kecamatan}, {schoolProfile.kota} • Telp: {schoolProfile.telepon} • NPSN: {schoolProfile.npsn}
                </p>
              </div>

              {/* Title */}
              <div className="text-center py-4">
                <h2 className="text-base font-bold uppercase underline tracking-wide">
                  KURIKULUM OPERASIONAL SATUAN PENDIDIKAN (KOSP)
                </h2>
                <p className="text-xs font-sans text-slate-700 mt-1">
                  TAHUN AJARAN {schoolProfile.tahunAjaran}
                </p>
              </div>

              {/* Body */}
              <div className="space-y-4 font-sans text-xs leading-relaxed text-slate-800">
                <section>
                  <h4 className="font-bold text-sm text-slate-900 mb-1">I. KARAKTERISTIK SATUAN PENDIDIKAN</h4>
                  <p className="text-justify">{formData.karakteristik}</p>
                </section>

                <section>
                  <h4 className="font-bold text-sm text-slate-900 mb-1">II. VISI, MISI DAN TUJUAN</h4>
                  <div className="space-y-2">
                    <div>
                      <span className="font-bold">A. Visi:</span>
                      <p className="italic ml-4">"{formData.visi}"</p>
                    </div>
                    <div>
                      <span className="font-bold">B. Misi:</span>
                      <ol className="list-decimal ml-6 space-y-1">
                        {formData.misi.map((m, i) => <li key={i}>{m}</li>)}
                      </ol>
                    </div>
                    <div>
                      <span className="font-bold">C. Tujuan Satuan:</span>
                      <ol className="list-decimal ml-6 space-y-1">
                        {formData.tujuan.map((t, i) => <li key={i}>{t}</li>)}
                      </ol>
                    </div>
                  </div>
                </section>

                <section>
                  <h4 className="font-bold text-sm text-slate-900 mb-1">III. PENGORGANISASIAN PEMBELAJARAN & PROFIL PELAJAR PANCASILA</h4>
                  <p className="text-justify mb-2">
                    Pembelajaran di {schoolProfile.namaSekolah} dilaksanakan dengan model Sentra / Area (Bermain Balok, Main Peran, Sensorimotor, Seni & Kreativitas, Literasi & STEAM) dengan muatan 6 Dimensi Profil Pelajar Pancasila:
                  </p>
                  <ul className="list-disc ml-6 space-y-1">
                    {formData.dimensiP5.map((d, i) => (
                      <li key={i}>
                        <span className="font-bold">{d.nama}:</span> {d.deskripsi}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              {/* Lembar Tanda Tangan Pengesahan */}
              <div className="pt-8 border-t border-slate-300 grid grid-cols-2 text-center text-xs font-sans">
                <div>
                  <p className="text-slate-600 mb-16">
                    Mengetahui,<br />
                    Pengawas Pembina PAUD
                  </p>
                  <p className="font-bold underline text-slate-900">
                    Dra. Hj. Nurjanah, M.Pd
                  </p>
                  <p className="text-[11px] text-slate-600">NIP. 19710314 199803 2 004</p>
                </div>
                <div>
                  <p className="text-slate-600 mb-16">
                    {schoolProfile.kota}, 14 Juli 2026<br />
                    Kepala {schoolProfile.namaSekolah}
                  </p>
                  <p className="font-bold underline text-slate-900">
                    {schoolProfile.namaKepalaSekolah}
                  </p>
                  <p className="text-[11px] text-slate-600">NIP. {schoolProfile.nipKepalaSekolah}</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
