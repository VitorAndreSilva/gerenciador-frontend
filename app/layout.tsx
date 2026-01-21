import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pt-BR">
            <body className="bg-gray-100 text-gray-900">
                <ClientLayout>{children}</ClientLayout>
            </body>
        </html>
    );
}
