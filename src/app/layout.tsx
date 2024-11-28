import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "起床標準時（WST）ビュワー",
  description: "起床標準時（WST）を簡単に計算できるアプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        {children}
      </body>
    </html>
  );
}
