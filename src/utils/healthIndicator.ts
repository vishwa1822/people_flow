import type { HealthRisk } from '../types/employee';

export function getHealthColor(risk: HealthRisk): string {
  switch (risk) {
    case 'Low Risk': return 'bg-emerald-100 text-emerald-700';
    case 'Medium Risk': return 'bg-amber-100 text-amber-700';
    case 'High Risk': return 'bg-red-100 text-red-700';
  }
}

export function getHealthDotColor(risk: HealthRisk): string {
  switch (risk) {
    case 'Low Risk': return 'bg-emerald-500';
    case 'Medium Risk': return 'bg-amber-500';
    case 'High Risk': return 'bg-red-500';
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'Active': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'On Leave': return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'Probation': return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'Inactive': return 'bg-gray-100 text-gray-600 border-gray-200';
    default: return 'bg-gray-100 text-gray-600 border-gray-200';
  }
}

export function getAlertPriorityColor(priority: string): string {
  switch (priority) {
    case 'high': return 'border-l-red-500 bg-red-50/50';
    case 'medium': return 'border-l-amber-500 bg-amber-50/50';
    case 'low': return 'border-l-blue-500 bg-blue-50/50';
    default: return 'border-l-gray-300';
  }
}

export function getAlertIconColor(priority: string): string {
  switch (priority) {
    case 'high': return 'text-red-500 bg-red-100';
    case 'medium': return 'text-amber-500 bg-amber-100';
    case 'low': return 'text-blue-500 bg-blue-100';
    default: return 'text-gray-500 bg-gray-100';
  }
}
