import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Phone, MapPin, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { RootState } from '@/store';
import { setSelectedCountry, fetchHealthcareProviders, fetchEmergencyProviders } from '@/store/slices/healthcareSlice';

const Healthcare = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { selectedCountry } = useSelector((state: RootState) => state.healthcare);
  const countries: Array<'EAC' | 'USA' | 'France' | 'Korea' | 'China'> = ['EAC', 'USA', 'France', 'Korea', 'China'];

  useEffect(() => {
    dispatch(fetchHealthcareProviders({ country: selectedCountry ?? undefined }) as any);
    dispatch(fetchEmergencyProviders(selectedCountry ?? undefined) as any);
  }, [dispatch, selectedCountry]);

  const emergencyContacts = [
    {
      service: 'Emergency Services',
      number: '911',
      description: 'For life-threatening emergencies',
      available: '24/7'
    },
    {
      service: 'Poison Control',
      number: '1-800-222-1222',
      description: 'For poisoning emergencies',
      available: '24/7'
    },
    {
      service: 'Medical Helpline',
      number: '1-800-HEALTH',
      description: 'For general health questions',
      available: '8 AM - 8 PM'
    }
  ];

  const healthcareFacilities = [
    {
      name: 'City General Hospital',
      type: 'Hospital',
      address: '123 Main St, Downtown',
      distance: '0.5 miles',
      services: ['Emergency', 'Surgery', 'ICU'],
      rating: 4.5
    },
    {
      name: 'Quick Care Clinic',
      type: 'Urgent Care',
      address: '456 Oak Ave, Midtown',
      distance: '1.2 miles',
      services: ['Walk-in', 'X-Ray', 'Lab Tests'],
      rating: 4.2
    },
    {
      name: 'Family Medical Center',
      type: 'Family Practice',
      address: '789 Pine St, Uptown',
      distance: '2.1 miles',
      services: ['Primary Care', 'Pediatrics', 'Vaccines'],
      rating: 4.7
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-900/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Healthcare Information
            </h1>
            <p className="text-xl text-muted-foreground">
              Essential healthcare resources and emergency information for visitors
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Country Filter */}
        <div className="mb-8 flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium text-foreground mr-2">Countries:</span>
          <Button
            variant={selectedCountry === null ? 'default' : 'outline'}
            size="sm"
            onClick={() => dispatch(setSelectedCountry(null) as any)}
          >
            All
          </Button>
          {countries.map((c) => (
            <Button
              key={c}
              variant={selectedCountry === c ? 'default' : 'outline'}
              size="sm"
              onClick={() => dispatch(setSelectedCountry(c) as any)}
            >
              {c}
            </Button>
          ))}
        </div>

        {/* Emergency Alert */}
        <Alert className="mb-8 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-red-800 dark:text-red-200">Emergency Information</AlertTitle>
          <AlertDescription className="text-red-700 dark:text-red-300">
            In case of a medical emergency, call 911 immediately. For non-urgent medical needs, 
            refer to the healthcare facilities listed below.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Emergency Contacts */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Emergency Contacts</h2>
            <div className="space-y-4">
              {emergencyContacts.map((contact, index) => (
                <Card key={index} className="travel-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between">
                      <span>{contact.service}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        {contact.number}
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-2">{contact.description}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      Available: {contact.available}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Healthcare Facilities */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Nearby Healthcare Facilities</h2>
            <div className="space-y-4">
              {healthcareFacilities.map((facility, index) => (
                <Card key={index} className="travel-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between">
                      <span>{facility.name}</span>
                      <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">
                        {facility.type}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-muted-foreground mb-2">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{facility.address}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground mb-3">
                      <span className="text-sm">Distance: {facility.distance}</span>
                      <span className="mx-2">•</span>
                      <span className="text-sm">Rating: {facility.rating}/5</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {facility.services.map((service) => (
                        <span
                          key={service}
                          className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      <MapPin className="h-4 w-4 mr-2" />
                      Get Directions
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Health Tips */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Health & Safety Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="travel-card">
              <CardHeader>
                <CardTitle>Travel Insurance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Ensure you have adequate travel insurance that covers medical expenses in your destination.
                </p>
              </CardContent>
            </Card>

            <Card className="travel-card">
              <CardHeader>
                <CardTitle>Prescription Medications</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Bring enough prescription medications for your trip, plus extra in case of delays.
                </p>
              </CardContent>
            </Card>

            <Card className="travel-card">
              <CardHeader>
                <CardTitle>Local Health Risks</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Research any local health risks or required vaccinations before traveling.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Healthcare;