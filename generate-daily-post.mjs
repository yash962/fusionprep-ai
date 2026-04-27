{
  "site": {
    "launchDate": "2026-04-26"
  },
  "beginnerStart": [
    {
      "title": "What is Oracle Fusion HCM?",
      "summary": "Oracle Fusion HCM is a cloud-based HR application suite used to manage people, jobs, organizations, payroll-adjacent processes, recruiting, talent, time, journeys, and employee experience.",
      "learn": [
        "Think of HCM as the system that stores worker data and powers HR transactions.",
        "Core HR is the foundation. Most modules depend on workers, assignments, jobs, departments, locations, and security.",
        "A consultant's job is to translate HR policy and business process into safe, testable system design."
      ]
    },
    {
      "title": "Beginner learning order",
      "summary": "Start with business concepts first, then modules, then implementation steps, then interview practice.",
      "learn": [
        "Learn enterprise structure: enterprise, legal employer, business unit, department, job, position, grade, and location.",
        "Learn worker lifecycle: hire, transfer, promotion, manager change, leave, termination, and rehire.",
        "Learn security and testing because every real project depends on who can see and change data."
      ]
    },
    {
      "title": "How to study on FusionPrep AI",
      "summary": "Use daily posts for rhythm, implementation guides for depth, labs for practice, and interview cases for job preparation.",
      "learn": [
        "Read one beginner card and one module guide every day.",
        "Download the Word guide and build your own notes from the business scenario.",
        "Practice interview answers out loud using the real-time use cases."
      ]
    }
  ],
  "implementationGuides": [
    {
      "module": "Core HR",
      "level": "Foundation",
      "doc": "docs/guides/core-hr-implementation-guide.docx",
      "title": "Core HR Implementation Guide",
      "summary": "Foundation guide for enterprise structure, workforce structures, worker lifecycle, security touchpoints, migration, reporting, and go-live readiness.",
      "scenario": "A multinational company is moving from spreadsheets and a legacy HR system into a single global HCM platform while keeping country-specific legal employer rules.",
      "steps": [
        "Confirm the business operating model and countries in scope.",
        "Design enterprise, legal employer, business unit, department, location, job, position, and grade usage.",
        "Map worker lifecycle transactions such as hire, transfer, promotion, termination, and rehire.",
        "Define security personas for employee, manager, HR specialist, and administrator.",
        "Plan migration, validation, approvals, reporting, integrations, and cutover support."
      ],
      "deliverables": [
        "Enterprise structure decision log",
        "Workforce structure workbook",
        "Worker lifecycle test pack",
        "Security and data access matrix"
      ]
    },
    {
      "module": "Absences",
      "level": "Intermediate",
      "doc": "docs/guides/absences-implementation-guide.docx",
      "title": "Absences Implementation Guide",
      "summary": "Guide for absence types, plans, eligibility, accrual thinking, approvals, manager experience, payroll touchpoints, and policy testing.",
      "scenario": "A company has annual leave, sick leave, maternity leave, and unpaid leave policies that vary by country and legal employer.",
      "steps": [
        "Collect policy rules for absence types, plans, eligibility, accruals, carryover, and waiting periods.",
        "Identify which rules are global and which vary by country, worker type, or legal employer.",
        "Design employee submission, manager approval, HR correction, and exception handling.",
        "Confirm payroll, time, scheduling, and reporting dependencies.",
        "Test normal, edge, retroactive, cancellation, and balance-adjustment scenarios."
      ],
      "deliverables": [
        "Absence policy mapping workbook",
        "Eligibility and accrual design notes",
        "Approval and exception matrix",
        "Employee-manager test scenarios"
      ]
    },
    {
      "module": "Payroll",
      "level": "Advanced",
      "doc": "docs/guides/payroll-implementation-guide.docx",
      "title": "Payroll Implementation Guide",
      "summary": "Guide for payroll discovery, calendars, elements, costing, balances, controls, upstream dependencies, parallel testing, and cutover governance.",
      "scenario": "A client wants to run payroll for multiple worker populations and needs strong controls, reconciliation, and finance handoff.",
      "steps": [
        "Confirm country scope, pay groups, payroll calendars, payment frequency, and statutory complexity.",
        "Identify earnings, deductions, benefits, absence, time, retro, costing, and finance requirements.",
        "Design payroll controls, audit checkpoints, exception handling, and reconciliation.",
        "Plan parallel payroll testing with success criteria and issue triage.",
        "Coordinate cutover with HR, time, absence, finance, integrations, and support owners."
      ],
      "deliverables": [
        "Payroll discovery workbook",
        "Element and costing design log",
        "Parallel payroll test plan",
        "Payroll cutover and reconciliation checklist"
      ]
    },
    {
      "module": "OTL",
      "level": "Intermediate",
