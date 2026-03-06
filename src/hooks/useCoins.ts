import useSWR from "swr";
import type { Coin } from "@/types/coin";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useCoins() {
  const { data, error, isLoading, mutate } = useSWR<Coin[]>(
    "/api/coins",
    fetcher,
    { refreshInterval: 30000 }
  );

  return {
    coins: data,
    isLoading,
    error,
    refresh: mutate,
  };
}
