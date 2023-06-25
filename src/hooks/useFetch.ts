import useSWR, { SWRResponse } from 'swr';
import { fetcher } from '../config';

const useFetch = (url: string | null) => {
  const { data, error, isLoading, mutate } = useSWR<SWRResponse, Error>(
    url,
    fetcher
  );

  return {
    response: data,
    isLoading,
    error,
    mutate,
  } as unknown as {
    response: unknown;
    isLoading: boolean;
    error: Error;
    mutate: () => void;
  };
};

export default useFetch;
