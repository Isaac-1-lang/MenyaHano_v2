import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, MapPin, Newspaper, Heart, Briefcase, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Newspaper,
      title: t('home.features.news.title'),
      description: t('home.features.news.description'),
      href: '/news',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: MapPin,
      title: t('home.features.places.title'),
      description: t('home.features.places.description'),
      href: '/places',
      gradient: 'from-green-500 to-green-600'
    },
    {
      icon: Shield,
      title: t('home.features.healthcare.title'),
      description: t('home.features.healthcare.description'),
      href: '/healthcare',
      gradient: 'from-red-500 to-red-600'
    },
    {
      icon: Briefcase,
      title: t('home.features.jobs.title'),
      description: t('home.features.jobs.description'),
      href: '/jobs',
      gradient: 'from-purple-500 to-purple-600'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              {t('home.hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              {t('home.hero.subtitle')}
            </p>
            <Button
              asChild
              size="lg"
              className="travel-button text-lg px-8 py-6 rounded-full group"
            >
              <Link to="/places">
                {t('home.hero.cta')}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/2 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/3 right-10 w-32 h-32 bg-accent/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need for Your Journey
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From the latest travel news to essential healthcare information, we've got you covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="travel-card group hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <Link to={feature.href} className="block">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors duration-200">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="hero-gradient rounded-3xl p-12 text-white shadow-[var(--shadow-travel)]">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Adventure?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Join thousands of travelers who trust MenyaHano for their journey planning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="bg-white text-primary hover:bg-white/90"
              >
                <Link to="/news">Latest News</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
