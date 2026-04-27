import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dataPath = join(root, "data", "posts.json");

const formatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Kolkata",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const today = formatter.format(new Date());

const topicBank = [
  {
    category: "Interview",
    readTime: "5 min",
    title: "Interview drill: explain HCM security without overcomplicating it",
    summary:
      "A clear answer separates job roles, duty roles, abstract roles, data roles, and role provisioning, then ties each one to what the user can see or do.",
    takeaways: [
      "Start with the business requirement before describing role mechanics.",
      "Mention that function access and data access are related but not the same.",
      "Use an example such as a manager viewing direct reports but not another department."
    ],
    sourceTitle: "Security Design Notes"
  },
  {
    category: "Implementation",
    readTime: "6 min",
    title: "Business use case: reference data sharing during HCM design",
    summary:
      "Reference data choices affect how values are reused across business units, countries, and HR processes, so design decisions should be made before mass configuration.",
    takeaways: [
      "Identify which values are global, regional, or business-unit specific.",
      "Document downstream impact on reporting, security, and integrations.",
      "Avoid creating duplicate values when a shared set would support the operating model."
    ],
    sourceTitle: "Core HR Implementation Roadmap"
  },
  {
    category: "AI Agents",
    readTime: "4 min",
    title: "AI Agent Studio for HCM: testing with HR personas",
    summary:
      "Agent testing should use realistic personas so answers, permissions, escalation behavior, and tone can be validated before production use.",
    takeaways: [
      "Test employee, manager, HR specialist, and administrator paths separately.",
      "Include refusal tests for sensitive, private, or out-of-scope requests.",
      "Keep test evidence and approvals with the release record."
    ],
    sourceTitle: "AI Agent Studio Governance Notes"
  },
  {
    category: "Latest Releases",
    readTime: "4 min",
    title: "Release habit: turn readiness notes into an HCM action list",
    summary:
      "Each quarterly readiness review should end with owners, test cases, communication notes, opt-in decisions, and a short list of risks for leadership.",
    takeaways: [
      "Focus first on product areas live in your tenant.",
      "Capture changes that affect security, integrations, approvals, and user experience.",
      "Write your own internal summary and do not copy release-note wording."
    ],
    sourceTitle: "Quarterly Release Impact Planner"
  },
  {
    category: "Implementation",
    readTime: "6 min",
    title: "Module guide: planning an absence policy workshop",
    summary:
      "A good absence workshop turns policy language into eligibility rules, plan behavior, approval flows, payroll touchpoints, and testable employee-manager scenarios.",
    takeaways: [
      "Capture plan rules, eligibility, accruals, carryover, and country variation.",
      "Test employee submission, manager approval, HR correction, and payroll impact.",
      "Convert every policy exception into a named test scenario."
    ],
    sourceTitle: "Absence Configuration Map"
  },
  {
    category: "Interview",
    readTime: "5 min",
    title: "Interview drill: explaining HCM Data Loader risk",
    summary:
      "A senior answer frames migration as a controlled business cycle with ownership, sequencing, validations, errors, reconciliation, and sign-off.",
    takeaways: [
      "Mention foundation data sequencing before worker and assignment data.",
      "Discuss validation for counts, dates, references, managers, and duplicates.",
      "Explain why reconciliation evidence matters before go-live."
    ],
    sourceTitle: "HCM Data Loader Planner"
  }
];

const raw = await readFile(dataPath, "utf8");
const data = JSON.parse(raw);

if (data.posts.some((post) => post.date === today)) {
  console.log(`A post already exists for ${today}.`);
  process.exit(0);
}

const existingCount = data.posts.length;
const topic = topicBank[existingCount % topicBank.length];
const slug = topic.title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/(^-|-$)/g, "");

const post = {
  id: `${today}-${slug}`,
  date: today,
  ...topic
};

data.posts.unshift(post);

await writeFile(dataPath, `${JSON.stringify(data, null, 2)}\n`);
console.log(`Created original daily post for ${today}: ${post.title}`);
