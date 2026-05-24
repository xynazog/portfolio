/**
 * Single source of truth for case studies. Imported by both the home-page
 * tile list (WorkList.astro) and the dedicated /work/[slug] pages.
 */

export interface FlowNode {
  id: string;
  label: string;
  sublabel?: string;
}

export interface FlowEdge {
  from: string;
  to: string;
  label?: string;
}

export interface FlowDiagramSpec {
  caption?: string;
  nodes: FlowNode[];
  edges: FlowEdge[];
}

export interface CaseStudy {
  slug: string;
  context: string;
  dateRange: string;
  title: string;
  summary: string;
  role: string;
  scope: string;
  team: string;
  stack: string;
  problem: string;
  led: string[];
  shipped: string[];
  /** Override for the "What we shipped" header — e.g. "What I shipped" when solo. */
  shippedHeader?: string;
  differently: string;
  /** Optional architecture diagram, rendered between shipped and differently. */
  diagram?: FlowDiagramSpec;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "splunk-identity",
    context: "Splunk",
    dateRange: "2024 — present",
    title: "Building Unified Identity for Splunk Observability Cloud",
    summary:
      "Led a 10-engineer team shipping enterprise SSO, RBAC from scratch, and the platform integrations that connect Splunk's two major clouds.",
    role: "Engineering Manager, Identity & Integrations",
    scope:
      "Identity, access management, and platform integrations for Splunk Observability Cloud",
    team: "10 engineers (US + distributed)",
    stack: "Go, Java, Kubernetes, AWS, PostgreSQL",
    problem:
      "Splunk had two major clouds — Enterprise Cloud and Observability Cloud — that enterprise customers wanted to use together but couldn't. Identity, sessions, and access control were duplicated across both. Customers provisioned users twice, managed two SSO integrations, and lived without a shared authorization model. The existing identity stack didn't have the abstractions to unify them cleanly, and there was no fine-grained RBAC on the Observability side.",
    led: [
      "Set the technical strategy for cross-platform identity and owned the architectural calls on the trust model and migration path.",
      "Owned customer escalations and partnered directly with PM, Security, and the Enterprise Cloud team to align roadmaps.",
      "Designed and shipped the systems below as a team — I led; the engineers wrote the code.",
      "Drove the AI / identity integration thesis — MCP server for agent-aware role provisioning, RAG over runbooks.",
      "Owned hiring, growth, and promotions for the team.",
    ],
    shipped: [
      "Unified Identity — enterprise SSO from Splunk Enterprise Cloud into Observability Cloud; onboarded triple-digit enterprise customers post-launch.",
      "Custom RBAC built from the ground up — fine-grained access control across Observability Cloud.",
      "Real-time metrics engine unifying logs, traces, and spans into a single query interface; materially cut time-to-insight during incident troubleshooting.",
      "Audit Logs engine for platform transparency and security / compliance queryability.",
      "MCP server for AI-driven role provisioning (identity × agents).",
      "RAG system over on-call runbooks (in progress).",
      "Promoted 4 engineers in 2 years (2 mid→senior, 2 junior→mid); 5th promotion (staff→senior staff) in progress.",
    ],
    differently:
      "Designed the RBAC model agent-aware from day one. We bolted MCP onto a system built for humans; an authz layer designed for both humans and agents would have been faster and safer.",
    diagram: {
      caption: "Unified Identity — request lifecycle",
      nodes: [
        { id: "idp",      label: "Customer IdP",                 sublabel: "Okta · Azure AD · Ping" },
        { id: "sp",       label: "Splunk Enterprise Cloud",      sublabel: "SAML SP — auth lands here" },
        { id: "scim",     label: "SCIM Provisioner",             sublabel: "mirrors state across clouds" },
        { id: "rbac",     label: "RBAC Policy Evaluator",        sublabel: "fine-grained, request-time" },
        { id: "resource", label: "Observability Cloud Resource", sublabel: "dashboard · query · metric" },
      ],
      edges: [
        { from: "idp",  to: "sp",       label: "SAML AuthN" },
        { from: "sp",   to: "scim",     label: "user / group event" },
        { from: "scim", to: "rbac",     label: "provisioned principal" },
        { from: "rbac", to: "resource", label: "allow" },
      ],
    },
  },
  {
    slug: "splunk-log-observer",
    context: "Splunk",
    dateRange: "2021 — 2024",
    title:
      "Re-architecting Log Observer and laying the foundation for Unified Identity",
    summary:
      "Tech lead on Log Observer Connect and the early Unified Identity work — cut core search latency 60% and onboarded 200+ customers to a brand-new cross-platform workflow.",
    role: "Senior Software Engineer, Tech Lead",
    scope: "Log Observer Connect (LOC) + Unified Identity foundations",
    team: "5 engineers (tech-lead pod)",
    stack: "Go, Java, JavaScript, Splunk internal data infrastructure, AWS",
    problem:
      "Log Observer was Splunk's point-and-click logs exploration tool — but query latency on the core search path was painful, and pain in incident troubleshooting is the worst kind of pain (people are angry and watching). On top of that, Splunk Enterprise customers with years of data and workflows in the older platform had no clean way to use Log Observer against their existing data — the two platforms were islands. A bridge was needed, and it needed to be performant enough that customers would actually use it mid-incident.",
    led: [
      "Re-architected the core Log Observer search path — owned the design, wrote the critical code, and shepherded the perf-regression work.",
      "Served as tech lead — architecture decisions, the code review bar, roadmap partnership with PM.",
      "Led the team's contribution to the Unified Identity foundation that the EM-era team would later scale.",
      "Drove the technical side of customer onboarding; PM, CS, and field engineering did the rest.",
    ],
    shipped: [
      "60% query-latency improvement on the core Log Observer search path.",
      "200+ customers onboarded to Log Observer Connect — adoption driven by live use during incident troubleshooting (the strongest possible signal).",
      "Foundation of Unified Identity that became the EM-era platform ship.",
      "New integrations across the Observability platform, taken from architecture to GA with PM.",
    ],
    differently:
      "Built a perf-regression harness before the rewrite, not after. The 60% gain was real but hard to defend in reviews without baseline benchmarks I'd locked down earlier.",
  },
  {
    slug: "splunk-early-swe",
    context: "Splunk",
    dateRange: "2018 — 2021",
    title: "Shipping at the velocity of enterprise sales",
    summary:
      "Shipped 60+ customer and strategic initiatives as an early-career engineer — influenced $159M+ in contract value and was credited internally with 2x'ing the sales lifecycle.",
    role: "Software Engineer",
    scope:
      "Customer integrations, executive dashboards, REST APIs, no-code Observability features, security orchestration",
    team: "Solo or near-solo on most initiatives",
    stack: "JavaScript, Python, Go, Splunk SDK",
    problem:
      "Splunk's enterprise sales motion depended heavily on custom dashboards, demos, and integrations to close deals — but engineering throughput on those wasn't keeping up with the pipeline. Initiatives were ad-hoc, often undocumented, and the infrastructure underneath some of them was costing serious money to keep alive. Sales engineers needed faster turnaround; finance wanted lower recurring infra spend; and there was no clean platform underneath any of it.",
    led: [
      "Owned individual initiatives end-to-end as a solo or near-solo engineer.",
      "Sole engineer on the single-instance deployment initiative that retired a recurring cost line.",
      "Personally shipped 60+ initiatives across two fiscal years.",
      "Active contributor to Splunk's open-source ecosystem.",
    ],
    shipped: [
      "60+ customer / strategic initiatives → influenced $133.14M in TCV (FY20) and $25.9M in ACV (FY21).",
      "Executive dashboards, visualizations, add-ons, REST APIs in JS / Python / Go — credited internally with 2x'ing the sales lifecycle.",
      "Single-instance deployment infrastructure — saved Splunk hundreds of thousands in recurring infra cost.",
      "No-code Observability features in Log Observer.",
      "Security Orchestration applications bundled with Splunk Enterprise.",
    ],
    shippedHeader: "What I shipped",
    differently:
      "Picked one strategic project to own end-to-end for visibility, instead of optimizing for breadth. Sixty disconnected initiatives is a lot of leverage left on the table — depth would have gotten me to senior faster than breadth did.",
  },
];

/** Lookup by slug, used by getStaticPaths in /work/[slug].astro. */
export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
