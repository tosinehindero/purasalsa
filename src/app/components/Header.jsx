import Link from "next/link"

export default function Header(){
  return (
    <header className="flex items-center justify-between p-4 bg-opacity-45 bg-custom-light-blue-500 text-white">
    <h1 className="text-lg font-bold">PurasalsaMargieColon.com</h1>
    <nav>
        <ul className="flex space-x-4">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/about" className="hover:underline">Aboutme</Link></li>
            <li><Link href="/contact" className="hover:underline">Contactme</Link></li>
            <li><Link href="/" className="hover:underline">Classe and workshop</Link></li>
            <li><Link href="/about" className="hover:underline">Events and Performance</Link></li>
            <li><Link href="/contact" className="hover:underline">Gallery</Link></li>
            <li><Link href="/contact" className="hover:underline">Merchandise</Link></li>
            {/* Add more links as needed */}
        </ul>
    </nav>
</header>
  )
}


