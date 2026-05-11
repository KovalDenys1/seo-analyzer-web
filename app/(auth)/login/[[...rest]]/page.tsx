import { SignIn } from "@clerk/nextjs";
import AuthLayout from "@/components/auth/AuthLayout";

const clerkAppearance = {
  variables: {
    colorPrimary: "#0D9488",
    colorText: "#0b1220",
    colorTextSecondary: "#6b7280",
    colorBackground: "#ffffff",
    colorInputBackground: "#ffffff",
    colorInputText: "#0b1220",
    borderRadius: "10px",
    fontFamily: "Inter, system-ui, sans-serif",
    fontSize: "14px",
  },
  elements: {
    rootBox: { width: "100%", maxWidth: 380 },
    cardBox: { boxShadow: "none", width: "100%" },
    card: { boxShadow: "none", padding: 0, background: "transparent" },
    headerTitle: { fontSize: "28px", fontWeight: "700", letterSpacing: "-0.6px" },
    headerSubtitle: { fontSize: "14px" },
    socialButtonsBlockButton: {
      border: "1px solid #e5e7eb", borderRadius: "10px",
      height: "44px", fontSize: "14px", fontWeight: "500",
    },
    formButtonPrimary: {
      backgroundColor: "#0D9488", borderRadius: "10px",
      height: "44px", fontSize: "14px", fontWeight: "600",
    },
    formFieldInput: {
      height: "42px", border: "1px solid #e5e7eb",
      borderRadius: "10px", fontSize: "14px",
    },
    footerActionLink: { color: "#0D9488", fontWeight: "600" },
  },
} as const;

export default function LoginPage() {
  return (
    <AuthLayout>
      <SignIn appearance={clerkAppearance} />
    </AuthLayout>
  );
}
