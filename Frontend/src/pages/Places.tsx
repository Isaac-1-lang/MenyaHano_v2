import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { MapPin, Clock, Star, Heart, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { RootState } from '@/store/index.ts';
import { fetchPlaces, setSelectedCountry } from '@/store/slices/placesSlice';
import LoadingSpinner from '@/components/constants/LoadingSpinner';
import ErrorMessage from '@/components/constants/ErrorMessage';

const Places = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { items, isLoading, error, selectedCountry } = useSelector((state: RootState) => state.places);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPlaces, setFilteredPlaces] = useState(items);

  const countries: Array<'EAC' | 'USA' | 'France' | 'Korea' | 'China'> = ['EAC', 'USA', 'France', 'Korea', 'China'];

  useEffect(() => {
    dispatch(fetchPlaces({ page: 1, country: selectedCountry ?? undefined }) as any);
  }, [dispatch, selectedCountry]);

  useEffect(() => {
    let filtered = items;
    if (searchQuery) {
      filtered = filtered.filter(place =>
        place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    setFilteredPlaces(filtered);
  }, [items, searchQuery]);

  const retryFetch = () => {
    dispatch(fetchPlaces({ page: 1, country: selectedCountry ?? undefined }) as any);
  };

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

      {/* Filters */}
      <section className="py-8 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm font-medium text-foreground mr-2">Countries:</span>
              <Button
                variant={selectedCountry === null ? 'default' : 'outline'}
                size="sm"
                onClick={() => dispatch(setSelectedCountry(null) as any)}
              >
                {t('common.all')}
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

            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('common.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 travel-input"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Places Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : error ? (
            <ErrorMessage message={error} onRetry={retryFetch} className="max-w-md mx-auto" />
          ) : filteredPlaces.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No places found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlaces.map((place) => (
                <Card key={place.id} className="travel-card group overflow-hidden">
                  <div className="relative">
                    <img
                      src={place.imageUrl}
                      alt={place.name}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`absolute top-4 right-4 p-2 rounded-full bg-white/90 text-gray-600 hover:bg-white`}
                    >
                      <Heart className={`h-4 w-4`} />
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
                        {/* No estimatedTime in data; show price range instead */}
                        {place.priceRange}
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
          )}
        </div>
      </section>
    </div>
  );
};

export default Places;