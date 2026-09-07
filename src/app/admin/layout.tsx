import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Portfolio CMS",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#efeae2] text-zinc-900 antialiased">
      {children}
    </div>
  );
}
