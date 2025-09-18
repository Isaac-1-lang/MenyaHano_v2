import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Search, Filter } from 'lucide-react';
import { RootState } from '@/store';
import { fetchNewsStart, fetchNewsSuccess, fetchNewsFailure, setSelectedCategory } from '@/store/slices/newsSlice';
import { newsService } from '@/services/newsService';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import NewsCard from '@/components/common/NewsCard';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';

const News = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { items, loading, error, categories, selectedCategory } = useSelector((state: RootState) => state.news);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredNews, setFilteredNews] = useState(items);

  // Mock data for development
  const mockNews = [
    {
      id: '1',
      title: 'New Travel Guidelines for 2024',
      excerpt: 'Important updates on travel requirements and safety protocols for international visitors.',
      content: 'Full article content...',
      imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500',
      category: 'Travel Tips',
      publishedAt: '2024-01-15T10:00:00Z',
      author: 'Sarah Johnson',
      tags: ['Guidelines', 'Safety', 'International']
    },
    {
      id: '2',
      title: 'Top 10 Hidden Gems to Discover',
      excerpt: 'Explore breathtaking locations that most tourists never see. Your adventure awaits!',
      content: 'Full article content...',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500',
      category: 'Local Events',
      publishedAt: '2024-01-14T15:30:00Z',
      author: 'Mark Chen',
      tags: ['Destinations', 'Adventure', 'Hidden Gems']
    },
    {
      id: '3',
      title: 'Healthcare Services for Visitors',
      excerpt: 'Essential information about accessing healthcare services during your stay.',
      content: 'Full article content...',
      imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500',
      category: 'Safety',
      publishedAt: '2024-01-13T09:15:00Z',
      author: 'Dr. Emily Watson',
      tags: ['Healthcare', 'Emergency', 'Services']
    },
    {
      id: '4',
      title: 'Cultural Festivals This Month',
      excerpt: 'Don\'t miss these amazing cultural events happening in your area this month.',
      content: 'Full article content...',
      imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=500',
      category: 'Culture',
      publishedAt: '2024-01-12T14:20:00Z',
      author: 'Lisa Rodriguez',
      tags: ['Culture', 'Events', 'Festivals']
    }
  ];

  useEffect(() => {
    const loadNews = async () => {
      dispatch(fetchNewsStart());
      try {
        // For development, use mock data
        // In production, replace with: const news = await newsService.getNews();
        setTimeout(() => {
          dispatch(fetchNewsSuccess(mockNews));
        }, 1000);
      } catch (error) {
        dispatch(fetchNewsFailure('Failed to load news'));
      }
    };

    loadNews();
  }, [dispatch]);

  useEffect(() => {
    let filtered = items;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredNews(filtered);
  }, [items, selectedCategory, searchQuery]);

  const handleCategoryFilter = (category: string | null) => {
    dispatch(setSelectedCategory(category));
  };

  const retryFetch = () => {
    // Retry logic here
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
                onClick={() => handleCategoryFilter(null)}
              >
                {t('common.all')}
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategoryFilter(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
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