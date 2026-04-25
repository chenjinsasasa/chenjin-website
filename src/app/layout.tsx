import type { Metadata } from "next";
import { jetBrainsMono } from "@/app/fonts";
import PageLoader from "@/components/page-loader";
import "./globals.css";

export const metadata: Metadata = {
  title: "chenjin.ai | 陈锦与 AI 团队",
  description:
    "陈锦的 AI 协作主站。把需求、工程、验证组织成一条可运行的工作流。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={jetBrainsMono.variable}>
      <body>
        <PageLoader />
        {children}
      </body>
    </html>
  );
}
