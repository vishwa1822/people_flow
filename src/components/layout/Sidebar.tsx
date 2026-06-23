import {
  LayoutDashboard,
  Users,
  Building2,
  Clock,
  Wallet,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  activeItem: string;
  onNavigate: (item: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'employees', label: 'Employees', icon: Users },
  { id: 'departments', label: 'Departments', icon: Building2 },
  { id: 'attendance', label: 'Attendance', icon: Clock },
  { id: 'payroll', label: 'Payroll', icon: Wallet },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ collapsed, onToggle, activeItem, onNavigate }: SidebarProps) {
  return (
    <aside
      className={`fixed left-0 top-0 z-40 flex h-full flex-col border-r border-border/60 bg-card/95 backdrop-blur-xl transition-all duration-300 ease-out ${
        collapsed ? 'w-[68px]' : 'w-[220px]'
      }`}
    >
      <div className="flex h-14 items-center justify-between px-3 border-b border-border/60">
        {!collapsed && (
          <div className="flex items-center gap-2 animate-fade-in">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-highlight">
              <Users className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-semibold text-text">PeopleFlow</span>
          </div>
        )}
        {collapsed && (
          <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-highlight">
            <Users className="h-4 w-4 text-white" />
          </div>
        )}
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-text-muted hover:bg-gray-50 hover:text-text'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <Icon
                className={`h-5 w-5 shrink-0 transition-colors ${
                  isActive ? 'text-primary' : 'text-text-muted group-hover:text-text'
                }`}
              />
              {!collapsed && <span>{item.label}</span>}
              {isActive && !collapsed && (
                <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="border-t border-border p-3">
        <button
          onClick={onToggle}
          className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm text-text-muted transition-colors hover:bg-gray-50 hover:text-text"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
