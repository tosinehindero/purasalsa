import Link from "next/link";

const classesandworkshop = () => {
   return (
      <div className='bg-orange-300 h-screen pt-16'>
         <h1 className="pt-8 text-center text-gray-600 text-l font-bold md:text-4xl">CLASSES AND WORKSHOP PAGE</h1>
         <p>
            <Link href="/classesandworkshop/package-1" className="text-gray-500">Package-1</Link>
         </p>
         <p>
         <Link href="/classesandworkshop/package-2" className="text-gray-500">Package-2</Link>
         </p>
      </div>
   );
};

export default classesandworkshop;
