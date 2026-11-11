import React, { useState } from 'react';
import { 
  Sparkles, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  User, 
  Phone, 
  Calendar, 
  MapPin, 
  Star, 
  FileText,
  Check
} from 'lucide-react';
import { Student, Teacher, ClassType } from '../types';
import { fireJoyfulConfetti } from '../utils/confetti';

interface StudentsTeachersViewProps {
  students: Student[];
  teachers: Teacher[];
  activeClass: ClassType;
  onSaveStudents: (list: Student[]) => void;
  onSaveTeachers: (list: Teacher[]) => void;
  onNavigateToAssessment: (studentId: string) => void;
  onNavigateToRaport: (studentId: string) => void;
}

export const StudentsTeachersView: React.FC<StudentsTeachersViewProps> = ({
  students,
  teachers,
  activeClass,
  onSaveStudents,
  onSaveTeachers,
  onNavigateToAssessment,
  onNavigateToRaport
}) => {
  const [activeTab, setActiveTab] = useState<'siswa' | 'guru'>('siswa');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterClass, setFilterClass] = useState<string>(activeClass);

  // Student Modal state
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  // Teacher Modal state
  const [showTeacherModal, setShowTeacherModal] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [teacherNama, setTeacherNama] = useState('');
  const [teacherNip, setTeacherNip] = useState('');
  const [teacherJabatan, setTeacherJabatan] = useState<Teacher['jabatan']>('Guru Kelas A');
  const [teacherPendidikan, setTeacherPendidikan] = useState('');
  const [teacherTelepon, setTeacherTelepon] = useState('');
  const [teacherFoto, setTeacherFoto] = useState('');

  // Form fields
  const [namaLengkap, setNamaLengkap] = useState('');
  const [namaPanggilan, setNamaPanggilan] = useState('');
  const [nisn, setNisn] = useState('');
  const [kelompok, setKelompok] = useState<ClassType>(activeClass);
  const [jenisKelamin, setJenisKelamin] = useState<'Laki-laki' | 'Perempuan'>('Laki-laki');
  const [ttl, setTtl] = useState('');
  const [namaAyah, setNamaAyah] = useState('');
  const [namaIbu, setNamaIbu] = useState('');
  const [pekerjaan, setPekerjaan] = useState('');
  const [alamat, setAlamat] = useState('');
  const [telepon, setTelepon] = useState('');
  const [fotoUrl, setFotoUrl] = useState('');

  const filteredStudents = students.filter(s => {
    const matchClass = filterClass === 'Semua' || s.kelompok === filterClass;
    const matchSearch = s.namaLengkap.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.namaPanggilan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.nisn.includes(searchQuery);
    return matchClass && matchSearch;
  });

  const handleOpenAddStudent = () => {
    setEditingStudent(null);
    setNamaLengkap('');
    setNamaPanggilan('');
    setNisn(`320109${Math.floor(1000 + Math.random() * 9000)}`);
    setKelompok(activeClass);
    setJenisKelamin('Laki-laki');
    setTtl('Depok, 10 Mei 2021');
    setNamaAyah('');
    setNamaIbu('');
    setPekerjaan('Karyawan / Wiraswasta');
    setAlamat('Jl. Ceria Makmur No. 10');
    setTelepon('0812-3456-7890');
    setFotoUrl(`https://api.dicebear.com/7.x/bottts/svg?seed=Anak${Date.now()}&backgroundColor=ffdfbf`);
    setShowStudentModal(true);
  };

  const handleOpenEditStudent = (s: Student) => {
    setEditingStudent(s);
    setNamaLengkap(s.namaLengkap);
    setNamaPanggilan(s.namaPanggilan);
    setNisn(s.nisn);
    setKelompok(s.kelompok);
    setJenisKelamin(s.jenisKelamin);
    setTtl(s.tempatTanggalLahir);
    setNamaAyah(s.namaAyah);
    setNamaIbu(s.namaIbu);
    setPekerjaan(s.pekerjaanOrtu);
    setAlamat(s.alamat);
    setTelepon(s.teleponOrtu);
    setFotoUrl(s.fotoUrl);
    setShowStudentModal(true);
  };

  const handleSaveStudent = () => {
    if (!namaLengkap.trim()) {
      alert('Nama lengkap murid wajib diisi.');
      return;
    }

    if (editingStudent) {
      const updated = students.map(s => s.id === editingStudent.id ? {
        ...s,
        namaLengkap,
        namaPanggilan: namaPanggilan || namaLengkap.split(' ')[0],
        nisn,
        kelompok,
        jenisKelamin,
        tempatTanggalLahir: ttl,
        namaAyah,
        namaIbu,
        pekerjaanOrtu: pekerjaan,
        alamat,
        teleponOrtu: telepon,
        fotoUrl
      } : s);
      onSaveStudents(updated);
    } else {
      const newStd: Student = {
        id: `std-${Date.now()}`,
        namaLengkap,
        namaPanggilan: namaPanggilan || namaLengkap.split(' ')[0],
        nisn,
        kelompok,
        jenisKelamin,
        tempatTanggalLahir: ttl,
        namaAyah,
        namaIbu,
        pekerjaanOrtu: pekerjaan,
        alamat,
        teleponOrtu: telepon,
        fotoUrl
      };
      onSaveStudents([...students, newStd]);
    }

    setShowStudentModal(false);
    fireJoyfulConfetti();
  };

  const handleDeleteStudent = (id: string) => {
    if (confirm('Yakin ingin menghapus data murid ini?')) {
      onSaveStudents(students.filter(s => s.id !== id));
    }
  };

  const handleOpenAddTeacher = () => {
    setEditingTeacher(null);
    setTeacherNama('');
    setTeacherNip('-');
    setTeacherJabatan('Guru Pendamping');
    setTeacherPendidikan('S1 PG-PAUD');
    setTeacherTelepon('0812-3456-7890');
    setTeacherFoto(`https://api.dicebear.com/7.x/avataaars/svg?seed=Guru${Date.now()}&hair=hijab`);
    setShowTeacherModal(true);
  };

  const handleOpenEditTeacher = (t: Teacher) => {
    setEditingTeacher(t);
    setTeacherNama(t.nama);
    setTeacherNip(t.nip);
    setTeacherJabatan(t.jabatan);
    setTeacherPendidikan(t.pendidikanTerakhir);
    setTeacherTelepon(t.telepon);
    setTeacherFoto(t.fotoUrl);
    setShowTeacherModal(true);
  };

  const handleSaveTeacher = () => {
    if (!teacherNama.trim()) {
      alert('Nama guru / kepala sekolah wajib diisi.');
      return;
    }

    if (editingTeacher) {
      const updated = teachers.map(t => t.id === editingTeacher.id ? {
        ...t,
        nama: teacherNama,
        nip: teacherNip,
        jabatan: teacherJabatan,
        pendidikanTerakhir: teacherPendidikan,
        telepon: teacherTelepon,
        fotoUrl: teacherFoto
      } : t);
      onSaveTeachers(updated);
    } else {
      const newTeacher: Teacher = {
        id: `t-${Date.now()}`,
        nama: teacherNama,
        nip: teacherNip,
        jabatan: teacherJabatan,
        pendidikanTerakhir: teacherPendidikan,
        telepon: teacherTelepon,
        fotoUrl: teacherFoto || `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}&hair=hijab`
      };
      onSaveTeachers([...teachers, newTeacher]);
    }

    setShowTeacherModal(false);
    fireJoyfulConfetti();
  };

  const handleDeleteTeacher = (id: string) => {
    if (teachers.length <= 1) {
      alert('Minimal harus ada 1 guru atau kepala sekolah di satuan TK.');
      return;
    }
    if (confirm('Yakin ingin menghapus data guru / tenaga pendidik ini?')) {
      onSaveTeachers(teachers.filter(t => t.id !== id));
      fireJoyfulConfetti();
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-3xl border border-emerald-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-500 text-white flex items-center justify-center text-2xl shadow-sm shadow-emerald-200">
            🎒
          </div>
          <div>
            <h1 className="font-display font-extrabold text-xl text-slate-800">
              Data Terpadu Siswa & Tenaga Pendidik
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Terhubung langsung dengan lembar asesmen harian dan pembuatan raport narasi
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === 'siswa' && (
            <button
              onClick={handleOpenAddStudent}
              className="px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-200 flex items-center gap-1.5 transition-transform hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>+ Tambah Siswa Baru</span>
            </button>
          )}
          {activeTab === 'guru' && (
            <button
              onClick={handleOpenAddTeacher}
              className="px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-200 flex items-center gap-1.5 transition-transform hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>+ Tambah Guru / PTK</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs and Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center p-1 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <button
            onClick={() => setActiveTab('siswa')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'siswa'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🎒 Data Murid ({students.length})
          </button>
          <button
            onClick={() => setActiveTab('guru')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'guru'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            👩‍🏫 Data Guru & Kepala TK ({teachers.length})
          </button>
        </div>

        {activeTab === 'siswa' && (
          <div className="flex items-center gap-2 flex-wrap">
            {/* Filter class */}
            <div className="flex items-center bg-white p-1 rounded-2xl border border-slate-200 shadow-2xs text-xs font-bold">
              {['Semua', 'A', 'B'].map((cls) => (
                <button
                  key={cls}
                  onClick={() => setFilterClass(cls)}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    filterClass === cls
                      ? 'bg-emerald-500 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cls === 'Semua' ? 'Semua Kelas' : `Kelas ${cls}`}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Cari nama / NISN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-2 bg-white border border-slate-200 rounded-2xl text-xs focus:ring-2 focus:ring-emerald-400 focus:outline-hidden w-44 md:w-56"
              />
            </div>
          </div>
        )}
      </div>

      {/* TAB 1: DATA SISWA */}
      {activeTab === 'siswa' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-emerald-50/70 border-b border-emerald-100 text-emerald-950 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-4 w-12 text-center">No</th>
                  <th className="py-3.5 px-4 w-60">Foto & Nama Lengkap</th>
                  <th className="py-3.5 px-4 w-28">NISN / Kelas</th>
                  <th className="py-3.5 px-4">Tempat, Tanggal Lahir</th>
                  <th className="py-3.5 px-4">Orang Tua / Wali</th>
                  <th className="py-3.5 px-4 w-52 text-center">Aksi Cepat Terhubung</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((child, idx) => (
                    <tr key={child.id} className="hover:bg-amber-50/40 transition-colors">
                      <td className="py-3.5 px-4 text-center font-bold text-slate-400">
                        {idx + 1}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={child.fotoUrl}
                            alt={child.namaPanggilan}
                            className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 p-0.5 object-cover shrink-0"
                          />
                          <div className="min-w-0">
                            <span className="font-bold text-slate-800 block text-xs truncate">
                              {child.namaLengkap}
                            </span>
                            <span className="text-[11px] text-slate-500">
                              Panggilan: <strong className="text-emerald-700">{child.namaPanggilan}</strong> ({child.jenisKelamin === 'Laki-laki' ? 'L' : 'P'})
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-700 block">{child.nisn}</span>
                        <span className="inline-block mt-0.5 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          Kelas {child.kelompok}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-slate-600">
                        {child.tempatTanggalLahir}
                      </td>

                      <td className="py-3.5 px-4 text-slate-600 text-[11px]">
                        <div>Ayah: {child.namaAyah || '-'}</div>
                        <div>Ibu: {child.namaIbu || '-'}</div>
                        <div className="text-slate-400">{child.teleponOrtu}</div>
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          {/* Direct Jump to Assessment */}
                          <button
                            onClick={() => onNavigateToAssessment(child.id)}
                            className="px-2.5 py-1 rounded-full bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 text-[11px] font-bold flex items-center gap-1"
                            title="Buka Asesmen anak ini"
                          >
                            <Star className="w-3 h-3 text-sky-600" />
                            <span>Nilai</span>
                          </button>

                          {/* Direct Jump to Raport */}
                          <button
                            onClick={() => onNavigateToRaport(child.id)}
                            className="px-2.5 py-1 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 text-[11px] font-bold flex items-center gap-1"
                            title="Buka Raport Narasi anak ini"
                          >
                            <FileText className="w-3 h-3 text-indigo-600" />
                            <span>Raport</span>
                          </button>

                          <button
                            onClick={() => handleOpenEditStudent(child)}
                            className="p-1 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50"
                            title="Edit Data"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleDeleteStudent(child.id)}
                            className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                            title="Hapus Murid"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400 italic">
                      Tidak ada murid ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: DATA GURU & KEPALA SEKOLAH */}
      {activeTab === 'guru' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between"
            >
              <div className="text-center space-y-3">
                <img
                  src={teacher.fotoUrl}
                  alt={teacher.nama}
                  className="w-20 h-20 mx-auto rounded-full bg-emerald-50 border-2 border-emerald-400 p-1 object-cover shadow-xs"
                />
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {teacher.jabatan}
                  </span>
                  <h3 className="font-display font-bold text-base text-slate-800 mt-2">
                    {teacher.nama}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">NIP: {teacher.nip}</p>
                </div>

                <div className="pt-2 text-xs text-slate-600 space-y-1 text-left bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <div>
                    <strong className="text-slate-700">Pendidikan: </strong>
                    <span>{teacher.pendidikanTerakhir}</span>
                  </div>
                  <div>
                    <strong className="text-slate-700">Telepon: </strong>
                    <span>{teacher.telepon}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-600">
                  ✓ Dapodik PAUD
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEditTeacher(teacher)}
                    className="px-3 py-1 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs flex items-center gap-1 transition-colors"
                    title="Edit Profil Guru / Kepala TK"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-amber-700" />
                    <span>Edit Profil</span>
                  </button>
                  <button
                    onClick={() => handleDeleteTeacher(teacher.id)}
                    className="p-1 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Hapus Data Guru"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Student Modal */}
      {showStudentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-emerald-200 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-display font-bold text-lg text-slate-800">
                {editingStudent ? 'Edit Data Murid' : 'Tambah Data Murid Baru'}
              </h3>
              <button
                onClick={() => setShowStudentModal(false)}
                className="w-8 h-8 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 my-4 text-xs max-h-[70vh] overflow-y-auto pr-1">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    value={namaLengkap}
                    onChange={(e) => setNamaLengkap(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nama Panggilan</label>
                  <input
                    type="text"
                    value={namaPanggilan}
                    onChange={(e) => setNamaPanggilan(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">NISN</label>
                  <input
                    type="text"
                    value={nisn}
                    onChange={(e) => setNisn(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Kelompok Kelas</label>
                  <select
                    value={kelompok}
                    onChange={(e) => setKelompok(e.target.value as ClassType)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  >
                    <option value="A">Kelompok A (4-5 Tahun)</option>
                    <option value="B">Kelompok B (5-6 Tahun)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Jenis Kelamin</label>
                  <select
                    value={jenisKelamin}
                    onChange={(e) => setJenisKelamin(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  >
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tempat, Tanggal Lahir</label>
                  <input
                    type="text"
                    value={ttl}
                    onChange={(e) => setTtl(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nama Ayah</label>
                  <input
                    type="text"
                    value={namaAyah}
                    onChange={(e) => setNamaAyah(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nama Ibu</label>
                  <input
                    type="text"
                    value={namaIbu}
                    onChange={(e) => setNamaIbu(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">No. Telepon / WhatsApp Ortu</label>
                <input
                  type="text"
                  value={telepon}
                  onChange={(e) => setTelepon(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Alamat Domisili</label>
                <input
                  type="text"
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowStudentModal(false)}
                className="px-4 py-2 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-xs"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSaveStudent}
                className="px-5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-200 flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                Simpan Data Murid
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Teacher Modal */}
      {showTeacherModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-emerald-200 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xl">👩‍🏫</span>
                <h3 className="font-display font-bold text-lg text-slate-800">
                  {editingTeacher ? 'Edit Profil Guru / Kepala TK' : 'Tambah Guru / Tenaga Pendidik Baru'}
                </h3>
              </div>
              <button
                onClick={() => setShowTeacherModal(false)}
                className="w-8 h-8 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3.5 my-4 text-xs max-h-[70vh] overflow-y-auto pr-1">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Nama Lengkap & Gelar Pendidik
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Siti Nurhaliza, S.Pd"
                  value={teacherNama}
                  onChange={(e) => setTeacherNama(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">NIP (atau NUPTK/GTT)</label>
                  <input
                    type="text"
                    placeholder="19890412 201503 2 005 atau -"
                    value={teacherNip}
                    onChange={(e) => setTeacherNip(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Jabatan / Tugas di Satuan</label>
                  <select
                    value={teacherJabatan}
                    onChange={(e) => setTeacherJabatan(e.target.value as Teacher['jabatan'])}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:outline-hidden font-medium"
                  >
                    <option value="Kepala Sekolah">Kepala Sekolah</option>
                    <option value="Guru Kelas A">Guru Kelas A (4-5 Th)</option>
                    <option value="Guru Kelas B">Guru Kelas B (5-6 Th)</option>
                    <option value="Guru Pendamping">Guru Pendamping / Sentra</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Pendidikan Terakhir & Program Studi
                </label>
                <input
                  type="text"
                  placeholder="Contoh: S1 PG-PAUD Universitas Negeri Jakarta"
                  value={teacherPendidikan}
                  onChange={(e) => setTeacherPendidikan(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Nomor Telepon / WhatsApp
                </label>
                <input
                  type="text"
                  placeholder="Contoh: 0812-8877-6655"
                  value={teacherTelepon}
                  onChange={(e) => setTeacherTelepon(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  URL Foto / Avatar Pendidik
                </label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={teacherFoto}
                  onChange={(e) => setTeacherFoto(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:outline-hidden"
                />
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] text-slate-400 font-semibold">Avatar Cepat:</span>
                  <button
                    type="button"
                    onClick={() => setTeacherFoto(`https://api.dicebear.com/7.x/avataaars/svg?seed=Hijab${Date.now()}&hair=hijab`)}
                    className="px-2.5 py-0.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 text-[10px] font-semibold"
                  >
                    🧕 Hijab
                  </button>
                  <button
                    type="button"
                    onClick={() => setTeacherFoto(`https://api.dicebear.com/7.x/avataaars/svg?seed=GuruWanita${Date.now()}`)}
                    className="px-2.5 py-0.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 text-[10px] font-semibold"
                  >
                    👩 Wanita
                  </button>
                  <button
                    type="button"
                    onClick={() => setTeacherFoto(`https://api.dicebear.com/7.x/avataaars/svg?seed=GuruPria${Date.now()}`)}
                    className="px-2.5 py-0.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 text-[10px] font-semibold"
                  >
                    👨 Pria
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowTeacherModal(false)}
                className="px-4 py-2 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-xs"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSaveTeacher}
                className="px-5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-200 flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Simpan Profil Guru</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
