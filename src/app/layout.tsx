import "./globals.css";
import Navbar from "../../components/Navbar";

export const metadata = {
  title: "Menage Me",
  description: "Menage me web application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="dark:bg-gray-900">
        <Navbar />
        <div>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
