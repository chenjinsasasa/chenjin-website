import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import PageLoader from "@/components/page-loader";
import "./globals.css";

const title = "陈锦 ChenJin — AI Native Coder | 陈锦";
const description =
  "陈锦的个人站点，聚焦多 Agent 系统、产品方法论与 AI 工作流。";

export const metadata: Metadata = {
  metadataBase: new URL("https://chenjin.ai"),
  title,
  description,
  alternates: {
    types: {
      "application/rss+xml": "https://chenjin.ai/feed.xml",
    },
  },
  openGraph: {
    title,
    description,
    siteName: "陈锦 ChenJin",
    locale: "zh_CN",
    type: "website",
    images: [
      {
        url: "/images/og-default.png",
        alt: "陈锦 ChenJin",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/og-default.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh" className="scroll-smooth">
      <body>
        <PageLoader />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
