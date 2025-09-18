import { useState, useEffect } from 'react';
import { handleApiError } from '@/services/api';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useApi = <T>(
  apiFunction: () => Promise<T>,
  dependencies: any[] = []
): UseApiState<T> & { refetch: () => void } => {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const result = await apiFunction();
      setState({ data: result, loading: false, error: null });
    } catch (error: any) {
      setState({
        data: null,
        loading: false,
        error: handleApiError(error),
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, dependencies);

  return {
    ...state,
    refetch: fetchData,
  };
};