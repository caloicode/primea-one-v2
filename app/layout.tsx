import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL("https://primea-one.vercel.app"), // 🔁 Replace with your actual domain
  title: "Primea One",
  description: "A Project Management App",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Primea One",
    description: "Simplify project workflows with Primea One.",
    url: "https://primea-one.vercel.app", // Match this to your deployment
    siteName: "Primea One",
    images: [
      {
        url: "/thumbnail.jpg", // now resolved against metadataBase
        width: 1200,
        height: 630,
        alt: "Primea One Thumbnail",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Primea One",
    description: "Simplify project workflows with Primea One.",
    images: ["/thumbnail.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
