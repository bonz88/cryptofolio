import convertToHyperlink from '../../app/utils/convertToHyperlink';
import BlockchainLinks from '../../app/components/BlockChainLinks';
import { CoinInfo } from '../services/api';

type CoinDescriptionLinksProps = {
  data: CoinInfo;
};

export default function CoinDescriptionLinks({ data }: CoinDescriptionLinksProps) {
  return (
    <div className="flex w-full flex-col lg:w-1/2 xl:w-7/12">
      <div
        className="text-sm font-normal leading-[21px]"
        dangerouslySetInnerHTML={{
          __html: convertToHyperlink(data.description.en),
        }}
      />
      <div className="mt-5 flex flex-wrap gap-2 sm:mt-6">
        {data.links.blockchain_site.map(
          (link: string) => link.length > 0 && <BlockchainLinks key={link} link={link} />
        )}
      </div>
    </div>
  );
}
