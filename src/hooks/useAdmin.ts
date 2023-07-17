import useSWR, { SWRConfiguration } from 'swr';

export const useAdmin = <T>(url: string, config: SWRConfiguration = {}) => {
  const { data, error, isLoading } = useSWR<T>(`/api/${url}`, config);

  return {
    data,
    isLoading,
    isError: error,
  };
};
