import { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';

interface LayoutProps {
  children: React.ReactNode;
  activeNav: string;
  onNavigate: (item: string) => void;
  onAddEmployee: () => void;
  onGoToReports: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  noScroll?: boolean;
}

export function Layout({
  children,
  activeNav,
  onNavigate,
  onAddEmployee,
  onGoToReports,
  searchQuery,
  onSearchChange,
  noScroll = false,
}: LayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const sidebarWidth = isMobile ? 0 : sidebarCollapsed ? 68 : 220;

  return (
    <div className="h-screen overflow-hidden bg-background relative">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.04),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(79,70,229,0.03),transparent_50%)]" />
      {!isMobile && (
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          activeItem={activeNav}
          onNavigate={onNavigate}
        />
      )}

      {isMobile && mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="overlay flex-1" onClick={() => setMobileMenuOpen(false)} />
          <Sidebar
            collapsed={false}
            onToggle={() => setMobileMenuOpen(false)}
            activeItem={activeNav}
            onNavigate={(item) => {
              onNavigate(item);
              setMobileMenuOpen(false);
            }}
          />
        </div>
      )}

      <TopNav
        onAddEmployee={onAddEmployee}
        onGoToReports={onGoToReports}
        sidebarCollapsed={sidebarCollapsed}
        onMenuClick={() => setMobileMenuOpen(true)}
        isMobile={isMobile}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
      />

      <main
        className="relative transition-all duration-300 overflow-hidden"
        style={{ marginLeft: sidebarWidth, height: '100vh' }}
      >
        <div
          className={`px-3 sm:px-4 lg:px-5 pt-14 pb-3 h-[calc(100vh-3.5rem)] max-h-[calc(100vh-3.5rem)] ${
            noScroll ? 'overflow-hidden' : 'overflow-y-auto'
          }`}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
