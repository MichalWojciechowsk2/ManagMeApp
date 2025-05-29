import "./globals.css";
import Navbar from "../../components/Navbar";
import { UserProvider } from "../../context/UserContext";
import { ThemeProvider } from "../../context/ThemeContext";

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
      <body>
        <ThemeProvider>
          <UserProvider>
            <Navbar />
            <div>
              <main>{children}</main>
            </div>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
