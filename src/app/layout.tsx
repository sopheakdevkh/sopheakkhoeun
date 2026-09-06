import type { Metadata } from "next";
import { Figtree, Inter } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Sopheak Khoeun | Full Stack Developer Portfolio",
  description:
    "Explore Sopheak Khoeun's portfolio, showcasing web development skills in React, Next.js, Node.js, and PostgreSQL.",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "Sopheak Khoeun | Full Stack Developer Portfolio",
    description:
      "Explore Sopheak Khoeun's portfolio, showcasing web development skills in React, Next.js, Node.js, and PostgreSQL.",
    images: "/icon.svg",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sopheak Khoeun | Full Stack Developer Portfolio",
    description:
      "Explore Sopheak Khoeun's portfolio, showcasing web development skills in React, Next.js, Node.js, and PostgreSQL.",
    images: "/icon.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`light ${figtree.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"){document.documentElement.classList.remove("light");}else{document.documentElement.classList.add("light");}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
