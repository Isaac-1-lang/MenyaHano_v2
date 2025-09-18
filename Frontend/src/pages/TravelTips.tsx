import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TravelTips = () => {
  const { t } = useTranslation();

  const tips = [
    {
      category: 'Transportation',
      icon: '🚗',
      tips: [
        'Download local transportation apps for real-time schedules',
        'Keep digital copies of your transportation passes',
        'Learn basic local phrases for asking directions',
        'Always carry backup payment methods for transportation'
      ]
    },
    {
      category: 'Safety',
      icon: '🛡️',
      tips: [
        'Share your itinerary with family or friends',
        'Keep emergency contacts readily available',
        'Avoid displaying expensive items publicly',
        'Stay in well-lit, populated areas at night'
      ]
    },
    {
      category: 'Money & Banking',
      icon: '💰',
      tips: [
        'Notify your bank of travel plans',
        'Carry multiple forms of payment',
        'Understand local tipping customs',
        'Keep receipts for expense tracking'
      ]
    },
    {
      category: 'Communication',
      icon: '📱',
      tips: [
        'Download offline translation apps',
        'Get a local SIM card or international plan',
        'Learn essential phrases in the local language',
        'Save important numbers in your phone'
      ]
    },
    {
      category: 'Cultural Etiquette',
      icon: '🤝',
      tips: [
        'Research local customs and traditions',
        'Dress appropriately for local standards',
        'Respect religious and cultural sites',
        'Learn basic greeting customs'
      ]
    },
    {
      category: 'Health & Wellness',
      icon: '⚕️',
      tips: [
        'Pack a basic first aid kit',
        'Research local health risks',
        'Stay hydrated and eat safely',
        'Know where to find medical help'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Travel Tips & Advice
            </h1>
            <p className="text-xl text-muted-foreground">
              Essential tips to make your journey smooth and memorable
            </p>
          </div>
        </div>
      </section>

      {/* Tips Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tips.map((category) => (
              <Card key={category.category} className="travel-card h-full">
                <CardHeader className="text-center pb-4">
                  <div className="text-4xl mb-2">{category.icon}</div>
                  <CardTitle className="text-xl">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {category.tips.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-muted-foreground text-sm leading-relaxed">
                          {tip}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Tips Banner */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Quick Travel Reminders
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-background rounded-lg p-4 shadow-sm">
              <div className="text-2xl mb-2">📄</div>
              <p className="text-sm font-medium">Check passport expiry</p>
            </div>
            <div className="bg-background rounded-lg p-4 shadow-sm">
              <div className="text-2xl mb-2">💉</div>
              <p className="text-sm font-medium">Verify vaccinations</p>
            </div>
            <div className="bg-background rounded-lg p-4 shadow-sm">
              <div className="text-2xl mb-2">🌐</div>
              <p className="text-sm font-medium">Download offline maps</p>
            </div>
            <div className="bg-background rounded-lg p-4 shadow-sm">
              <div className="text-2xl mb-2">☁️</div>
              <p className="text-sm font-medium">Check weather forecast</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TravelTips;