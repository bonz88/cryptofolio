'use client';
import { useState, useEffect, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spinner } from '@nextui-org/spinner';
import { useCurrencyFromUrl } from '@/hooks/useCurrencyFromUrl';
import { useGetCoinMarketPaginatedQuery } from '../services/api';
import { Table, TableBody, TableHead, TableHeader, TableRow } from './ui/table';
import CoinsMarketStats from './CoinsMarketStats';

export default function TableCoins() {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Get currency from URL using the hook
  const { code: currencyCode } = useCurrencyFromUrl();

  // Track previous currency to detect changes
  const prevCurrencyRef = useRef<string | null>(null);
  // Initialize ref

  // Use RTK Query hook for fetching data
  // Skip the query on the very first render after a currency change while we are resetting the page to 1
  const shouldSkip =
    prevCurrencyRef.current !== null && prevCurrencyRef.current !== currencyCode && page !== 1;

  const {
    data: coins = [],
    isFetching,
    error,
  } = useGetCoinMarketPaginatedQuery(
    {
      currency: currencyCode,
      page: page,
    },
    {
      skip: shouldSkip,
    }
  );

  // When the currency actually changes, reset pagination and update the prev currency ref
  useEffect(() => {
    // Check if currencyCode is loaded and different from previous, or if it's the initial load
    if (
      currencyCode &&
      (prevCurrencyRef.current === null || prevCurrencyRef.current !== currencyCode)
    ) {
      setPage(1);
      setHasMore(true);
      prevCurrencyRef.current = currencyCode;
    } else if (!currencyCode && prevCurrencyRef.current === null) {
      // Handle case where currencyCode is initially null/undefined from the hook
      // We might need to initialize prevCurrencyRef here if currencyCode is valid
      // This depends on how useCurrencyFromUrl guarantees a value
      // For now, let's assume useCurrencyFromUrl returns a default 'usd' eventually.
      // If currencyCode loads async, we might need a loading state from the hook.
      // Let's initialize ref here to avoid skipping query on first valid currency
      if (currencyCode) {
        prevCurrencyRef.current = currencyCode;
      }
    }
  }, [currencyCode]);

  const fetchMoreData = () => {
    // Only fetch more if we're not already fetching and have more data to fetch
    if (!isFetching && coins.length < 300) {
      setPage((prevPage) => prevPage + 1);
    } else if (coins.length >= 300) {
      setHasMore(false);
    }
  };

  if (error) {
    return (
      <div className="p-4 text-red-500" data-testid="table-error">
        Error fetching data
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <InfiniteScroll
        dataLength={coins?.length || 0}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <div className="mt-4 flex justify-center">
            <Spinner color="default" role="status" />
          </div>
        }
        endMessage={<p className="my-4 text-center">You are all set! No more records to load.</p>}
        style={{ overflow: 'hidden' }}
        className="w-full"
        scrollableTarget="window"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden text-sm font-normal leading-4 text-[#424286] dark:text-[#D1D1D1] lg:table-cell">
                #
              </TableHead>
              <TableHead className="text-sm font-normal leading-4 text-[#424286] dark:text-[#D1D1D1]">
                Name
              </TableHead>
              <TableHead className="text-sm font-normal leading-4 text-[#424286] dark:text-[#D1D1D1]">
                Price
              </TableHead>
              <TableHead className="hidden text-sm font-normal leading-4 text-[#424286] dark:text-[#D1D1D1] lg:table-cell">
                1h%
              </TableHead>
              <TableHead className="text-sm font-normal leading-4 text-[#424286] dark:text-[#D1D1D1]">
                24h %
              </TableHead>
              <TableHead className="hidden text-sm font-normal leading-4 text-[#424286] dark:text-[#D1D1D1] lg:table-cell">
                7d%
              </TableHead>
              <TableHead className="hidden text-sm font-normal leading-4 text-[#424286] dark:text-[#D1D1D1] lg:table-cell">
                24h volume / Market Cap
              </TableHead>
              <TableHead className="hidden text-sm font-normal leading-4 text-[#424286] dark:text-[#D1D1D1] lg:table-cell">
                Circulating / Total supply
              </TableHead>
              <TableHead className="hidden text-right text-sm font-normal leading-4 text-[#424286] dark:text-[#D1D1D1] lg:table-cell">
                Last 7d
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coins.map((coin, index) => {
              const targetSearchParams = new URLSearchParams();
              if (currencyCode) {
                targetSearchParams.set('currency', currencyCode);
              }
              const queryString = targetSearchParams.toString();
              const linkHref = `/coin/${coin.id}${queryString ? `?${queryString}` : ''}`;

              return (
                <CoinsMarketStats key={coin.id} coin={coin} index={index} linkHref={linkHref} />
              );
            })}
          </TableBody>
        </Table>
      </InfiniteScroll>
    </div>
  );
}
