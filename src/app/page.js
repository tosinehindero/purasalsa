import Hero from "./components/hero";
import Intro from "./components/sectionIntro";
import SectionClassesOff from "./components/sectionClassesOff";

export default function Home() {
   return (
      <main>
         <Hero />
         <Intro />
         <SectionClassesOff />
         <section
            id="reviews"
            className="p-8 bg-custom-khaki text-white-500 h-screen  md:text-white-600"
         >
            <h2 className="m-auto text-2xl font-semibold pt-16">Reviews section</h2>
            <p className="mt-4 text-lg">
               Discover the joy of dance with our expert-led classes designed for all
               skill levels.
            </p>
            {/* Add more content here */}
         </section>
         {/* Additional content */}
      </main>
   );
}
