import { useTranslation } from 'react-i18next';
import { Briefcase, MapPin, Clock, DollarSign, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const Jobs = () => {
  const { t } = useTranslation();

  const jobs = [
    {
      id: '1',
      title: 'Tourism Guide',
      company: 'City Tours Inc.',
      location: 'Downtown Area',
      type: 'Part-time',
      salary: '$15-20/hour',
      description: 'Lead guided tours for international visitors. Language skills preferred.',
      posted: '2 days ago',
      requirements: ['Multilingual', 'Tourism Experience', 'Communication Skills']
    },
    {
      id: '2',
      title: 'Hotel Receptionist',
      company: 'Grand Hotel',
      location: 'City Center',
      type: 'Full-time',
      salary: '$35,000-40,000/year',
      description: 'Front desk operations for international hotel chain.',
      posted: '1 week ago',
      requirements: ['Customer Service', 'Computer Skills', 'Night Shifts']
    },
    {
      id: '3',
      title: 'Restaurant Server',
      company: 'International Bistro',
      location: 'Tourist District',
      type: 'Part-time',
      salary: '$12/hour + tips',
      description: 'Serve international cuisine to diverse clientele.',
      posted: '3 days ago',
      requirements: ['Food Service', 'Friendly Attitude', 'Weekend Availability']
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Job Opportunities
            </h1>
            <p className="text-xl text-muted-foreground">
              Find employment opportunities perfect for travelers and locals alike
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs..."
                className="pl-10 travel-input"
              />
            </div>
            <Button className="travel-button">
              <Search className="h-4 w-4 mr-2" />
              Search Jobs
            </Button>
          </div>
        </div>
      </section>

      {/* Jobs List */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {jobs.map((job) => (
              <Card key={job.id} className="travel-card">
                <CardHeader>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl text-foreground mb-2">
                        {job.title}
                      </CardTitle>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Briefcase className="h-4 w-4 mr-1" />
                          {job.company}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.location}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {job.posted}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col lg:items-end gap-2">
                      <Badge variant="outline" className="w-fit">
                        {job.type}
                      </Badge>
                      <div className="flex items-center text-sm font-medium text-foreground">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {job.salary}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {job.description}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="font-medium text-foreground mb-2">Requirements:</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.requirements.map((req) => (
                        <Badge key={req} variant="secondary" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button className="travel-button flex-1">
                      Apply Now
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Save Job
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Load More Jobs
            </Button>
          </div>
        </div>
      </section>

      {/* Job Search Tips */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            Job Search Tips for Travelers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="travel-card text-center">
              <CardHeader>
                <CardTitle>Work Permits</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Ensure you have the proper work authorization before applying for jobs.
                </p>
              </CardContent>
            </Card>

            <Card className="travel-card text-center">
              <CardHeader>
                <CardTitle>Local Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Research local employment laws and requirements for foreign workers.
                </p>
              </CardContent>
            </Card>

            <Card className="travel-card text-center">
              <CardHeader>
                <CardTitle>Networking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Connect with local professionals and join expat communities for opportunities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Jobs;