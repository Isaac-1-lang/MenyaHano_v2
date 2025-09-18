import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const FAQs = () => {
  const { t } = useTranslation();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const faqCategories = [
    {
      category: 'General Travel',
      faqs: [
        {
          question: 'What documents do I need to travel?',
          answer: 'You typically need a valid passport, and depending on your destination, you may need a visa, travel insurance, and vaccination certificates. Check with the embassy or consulate of your destination country for specific requirements.'
        },
        {
          question: 'How early should I arrive at the airport?',
          answer: 'For domestic flights, arrive 2 hours early. For international flights, arrive 3 hours early. During peak travel seasons or at busy airports, consider arriving even earlier.'
        },
        {
          question: 'What should I pack in my carry-on?',
          answer: 'Pack essentials like medications, travel documents, electronics, a change of clothes, and valuable items. Follow airline liquid restrictions and check prohibited items list.'
        }
      ]
    },
    {
      category: 'Healthcare',
      faqs: [
        {
          question: 'Do I need travel insurance?',
          answer: 'Yes, travel insurance is highly recommended. It can cover medical emergencies, trip cancellations, lost luggage, and other unexpected events. Check what your regular insurance covers abroad.'
        },
        {
          question: 'What vaccinations do I need?',
          answer: 'Required vaccinations vary by destination. Consult with a travel medicine clinic or your doctor 4-6 weeks before travel. Some countries require proof of certain vaccinations for entry.'
        },
        {
          question: 'How do I find medical care abroad?',
          answer: 'Contact your travel insurance provider, visit the nearest hospital or clinic, or contact your embassy. Keep emergency numbers handy and know basic phrases for medical emergencies.'
        }
      ]
    },
    {
      category: 'Money & Banking',
      faqs: [
        {
          question: 'Should I exchange money before traveling?',
          answer: 'It\'s good to have some local currency for immediate expenses, but you can often get better rates at your destination. Use ATMs, banks, or authorized exchange services rather than airport exchanges.'
        },
        {
          question: 'Will my credit card work abroad?',
          answer: 'Most major credit cards work internationally, but notify your bank of travel plans to avoid blocks. Check for foreign transaction fees and consider cards with no international fees.'
        },
        {
          question: 'How much should I budget for my trip?',
          answer: 'Budget varies greatly by destination and travel style. Research average costs for accommodation, food, transportation, and activities. Add 20% buffer for unexpected expenses.'
        }
      ]
    },
    {
      category: 'Local Information',
      faqs: [
        {
          question: 'How do I navigate public transportation?',
          answer: 'Download local transit apps, get day/week passes if staying longer, learn basic route information, and keep a map or GPS handy. Ask locals or transit staff for help when needed.'
        },
        {
          question: 'What are the local customs I should know?',
          answer: 'Research dress codes, tipping practices, greeting customs, and religious observances. Show respect for local traditions and be open to learning about the culture.'
        },
        {
          question: 'Is it safe to drink tap water?',
          answer: 'Water safety varies by location. Research your destination or stick to bottled water if unsure. Ice in drinks may also be made from tap water, so be cautious.'
        }
      ]
    }
  ];

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  const toggleFAQ = (categoryIndex: number, faqIndex: number) => {
    const key = categoryIndex * 100 + faqIndex;
    setOpenFAQ(openFAQ === key ? null : key);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-muted-foreground">
              Find answers to common travel questions and concerns
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 border-b border-border">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 travel-input"
            />
          </div>
        </div>
      </section>

      {/* FAQs Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No FAQs found matching your search.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredFAQs.map((category, categoryIndex) => (
                <div key={category.category}>
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    {category.category}
                  </h2>
                  <div className="space-y-4">
                    {category.faqs.map((faq, faqIndex) => {
                      const key = categoryIndex * 100 + faqIndex;
                      const isOpen = openFAQ === key;
                      
                      return (
                        <Card key={faqIndex} className="travel-card">
                          <CardHeader
                            className="cursor-pointer"
                            onClick={() => toggleFAQ(categoryIndex, faqIndex)}
                          >
                            <CardTitle className="flex items-center justify-between text-lg">
                              <span>{faq.question}</span>
                              {isOpen ? (
                                <ChevronUp className="h-5 w-5 text-muted-foreground" />
                              ) : (
                                <ChevronDown className="h-5 w-5 text-muted-foreground" />
                              )}
                            </CardTitle>
                          </CardHeader>
                          {isOpen && (
                            <CardContent className="pt-0">
                              <p className="text-muted-foreground leading-relaxed">
                                {faq.answer}
                              </p>
                            </CardContent>
                          )}
                        </Card>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Still Have Questions?
          </h2>
          <p className="text-muted-foreground mb-6">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <Button className="travel-button">
            Contact Support
          </Button>
        </div>
      </section>
    </div>
  );
};

export default FAQs;