import { Inter } from "next/font/google";
import { CryptofolioLogoIcon } from "../icons/CryptofolioLogoIcon";
import { HomeIcon } from "../icons/HomeIcon";
import { PortfolioGreyIcon } from "../icons/PortfolioGreyIcon";

const inter = Inter({
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

export default function Navbar() {
  return (
    <div className="xl: max-w-[1440px] mx-auto mt-6 mb-[63px] px-[72px] flex justify-between">
      <div className="flex items-center gap-[10px] text-white font-bold">
        <CryptofolioLogoIcon />
        <span className={`${inter.className} text-xl py-2`}>Cryptofolio</span>
      </div>
      <div className="flex gap-14">
        <div className="flex items-center gap-[10px]">
          <HomeIcon />
          <span className="text-white text-base font-medium">Home</span>
        </div>
        <div className="flex items-center gap-[10px]">
          <PortfolioGreyIcon />
          <span className="text-white opacity-50 text-base font-medium">
            Portfolio
          </span>
        </div>
      </div>
      <div></div>
    </div>
  );
}
