import React, { useState, useEffect, useRef } from 'react';
import { 
  SchoolProfile, 
  KospData, 
  ProtaItem, 
  PromesItem, 
  RppmItem, 
  RpphItem, 
  BankActivityItem, 
  Student, 
  Teacher, 
  AssessmentRecord, 
  RaportNarrative, 
  DailyTeacherJournal 
} from './types';
import { StorageService } from './utils/storage';
import { Header } from './components/Header';
import { Sidebar, ActiveTabType } from './components/Sidebar';
import { DashboardView } from './views/DashboardView';
import { KospView } from './views/KospView';
import { ProtaPromesView } from './views/ProtaPromesView';
import { RppmView } from './views/RppmView';
import { RpphView } from './views/RpphView';
import { BankKegiatanView } from './views/BankKegiatanView';
import { AssessmentView } from './views/AssessmentView';
import { RaportView } from './views/RaportView';
import { StudentsTeachersView } from './views/StudentsTeachersView';
import { TeacherJournalView } from './views/TeacherJournalView';
import { fireJoyfulConfetti } from './utils/confetti';

export default function App() {
  // Global Data State initialized from StorageService
  const [schoolProfile, setSchoolProfile] = useState<SchoolProfile>(() => StorageService.getSchoolProfile());
  const [kospData, setKospData] = useState<KospData>(() => StorageService.getKosp());
  const [protaList, setProtaList] = useState<ProtaItem[]>(() => StorageService.getProtaList());
  const [promesList, setPromesList] = useState<PromesItem[]>(() => StorageService.getPromesList());
  const [rppmList, setRppmList] = useState<RppmItem[]>(() => StorageService.getRppmList());
  const [rpphList, setRpphList] = useState<RpphItem[]>(() => StorageService.getRpphList());
  const [bankActivities, setBankActivities] = useState<BankActivityItem[]>(() => StorageService.getBankActivities());
  const [students, setStudents] = useState<Student[]>(() => StorageService.getStudents());
  const [teachers, setTeachers] = useState<Teacher[]>(() => StorageService.getTeachers());
  const [assessments, setAssessments] = useState<AssessmentRecord[]>(() => StorageService.getAssessments());
  const [raportList, setRaportList] = useState<RaportNarrative[]>(() => StorageService.getRaportList());
  const [journals, setJournals] = useState<DailyTeacherJournal[]>(() => StorageService.getJournals());

  // Navigation & UI State
  const [activeTab, setActiveTab] = useState<ActiveTabType>('dashboard');
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState<boolean>(false);
  const [targetStudentIdForAssessment, setTargetStudentIdForAssessment] = useState<string | undefined>(undefined);
  const [targetStudentIdForRaport, setTargetStudentIdForRaport] = useState<string | undefined>(undefined);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Updaters with persistence & feedback
  const handleUpdateSchoolProfile = (profile: SchoolProfile) => {
    setSchoolProfile(profile);
    StorageService.saveSchoolProfile(profile);
    showToast('Profil TK Berhasil Disimpan 🎉');
  };

  const handleSaveKosp = (data: KospData) => {
    setKospData(data);
    StorageService.saveKosp(data);
    showToast('Dokumen KOSP Berhasil Disimpan 🎉');
  };

  const handleSaveProta = (list: ProtaItem[]) => {
    setProtaList(list);
    StorageService.saveProtaList(list);
    showToast('Data PROTA Berhasil Disimpan 🎉');
  };

  const handleSavePromes = (list: PromesItem[]) => {
    setPromesList(list);
    StorageService.savePromesList(list);
    showToast('Data PROMES Berhasil Disimpan 🎉');
  };

  const handleSaveRppm = (list: RppmItem[]) => {
    setRppmList(list);
    StorageService.saveRppmList(list);
    showToast('Modul RPPM Berhasil Disimpan 🎉');
  };

  const handleSaveRpph = (list: RpphItem[]) => {
    setRpphList(list);
    StorageService.saveRpphList(list);
    showToast('RPPH Berhasil Disimpan 🎉');
  };

  const handleSaveBankActivities = (list: BankActivityItem[]) => {
    setBankActivities(list);
    StorageService.saveBankActivities(list);
    showToast('Bank Kegiatan Berhasil Diperbarui 🎉');
  };

  const handleSaveStudents = (list: Student[]) => {
    setStudents(list);
    StorageService.saveStudents(list);
    showToast('Data Siswa Berhasil Diperbarui 🎉');
  };

  const handleSaveTeachers = (list: Teacher[]) => {
    setTeachers(list);
    StorageService.saveTeachers(list);
    showToast('Data Guru Berhasil Diperbarui 🎉');
  };

  const handleSaveAssessment = (record: AssessmentRecord) => {
    const exists = assessments.some(a => a.id === record.id);
    let updated: AssessmentRecord[];
    if (exists) {
      updated = assessments.map(a => a.id === record.id ? record : a);
    } else {
      updated = [record, ...assessments];
    }
    setAssessments(updated);
    StorageService.saveAssessments(updated);
    showToast('Asesmen Harian Berhasil Disimpan 🎉');
  };

  const handleBatchSaveAssessments = (records: AssessmentRecord[]) => {
    const updated = [...records, ...assessments.filter(a => !records.some(r => r.studentId === a.studentId && r.tanggal === a.tanggal))];
    setAssessments(updated);
    StorageService.saveAssessments(updated);
    showToast('Asesmen 1 Kelas Berhasil Disimpan 🎉');
  };

  const handleSaveRaportList = (list: RaportNarrative[]) => {
    setRaportList(list);
    StorageService.saveRaportList(list);
    showToast('Raport Narasi Berhasil Disimpan 🎉');
  };

  const handleSaveJournals = (list: DailyTeacherJournal[]) => {
    setJournals(list);
    StorageService.saveJournals(list);
    showToast('Jurnal Harian Guru Berhasil Disimpan 🎉');
  };

  // Reset to sample data
  const handleResetData = () => {
    if (confirm('Apakah Anda yakin ingin mengisi ulang semua data contoh (PROTA, PROMES, RPPM, RPPH, 10 Siswa, Asesmen & Raport)?')) {
      StorageService.resetAllToDefault();
      setSchoolProfile(StorageService.getSchoolProfile());
      setKospData(StorageService.getKosp());
      setProtaList(StorageService.getProtaList());
      setPromesList(StorageService.getPromesList());
      setRppmList(StorageService.getRppmList());
      setRpphList(StorageService.getRpphList());
      setBankActivities(StorageService.getBankActivities());
      setStudents(StorageService.getStudents());
      setTeachers(StorageService.getTeachers());
      setAssessments(StorageService.getAssessments());
      setRaportList(StorageService.getRaportList());
      setJournals(StorageService.getJournals());
      fireJoyfulConfetti();
      showToast('Data Contoh Berhasil Dipulihkan 🎉');
    }
  };

  // Export JSON Backup
  const handleExportData = () => {
    const jsonStr = StorageService.exportAllDataAsJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `backup-si-kurikulum-tk-ceria-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Cadangan Data Berhasil Diunduh 📥');
  };

  // Import JSON Backup
  const handleImportData = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = StorageService.importBackupJSON(content);
      if (success) {
        setSchoolProfile(StorageService.getSchoolProfile());
        setKospData(StorageService.getKosp());
        setProtaList(StorageService.getProtaList());
        setPromesList(StorageService.getPromesList());
        setRppmList(StorageService.getRppmList());
        setRpphList(StorageService.getRpphList());
        setBankActivities(StorageService.getBankActivities());
        setStudents(StorageService.getStudents());
        setTeachers(StorageService.getTeachers());
        setAssessments(StorageService.getAssessments());
        setRaportList(StorageService.getRaportList());
        setJournals(StorageService.getJournals());
        fireJoyfulConfetti();
        showToast('Data Cadangan Berhasil Dipulihkan 🎉');
      } else {
        alert('File backup JSON tidak valid.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Student cross-navigation handlers
  const handleNavigateToAssessment = (studentId: string) => {
    setTargetStudentIdForAssessment(studentId);
    setActiveTab('asesmen');
  };

  const handleNavigateToRaport = (studentId: string) => {
    setTargetStudentIdForRaport(studentId);
    setActiveTab('raport');
  };

  // Counts for sidebar badges
  const activeClass = schoolProfile.kelompokAktif;
  const classStudents = students.filter(s => s.kelompok === activeClass);
  const classAssessments = assessments.filter(a => a.kelompok === activeClass);
  const unassessedCount = classStudents.filter(
    s => !classAssessments.some(a => a.studentId === s.id)
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF7ED] via-white to-[#ECFDF5] bg-playful-pattern flex flex-col font-sans">
      
      {/* Hidden file input for restore */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json"
        className="hidden"
      />

      {/* Floating Success Toast */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-700 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 animate-in slide-in-from-top-4 duration-200 border border-emerald-500 text-xs font-bold font-sans">
          <span className="text-base">🎈</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* App Shell */}
      <div className="flex flex-1 min-h-screen">
        
        {/* Left Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          isOpenMobile={isSidebarOpenMobile}
          onCloseMobile={() => setIsSidebarOpenMobile(false)}
          rpphCount={rpphList.filter(r => r.kelompok === activeClass).length}
          assessmentCount={classAssessments.length}
          unassessedCount={unassessedCount}
        />

        {/* Right Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* Top Bar Header */}
          <Header
            schoolProfile={schoolProfile}
            onUpdateSchoolProfile={handleUpdateSchoolProfile}
            onResetData={handleResetData}
            onExportData={handleExportData}
            onImportData={handleImportData}
            onToggleSidebarMobile={() => setIsSidebarOpenMobile(!isSidebarOpenMobile)}
          />

          {/* Main View Router */}
          <main className="flex-1 p-4 lg:p-6 max-w-7xl w-full mx-auto">
            {activeTab === 'dashboard' && (
              <DashboardView
                rpphList={rpphList}
                students={students}
                assessments={assessments}
                rppmList={rppmList}
                activeClass={activeClass}
                onNavigate={setActiveTab}
                onSelectStudentForAssessment={handleNavigateToAssessment}
              />
            )}

            {activeTab === 'kosp' && (
              <KospView
                kospData={kospData}
                schoolProfile={schoolProfile}
                onSaveKosp={handleSaveKosp}
              />
            )}

            {(activeTab === 'prota' || activeTab === 'promes') && (
              <ProtaPromesView
                protaList={protaList}
                promesList={promesList}
                schoolProfile={schoolProfile}
                onSaveProta={handleSaveProta}
                onSavePromes={handleSavePromes}
              />
            )}

            {activeTab === 'rppm' && (
              <RppmView
                rppmList={rppmList}
                schoolProfile={schoolProfile}
                activeClass={activeClass}
                onSaveRppmList={handleSaveRppm}
                onNavigateToRpphWithTopic={(rppm) => setActiveTab('rpph')}
              />
            )}

            {activeTab === 'rpph' && (
              <RpphView
                rpphList={rpphList}
                schoolProfile={schoolProfile}
                activeClass={activeClass}
                bankActivities={bankActivities}
                onSaveRpphList={handleSaveRpph}
                onNavigateToBank={() => setActiveTab('bank-kegiatan')}
              />
            )}

            {activeTab === 'bank-kegiatan' && (
              <BankKegiatanView
                bankActivities={bankActivities}
                onSaveBankActivities={handleSaveBankActivities}
              />
            )}

            {activeTab === 'asesmen' && (
              <AssessmentView
                students={students}
                assessments={assessments}
                rpphList={rpphList}
                activeClass={activeClass}
                selectedStudentId={targetStudentIdForAssessment}
                onSaveAssessment={handleSaveAssessment}
                onBatchSaveAssessments={handleBatchSaveAssessments}
              />
            )}

            {activeTab === 'raport' && (
              <RaportView
                students={students}
                raportList={raportList}
                assessments={assessments}
                schoolProfile={schoolProfile}
                activeClass={activeClass}
                onSaveRaportList={handleSaveRaportList}
              />
            )}

            {activeTab === 'siswa-guru' && (
              <StudentsTeachersView
                students={students}
                teachers={teachers}
                activeClass={activeClass}
                onSaveStudents={handleSaveStudents}
                onSaveTeachers={handleSaveTeachers}
                onNavigateToAssessment={handleNavigateToAssessment}
                onNavigateToRaport={handleNavigateToRaport}
              />
            )}

            {activeTab === 'jurnal' && (
              <TeacherJournalView
                journals={journals}
                schoolProfile={schoolProfile}
                activeClass={activeClass}
                onSaveJournals={handleSaveJournals}
              />
            )}
          </main>

        </div>

      </div>

    </div>
  );
}
