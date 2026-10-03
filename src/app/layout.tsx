import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "WEG Academy - Catálogo de Cursos",
  description: "Plataforma de Capacitação Técnica e Treinamentos",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="pt-BR">
      <body className={`${montserrat.style} flex min-h-screen flex-col bg-slate-50 text-slate-900`}>
        <Header/>
        <div className="flex-1">{children}</div>
        <Footer/>
      </body>
    </html>
  );
}
