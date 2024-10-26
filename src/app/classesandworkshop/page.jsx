import Link from "next/link";

const classesandworkshop = () => {
   return (
      <div>
         <h1>CLASSES AND WORKSHOP PAGE</h1>
         <p>
            <Link href="/classesandworkshop/package-1">Package-1</Link>
         </p>
         <p>
         <Link href="/classesandworkshop/package-2">Package-2</Link>
         </p>
      </div>
   );
};

export default classesandworkshop;
