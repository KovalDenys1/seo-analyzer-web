import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import PageTransition from "@/components/motion/PageTransition";

export default function TextPage({
  title,
  lead,
  updated,
  children,
}: {
  title: string;
  lead?: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <PageTransition>
      <div style={{ background: "#fff", minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
        <Navbar />
        <main className="text-page">
          <h1>{title}</h1>
          {lead && <p className="text-page-lead">{lead}</p>}
          {updated && <p className="text-page-updated">Last updated {updated}</p>}
          {children}
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
}
