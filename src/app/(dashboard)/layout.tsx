
import Footer from "@/app/components/Footer";
import NavBar from "@/app/components/Navbar";
import style from "./layout.module.css";

interface PropsLayout {
  children: React.ReactNode
}

export default function RootLayout({children}: Readonly<PropsLayout>) {

  return (

      <div className={style.body}>
        <NavBar />
        {children}
        <Footer />
      </div>
  );
}