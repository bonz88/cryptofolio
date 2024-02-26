import NavHome from "./components/NavHome";
import CarouselCoins from "./components/CarouselCoins";

export default function Home() {
  return (
    <main>
      <NavHome />
      <div className="mt-[70px] max-w-[1440px] mx-auto xl:px-[72px] lg:px-[36px] md:px-[24px]">
        <CarouselCoins />
      </div>
    </main>
  );
}
