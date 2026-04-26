"use client";

import Image from "next/image";
import {
  useEffect,
  useEffectEvent,
  useState,
} from "react";

type LinkItem = {
  label: string;
  href: string;
  external?: boolean;
};

type FocusArea = {
  index: string;
  title: string;
  description: string;
};

type MethodStep = {
  index: string;
  title: string;
  description: string;
};

const NAV_ITEMS: readonly LinkItem[] = [
  { label: "项目", href: "#openclaw" },
  { label: "方法", href: "#method" },
  { label: "博客", href: "https://blog.chenjin.ai", external: true },
  { label: "联系", href: "#contact" },
] as const;

const FOCUS_AREAS: readonly FocusArea[] = [
  {
    index: "01",
    title: "系统设计",
    description:
      "关注多 Agent 协作里的任务路由、状态治理、恢复机制与执行器抽象，不只让系统能跑，更让它能被管理。",
  },
  {
    index: "02",
    title: "产品方法论",
    description:
      "把问题定义、方案收敛、规格补完与评审补强整理成可复用流程，降低模糊需求带来的沟通噪音。",
  },
  {
    index: "03",
    title: "内容沉淀",
    description:
      "把系统与方法论写成更容易被理解和复用的内容，让 AI 不停留在概念层，而是真正进入工作流。",
  },
] as const;

const OPENCLAW_TAGS = [
  "Multi-Agent",
  "Control Plane",
  "Task Governance",
  "Recovery",
  "Runner Abstraction",
] as const;

const XIAOJIN_TAGS = [
  "PRD Orchestration",
  "Problem Framing",
  "Review",
  "Iteration",
  "AI Collaboration",
] as const;

const METHOD_STEPS: readonly MethodStep[] = [
  {
    index: "01",
    title: "先定义问题",
    description:
      "先讲清楚是谁、在什么场景、遇到了什么问题，不急着堆方案，也不急着堆功能。",
  },
  {
    index: "02",
    title: "再设计结构",
    description:
      "把角色、状态、流程和边界拆清楚，让系统和文档都能在复杂度上升时保持可控。",
  },
  {
    index: "03",
    title: "最后持续迭代",
    description:
      "先跑出可验证的一版，再根据反馈收敛，而不是一开始就把所有细节做满。",
  },
] as const;

function linkProps(item: LinkItem) {
  return item.external
    ? { target: "_blank", rel: "noreferrer noopener" }
    : {};
}

function SiteLink({
  item,
  className,
  onClick,
}: {
  item: LinkItem;
  className: string;
  onClick?: () => void;
}) {
  return (
    <a className={className} href={item.href} onClick={onClick} {...linkProps(item)}>
      {item.label}
    </a>
  );
}

