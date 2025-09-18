import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { NewsItem } from '@/store/slices/newsSlice';

interface NewsCardProps {
  news: NewsItem;
  featured?: boolean;
}

const NewsCard = ({ news, featured = false }: NewsCardProps) => {
  const { t } = useTranslation();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card className={`travel-card group overflow-hidden ${featured ? 'md:col-span-2' : ''}`}>
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={news.imageUrl}
          alt={news.title}
          className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
            featured ? 'h-64' : 'h-48'
          }`}
        />
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="bg-background/90 text-foreground">
            {news.category}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-3">
        <h3 className={`font-semibold text-foreground group-hover:text-primary transition-colors duration-200 ${
          featured ? 'text-xl' : 'text-lg'
        }`}>
          {news.title}
        </h3>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {formatDate(news.publishedAt)}
          </div>
          <div className="flex items-center">
            <User className="h-4 w-4 mr-1" />
            {news.author}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <p className={`text-muted-foreground leading-relaxed ${
          featured ? 'text-base' : 'text-sm'
        }`}>
          {news.excerpt}
        </p>
        
        {/* Tags */}
        {news.tags && news.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {news.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {news.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{news.tags.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0">
        <Button 
          asChild 
          variant="ghost" 
          className="group/btn p-0 h-auto font-medium text-primary hover:text-primary-glow"
        >
          <Link to={`/news/${news.id}`} className="flex items-center">
            {t('news.readMore')}
            <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-200 group-hover/btn:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NewsCard;