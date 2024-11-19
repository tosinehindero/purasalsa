import Image from "next/image";

const aboutPage = () => {
   return (
      <div className="bg-gradient-to-r from-white to-custom-bluegreen pt-16 pb-16 ">
         <h1 className="animate-slideInRight font-parisienne pt-8 text-center text-white text-5xl md:text-8xl">
            About Me
         </h1>
         <div className="flex flex-col mt-16 md:flex-row">
            {/* image-column */}
            <div className="animate-slideInLeft rounded-2xl mx-auto md:ml-16 md:w-3/4 ">
               <Image
                  src=""
                  alt="dancer"
                  width={400}
                  height={400}
                  priority
                  className="rounded-2xl"
               />
            </div>
            {/* text-column  */}
            <div className="animate-slideInRight text-sm text-center p-2 mt-6 mb-6 text-gray-800 md:ml-6 md:pr-6 md:mr-4 md:text-base">
               <p className="mt-4">
                  Margie Colon is an incredibly talented Latin dance instructor and
                  choreographer who has significantly impacted the Northeast Ohio area
                  over the past two decades. Known as &quot;Pura Salsa&quot; in the
                  Latin community, Margie has dedicated her life to sharing her passion
                  for dance with others and promoting her culture.
               </p>
               <p className="mt-4">
                  Margie’s love for dance started at a young age, and she has since
                  become a master of various Latin dance styles, including Salsa,
                  Bachata, Merengue, Cha Cha, and traditional Bomba Plena. Her skills
                  have even led her to perform alongside many great Latin artists like
                  Oscar Deleon, La India, and Victor Manuel.
               </p>
               <p className="mt-4">
                  But Margie’s impact extends far beyond the dancefloor. As a minority
                  woman, she takes pride in educating herself and embracing her
                  culture. She has used her platform to raise awareness about important
                  social issues and has actively worked to make a difference in her
                  community.
               </p>
               <p className="mt-4">
                  Margie’s dedication to her community was particularly evident in the
                  aftermath of Hurricane Maria. She assisted those displaced by the
                  natural disaster and led the largest fundraiser for support back on
                  the island. Margie also raised awareness for the Make-a-Wish
                  foundation and raised money by hosting a dance performance after her
                  son Cesar Colon received a wish from the organization. Over the last
                  20 years, she has been hosting annual Thanksgiving dinners for the
                  nurses and staff at MetroHealth. She was honored by NBC&#39;s
                  Meredith Show and sent to New York to represent MetroHealth as an
                  employee.
               </p>
               <p className="mt-4">
                  Margie&#39;s work as a cultural outreach liaison at MetroHealth has
                  also made a significant impact. She has made over 300 connections
                  within the community and acts as a liaison between the community and
                  MetroHealth. Margie advocates for the Latin community and beyond,
                  making a difference in the lives of those around her.
               </p>
               <p className="mt-4">
                  Overall, Margie&#39;s passion for dance, advocacy, and
                  community-building has made her a true inspiration. Her tireless
                  dedication to her craft and her community serves as a reminder that
                  we all have the power to make a positive impact in the world.
               </p>
            </div>
         </div>
      </div>
   );
};

export default aboutPage;
