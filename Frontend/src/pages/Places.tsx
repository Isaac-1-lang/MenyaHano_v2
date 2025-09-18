import { useTranslation } from 'react-i18next';
import { MapPin, Clock, Star, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Places = () => {
  const { t } = useTranslation();

  const places = [
    {
      id: '1',
      name: 'Historic Downtown District',
      description: 'Explore the rich history and vibrant culture of our historic downtown area.',
      image: 'https://images.unsplash.com/photo-1549144511-f099e773c147?w=500',
      category: 'Historical',
      rating: 4.8,
      estimatedTime: '2-3 hours',
      isFavorite: false
    },
    {
      id: '2',
      name: 'Riverside Nature Park',
      description: 'Beautiful natural scenery with walking trails and wildlife viewing.',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500',
      category: 'Nature',
      rating: 4.6,
      estimatedTime: '1-2 hours',
      isFavorite: true
    },
    {
      id: '3',
      name: 'Local Art Gallery',
      description: 'Contemporary and traditional artworks from local and international artists.',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500',
      category: 'Culture',
      rating: 4.7,
      estimatedTime: '1 hour',
      isFavorite: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-muted/50 to-muted/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Discover Amazing Places
            </h1>
            <p className="text-xl text-muted-foreground">
              Explore handpicked destinations and hidden gems in your area
            </p>
          </div>
        </div>
      </section>

      {/* Places Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {places.map((place) => (
              <Card key={place.id} className="travel-card group overflow-hidden">
                <div className="relative">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`absolute top-4 right-4 p-2 rounded-full ${
                      place.isFavorite 
                        ? 'bg-red-500 text-white hover:bg-red-600' 
                        : 'bg-white/90 text-gray-600 hover:bg-white'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${place.isFavorite ? 'fill-current' : ''}`} />
                  </Button>
                  <Badge className="absolute bottom-4 left-4 bg-background/90 text-foreground">
                    {place.category}
                  </Badge>
                </div>

                <CardHeader>
                  <CardTitle className="group-hover:text-primary transition-colors duration-200">
                    {place.name}
                  </CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                      {place.rating}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {place.estimatedTime}
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {place.description}
                  </p>
                  <Button className="w-full travel-button">
                    <MapPin className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Places;