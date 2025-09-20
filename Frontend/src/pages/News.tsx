import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Search, Filter } from 'lucide-react';
import { RootState } from '@/store/index.ts';
import { fetchNews, setSelectedCountry } from '@/store/slices/newsSlice';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import NewsCard from '@/components/constants/NewsCard';
import LoadingSpinner from '@/components/constants/LoadingSpinner';
import ErrorMessage from '@/components/constants/ErrorMessage';

const News = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { items, isLoading, error, categories, selectedCountry } = useSelector((state: RootState) => state.news);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredNews, setFilteredNews] = useState(items);

  const countries: Array<'EAC' | 'USA' | 'France' | 'Korea' | 'China'> = ['EAC', 'USA', 'France', 'Korea', 'China'];

  useEffect(() => {
    dispatch(fetchNews({ page: 1, category: selectedCategory ?? undefined, country: selectedCountry ?? undefined }) as any);
  }, [dispatch, selectedCategory, selectedCountry]);

  useEffect(() => {
    let filtered = items;

    if (selectedCategory) {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredNews(filtered);
  }, [items, selectedCategory, searchQuery]);

  const retryFetch = () => {
    dispatch(fetchNews({ page: 1, category: selectedCategory ?? undefined, country: selectedCountry ?? undefined }) as any);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-muted/50 to-muted/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t('news.title')}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t('news.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6">
            {/* Country Filters */}
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

            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t('common.search')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 travel-input"
                />
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm font-medium text-foreground mr-2">
                  {t('news.categories')}:
                </span>
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                >
                  {t('common.all')}
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
              <span className="ml-3 text-muted-foreground">{t('news.loading')}</span>
            </div>
          ) : error ? (
            <ErrorMessage message={error} onRetry={retryFetch} className="max-w-md mx-auto" />
          ) : filteredNews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">{t('news.noResults')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.map((news, index) => (
                <NewsCard
                  key={news.id}
                  news={news}
                  featured={index === 0}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default News;