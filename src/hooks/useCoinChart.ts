import useSWR from "swr";
import type { ChartData } from "@/types/coin";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useCoinChart(id: string | null) {
  const { data, error, isLoading } = useSWR<ChartData>(
    id ? `/api/coins/${id}/chart` : null,
    fetcher
  );

  return {
    chartData: data,
    isLoading,
    error,
  };
}
