import Image from "next/image";

export default function Intro() {
  return (
<div className="flex flex-col p-4 bg-white text-orange-700 md:flex-row">
<section
      id="intro"
      className=""
    >
      <h2 className="mt-8 text-center text-green-500 text-2xl md:text-5xl">
        About Me
      </h2>

      <div className="text-sm mt-8 md:text-base">
        <p className="mt-4 md:ml-32 md:mt-0 md:mb-8 max-w-lg text-center">
          Margie Colon is an incredibly talented Latin dance instructor and
          choreographer who has significantly impacted the Northeast Ohio area
          over the past two decades. Known as &quot;Pura Salsa&quot; in the Latin
          community, Margie has dedicated her life to sharing her passion for
          dance with others and promoting her culture. 
        </p>
        <p className="mt-4 md:ml-56 md:mt-0 md:mb-8 max-w-lg text-center"> Margie’s love for dance
          started at a young age, and she has since become a master of various
          Latin dance styles, including Salsa, Bachata, Merengue, Cha Cha, and
          traditional Bomba Plena. Her skills have even led her to perform
          alongside many great Latin artists like Oscar Deleon, La India, and
          Victor Manuel.</p>
        <p className="mt-4 md:ml-32 md:mt-0 md:mb-8 max-w-lg text-center">But Margie’s impact extends far beyond the dancefloor.
          As a minority woman, she takes pride in educating herself and
          embracing her culture. She has used her platform to raise awareness
          about important social issues and has actively worked to make a
          difference in her community.</p>
        <p className="mt-4 md:ml-56 md:mt-0 md:mb-8 max-w-lg text-center">Margie’s dedication to her community was
          particularly evident in the aftermath of Hurricane Maria. She assisted
          those displaced by the natural disaster and led the largest fundraiser
          for support back on the island. Margie also raised awareness for the
          Make-a-Wish foundation and raised money by hosting a dance performance
          after her son Cesar Colon received a wish from the organization. Over
          the last 20 years, she has been hosting annual...more</p>
      </div>

    </section>
    <div className="md:flex-row mx-auto mt-8">
      <Image
          src="/dancer1.jpg"
          alt="dancer"
          width={400}
          height={300}
          priority
          className="rounded-lg mx-auto md:ml-2 mt-4 md:mt-0 md:mb-8"
        />
      </div>
</div>
  );
}


{/* <Image
src="/dancer1.jpg"
alt="dancer"
width={300}
height={300}
priority
className="mx-auto md:ml-2 mt-4 md:mt-0 md:mb-8"
flex flex-col items-center lg:items-start
/> */}