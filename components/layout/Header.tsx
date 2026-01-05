import Link from "next/link"

export default function Header() {
    return (
        <header className="h-16 bg-slate-900 text-white flex items-center px-6">
            <Link
            href="/"
            >
                <h1 className="text-lg font-semibold">Gerenciador</h1>
            </Link>
        </header>
    )
}