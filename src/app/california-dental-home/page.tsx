import type { Metadata } from 'next';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, MapPin, Clock, Star } from 'lucide-react';
import type { DentalService, DentalPractice } from '@/types/dental';

export const metadata: Metadata = {
  title: 'Dr. Brian Liu - Pediatric Dentist in Palo Alto | California Dental Home',
  description: 'Comprehensive pediatric dental care by Dr. S. Brian Liu in Palo Alto. Specializing in children\'s dentistry, preventive care, and special needs patients. Call (650) 351-6789.',
  keywords: [
    'pediatric dentist palo alto',
    'children dentist',
    'Dr Brian Liu',
    'California Dental Home',
    'kids dentist bay area',
    'pediatric dental care',
    'children special needs dentistry'
  ],
  openGraph: {
    title: 'Dr. Brian Liu - Pediatric Dentist in Palo Alto',
    description: 'Expert pediatric dental care for infants, children & adolescents',
    type: 'website',
    locale: 'en_US',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const services: DentalService[] = [
  {
    id: '1',
    name: 'Comprehensive Dental Care',
    description: 'Complete oral health assessment and treatment planning',
    category: 'preventive',
    ageGroup: 'all'
  },
  {
    id: '2',
    name: 'Infant / Well Baby Dental Exam',
    description: 'Early oral health evaluation for infants and toddlers',
    category: 'preventive',
    ageGroup: 'infant'
  },
  {
    id: '3',
    name: 'Diet Counseling',
    description: 'Nutritional guidance for optimal oral health',
    category: 'preventive',
    ageGroup: 'all'
  },
  {
    id: '4',
    name: 'Oral Hygiene Instruction',
    description: 'Teaching proper brushing and flossing techniques',
    category: 'preventive',
    ageGroup: 'all'
  },
  {
    id: '5',
    name: 'Preventative Sealants',
    description: 'Protective coatings to prevent tooth decay',
    category: 'preventive',
    ageGroup: 'child'
  },
  {
    id: '6',
    name: 'Composite (Tooth-Colored) Fillings',
    description: 'Natural-looking restorations for cavities',
    category: 'restorative',
    ageGroup: 'all'
  },
  {
    id: '7',
    name: 'Laser Soft Tissue Treatments',
    description: 'Advanced laser therapy for gum treatments',
    category: 'specialized',
    ageGroup: 'all'
  },
  {
    id: '8',
    name: 'Sedation with Nitrous Oxide',
    description: 'Safe and effective laughing gas for anxious children',
    category: 'specialized',
    ageGroup: 'all',
    requiresAnesthesia: true
  },
  {
    id: '9',
    name: 'I.V. Sedation / General Anesthesia',
    description: 'Deep sedation for complex procedures',
    category: 'specialized',
    ageGroup: 'all',
    requiresAnesthesia: true
  },
  {
    id: '10',
    name: 'Care for Children with Special Needs',
    description: 'Specialized care for children with developmental disabilities',
    category: 'specialized',
    ageGroup: 'all'
  },
  {
    id: '11',
    name: 'Digital and Panoramic X-ray',
    description: 'Advanced digital imaging with reduced radiation',
    category: 'preventive',
    ageGroup: 'all'
  },
  {
    id: '12',
    name: 'Sports Mouthguards',
    description: 'Custom protective mouthguards for athletic activities',
    category: 'preventive',
    ageGroup: 'child'
  },
  {
    id: '13',
    name: 'Hospital Dentistry for Special Needs Patients',
    description: 'Comprehensive dental care in hospital setting',
    category: 'specialized',
    ageGroup: 'all'
  },
  {
    id: '14',
    name: 'Cosmetic Pediatric Dentistry',
    description: 'White crowns and veneers for enhanced aesthetics',
    category: 'specialized',
    ageGroup: 'all'
  }
];

const practiceInfo: DentalPractice = {
  name: 'California Dental Home',
  doctorName: 'Dr. S. Brian Liu',
  specialty: 'Board-Certified Pediatric Dentist (Pedodontist)',
  address: '2345 Yale Street, FL 2B, Palo Alto, CA 94306',
  phone: '(650) 351-6789',
  email: 'info@californiadentalhome.com',
  services,
  officeHours: {
    monday: '7:00 AM – 6:00 PM',
    tuesday: '7:00 AM – 6:00 PM',
    wednesday: '7:00 AM – 6:00 PM',
    thursday: '7:00 AM – 6:00 PM',
    friday: '8:00 AM – 5:00 PM'
  }
};

function getCategoryColor(category: string) {
  switch (category) {
    case 'preventive':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'restorative':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'specialized':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'emergency':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

function getAgeGroupColor(ageGroup: string) {
  switch (ageGroup) {
    case 'infant':
      return 'bg-pink-100 text-pink-800 border-pink-200';
    case 'child':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'adolescent':
      return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

export default function CaliforniaDentalHomePage() {
  const preventiveServices = services.filter(s => s.category === 'preventive');
  const restorativeServices = services.filter(s => s.category === 'restorative');
  const specializedServices = services.filter(s => s.category === 'specialized');

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">Dr. Liu</span>
                </div>
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              {practiceInfo.doctorName}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-4">
              {practiceInfo.specialty}
            </p>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Providing comprehensive dental care for infants, children & adolescents in a friendly, 
              safe environment with over two decades of experience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <div className="flex items-center gap-2 text-gray-700">
                <Phone className="h-5 w-5 text-blue-600" />
                <span className="font-semibold">{practiceInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <MapPin className="h-5 w-5 text-blue-600" />
                <span>Palo Alto, CA</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                <Star className="h-3 w-3 mr-1" />
                20+ Years Experience
              </Badge>
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                Board Certified
              </Badge>
              <Badge className="bg-green-100 text-green-800 border-green-200">
                Special Needs Care
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Info */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{practiceInfo.address}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  Office Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Mon - Thu:</span>
                    <span>{practiceInfo.officeHours.monday}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Friday:</span>
                    <span>{practiceInfo.officeHours.friday}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-blue-600" />
                  Contact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-semibold text-blue-600">{practiceInfo.phone}</p>
                  <p className="text-gray-600">{practiceInfo.email}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Services We Provide
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our practice is dedicated to every aspect of your child's oral health, 
              offering comprehensive care from infancy through adolescence.
            </p>
          </div>

          {/* Preventive Care */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              Preventive Care
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {preventiveServices.map((service) => (
                <Card key={service.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      <Badge className={getCategoryColor(service.category)} variant="outline">
                        {service.category}
                      </Badge>
                    </div>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      {service.ageGroup && service.ageGroup !== 'all' && (
                        <Badge className={getAgeGroupColor(service.ageGroup)} variant="outline">
                          {service.ageGroup}
                        </Badge>
                      )}
                      {service.requiresAnesthesia && (
                        <Badge className="bg-orange-100 text-orange-800 border-orange-200" variant="outline">
                          Sedation Available
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Restorative Care */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              Restorative Care
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restorativeServices.map((service) => (
                <Card key={service.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      <Badge className={getCategoryColor(service.category)} variant="outline">
                        {service.category}
                      </Badge>
                    </div>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      {service.ageGroup && service.ageGroup !== 'all' && (
                        <Badge className={getAgeGroupColor(service.ageGroup)} variant="outline">
                          {service.ageGroup}
                        </Badge>
                      )}
                      {service.requiresAnesthesia && (
                        <Badge className="bg-orange-100 text-orange-800 border-orange-200" variant="outline">
                          Sedation Available
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Specialized Care */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              Specialized Care
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {specializedServices.map((service) => (
                <Card key={service.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      <Badge className={getCategoryColor(service.category)} variant="outline">
                        {service.category}
                      </Badge>
                    </div>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      {service.ageGroup && service.ageGroup !== 'all' && (
                        <Badge className={getAgeGroupColor(service.ageGroup)} variant="outline">
                          {service.ageGroup}
                        </Badge>
                      )}
                      {service.requiresAnesthesia && (
                        <Badge className="bg-orange-100 text-orange-800 border-orange-200" variant="outline">
                          Sedation Available
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose California Dental Home?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">20+ Years Experience</h3>
              <p className="text-gray-600">Board-certified pediatric dentist with extensive experience</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Child-Friendly Environment</h3>
              <p className="text-gray-600">Movies, games, and gentle care to make visits enjoyable</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Special Needs Care</h3>
              <p className="text-gray-600">Specialized care for children with developmental disabilities</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Emergency Care</h3>
              <p className="text-gray-600">After-hours emergency dental care when you need it</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Schedule Your Child's Appointment Today
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Give your child the gift of a beautiful, healthy smile in our caring environment.
          </p>
          
          <div className="bg-blue-50 rounded-lg p-8">
            <div className="text-center space-y-4">
              <div>
                <p className="text-2xl font-bold text-blue-600">{practiceInfo.phone}</p>
                <p className="text-gray-600">Call us to schedule an appointment</p>
              </div>
              
              <div className="border-t pt-4">
                <p className="text-gray-700">
                  <strong>Dr. S. Brian Liu</strong> and his entire staff look forward to welcoming 
                  you and your family to our modern, child-friendly pediatric dental office!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}