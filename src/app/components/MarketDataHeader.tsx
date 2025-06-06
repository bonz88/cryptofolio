'use client';
import { useCurrencyFromUrl } from '@/hooks/useCurrencyFromUrl';
import { useGetGlobalDataQuery } from '../services/api';
import { CoinsIcon } from '../icons/CoinsIcon';
import { ExchangeIcon } from '../icons/ExchangeIcon';
import { ChevronUpIcon } from '../icons/ChevronUpIcon';
import { BitcoinIcon } from '../icons/BitcoinIcon';
import { EthereumIcon } from '../icons/EthereumIcon';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';
import { Progress } from '../components/ui/progress';
import MarketDataHeaderSkeleton from './MarketDataHeaderSkeleton';
import formatNumber from '../../app/utils/formatNumber';
import getPercentage from '../../app/utils/getPercentage';

export default function MarketDataHeader() {
  const { data: globalDataResponse, isLoading, error } = useGetGlobalDataQuery();
  const { symbol, code } = useCurrencyFromUrl();

  if (isLoading) {
    return <MarketDataHeaderSkeleton />;
  }

  if (error) {
    return <div>Error loading market data</div>;
  }

  const data = globalDataResponse?.data;

  if (!data || data.active_cryptocurrencies === 0) {
    return <MarketDataHeaderSkeleton />;
  }

  const hasData: boolean = !isLoading && !error;
  const percentageVolumeBasedOnTotalMarketCap = getPercentage(
    data.total_volume.btc,
    data.total_market_cap.btc
  );
  const btcMarketCapPercentage = Math.floor(data.market_cap_percentage.btc);
  const ethMarketCapPercentage = Math.floor(data.market_cap_percentage.eth);

  return (
    <div className="mx-auto flex w-full justify-center gap-2 bg-[#353570] px-4 py-5 dark:bg-[#1E1932] sm:gap-7 md:gap-8 lg:px-[72px]">
      {hasData && (
        <>
          <div className="flex items-center gap-1">
            <CoinsIcon />
            <span className="text-xs font-medium text-[#D1D1D1]">Coins</span>
            <span className="text-xs font-medium text-white">{data.active_cryptocurrencies}</span>
          </div>
          <div className="flex items-center gap-1">
            <ExchangeIcon />
            <span className="text-xs font-medium text-[#D1D1D1]">Exchanges</span>
            <span className="text-xs font-medium text-white">{data.markets}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="hidden text-xs font-medium text-[#D1D1D1] sm:inline">Market Cap</span>
            <div className="flex">
              <span className="text-xs font-medium text-white">{symbol}</span>
              <span className="text-xs font-medium text-white">
                {formatNumber(data.total_market_cap[code])}
              </span>
            </div>

            <span className="hidden sm:block">
              {data.market_cap_change_percentage_24h_usd > 0 ? (
                <ChevronUpIcon />
              ) : (
                <ChevronDownIcon />
              )}
            </span>

            <span
              className={`hidden sm:inline sm:text-xs sm:font-medium ${
                data.market_cap_change_percentage_24h_usd > 0 ? 'text-[#00F0E2]' : 'text-[#FD2263]'
              }`}
            >
              {Math.abs(data.market_cap_change_percentage_24h_usd).toFixed(2)}%
            </span>
          </div>
          <div className="flex items-center gap-1">
            <div className="flex">
              <span className="text-xs font-medium text-white">{symbol}</span>
              <span className="text-xs font-medium text-white">
                {formatNumber(data.total_volume[code])}
              </span>
            </div>
            <Progress
              className="hidden sm:block sm:h-[6px] sm:w-[53px] sm:bg-gray-500"
              value={percentageVolumeBasedOnTotalMarketCap}
              indicator="bg-white"
            />
          </div>
          <div className="hidden items-center gap-1 lg:flex">
            <BitcoinIcon />
            <span className="text-xs font-medium text-white">{`${btcMarketCapPercentage}%`}</span>
            <Progress
              className="h-[6px] w-[53px] bg-gray-500"
              value={btcMarketCapPercentage}
              indicator="bg-[#F7931A]"
            />
          </div>
          <div className="hidden items-center gap-1 lg:flex">
            <EthereumIcon />
            <span className="text-xs font-medium text-white">{`${ethMarketCapPercentage}%`}</span>
            <Progress
              className="h-[6px] w-[53px] bg-gray-500"
              value={ethMarketCapPercentage}
              indicator="bg-[#849DFF]"
            />
          </div>
        </>
      )}
    </div>
  );
}
