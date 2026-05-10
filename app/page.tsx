import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import CodeSnippet from "@/components/landing/CodeSnippet";
import Pricing from "@/components/landing/Pricing";
import CTABanner from "@/components/landing/CTABanner";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div style={{ background: "#fff", overflowX: "hidden" }}>
      <Navbar />
      <Hero />
      <Features />
      <CodeSnippet />
      <Pricing />
      <CTABanner />
      <Footer />
    </div>
  );
}
