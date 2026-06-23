import { useState, useRef, useEffect } from 'react';
import {
  Search,
  Bell,
  Plus,
  Download,
  FileText,
  ChevronDown,
  Menu,
} from 'lucide-react';
import { Avatar } from '../shared/Avatar';

interface TopNavProps {
  onAddEmployee: () => void;
  onGoToReports: () => void;
  sidebarCollapsed: boolean;
  onMenuClick: () => void;
  isMobile: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function TopNav({
  onAddEmployee,
  onGoToReports,
  sidebarCollapsed,
  onMenuClick,
  isMobile,
  searchQuery,
  onSearchChange,
}: TopNavProps) {
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const quickRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (quickRef.current && !quickRef.current.contains(e.target as Node)) {
        setShowQuickActions(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const leftOffset = isMobile ? 0 : sidebarCollapsed ? 68 : 220;

  return (
    <header
      className="fixed top-0 z-30 flex h-14 items-center justify-between border-b border-border/60 bg-card/90 backdrop-blur-xl px-3 sm:px-4 lg:px-5 transition-all duration-300"
      style={{ left: leftOffset, right: 0 }}
    >
      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
        {isMobile && (
          <button
            onClick={onMenuClick}
            className="rounded-lg p-1.5 text-text-muted hover:bg-gray-50 hover:text-text transition-colors shrink-0"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}
        <div className="relative min-w-0 flex-1 max-w-md">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={isMobile ? 'Search...' : 'Search employees, departments...'}
            className="w-full rounded-lg border border-border/80 bg-background py-1.5 pl-8 pr-3 text-xs sm:text-sm text-text placeholder:text-text-muted focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 ml-2">
        <div ref={quickRef} className="relative">
          <button
            onClick={() => setShowQuickActions(!showQuickActions)}
            className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-primary to-highlight px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-white btn-hover"
          >
            <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Actions</span>
            <ChevronDown className="h-3 w-3" />
          </button>
          {showQuickActions && (
            <div className="absolute right-0 top-full mt-1.5 w-48 rounded-xl border border-border/80 bg-card p-1 shadow-lg animate-fade-in z-50">
              <button
                onClick={() => { onAddEmployee(); setShowQuickActions(false); }}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs text-text hover:bg-gray-50 transition-colors"
              >
                <Plus className="h-3.5 w-3.5 text-primary" />
                Add Employee
              </button>
              <button
                onClick={() => setShowQuickActions(false)}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs text-text hover:bg-gray-50 transition-colors"
              >
                <Download className="h-3.5 w-3.5 text-secondary" />
                Export Data
              </button>
              <button
                onClick={() => { onGoToReports(); setShowQuickActions(false); }}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs text-text hover:bg-gray-50 transition-colors"
              >
                <FileText className="h-3.5 w-3.5 text-highlight" />
                Generate Report
              </button>
            </div>
          )}
        </div>

        <div ref={notifRef} className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative rounded-lg p-1.5 text-text-muted hover:bg-gray-50 hover:text-text transition-colors"
          >
            <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-danger" />
          </button>
          {showNotifications && (
            <div className="absolute right-0 top-full mt-1.5 w-72 rounded-xl border border-border/80 bg-card p-3 shadow-lg animate-fade-in z-50">
              <h4 className="mb-2 text-xs font-semibold text-text">Notifications</h4>
              <div className="space-y-2">
                <div className="rounded-lg bg-red-50/80 p-2.5">
                  <p className="text-xs font-medium text-text">Probation review due</p>
                  <p className="text-[10px] text-text-muted mt-0.5">William Taylor — ends Friday</p>
                </div>
                <div className="rounded-lg bg-amber-50/80 p-2.5">
                  <p className="text-xs font-medium text-text">Leave request approved</p>
                  <p className="text-[10px] text-text-muted mt-0.5">Michael Brown returns tomorrow</p>
                </div>
                <div className="rounded-lg bg-blue-50/80 p-2.5">
                  <p className="text-xs font-medium text-text">New joiner onboarded</p>
                  <p className="text-[10px] text-text-muted mt-0.5">Ethan Davis completed step 3</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5 rounded-lg px-1.5 py-1 hover:bg-gray-50 transition-colors cursor-pointer">
          <Avatar name="Admin User" size="sm" />
          <div className="hidden lg:block">
            <p className="text-xs font-medium text-text leading-none">Admin</p>
            <p className="text-[10px] text-text-muted">HR Manager</p>
          </div>
        </div>
      </div>
    </header>
  );
}
