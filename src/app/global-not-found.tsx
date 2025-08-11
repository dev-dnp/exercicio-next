

import Link from 'next/link';
import './globals.css';

 
export default function GlobalNotFound() {
  return (
    <html lang="pt">
      <body>
        <h1>404 - Página não encontrada</h1>
        <Link href={"/login"}>Voltar</Link>
      </body>
    </html>
  )
}