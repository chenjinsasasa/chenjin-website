import ProgressiveHome from "@/components/progressive-home";

export default function Home() {
  const navigation: Array<{
    label: string;
    href: string;
    external?: boolean;
  }> = [
    { label: "Protocol", href: "#protocol" },
    { label: "Agents", href: "#agents" },
    { label: "Blog", href: "https://blog.chenjin.ai", external: true },
  ];

  const signals = [
    { label: "Mode", value: "AI Ops / 产品与流程" },
    { label: "Output", value: "PRD / Build / Verify" },
    { label: "Entry", value: "从一个具体问题开始" },
  ] as const;

  const terminalLines = [
    {
      id: "01",
      command: "define.problem()",
      result: "先收口问题，再决定版本。",
    },
    {
      id: "02",
      command: "route.roles()",
      result: "需求、工程、验证各就各位。",
    },
    {
      id: "03",
      command: "ship.iteration()",
      result: "少一点空话，多一点交付。",
    },
  ] as const;

  const protocolSteps = [
    {
      index: "01",
      title: "定义问题",
      description: "目标、约束、版本先清楚。",
    },
    {
      index: "02",
      title: "分配角色",
      description: "把正确的工作放到正确的角色里。",
    },
    {
      index: "03",
      title: "快速迭代",
      description: "每次只推进一个明确结果。",
    },
  ] as const;

  const operationRails = [
    {
      index: "01",
      title: "Intake",
      description: "先把问题说清楚，不急着上版本。",
    },
    {
      index: "02",
      title: "Routing",
      description: "把需求、工程、验证分给正确角色。",
    },
    {
      index: "03",
      title: "Verify",
      description: "先跑出结果，再决定下一步。",
    },
  ] as const;

  const agents = [
    { name: "谷子", role: "route / governance" },
    { name: "小锦", role: "prd / planning" },
    { name: "阿龙", role: "build / debug" },
    { name: "蛋糕", role: "qa / verify" },
    { name: "阿毛 / 阿商", role: "research / strategy" },
  ] as const;

  const entryChecklist = [
    "给我一个真实卡点",
    "带上目标、约束、截止时间",
    "我们先跑出可验证的第一版",
  ] as const;

  const currentYear = new Date().getFullYear();

  return (
    <ProgressiveHome
      navigation={navigation}
      signals={signals}
      terminalLines={terminalLines}
      protocolSteps={protocolSteps}
      operationRails={operationRails}
      agents={agents}
      entryChecklist={entryChecklist}
      currentYear={currentYear}
    />
  );
}
