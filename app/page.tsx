import Preloader from "@/components/Preloader";
import Hero from "@/components/sections/Hero";
import Story from "@/components/sections/Story";
import Cinematic from "@/components/sections/Cinematic";
import Horizontal from "@/components/sections/Horizontal";
import Parallax from "@/components/sections/Parallax";
import Finale from "@/components/sections/Finale";
import Transition from "@/components/ui/Transition";

export default function Page() {
  return (
    <main>
      <Preloader />
      <Hero />
      <Story />
      <Transition text="СМЕНА НАЧИНАЕТСЯ В СЕМЬ" />
      <Cinematic />
      <Horizontal />
      <Parallax />
      <Transition text="ЗАВОДИТСЯ С ПОЛ-ОБОРОТА" color="zholty" />
      <Finale />
    </main>
  );
}
