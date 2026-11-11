import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  CalendarDays, 
  CalendarRange, 
  CalendarCheck, 
  Sparkles, 
  Lightbulb, 
  CheckCircle2, 
  FileText, 
  Users, 
  BookMarked,
  X
} from 'lucide-react';

export type ActiveTabType = 
  | 'dashboard'
  | 'kosp'
  | 'prota'
  | 'promes'
  | 'rppm'
  | 'rpph'
  | 'bank-kegiatan'
  | 'asesmen'
  | 'raport'
  | 'siswa-guru'
  | 'jurnal';

interface SidebarProps {
  activeTab: ActiveTabType;
  onSelectTab: (tab: ActiveTabType) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  rpphCount: number;
  assessmentCount: number;
  unassessedCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  isOpenMobile,
  onCloseMobile,
  rpphCount,
  assessmentCount,
  unassessedCount
}) => {
  const menuItems: {
    id: ActiveTabType;
    label: string;
    icon: string;
    badge?: string;
    badgeColor?: string;
    isPrimary?: boolean;
  }[] = [
    { id: 'dashboard', label: 'Dashboard Kurikulum', icon: '📊' },
    { id: 'kosp', label: 'KOSP / Kurikulum Merdeka', icon: '📘' },
    { id: 'prota', label: 'Program Tahunan (PROTA)', icon: '🗓️' },
    { id: 'promes', label: 'Program Semester (PROMES)', icon: '📅' },
    { id: 'rppm', label: 'RPPM (Rencana Mingguan)', icon: '📝' },
    { 
      id: 'rpph', 
      label: 'RPPH (Rencana Harian)', 
      icon: '🎨', 
      isPrimary: true, 
      badge: `${rpphCount} Modul`,
      badgeColor: 'bg-rose-500 text-white animate-pulse'
    },
    { id: 'bank-kegiatan', label: 'Bank Tema & Kegiatan', icon: '💡' },
    { 
      id: 'asesmen', 
      label: 'Asesmen / Penilaian Anak', 
      icon: '⭐', 
      badge: unassessedCount > 0 ? `${unassessedCount} Perlu Nilai` : `${assessmentCount} Dinilai`,
      badgeColor: unassessedCount > 0 ? 'bg-amber-400 text-amber-950 font-bold' : 'bg-emerald-100 text-emerald-800'
    },
    { id: 'raport', label: 'Laporan Perkembangan / Raport', icon: '📜' },
    { id: 'siswa-guru', label: 'Data Siswa & Guru', icon: '🎒' },
    { id: 'jurnal', label: 'Jurnal Harian Guru', icon: '📖' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-gradient-to-b from-amber-50/90 via-orange-50/50 to-emerald-50/60 border-r border-amber-200/60 p-4 flex flex-col justify-between transition-transform duration-200 ease-in-out ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Top Brand Banner */}
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-amber-200/50">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl filter drop-shadow-sm">🌈</span>
              <div>
                <h2 className="font-display font-extrabold text-lg text-slate-900 leading-tight tracking-tight">
                  SI-KURIKULUM
                </h2>
                <span className="text-[11px] font-bold tracking-wider text-emerald-600 block">
                  TK CERIA GEMILANG
                </span>
              </div>
            </div>
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200/50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Menu Items List */}
          <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 py-1 custom-scrollbar">
            <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Menu Administrasi PAUD
            </div>
            
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    onCloseMobile();
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-left text-xs font-bold transition-all duration-150 group relative ${
                    item.isPrimary && !isActive
                      ? 'bg-rose-50/70 border border-rose-200 text-rose-800 hover:bg-rose-100/70'
                      : isActive
                      ? item.isPrimary 
                        ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md shadow-rose-200 font-extrabold scale-[1.01]'
                        : 'bg-emerald-500 text-white shadow-md shadow-emerald-200 font-extrabold scale-[1.01]'
                      : 'text-slate-700 hover:bg-white/80 hover:text-slate-900 hover:shadow-2xs'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-lg shrink-0 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </span>
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full shrink-0 font-bold ml-1.5 ${
                      isActive ? 'bg-white/20 text-white' : item.badgeColor
                    }`}>
                      {item.badge}
                    </span>
                  )}

                  {/* Active subtle indicator */}
                  {isActive && (
                    <span className="absolute -left-1 top-2 bottom-2 w-1.5 bg-amber-400 rounded-r-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom Card: Kurikulum Merdeka Badge */}
          <div className="mt-auto pt-3 border-t border-amber-200/50">
            <div className="p-3 bg-gradient-to-br from-white to-emerald-50/80 rounded-2xl border border-emerald-200/80 shadow-2xs text-left">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-base">🎈</span>
                <span className="text-[11px] font-extrabold text-emerald-800">
                  Kurikulum Merdeka PAUD
                </span>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed">
                Pembelajaran berbasis bermain, loose parts, dan penguatan 6 dimensi Profil Pelajar Pancasila.
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