export default function CinematicHome() {
  const [headerTheme, setHeaderTheme] = useState<"dark" | "light">("dark");
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const syncHeaderState = useEffectEvent(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-header-theme]"),
    );
    const probeY = window.scrollY + 104;
    let nextTheme: "dark" | "light" = "dark";

    for (const section of sections) {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;

      if (probeY >= top && probeY < bottom) {
        nextTheme =
          section.dataset.headerTheme === "light" ? "light" : "dark";
        break;
      }
    }

    setHeaderTheme(nextTheme);
    setIsScrolled(window.scrollY > 12);
  });

  useEffect(() => {
    const handleScroll = () => syncHeaderState();
    const animationFrame = window.requestAnimationFrame(handleScroll);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.dataset.menuOpen = menuOpen ? "true" : "false";

    return () => {
      delete document.body.dataset.menuOpen;
    };
  }, [menuOpen]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const revealNodes = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal"),
    );

    if (prefersReducedMotion) {
      revealNodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    revealNodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const closeMobileMenu = () => setMenuOpen(false);

  return (
    <div className="portfolio-page">
      <div className="portfolio-page__grain" aria-hidden="true" />

      <header
        className={`site-header${isScrolled ? " is-scrolled" : ""}`}
        data-theme={headerTheme}
      >
        <div className="site-header__bar">
          <a className="brand-mark" href="#top" onClick={closeMobileMenu}>
            ChenJin
            <span aria-hidden="true"> · </span>
            陈锦
          </a>

          <nav className="site-nav" aria-label="主导航">
            {NAV_ITEMS.map((item) => (
              <SiteLink
                key={item.label}
                item={item}
                className="site-nav__link"
              />
            ))}
          </nav>

          <button
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "关闭菜单" : "打开菜单"}
            onClick={() => setMenuOpen((current) => !current)}
          >
            <MenuIcon />
          </button>
        </div>
      </header>

      <div
        className={`mobile-menu${menuOpen ? " is-open" : ""}`}
        aria-hidden={!menuOpen}
        onClick={closeMobileMenu}
      >
        <div
          className="mobile-menu__panel"
          id="mobile-menu"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="mobile-menu__header">
            <span>Navigation</span>
            <button
              type="button"
              className="mobile-menu__close"
              aria-label="关闭菜单"
              onClick={closeMobileMenu}
            >
              <CloseIcon />
            </button>
          </div>

          <div className="mobile-menu__links">
            {NAV_ITEMS.map((item) => (
              <SiteLink
                key={item.label}
                item={item}
                className="mobile-menu__link"
                onClick={closeMobileMenu}
              />
            ))}
          </div>
        </div>
      </div>

      <main className="portfolio-main" id="top">
        <section className="hero-section section-dark" data-header-theme="dark">
          <div className="hero-section__spotlight" aria-hidden="true" />
          <div className="container">
            <div className="section-kicker reveal is-visible">
              <span className="section-kicker__dot" aria-hidden="true" />
              <span>REEL 01 · SCENE 001</span>
              <span className="section-kicker__divider" aria-hidden="true">
                ·
              </span>
              <span>CHENJIN.AI / 2026</span>
            </div>

            <div className="hero-grid">
              <div className="hero-copy reveal is-visible">
                <h1 className="hero-title">
                  陈锦
                  <span>ChenJin.</span>
                </h1>

                <div className="hero-meta">
                  AI Native Coder · 独立开发者 · 作者
                  <br />
                  湖南 · Since 2020
                </div>

                <p className="hero-quote">
                  用AI的加持，
                  <br />
                  让每个人都可以是破局者。
                </p>

                <p className="hero-summary">
                  我关注的不是把概念讲复杂，而是把模糊问题收敛成能落地的系统、方法与工作流。
                </p>

                <div className="hero-actions">
                  <a className="button button--primary" href="#openclaw">
                    查看当前项目
                    <ArrowRightIcon />
                  </a>
                  <a className="button button--ghost" href="#contact">
                    联系我
                    <ArrowDownIcon />
                  </a>
                </div>
              </div>

              <div className="hero-portrait reveal is-visible">
                <div className="hero-portrait__frame" aria-hidden="true" />
                <div className="hero-portrait__image">
                  <Image
                    src="/images/chenjin-portrait.jpg"
                    alt="陈锦 ChenJin"
                    fill
                    priority
                    sizes="(max-width: 767px) 280px, (max-width: 1023px) 340px, 420px"
                  />
                  <div className="hero-portrait__fade" aria-hidden="true" />
                </div>
                <div className="hero-portrait__caption">Che Guevara · 1928</div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-warm overview-section" data-header-theme="light">
          <div className="container">
            <div className="section-heading section-heading--light reveal">
              <div>
                <div className="section-heading__eyebrow">What I Do · 现在我在做什么</div>
                <h2 className="section-heading__title">
                  系统 · 方法 ·<span>表达。</span>
                </h2>
              </div>
              <p className="section-heading__aside">
                我现在最集中的工作，是做一套能管理复杂任务的多 Agent 系统，并沉淀一套能把模糊需求收敛成可落地方案的方法。
              </p>
            </div>

            <div className="focus-grid">
              {FOCUS_AREAS.map((area) => (
                <article key={area.index} className="focus-card reveal">
                  <div className="focus-card__index">{area.index}</div>
                  <h3>{area.title}</h3>
                  <p>{area.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="section-dark flagship-section"
          id="openclaw"
          data-header-theme="dark"
        >
          <div className="container">
            <div className="section-heading reveal">
              <div>
                <div className="section-heading__eyebrow">Current System · 当前系统</div>
                <h2 className="section-heading__title">
                  OpenClaw<span>。</span>
                </h2>
              </div>
              <p className="section-heading__aside">
                这是我目前最重要的系统项目。与其说它是一个多 Agent 工具，不如说它更像一个面向复杂任务协作的控制面实验。
              </p>
            </div>

            <div className="flagship-layout reveal">
              <div className="flagship-copy">
                <p>
                  我想解决的不是“多个 Agent 能不能同时工作”，而是更底层的问题：任务该怎么路由、状态写到哪里才算真相源、中断后怎么恢复、不同执行器怎么进入统一治理。
                </p>
                <p>
                  OpenClaw 逐步形成了编排层、控制面、执行器层三层结构。编排层负责流程，控制面负责治理，执行器层负责适配不同能力边界。
                </p>
                <p>
                  它目前还在迭代，但我认为最有价值的部分已经出现了：把复杂任务的协作过程，从“靠人盯着推进”变成“可以被系统管理、记录和恢复”。
                </p>
              </div>

              <aside className="flagship-panel">
                <div className="flagship-panel__label">What it is solving</div>
                <ul className="flagship-panel__list">
                  <li>让任务路由不再依赖临场拍脑袋，而是进入明确的执行链路。</li>
                  <li>把 Dashboard、任务合同、执行现场与恢复快照拆成不同真相源，降低状态混乱。</li>
                  <li>为中断恢复、接棒续跑和执行器差异治理预留结构，而不是靠临时补丁。</li>
                </ul>
                <div className="tag-list" aria-label="OpenClaw tags">
                  {OPENCLAW_TAGS.map((tag) => (
                    <span key={tag} className="tag-chip">
                      {tag}
                    </span>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section
          className="section-light flagship-section flagship-section--light"
          id="xiaojin"
          data-header-theme="light"
        >
          <div className="container">
            <div className="section-heading section-heading--light reveal">
              <div>
                <div className="section-heading__eyebrow">Method Work · 方法论作品</div>
                <h2 className="section-heading__title">
                  PMFrame 小锦<span>。</span>
                </h2>
              </div>
              <p className="section-heading__aside">
                如果说 OpenClaw 解决的是系统如何协作，小锦解决的就是需求如何收敛。
              </p>
            </div>

            <div className="flagship-layout flagship-layout--light reveal">
              <div className="flagship-copy">
                <p>
                  小锦是一个面向 PRD 与需求编排的方法论 skill。它不是框架百科，也不是模板堆砌，而是把模糊需求一步步整理成可评审、可迭代、可落地的文档。
                </p>
                <p>
                  它会先判断任务属于从零生成、评估改进还是增量融合，再切换不同角色分段接管，分别处理用户洞察、问题定义、方案取舍、规格补完和评审补强。
                </p>
                <p>
                  我更看重的是，它能帮助一个人或一个团队把需求真正往前推进，而不是停留在“好像想清楚了”的状态。
                </p>
              </div>

              <aside className="flagship-panel flagship-panel--light">
                <div className="flagship-panel__label">What backs it up</div>
                <ul className="flagship-panel__list">
                  <li>三种任务模式：从零生成、评估改进、增量融合。</li>
                  <li>五个角色分工：需求侦探、问题定义官、方案架构师、规格补完师、评审裁判。</li>
                  <li>用来源标注、PRD 模板、评审量表与高频 playbook 做方法背书。</li>
                </ul>
                <div className="tag-list tag-list--light" aria-label="PMFrame tags">
                  {XIAOJIN_TAGS.map((tag) => (
                    <span key={tag} className="tag-chip tag-chip--light">
                      {tag}
                    </span>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section
          className="section-dark method-section"
          id="method"
          data-header-theme="dark"
        >
          <div className="container">
            <div className="section-heading reveal">
              <div>
                <div className="section-heading__eyebrow">How I Work · 我的工作方法</div>
                <h2 className="section-heading__title">
                  定义问题，设计结构，<span>持续迭代。</span>
                </h2>
              </div>
              <p className="section-heading__aside">
                无论做系统、做方法论，还是做内容，我基本都按同一套逻辑推进。
              </p>
            </div>

            <div className="method-grid">
              {METHOD_STEPS.map((step) => (
                <article key={step.index} className="method-card reveal">
                  <div className="method-card__index">{step.index}</div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>

            <div className="method-quote reveal">
              <div className="method-quote__eyebrow">— Working Belief · 工作信条 —</div>
              <blockquote className="method-quote__text">
                “成功不要紧，
                <br />
                失败不致命，
                <br />
                拥有继续前行的勇气才最可贵。”
              </blockquote>
            </div>
          </div>
        </section>

        <section
          className="section-dark contact-section"
          id="contact"
          data-header-theme="dark"
        >
          <div className="container container--narrow reveal">
            <div className="contact-section__eyebrow">— Get in Touch · 联系 —</div>
            <h2 className="contact-section__title">
              想聊系统、方法，
              <br />
              <span>还是一个具体问题？</span>
            </h2>
            <p className="contact-section__copy">
              如果你想讨论 AI 产品、系统设计、需求方法论，或者只是想把一个复杂问题收敛清楚，欢迎直接联系我。
            </p>

            <div className="contact-points">
              <div className="contact-point">
                <div className="contact-point__label">Email</div>
                <a href="mailto:a794803532@gmail.com">a794803532@gmail.com</a>
              </div>
              <div className="contact-point">
                <div className="contact-point__label">WeChat</div>
                <span>alchain</span>
              </div>
            </div>

            <a className="button button--primary" href="mailto:a794803532@gmail.com">
              发邮件给我
              <SendIcon />
            </a>

            <div className="social-links">
              <a
                href="https://github.com/alchaincyf"
                title="GitHub"
                target="_blank"
                rel="noreferrer noopener"
              >
                <GithubIcon />
              </a>
              <a
                href="https://www.youtube.com/@Alchain"
                title="YouTube"
                target="_blank"
                rel="noreferrer noopener"
              >
                <YouTubeIcon />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container site-footer__inner">
          <span>© 2026 ChenJin · chenjin.ai</span>
          <span>— Work in Progress —</span>
          <span>Hunan, China</span>
        </div>
      </footer>
    </div>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5h16" />
      <path d="M4 12h16" />
      <path d="M4 19h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 18 18 6" />
      <path d="M6 6 18 18" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function ArrowDownIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
      <path d="m21.854 2.147-10.94 10.939" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}
