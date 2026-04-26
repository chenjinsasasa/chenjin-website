import CinematicHome from "@/components/cinematic-home";

const webpageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "陈锦 ChenJin — AI Native Coder",
  description:
    "陈锦的个人站点，聚焦多 Agent 系统、产品方法论与 AI 工作流。",
  publisher: {
    "@type": "Person",
    name: "陈锦",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "陈锦",
  alternateName: "ChenJin",
  jobTitle: "AI Native Coder / 独立开发者 / 作者",
  description:
    "聚焦多 Agent 系统、产品方法论与 AI 工作流的独立开发者与作者。",
  url: "https://chenjin.ai",
  sameAs: [
    "https://www.youtube.com/@Alchain",
    "https://space.bilibili.com/14097567",
    "https://x.com/AlchainHust",
  ],
  knowsAbout: [
    "AI编程",
    "独立开发",
    "AI教育",
    "iOS 应用开发",
    "Claude Code",
    "DeepSeek",
  ],
  worksFor: {
    "@type": "Organization",
    name: "chenjin.ai",
    url: "https://chenjin.ai",
  },
  image: "https://chenjin.ai/images/chenjin-portrait.jpg",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <CinematicHome />
    </>
  );
}
