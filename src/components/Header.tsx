import React, { useState } from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  Download, 
  Upload, 
  Menu, 
  School,
  Calendar,
  Users,
  ChevronDown
} from 'lucide-react';
import { SchoolProfile, SemesterType, ClassType } from '../types';

interface HeaderProps {
  schoolProfile: SchoolProfile;
  onUpdateSchoolProfile: (profile: SchoolProfile) => void;
  onResetData: () => void;
  onExportData: () => void;
  onImportData: () => void;
  onToggleSidebarMobile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  schoolProfile,
  onUpdateSchoolProfile,
  onResetData,
  onExportData,
  onImportData,
  onToggleSidebarMobile,
}) => {
  const [showSchoolModal, setShowSchoolModal] = useState(false);
  const [tempProfile, setTempProfile] = useState<SchoolProfile>(schoolProfile);

  const handleSemesterChange = (newSem: SemesterType) => {
    onUpdateSchoolProfile({ ...schoolProfile, semesterAktif: newSem });
  };

  const handleClassChange = (newClass: ClassType) => {
    onUpdateSchoolProfile({ ...schoolProfile, kelompokAktif: newClass });
  };

  const handleSaveProfile = () => {
    onUpdateSchoolProfile(tempProfile);
    setShowSchoolModal(false);
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-amber-200/60 shadow-xs px-4 lg:px-6 py-2.5 transition-all">
        <div className="flex items-center justify-between gap-2 lg:gap-4">
          
          {/* Left: Mobile hamburger & School Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleSidebarMobile}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
              aria-label="Buka menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div 
              onClick={() => { setTempProfile(schoolProfile); setShowSchoolModal(true); }}
              className="group flex items-center gap-2.5 cursor-pointer py-1 px-2 -ml-2 rounded-xl hover:bg-amber-50/80 transition-colors"
              title="Klik untuk ubah profil satuan TK"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-amber-300 flex items-center justify-center text-white shadow-sm shadow-emerald-200 group-hover:scale-105 transition-transform">
                <School className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-bold text-base lg:text-lg text-slate-800 tracking-tight leading-none group-hover:text-emerald-700 transition-colors">
                    {schoolProfile.namaSekolah}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600" />
                </div>
                <div className="text-[11px] font-medium text-slate-500 flex items-center gap-1.5 leading-tight mt-0.5">
                  <span className="text-emerald-600 font-semibold">Kurikulum Merdeka PAUD</span>
                  <span>•</span>
                  <span>NPSN: {schoolProfile.npsn}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Center / Right: Academic Year, Semester & Class Switchers */}
          <div className="flex items-center gap-2 lg:gap-3 flex-wrap justify-end">
            
            {/* Year Tag */}
            <div className="hidden sm:flex items-center gap-1.5 bg-amber-50 text-amber-900 border border-amber-200/80 px-2.5 py-1 rounded-full text-xs font-semibold">
              <Calendar className="w-3.5 h-3.5 text-amber-600" />
              <span>{schoolProfile.tahunAjaran}</span>
            </div>

            {/* Semester Switcher */}
            <div className="flex items-center p-0.5 bg-slate-100 rounded-full border border-slate-200 text-xs font-semibold">
              <button
                onClick={() => handleSemesterChange('Ganjil')}
                className={`px-3 py-1 rounded-full transition-all ${
                  schoolProfile.semesterAktif === 'Ganjil'
                    ? 'bg-emerald-500 text-white shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Ganjil
              </button>
              <button
                onClick={() => handleSemesterChange('Genap')}
                className={`px-3 py-1 rounded-full transition-all ${
                  schoolProfile.semesterAktif === 'Genap'
                    ? 'bg-emerald-500 text-white shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Genap
              </button>
            </div>

            {/* Class Switcher */}
            <div className="flex items-center p-0.5 bg-orange-50 rounded-full border border-orange-200 text-xs font-semibold">
              <button
                onClick={() => handleClassChange('A')}
                className={`px-3 py-1 rounded-full transition-all flex items-center gap-1 ${
                  schoolProfile.kelompokAktif === 'A'
                    ? 'bg-orange-500 text-white shadow-xs font-bold'
                    : 'text-orange-900 hover:text-orange-950'
                }`}
                title="Kelompok A (Usia 4-5 Tahun)"
              >
                <Users className="w-3 h-3" />
                <span>Kelas A</span>
              </button>
              <button
                onClick={() => handleClassChange('B')}
                className={`px-3 py-1 rounded-full transition-all flex items-center gap-1 ${
                  schoolProfile.kelompokAktif === 'B'
                    ? 'bg-orange-500 text-white shadow-xs font-bold'
                    : 'text-orange-900 hover:text-orange-950'
                }`}
                title="Kelompok B (Usia 5-6 Tahun)"
              >
                <Users className="w-3 h-3" />
                <span>Kelas B</span>
              </button>
            </div>

            {/* Action Buttons: Export & Reset */}
            <div className="hidden md:flex items-center gap-1.5 ml-1">
              <button
                onClick={onExportData}
                className="p-1.5 rounded-full text-slate-500 hover:text-sky-600 hover:bg-sky-50 transition-colors"
                title="Cadangkan / Ekspor Data JSON"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                onClick={onImportData}
                className="p-1.5 rounded-full text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                title="Pulihkan / Impor Data JSON"
              >
                <Upload className="w-4 h-4" />
              </button>
              <button
                onClick={onResetData}
                className="p-1.5 rounded-full text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                title="Isi Ulang Data Contoh / Reset"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </header>

      {/* School Profile Edit Modal */}
      {showSchoolModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-amber-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  🏫
                </div>
                <h3 className="font-display font-bold text-lg text-slate-800">
                  Profil Lembaga & Satuan PAUD
                </h3>
              </div>
              <button
                onClick={() => setShowSchoolModal(false)}
                className="w-8 h-8 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3.5 my-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nama Satuan TK / PAUD</label>
                <input
                  type="text"
                  value={tempProfile.namaSekolah}
                  onChange={(e) => setTempProfile({ ...tempProfile, namaSekolah: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">NPSN</label>
                  <input
                    type="text"
                    value={tempProfile.npsn}
                    onChange={(e) => setTempProfile({ ...tempProfile, npsn: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tahun Ajaran</label>
                  <input
                    type="text"
                    value={tempProfile.tahunAjaran}
                    onChange={(e) => setTempProfile({ ...tempProfile, tahunAjaran: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Alamat Lengkap</label>
                <input
                  type="text"
                  value={tempProfile.alamat}
                  onChange={(e) => setTempProfile({ ...tempProfile, alamat: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Kecamatan / Kota</label>
                  <input
                    type="text"
                    value={`${tempProfile.kecamatan}, ${tempProfile.kota}`}
                    onChange={(e) => {
                      const [kec, kot] = e.target.value.split(',');
                      setTempProfile({ ...tempProfile, kecamatan: kec || '', kota: kot ? kot.trim() : tempProfile.kota });
                    }}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Telepon / HP</label>
                  <input
                    type="text"
                    value={tempProfile.telepon}
                    onChange={(e) => setTempProfile({ ...tempProfile, telepon: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nama Kepala Sekolah</label>
                  <input
                    type="text"
                    value={tempProfile.namaKepalaSekolah}
                    onChange={(e) => setTempProfile({ ...tempProfile, namaKepalaSekolah: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">NIP Kepala Sekolah</label>
                  <input
                    type="text"
                    value={tempProfile.nipKepalaSekolah}
                    onChange={(e) => setTempProfile({ ...tempProfile, nipKepalaSekolah: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowSchoolModal(false)}
                className="px-4 py-2 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-xs"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSaveProfile}
                className="px-5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-200 flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Simpan Profil
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
