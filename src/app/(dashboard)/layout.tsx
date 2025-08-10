
import Footer from "@/app/components/Footer";
import NavBar from "@/app/components/Navbar";
import "./../globals.css";
import style from "./layout.module.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={style.body}>
        <NavBar />
        {children}
        <Footer />

      </body>
    </html>
  );
}
