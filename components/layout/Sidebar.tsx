import Link from "next/link"

export default function Sidebar() {
    return (
        <aside className="hidden md:block w-60 bg-white border-r min-h-[calc(100vh-4rem)] p-4">
            <nav className="flex flex-col gp-2">
                <Link
                href="/produtos"
                className="px-3 py-2 rounded hover:bg-gray-100"
                >
                    Produtos
                </Link>
                <Link
                href="/marcas"
                className="px-3 py-2 rounded hover:bg-gray-100"
                >
                    Marcas
                </Link>
            </nav>
        </aside>
    )
}