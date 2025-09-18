import { AlertCircle, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
  className?: string;
}

const ErrorMessage = ({ message, onRetry, className }: ErrorMessageProps) => {
  const { t } = useTranslation();

  return (
    <Alert className={`border-destructive/20 ${className}`}>
      <AlertCircle className="h-4 w-4 text-destructive" />
      <AlertDescription className="flex items-center justify-between">
        <span className="text-destructive">
          {message || t('common.error')}
        </span>
        {onRetry && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="ml-4 border-destructive/20 text-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            <RefreshCw className="h-3 w-3 mr-1" />
            {t('common.retry')}
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default ErrorMessage;