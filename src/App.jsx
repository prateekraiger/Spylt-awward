import NavBar from "./components/NavBar";
import HeroSection from "./sections/HeroSection";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import { useEffect, Suspense, lazy } from "react";

const MessageSection = lazy(() => import("./sections/MessageSection"));
const FlavorSection = lazy(() => import("./sections/FlavorSection"));
const NutritionSection = lazy(() => import("./sections/NutritionSection"));
const BenefitSection = lazy(() => import("./sections/BenefitSection"));
const TestimonialSection = lazy(() => import("./sections/TestimonialSection"));
const FooterSection = lazy(() => import("./sections/FooterSection"));
import Lenis from "lenis";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const onLoad = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
    }

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      window.removeEventListener("load", onLoad);
      lenis.destroy();
      gsap.ticker.remove(raf);
    };
  }, []);

  return (
    <main style={{ overflowX: "hidden", scrollbarWidth: "none" }}>
      <NavBar />
      <HeroSection />
      <Suspense fallback={<div className="h-[200vh] bg-red-brown" />}>
        <MessageSection />
        <FlavorSection />
        <NutritionSection />
        <BenefitSection />
        <TestimonialSection />
        <FooterSection />
      </Suspense>
    </main>
  );
};

export default App;
