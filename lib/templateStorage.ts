import { SavedTemplate, JobVacancy } from './types';

const STORAGE_KEY = 'quest-medical-templates';
const MAX_TEMPLATES = 5;

export function getSavedTemplates(): SavedTemplate[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading templates:', error);
    return [];
  }
}

export function saveTemplate(name: string, data: JobVacancy): SavedTemplate {
  const templates = getSavedTemplates();
  
  if (templates.length >= MAX_TEMPLATES) {
    throw new Error(`Maximum ${MAX_TEMPLATES} templates allowed. Please delete one first.`);
  }
  
  const newTemplate: SavedTemplate = {
    id: Date.now().toString(),
    name,
    data,
    createdAt: new Date().toISOString(),
  };
  
  const updatedTemplates = [...templates, newTemplate];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTemplates));
  
  return newTemplate;
}

export function deleteTemplate(id: string): void {
  const templates = getSavedTemplates();
  const filtered = templates.filter(t => t.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function loadTemplate(id: string): JobVacancy | null {
  const templates = getSavedTemplates();
  const template = templates.find(t => t.id === id);
  return template ? template.data : null;
}
