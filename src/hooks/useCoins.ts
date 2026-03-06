'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Coin } from '@/types/coin';

const REFRESH_INTERVAL = 30;

export function useCoins() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [countdown, setCountdown] = useState(REFRESH_INTERVAL);
  const countdownRef = useRef(REFRESH_INTERVAL);

  const fetchCoins = useCallback(async () => {
    try {
      const res = await fetch('/api/coins');
      if (!res.ok) throw new Error('Failed to fetch coins');
      const data = await res.json();
      if (Array.isArray(data)) {
        setCoins(data);
        setError(null);
        setLastUpdated(new Date());
      } else {
        throw new Error(data.error || 'Invalid response');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCoins();

    const refreshTimer = setInterval(() => {
      fetchCoins();
      countdownRef.current = REFRESH_INTERVAL;
      setCountdown(REFRESH_INTERVAL);
    }, REFRESH_INTERVAL * 1000);

    const countdownTimer = setInterval(() => {
      countdownRef.current -= 1;
      if (countdownRef.current < 0) {
        countdownRef.current = REFRESH_INTERVAL;
      }
      setCountdown(countdownRef.current);
    }, 1000);

    return () => {
      clearInterval(refreshTimer);
      clearInterval(countdownTimer);
    };
  }, [fetchCoins]);

  return { coins, loading, error, lastUpdated, countdown };
}
