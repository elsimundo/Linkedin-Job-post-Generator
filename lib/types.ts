export interface JobVacancy {
  jobTitle: string;
  salary: string;
  employmentType: 'Full-time' | 'Part-time' | 'Contract' | 'Temporary';
  location: string;
  urgency: 'none' | 'immediate' | 'urgent';
  phone: string;
  email: string;
  website: string;
  compassOpacity: number;
  colorScheme: 'white' | 'blue';
  customPills: string[];
  footerDescription?: string;
  hideEmploymentType?: boolean;
  hideLocation?: boolean;
}

export interface SavedTemplate {
  id: string;
  name: string;
  data: JobVacancy;
  createdAt: string;
}

export const DEFAULT_JOB_VACANCY: JobVacancy = {
  jobTitle: '',
  salary: '',
  employmentType: 'Full-time',
  location: '',
  urgency: 'none',
  phone: '07749 490 058',
  email: 'Paula.rola@questmedical.biz',
  website: 'www.Questmedical.biz',
  compassOpacity: 5,
  colorScheme: 'white',
  customPills: [],
  footerDescription: '',
  hideEmploymentType: false,
  hideLocation: false,
};
