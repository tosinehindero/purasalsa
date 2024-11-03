import Hero from "./components/hero";
import Intro from "./components/sectionIntro";
import SectionClassesOff from "./components/sectionClassesOff";
import SectionReviews from "./components/sectionReviews";

export default function Home() {
   return (
      <main>
         <Hero />
         <Intro />
         <SectionClassesOff />
         <SectionReviews />
         
         {/* Additional content */}
      </main>
   );
}
