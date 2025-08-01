export interface DentalService {
  id: string;
  name: string;
  description: string;
  category: 'preventive' | 'restorative' | 'specialized' | 'emergency';
  ageGroup?: 'infant' | 'child' | 'adolescent' | 'all';
  requiresAnesthesia?: boolean;
}

export interface DentalPractice {
  name: string;
  doctorName: string;
  specialty: string;
  address: string;
  phone: string;
  email: string;
  services: DentalService[];
  officeHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday?: string;
    sunday?: string;
  };
}

export interface PracticeMetadata {
  title: string;
  description: string;
  keywords: string[];
  location: {
    city: string;
    state: string;
    zipCode: string;
  };
}