import { useState } from 'react';
import {
  Building2,
  Users,
  Bell,
  Shield,
  Palette,
  Save,
  Lock,
  Smartphone,
  Monitor,
  Mail,
  Clock,
  DollarSign,
} from 'lucide-react';
import { organizationSettings, roles } from '../../data/mockSettings';

type SettingsTab = 'organization' | 'users' | 'notifications' | 'security' | 'appearance';

const tabs: { id: SettingsTab; label: string; icon: typeof Building2 }[] = [
  { id: 'organization', label: 'Organization', icon: Building2 },
  { id: 'users', label: 'User Management', icon: Users },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'appearance', label: 'Appearance', icon: Palette },
];

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      aria-pressed={enabled}
      className={`relative h-5 w-9 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 ${enabled ? 'bg-primary' : 'bg-gray-200'}`}
    >
      <span className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow transform transition-transform ${enabled ? 'translate-x-4' : 'translate-x-0'}`} />
    </button>
  );
}

function SettingRow({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-border/40 last:border-0">
      <div className="min-w-0">
        <p className="text-xs font-medium text-text">{label}</p>
        {description && <p className="text-[11px] text-text-muted mt-0.5">{description}</p>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

export function SettingsView() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('organization');
  const [org, setOrg] = useState(organizationSettings);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [leaveNotifs, setLeaveNotifs] = useState(true);
  const [payrollNotifs, setPayrollNotifs] = useState(true);
  const [twoFactor, setTwoFactor] = useState(true);
  const [sessionMgmt, setSessionMgmt] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [compactDash, setCompactDash] = useState(false);

  return (
    <div className="h-full flex flex-col min-h-0 gap-3 overflow-y-auto pr-1">
      <div className="shrink-0 flex items-center justify-between gap-3">
        <div>
          <h1 className="text-base font-semibold text-text">Settings</h1>
          <p className="text-xs text-text-muted mt-0.5">Configure workspace preferences and admin controls</p>
        </div>
        <button className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-primary to-highlight px-3 py-2 text-xs font-medium text-white btn-hover shrink-0">
          <Save className="h-3.5 w-3.5" />
          Save Changes
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-3 flex-1 min-h-0">
        <nav className="lg:w-48 shrink-0 flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium whitespace-nowrap transition-colors ${
                activeTab === id
                  ? 'bg-primary/10 text-primary'
                  : 'text-text-muted hover:bg-gray-50 hover:text-text'
              }`}
            >
              <Icon className="h-3.5 w-3.5 shrink-0" />
              {label}
            </button>
          ))}
        </nav>

        <div className="flex-1 min-w-0 space-y-3">
          {activeTab === 'organization' && (
            <div className="rounded-xl border border-border/80 bg-card p-4 shadow-sm">
              <h2 className="text-xs font-semibold text-text mb-3">Organization Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-medium text-text-muted">Company Name</label>
                  <input
                    value={org.companyName}
                    onChange={(e) => setOrg({ ...org, companyName: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-border/80 bg-background px-3 py-2 text-xs text-text focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-text-muted">Industry</label>
                  <input
                    value={org.industry}
                    onChange={(e) => setOrg({ ...org, industry: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-border/80 bg-background px-3 py-2 text-xs text-text focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-text-muted">Time Zone</label>
                  <select
                    value={org.timeZone}
                    onChange={(e) => setOrg({ ...org, timeZone: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-border/80 bg-background px-3 py-2 text-xs text-text focus:outline-none"
                  >
                    <option>America/Los_Angeles (PST)</option>
                    <option>America/New_York (EST)</option>
                    <option>America/Chicago (CST)</option>
                    <option>Europe/London (GMT)</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="text-[11px] font-medium text-text-muted">Address</label>
                  <input
                    value={org.address}
                    onChange={(e) => setOrg({ ...org, address: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-border/80 bg-background px-3 py-2 text-xs text-text focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <>
              <div className="rounded-xl border border-border/80 bg-card p-4 shadow-sm">
                <h2 className="text-xs font-semibold text-text mb-3">Roles & Permissions</h2>
                <div className="space-y-2">
                  {roles.map((role) => (
                    <div key={role.id} className="rounded-lg border border-border/60 bg-background/50 p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="text-xs font-semibold text-text">{role.name}</p>
                          <p className="text-[10px] text-text-muted">{role.users} users assigned</p>
                        </div>
                        <button className="text-[11px] font-medium text-primary hover:opacity-80">Edit</button>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {role.permissions.map((perm) => (
                          <span key={perm} className="rounded-full bg-primary/10 text-primary px-2 py-0.5 text-[10px] font-medium">
                            {perm}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-border/80 bg-card p-4 shadow-sm">
                <h2 className="text-xs font-semibold text-text mb-2">Access Control</h2>
                <SettingRow label="IP Restriction" description="Limit access to approved IP addresses">
                  <Toggle enabled={false} onChange={() => {}} />
                </SettingRow>
                <SettingRow label="SSO Integration" description="Enable single sign-on via SAML/OAuth">
                  <Toggle enabled={true} onChange={() => {}} />
                </SettingRow>
                <SettingRow label="Audit Logging" description="Track all admin actions and data changes">
                  <Toggle enabled={true} onChange={() => {}} />
                </SettingRow>
              </div>
            </>
          )}

          {activeTab === 'notifications' && (
            <div className="rounded-xl border border-border/80 bg-card p-4 shadow-sm">
              <h2 className="text-xs font-semibold text-text mb-2">Notification Preferences</h2>
              <SettingRow label="Email Alerts" description="Receive system alerts and updates via email" >
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-text-muted" />
                  <Toggle enabled={emailAlerts} onChange={setEmailAlerts} />
                </div>
              </SettingRow>
              <SettingRow label="Leave Notifications" description="Alerts for leave requests and approvals">
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-text-muted" />
                  <Toggle enabled={leaveNotifs} onChange={setLeaveNotifs} />
                </div>
              </SettingRow>
              <SettingRow label="Payroll Notifications" description="Pay cycle reminders and processing updates">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-3.5 w-3.5 text-text-muted" />
                  <Toggle enabled={payrollNotifs} onChange={setPayrollNotifs} />
                </div>
              </SettingRow>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="rounded-xl border border-border/80 bg-card p-4 shadow-sm">
              <h2 className="text-xs font-semibold text-text mb-2">Security Settings</h2>
              <SettingRow label="Password Policies" description="Minimum 12 characters, mixed case, numbers, symbols">
                <div className="flex items-center gap-2">
                  <Lock className="h-3.5 w-3.5 text-text-muted" />
                  <button className="text-[11px] font-medium text-primary">Configure</button>
                </div>
              </SettingRow>
              <SettingRow label="Two-Factor Authentication" description="Require 2FA for all admin accounts">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-3.5 w-3.5 text-text-muted" />
                  <Toggle enabled={twoFactor} onChange={setTwoFactor} />
                </div>
              </SettingRow>
              <SettingRow label="Session Management" description="Auto-logout after 30 minutes of inactivity">
                <div className="flex items-center gap-2">
                  <Monitor className="h-3.5 w-3.5 text-text-muted" />
                  <Toggle enabled={sessionMgmt} onChange={setSessionMgmt} />
                </div>
              </SettingRow>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="rounded-xl border border-border/80 bg-card p-4 shadow-sm">
              <h2 className="text-xs font-semibold text-text mb-2">Appearance & Layout</h2>
              <SettingRow label="Theme" description="Switch between light and dark mode">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-text-muted">{darkMode ? 'Dark' : 'Light'}</span>
                  <Toggle enabled={darkMode} onChange={setDarkMode} />
                </div>
              </SettingRow>
              <SettingRow label="Compact Dashboard" description="Reduce spacing for data-dense views">
                <Toggle enabled={compactDash} onChange={setCompactDash} />
              </SettingRow>
              <SettingRow label="Layout Controls" description="Sidebar default state and panel width">
                <select className="rounded-lg border border-border/70 bg-background px-2 py-1.5 text-xs text-text focus:outline-none">
                  <option>Expanded Sidebar</option>
                  <option>Collapsed Sidebar</option>
                  <option>Auto (responsive)</option>
                </select>
              </SettingRow>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
