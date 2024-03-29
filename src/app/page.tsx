import NavHome from "./components/NavHome";
import CarouselCoins from "./components/CarouselCoins";
import GraphCoins from "./components/GraphCoins";
import Timeline from "./components/Timeline";
import TableCoins from "./components/TableCoins";

export default function Home() {
  return (
    <main className="pb-10">
      <NavHome />
      <div className="mt-[70px] max-w-[1440px] mx-auto xl:px-[72px] lg:px-[36px] md:px-[24px]">
        <CarouselCoins />
      </div>
      <div className="mt-10 max-w-[1440px] mx-auto xl:px-[72px] lg:px-[36px] md:px-[24px]">
        <GraphCoins />
      </div>
      <div className="mt-10 max-w-[1440px] mx-auto xl:px-[72px] lg:px-[36px] md:px-[24px]">
        <Timeline />
      </div>
      <div className="mt-10 max-w-[1440px] mx-auto xl:px-[72px] lg:px-[36px] md:px-[24px]">
        <TableCoins />
      </div>
    </main>
  );
}
