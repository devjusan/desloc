import useSWR, { SWRResponse } from "swr";
import { fetcher } from '../config';

const useFetch = (url: string | null) => {
    const { data, error, isLoading } = useSWR<SWRResponse, Error>(url, fetcher);

    return {
        response: data,
        isLoading,
        error,
    } as unknown as {
        response: unknown;
        isLoading: boolean;
        error: Error;
    };
};

export default useFetch;
