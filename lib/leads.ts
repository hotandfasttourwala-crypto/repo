import fs from 'fs';
import path from 'path';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  message?: string;
  created_at: string;
  status?: string;
}

const leadsFilePath = path.join(process.cwd(), 'data', 'leads.json');

export function getLocalLeads(): Lead[] {
  try {
    if (!fs.existsSync(leadsFilePath)) {
      return [];
    }
    const raw = fs.readFileSync(leadsFilePath, 'utf-8');
    return JSON.parse(raw) as Lead[];
  } catch (e) {
    console.error('Error reading local leads:', e);
    return [];
  }
}

export function saveLocalLead(lead: Lead): void {
  try {
    const dir = path.dirname(leadsFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const leads = getLocalLeads();
    leads.unshift(lead);
    fs.writeFileSync(leadsFilePath, JSON.stringify(leads, null, 2), 'utf-8');
  } catch (e) {
    console.error('Error saving local lead:', e);
  }
}

export function deleteLocalLead(id: string): void {
  try {
    const leads = getLocalLeads();
    const filtered = leads.filter(l => l.id !== id);
    fs.writeFileSync(leadsFilePath, JSON.stringify(filtered, null, 2), 'utf-8');
  } catch (e) {
    console.error('Error deleting local lead:', e);
  }
}
