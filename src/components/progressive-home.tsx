"use client";

import { startTransition, useCallback, useEffect, useRef, useState } from "react";
import HomeFrame from "@/components/home-frame";

type NavigationItem = {
  label: string;
  href: string;
  external?: boolean;
};

type Signal = {
  label: string;
  value: string;
};

type RuntimeLine = {
  id: string;
  command: string;
  result: string;
};

type Step = {
  index: string;
  title: string;
  description: string;
};

type Agent = {
  name: string;
  role: string;
};

type ProgressiveHomeProps = {
  navigation: readonly NavigationItem[];
  signals: readonly Signal[];
  terminalLines: readonly RuntimeLine[];
  protocolSteps: readonly Step[];
  operationRails: readonly Step[];
  agents: readonly Agent[];
  entryChecklist: readonly string[];
  currentYear: number;
};

const INITIAL_VISIBLE_SECTIONS = 2;
const SECTION_BATCH_SIZE = 1;
const REQUIRED_SECTION_COUNT: Record<string, number> = {
  "#protocol": 2,
  "#agents": 3,
  "#entry": 4,
};

export default function ProgressiveHome({
  navigation,
  signals,
  terminalLines,
  protocolSteps,
  operationRails,
  agents,
  entryChecklist,
  currentYear,
}: ProgressiveHomeProps) {
  const [isMobileLayout, setIsMobileLayout] = useState(false);
  const [visibleSectionCount, setVisibleSectionCount] = useState(
    INITIAL_VISIBLE_SECTIONS,
  );
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const hasMoreSections = !isMobileLayout && visibleSectionCount < 4;

  useEffect(() => {
    const query = window.matchMedia("(max-width: 760px)");

    const syncMobileLayout = (event?: MediaQueryListEvent) => {
      const matches = event?.matches ?? query.matches;
      setIsMobileLayout(matches);

      if (matches) {
        setVisibleSectionCount(4);
      }
    };

    syncMobileLayout();
    query.addEventListener("change", syncMobileLayout);

    return () => {
      query.removeEventListener("change", syncMobileLayout);
    };
  }, []);

  const revealMoreSections = useCallback((targetCount?: number) => {
    startTransition(() => {
      setVisibleSectionCount((current) => {
        if (typeof targetCount === "number") {
          return Math.min(4, Math.max(current, targetCount));
        }

        return Math.min(4, current + SECTION_BATCH_SIZE);
      });
    });
  }, []);

  useEffect(() => {
    const element = sentinelRef.current;

    if (!element || !hasMoreSections) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          revealMoreSections();
        }
      },
      { rootMargin: "220px" },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [hasMoreSections, revealMoreSections]);

  useEffect(() => {
    if (!hasMoreSections) {
      return;
    }

    const element = sentinelRef.current;

    if (!element) {
      return;
    }

    const sentinelTop = element.getBoundingClientRect().top;
    const preloadThreshold = window.innerHeight + 180;

    if (sentinelTop <= preloadThreshold) {
      revealMoreSections();
    }
  }, [hasMoreSections, visibleSectionCount, revealMoreSections]);

  const handleInternalNavigation = useCallback(
    (href: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      const requiredCount = REQUIRED_SECTION_COUNT[href];

      if (!requiredCount) {
        return;
      }

      event.preventDefault();
      revealMoreSections(requiredCount);

      window.requestAnimationFrame(() => {
        const target = document.querySelector<HTMLElement>(href);

        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          window.history.replaceState(null, "", href);
        }
      });
    },
    [revealMoreSections],
  );

  return (
    <HomeFrame>
      <main className="terminal-page" id="top">
        <header className="site-header">
          <div className="section-shell site-header__inner" data-hero-item>
            <a className="brand" href="#top" aria-label="chenjin.ai 首页">
              <span className="brand__dot" aria-hidden="true" />
              <span className="brand__name">chenjin.ai</span>
              <span className="brand__meta">human + ai operations</span>
            </a>

            <nav className="site-nav" aria-label="主导航">
              {navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="site-nav__link"
                  onClick={
                    item.external || !item.href.startsWith("#")
                      ? undefined
                      : handleInternalNavigation(item.href)
                  }
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

        <div className="section-shell page-stack">
          <section className="panel hero" data-hero data-reveal="section">
            <div className="hero__grid">
              <div className="hero__copy">
                <p className="eyebrow" data-hero-item>
                  SYSTEM ONLINE / CN-SH / HUMAN + AI
                </p>
                <h1 className="hero__title" data-hero-item>
                  <span className="hero__title-main">把问题交给我</span>
                  <span className="hero__title-sub">和我的 AI 团队。</span>
                </h1>
                <p className="hero__lead" data-hero-item>
                  需求、工程、验证被组织成一条可复用的交付链。少一点空话，多一点交付。
                </p>

                <div className="hero__actions" data-hero-item>
                  <a
                    className="button button--primary"
                    href="https://blog.chenjin.ai"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    进入博客
                  </a>
                  <a
                    className="button button--secondary"
                    href="#protocol"
                    onClick={handleInternalNavigation("#protocol")}
                  >
                    查看协议
                  </a>
                </div>
              </div>

              <aside
                className="hero__panel panel panel--nested"
                aria-labelledby="runtime-log-title"
                data-hero-item
              >
                <div className="panel__header">
                  <p className="panel-label" id="runtime-log-title">
                    runtime.log
                  </p>
                  <span className="panel-status">ready</span>
                </div>

                <div className="terminal-lines">
                  {terminalLines.map((line) => (
                    <div key={line.id} className="terminal-line">
                      <span className="terminal-line__index">[{line.id}]</span>
                      <div>
                        <strong>{line.command}</strong>
                        <p>{line.result}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </aside>
            </div>

            <div className="signal-grid" aria-label="站点关键信号">
              {signals.map((signal) => (
                <article key={signal.label} className="signal-card" data-hero-item>
                  <p className="signal-card__label">{signal.label}</p>
                  <strong className="signal-card__value">{signal.value}</strong>
                </article>
              ))}
            </div>
          </section>

          {visibleSectionCount >= 1 && (
            <section className="panel manifesto" data-reveal="section">
              <div className="manifesto__lead">
                <p className="section-tag" data-reveal="item">
                  OPERATING MODEL
                </p>
                <h2 className="section-title" data-reveal="item">
                  不是一个人点很多工具，而是一支持续协作的数字团队。
                </h2>
                <p className="section-copy" data-reveal="item">
                  我把需求、工程、验证组织成不同角色，让问题从定义到交付是一条线，不是一堆散动作。
                </p>
              </div>

              <div className="manifesto__grid">
                {operationRails.map((rail) => (
                  <article
                    key={rail.index}
                    className="manifesto-card"
                    data-reveal="item"
                  >
                    <p className="manifesto-card__index">{rail.index}</p>
                    <h3>{rail.title}</h3>
                    <p>{rail.description}</p>
                  </article>
                ))}
              </div>
            </section>
          )}

          {visibleSectionCount >= 2 && (
            <section
              className="panel section-card"
              id="protocol"
              data-reveal="section"
            >
              <p className="section-tag" data-reveal="item">
                PROTOCOL
              </p>
              <h2 className="section-title" data-reveal="item">
                只保留三步。
              </h2>
              <p className="section-copy" data-reveal="item">
                不堆功能，不堆说法。先把流程跑通，再决定要不要继续扩展。
              </p>

              <div className="protocol-grid">
                {protocolSteps.map((step) => (
                  <article
                    key={step.index}
                    className="protocol-card"
                    data-reveal="item"
                  >
                    <p className="protocol-card__index">{step.index}</p>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </article>
                ))}
              </div>
            </section>
          )}

          {visibleSectionCount >= 3 && (
            <section
              className="panel section-card section-card--agents"
              id="agents"
              data-reveal="section"
            >
              <div className="section-card__intro">
                <p className="section-tag" data-reveal="item">
                  AGENTS
                </p>
                <h2 className="section-title" data-reveal="item">
                  数字团队，分工明确。
                </h2>
                <p className="section-copy" data-reveal="item">
                  这不是一个人切很多窗口，而是一支持续协作、彼此补位的工作流团队。
                </p>
              </div>

              <div className="section-card__layout">
                <div className="agent-grid">
                  {agents.map((agent) => (
                    <article
                      key={agent.name}
                      className="agent-card"
                      data-reveal="item"
                    >
                      <strong>{agent.name}</strong>
                      <p>{agent.role}</p>
                    </article>
                  ))}
                </div>

                <aside className="note-card" data-reveal="item">
                  <p className="note-card__label">Operating notes</p>
                  <ul className="note-card__list">
                    {terminalLines.map((line) => (
                      <li key={line.id}>{line.result}</li>
                    ))}
                  </ul>
                </aside>
              </div>
            </section>
          )}

          {visibleSectionCount >= 4 && (
            <section
              className="panel section-card section-card--entry"
              id="entry"
              data-reveal="section"
            >
              <div className="entry__copy">
                <p className="section-tag" data-reveal="item">
                  ENTRY
                </p>
                <h2 className="section-title" data-reveal="item">
                  从一个具体问题开始。
                </h2>
                <p className="section-copy" data-reveal="item">
                  方法、实验、过程更新都在 blog.chenjin.ai。若要合作，先给我一个明确卡点。
                </p>
              </div>

              <div className="entry__list">
                {entryChecklist.map((item, index) => (
                  <div
                    key={item}
                    className="entry__list-item"
                    data-reveal="item"
                  >
                    <span className="entry__index">0{index + 1}</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="entry-actions" data-reveal="item">
                <a
                  className="button button--primary"
                  href="https://blog.chenjin.ai"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  blog.chenjin.ai
                </a>
                <a
                  className="button button--secondary"
                  href="#top"
                  onClick={(event) => {
                    event.preventDefault();
                    document
                      .querySelector<HTMLElement>("#top")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                    window.history.replaceState(null, "", "#top");
                  }}
                >
                  回到顶部
                </a>
              </div>
            </section>
          )}

          {hasMoreSections && (
            <div ref={sentinelRef} aria-hidden="true" style={{ height: 1 }} />
          )}

          <footer className="site-footer">
            <div className="site-footer__inner">
              <p>chenjin.ai / human + ai operations / © {currentYear}</p>
              <a
                href="https://blog.chenjin.ai"
                target="_blank"
                rel="noreferrer noopener"
              >
                blog.chenjin.ai
              </a>
            </div>
          </footer>
        </div>
      </main>
    </HomeFrame>
  );
}
