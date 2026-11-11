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
} from '../types';
import {
  initialSchoolProfile,
  initialKospData,
  initialProtaList,
  initialPromesList,
  initialRppmList,
  initialRpphList,
  initialBankActivities,
  initialStudents,
  initialTeachers,
  initialAssessments,
  initialRaportList,
  initialJournals
} from '../data/initialData';

const STORAGE_KEYS = {
  SCHOOL: 'tk_ceria_school_profile',
  KOSP: 'tk_ceria_kosp_data',
  PROTA: 'tk_ceria_prota_list',
  PROMES: 'tk_ceria_promes_list',
  RPPM: 'tk_ceria_rppm_list',
  RPPH: 'tk_ceria_rpph_list',
  BANK_ACTIVITIES: 'tk_ceria_bank_activities',
  STUDENTS: 'tk_ceria_students',
  TEACHERS: 'tk_ceria_teachers',
  ASSESSMENTS: 'tk_ceria_assessments',
  RAPORT: 'tk_ceria_raport',
  JOURNALS: 'tk_ceria_journals'
};

function getItem<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw);
  } catch (e) {
    console.error(`Error reading ${key} from localStorage`, e);
    return defaultValue;
  }
}

function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving ${key} to localStorage`, e);
  }
}

export const StorageService = {
  getSchoolProfile(): SchoolProfile {
    return getItem<SchoolProfile>(STORAGE_KEYS.SCHOOL, initialSchoolProfile);
  },
  saveSchoolProfile(data: SchoolProfile): void {
    setItem(STORAGE_KEYS.SCHOOL, data);
  },

  getKosp(): KospData {
    return getItem<KospData>(STORAGE_KEYS.KOSP, initialKospData);
  },
  saveKosp(data: KospData): void {
    setItem(STORAGE_KEYS.KOSP, data);
  },

  getProtaList(): ProtaItem[] {
    return getItem<ProtaItem[]>(STORAGE_KEYS.PROTA, initialProtaList);
  },
  saveProtaList(data: ProtaItem[]): void {
    setItem(STORAGE_KEYS.PROTA, data);
  },

  getPromesList(): PromesItem[] {
    return getItem<PromesItem[]>(STORAGE_KEYS.PROMES, initialPromesList);
  },
  savePromesList(data: PromesItem[]): void {
    setItem(STORAGE_KEYS.PROMES, data);
  },

  getRppmList(): RppmItem[] {
    return getItem<RppmItem[]>(STORAGE_KEYS.RPPM, initialRppmList);
  },
  saveRppmList(data: RppmItem[]): void {
    setItem(STORAGE_KEYS.RPPM, data);
  },

  getRpphList(): RpphItem[] {
    return getItem<RpphItem[]>(STORAGE_KEYS.RPPH, initialRpphList);
  },
  saveRpphList(data: RpphItem[]): void {
    setItem(STORAGE_KEYS.RPPH, data);
  },

  getBankActivities(): BankActivityItem[] {
    return getItem<BankActivityItem[]>(STORAGE_KEYS.BANK_ACTIVITIES, initialBankActivities);
  },
  saveBankActivities(data: BankActivityItem[]): void {
    setItem(STORAGE_KEYS.BANK_ACTIVITIES, data);
  },

  getStudents(): Student[] {
    return getItem<Student[]>(STORAGE_KEYS.STUDENTS, initialStudents);
  },
  saveStudents(data: Student[]): void {
    setItem(STORAGE_KEYS.STUDENTS, data);
  },

  getTeachers(): Teacher[] {
    return getItem<Teacher[]>(STORAGE_KEYS.TEACHERS, initialTeachers);
  },
  saveTeachers(data: Teacher[]): void {
    setItem(STORAGE_KEYS.TEACHERS, data);
  },

  getAssessments(): AssessmentRecord[] {
    return getItem<AssessmentRecord[]>(STORAGE_KEYS.ASSESSMENTS, initialAssessments);
  },
  saveAssessments(data: AssessmentRecord[]): void {
    setItem(STORAGE_KEYS.ASSESSMENTS, data);
  },

  getRaportList(): RaportNarrative[] {
    return getItem<RaportNarrative[]>(STORAGE_KEYS.RAPORT, initialRaportList);
  },
  saveRaportList(data: RaportNarrative[]): void {
    setItem(STORAGE_KEYS.RAPORT, data);
  },

  getJournals(): DailyTeacherJournal[] {
    return getItem<DailyTeacherJournal[]>(STORAGE_KEYS.JOURNALS, initialJournals);
  },
  saveJournals(data: DailyTeacherJournal[]): void {
    setItem(STORAGE_KEYS.JOURNALS, data);
  },

  resetAllToDefault(): void {
    setItem(STORAGE_KEYS.SCHOOL, initialSchoolProfile);
    setItem(STORAGE_KEYS.KOSP, initialKospData);
    setItem(STORAGE_KEYS.PROTA, initialProtaList);
    setItem(STORAGE_KEYS.PROMES, initialPromesList);
    setItem(STORAGE_KEYS.RPPM, initialRppmList);
    setItem(STORAGE_KEYS.RPPH, initialRpphList);
    setItem(STORAGE_KEYS.BANK_ACTIVITIES, initialBankActivities);
    setItem(STORAGE_KEYS.STUDENTS, initialStudents);
    setItem(STORAGE_KEYS.TEACHERS, initialTeachers);
    setItem(STORAGE_KEYS.ASSESSMENTS, initialAssessments);
    setItem(STORAGE_KEYS.RAPORT, initialRaportList);
    setItem(STORAGE_KEYS.JOURNALS, initialJournals);
  },

  clearAllData(): void {
    Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
  },

  exportAllDataAsJSON(): string {
    const fullBackup = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      school: this.getSchoolProfile(),
      kosp: this.getKosp(),
      prota: this.getProtaList(),
      promes: this.getPromesList(),
      rppm: this.getRppmList(),
      rpph: this.getRpphList(),
      bankActivities: this.getBankActivities(),
      students: this.getStudents(),
      teachers: this.getTeachers(),
      assessments: this.getAssessments(),
      raport: this.getRaportList(),
      journals: this.getJournals()
    };
    return JSON.stringify(fullBackup, null, 2);
  },

  importBackupJSON(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString);
      if (data.school) this.saveSchoolProfile(data.school);
      if (data.kosp) this.saveKosp(data.kosp);
      if (data.prota) this.saveProtaList(data.prota);
      if (data.promes) this.savePromesList(data.promes);
      if (data.rppm) this.saveRppmList(data.rppm);
      if (data.rpph) this.saveRpphList(data.rpph);
      if (data.bankActivities) this.saveBankActivities(data.bankActivities);
      if (data.students) this.saveStudents(data.students);
      if (data.teachers) this.saveTeachers(data.teachers);
      if (data.assessments) this.saveAssessments(data.assessments);
      if (data.raport) this.saveRaportList(data.raport);
      if (data.journals) this.saveJournals(data.journals);
      return true;
    } catch (e) {
      console.error('Failed to parse backup JSON', e);
      return false;
    }
  }
};
