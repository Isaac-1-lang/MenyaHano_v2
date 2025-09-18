import { useTranslation } from 'react-i18next';
import { Users, Globe, Heart, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const About = () => {
  const { t } = useTranslation();

  const values = [
    {
      icon: Globe,
      title: 'Global Accessibility',
      description: 'Making travel information accessible to everyone, everywhere, in multiple languages.'
    },
    {
      icon: Heart,
      title: 'Traveler-Centric',
      description: 'Every feature is designed with the traveler\'s needs and safety in mind.'
    },
    {
      icon: Shield,
      title: 'Trusted Information',
      description: 'Reliable, up-to-date information from verified sources and local experts.'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Built with input from travelers and local communities worldwide.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      bio: 'Travel enthusiast with 15 years in the tourism industry.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150'
    },
    {
      name: 'Mark Chen',
      role: 'Head of Technology',
      bio: 'Software engineer passionate about creating accessible travel solutions.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
    },
    {
      name: 'Emma Rodriguez',
      role: 'Content Director',
      bio: 'Former travel journalist dedicated to providing accurate travel information.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary/10 to-primary-glow/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              About MenyaHano
            </h1>
            <p className="text-xl text-muted-foreground">
              {t('app.tagline')}
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              MenyaHano was born from the belief that every traveler deserves access to reliable, 
              comprehensive information about their destination. We bridge the gap between visitors 
              and local knowledge, making travel safer, more enriching, and more enjoyable for everyone.
            </p>
          </div>

          <div className="bg-muted/30 rounded-2xl p-8 mb-12">
            <h3 className="text-2xl font-bold text-foreground mb-4 text-center">Why MenyaHano?</h3>
            <p className="text-muted-foreground leading-relaxed text-center">
              "MenyaHano" means "I know" in several African languages, reflecting our commitment 
              to empowering travelers with the knowledge they need. We believe that informed 
              travelers are confident travelers, and confident travelers create meaningful 
              connections with the places and people they encounter.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.title} className="travel-card text-center">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground">
              The passionate people behind MenyaHano
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <Card key={member.name} className="travel-card text-center">
                <CardHeader>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
                  />
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <p className="text-primary font-medium">{member.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Get In Touch</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Have questions, suggestions, or want to partner with us? We'd love to hear from you.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Email</h3>
              <p className="text-muted-foreground">hello@menyahano.com</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Phone</h3>
              <p className="text-muted-foreground">+1 (555) 123-4567</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Address</h3>
              <p className="text-muted-foreground">123 Travel Street<br />Adventure City, AC 12345</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;