export default function Home() {
  const navigation: Array<{
    label: string;
    href: string;
    external?: boolean;
  }> = [
    { label: "首页", href: "#hero" },
    { label: "我是谁", href: "#about" },
    { label: "我们是谁", href: "#team" },
    { label: "我们能做什么", href: "#what-we-do" },
    { label: "博客", href: "https://blog.chenjin.ai", external: true },
    { label: "联系", href: "#contact" },
  ] as const;

  const identityTags = [
    "产品经理 / PO",
    "AI 协作实践者",
    "系统设计者",
    "数字团队编排者",
  ] as const;

  const teamRoles = [
    {
      name: "谷子",
      role: "主控 / 路由 / 治理",
      description: "判断方向、分发任务、做最后的收口与一致性治理。",
    },
    {
      name: "小锦",
      role: "PRD / 需求编排",
      description: "把模糊问题收敛成结构化需求、版本切片与可执行文档。",
    },
    {
      name: "阿龙",
      role: "工程实现 / 调试",
      description: "把方案落成实际代码、功能链路和可运行系统。",
    },
    {
      name: "蛋糕",
      role: "QA / 质疑 / 验证",
      description: "独立检查风险、追问边界，确保交付不是自我感动。",
    },
    {
      name: "阿毛 / 阿商",
      role: "调研 / 分析 / 商业判断",
      description: "补足外部信息、行业脉络与合作层面的判断依据。",
    },
  ] as const;

  const capabilities = [
    {
      title: "把模糊想法整理成可执行方案",
      description:
        "从问题定义、需求梳理、PRD 到版本切分，把一句话想法压缩成能启动的工作面。",
    },
    {
      title: "把 AI 协作流程搭成真正可运行的系统",
      description:
        "从角色分工、任务流转到状态追踪与复盘闭环，让协作不只停留在提示词层面。",
    },
    {
      title: "把内容、产品和工具串成同一条工作链",
      description:
        "让表达、执行和沉淀不再彼此断开，形成持续演进的系统能力。",
    },
  ] as const;

  const motionCards = [
    {
      status: "Live",
      title: "最近的博客",
      description: "长期内容输出独立运行在 blog.chenjin.ai，主站只做入口与总览。",
      href: "https://blog.chenjin.ai",
      cta: "前往博客",
    },
    {
      status: "Building",
      title: "当前项目",
      description: "官网本身就是系统的一部分，把个人、团队与工作方式收进一个统一入口。",
      href: "#contact",
      cta: "继续了解",
    },
    {
      status: "Next",
      title: "系统演进记录",
      description: "后续会逐步补充协作流程、实验记录与方法更新，让它持续可见。",
      href: "#what-we-do",
      cta: "查看能力结构",
    },
  ] as const;

  const currentYear = new Date().getFullYear();

  return (
    <main className="page-shell">
      <div className="ambient ambient-left" aria-hidden="true" />
      <div className="ambient ambient-right" aria-hidden="true" />

      <header className="site-header">
        <div className="site-header__inner">
          <a className="brand-mark" href="#hero">
            <span className="brand-mark__name">chenjin.ai</span>
            <span className="brand-mark__meta">Official site</span>
          </a>

          <nav className="site-nav" aria-label="主导航">
            {navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="site-nav__link"
                {...(item.external
                  ? { target: "_blank", rel: "noreferrer noopener" }
                  : {})}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <section className="hero section" id="hero">
        <div className="section-frame hero__layout">
          <div className="hero__copy">
            <p className="eyebrow">CHENJIN.AI / OFFICIAL HOME</p>
            <h1 className="hero__title">陈锦与他的 AI 团队，在一起工作。</h1>
            <p className="hero__lead">
              这里不是简历，也不是 AI 公司模板。它回答三件事：我是谁、我们是谁，以及我们如何一起工作。
            </p>

            <div className="hero__actions">
              <a className="button button--primary" href="#about">
                认识我
              </a>
              <a className="button button--secondary" href="#what-we-do">
                看看我们在做什么
              </a>
            </div>

            <div className="tag-row" aria-label="核心标签">
              {identityTags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>

            <p className="hero__note">
              博客独立运行于{" "}
              <a
                href="https://blog.chenjin.ai"
                target="_blank"
                rel="noreferrer noopener"
              >
                blog.chenjin.ai
              </a>
              ，主站负责建立认知、展示结构和打开合作入口。
            </p>
          </div>

          <aside className="hero__panel">
            <div className="panel">
              <div className="panel__meta">WORKING MODEL</div>
              <div className="panel__grid">
                <div>
                  <span className="panel__label">主叙事</span>
                  <strong>一个人的主站入口</strong>
                </div>
                <div>
                  <span className="panel__label">差异点</span>
                  <strong>背后站着一支数字团队</strong>
                </div>
                <div>
                  <span className="panel__label">页面结构</span>
                  <strong>单页滚动，7 段叙事</strong>
                </div>
                <div>
                  <span className="panel__label">气质</span>
                  <strong>冷静、克制、高信任</strong>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section" id="about">
        <div className="section-frame section-grid">
          <div className="section-heading">
            <p className="section-index">01</p>
            <h2>我是谁</h2>
          </div>

          <div className="section-content section-content--wide">
            <div className="copy-block">
              <p>
                我是陈锦，长期做产品、系统和协作方式设计。相比把 AI
                当成一个单点工具，我更关心如何把人和 AI
                组织成真正能协作、能复盘、能持续进化的工作系统。
              </p>
              <p>
                这个官网不是履历回放，而是一个更准确的入口。它说明我长期在处理什么问题，也说明为什么我现在的工作方式，天然会把团队与系统一起摆在台前。
              </p>
            </div>

            <div className="quote-card">
              <p>
                方法不是“多用几个 AI 工具”，而是把角色、流程、判断和交付组织成一套能持续运行的工作链。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="team">
        <div className="section-frame section-grid">
          <div className="section-heading">
            <p className="section-index">02</p>
            <h2>我们是谁</h2>
          </div>

          <div className="section-content">
            <div className="copy-block">
              <p>
                这不是“一个人会用很多 AI 工具”，而是一支被组织起来、能在真实工作链路里协作的数字团队。
              </p>
              <p>
                每个角色都对应不同责任边界，让问题拆解、方案生成、实现、验证和分析不再挤在同一个人脑子里完成。
              </p>
            </div>

            <div className="cards-grid cards-grid--team">
              {teamRoles.map((role) => (
                <article key={role.name} className="card card--role">
                  <p className="card__eyebrow">{role.role}</p>
                  <h3>{role.name}</h3>
                  <p>{role.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="what-we-do">
        <div className="section-frame section-grid">
          <div className="section-heading">
            <p className="section-index">03</p>
            <h2>我们能做什么</h2>
          </div>

          <div className="section-content">
            <div className="copy-block">
              <p>
                对外表达上，我们不堆大词，只把能落到实际合作里的价值说清楚。
              </p>
            </div>

            <div className="cards-grid cards-grid--capability">
              {capabilities.map((capability, index) => (
                <article key={capability.title} className="card card--capability">
                  <p className="card__eyebrow">
                    0{index + 1} / Capability
                  </p>
                  <h3>{capability.title}</h3>
                  <p>{capability.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="in-motion">
        <div className="section-frame section-grid">
          <div className="section-heading">
            <p className="section-index">04</p>
            <h2>我们正在做什么</h2>
          </div>

          <div className="section-content">
            <div className="copy-block">
              <p>
                这一段用来证明系统是活的。不是概念包装，而是持续运行中的内容、项目和方法更新。
              </p>
            </div>

            <div className="cards-grid cards-grid--motion">
              {motionCards.map((item) => (
                <article key={item.title} className="card card--motion">
                  <div className="status-line">
                    <span className="status-dot" aria-hidden="true" />
                    <span>{item.status}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <a
                    className="text-link"
                    href={item.href}
                    {...(item.href.startsWith("https://")
                      ? { target: "_blank", rel: "noreferrer noopener" }
                      : {})}
                  >
                    {item.cta}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--contact" id="contact">
        <div className="section-frame section-grid">
          <div className="section-heading">
            <p className="section-index">05</p>
            <h2>联系与合作</h2>
          </div>

          <div className="section-content section-content--contact">
            <div className="copy-block">
              <p>
                如果你正在做产品、内容系统、AI 协作流程，或者想把一个模糊想法变成可执行方案，我们可以从一个具体问题开始。
              </p>
              <div className="hero__actions">
                <a
                  className="button button--primary"
                  href="https://blog.chenjin.ai"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  先看博客
                </a>
                <a className="button button--secondary" href="#hero">
                  回到顶部
                </a>
              </div>
            </div>

            <div className="contact-rail">
              <div className="contact-item">
                <span className="contact-item__label">联系邮箱</span>
                <strong>待补充</strong>
                <p>首版先保留结构位，正式上线前补齐公开邮箱地址。</p>
              </div>
              <div className="contact-item">
                <span className="contact-item__label">博客入口</span>
                <strong>blog.chenjin.ai</strong>
                <p>深度内容与持续输出独立部署，主站只做总览与入口。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="section-frame site-footer__inner">
          <div>
            <p className="brand-mark__name">chenjin.ai</p>
            <p className="site-footer__tagline">
              一个人的主站入口，但背后站着一支真正协作中的 AI 团队。
            </p>
          </div>

          <div className="site-footer__links">
            <a
              href="https://blog.chenjin.ai"
              target="_blank"
              rel="noreferrer noopener"
            >
              blog.chenjin.ai
            </a>
            <span>© {currentYear}</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
