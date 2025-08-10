
import "./globals.css";
import { UserProvider } from "@/context/UserContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body >

        <UserProvider>
          {children}
        </UserProvider>
        
      </body>
    </html>
  );
}
