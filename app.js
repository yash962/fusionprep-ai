const fallbackData = {
  site: {
    launchDate: "2026-04-26",
  },
  resources: [
    {
      title: "Core HR Implementation Roadmap",
      type: "Implementation",
      note: "FusionPrep AI checklist for enterprise structures, legal employers, business units, departments, jobs, positions, and go-live validation.",
    },
    {
      title: "Interview Answer Builder",
      type: "Interview",
      note: "Original answer frames for explaining HCM design choices with business context and consultant-level reasoning.",
    },
    {
      title: "AI Agent Studio Governance Notes",
      type: "AI Agents",
      note: "Learner notes for agent purpose, knowledge boundaries, persona testing, approvals, and sensitive HR scenarios.",
    },
    {
      title: "Quarterly Release Impact Planner",
      type: "Latest Releases",
      note: "A practical planning template for reviewing quarterly changes, regression scope, opt-in decisions, and stakeholder communication.",
    },
  ],
  moduleGuides: [],
  labs: [],
  paths: [],
  practiceCards: [],
  checklist: [],
  posts: [],
};

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "full",
  timeZone: "Asia/Kolkata",
});

const dateKeyFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Kolkata",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

function todayKey() {
  return dateKeyFormatter.format(new Date());
}

function daysSinceLaunch(launchDate) {
  const start = new Date(`${launchDate}T00:00:00+05:30`);
  const now = new Date();
  return Math.max(0, Math.floor((now - start) / 86400000));
}

function resourcesFrom(data) {
  return data.resources || data.sources || fallbackData.resources;
}

function buildGeneratedPost(data) {
  const topics = [
    {
      category: "Interview",
      title: "How to explain enterprise structures in Oracle HCM interviews",
      summary:
        "A strong answer connects enterprise, legal employer, business unit, department, location, job, and position to how HR transactions are secured and reported.",
      takeaways: [
        "Start with the business operating model before naming setup objects.",
        "Explain why legal employers affect statutory reporting and employment records.",
        "Use a small example: one enterprise, two countries, multiple legal employers, and shared departments.",
      ],
      sourceTitle: "Interview Answer Builder",
    },
    {
      category: "Implementation",
      title: "Business use case: preparing Workforce Deployment setup",
      summary:
        "Before configuring HCM, the project team should validate countries, legal entities, reference data sharing, and role access so later modules do not inherit avoidable design issues.",
      takeaways: [
        "Confirm the implementation scope and country rollout waves.",
        "Document which setup decisions are global and which are country-specific.",
        "Keep a sign-off trail for legal employer, business unit, and department design.",
      ],
      sourceTitle: "Core HR Implementation Roadmap",
    },
    {
      category: "AI Agents",
      title: "AI Agent Studio for HCM: governance questions before configuration",
      summary:
        "AI agent work should begin with a clear owner, approved knowledge sources, security review, test cases, and a fallback process for sensitive HR scenarios.",
      takeaways: [
        "Define what the agent can answer, what it must refuse, and when it should hand off.",
        "Use only approved internal content and original learner examples.",
        "Test with employee, manager, HR specialist, and administrator personas.",
      ],
      sourceTitle: "AI Agent Studio Governance Notes",
    },
    {
      category: "Latest Releases",
      title: "Release-readiness habit: review impact by product area",
      summary:
        "Treat each quarterly release as a mini-project: map changes to enabled modules, confirm optional feature decisions, and test priority transactions.",
      takeaways: [
        "Separate informational changes from setup-impacting changes.",
        "Prioritize regression tests for HR, payroll, recruiting, talent, and security flows in use.",
        "Write your own impact summary and avoid republishing release-note text.",
      ],
      sourceTitle: "Quarterly Release Impact Planner",
    },
  ];

  const offset = daysSinceLaunch(data.site.launchDate);
  const selected = topics[offset % topics.length];
  const resources = resourcesFrom(data);
  const source = resources.find((item) => item.title === selected.sourceTitle) || resources[0];

  return {
    id: `auto-${offset + 1}`,
    date: todayKey(),
    readTime: "4 min",
    source,
    ...selected,
  };
}

function normalizePost(post, data) {
  const resources = resourcesFrom(data);
  const source =
    post.source ||
    resources.find((item) => item.title === post.sourceTitle) ||
    resources.find((item) => item.type === post.category) ||
    resources[0];

  return {
    ...post,
    source,
  };
}

function postTemplate(post, featured = false) {
  const takeaways = post.takeaways.map((item) => `<li>${item}</li>`).join("");
  const meta = `
    <div class="post-meta">
      <span class="pill">${post.category}</span>
      <span class="pill">${post.readTime}</span>
      <span class="pill">${post.date}</span>
    </div>
  `;

  if (featured) {
    return `
      <div>
        ${meta}
        <h3>${post.title}</h3>
        <p>${post.summary}</p>
        <ul class="takeaway-list">${takeaways}</ul>
      </div>
      <aside class="sidebar-panel">
        <strong>Module focus</strong>
        <p>${post.source?.note || "Original FusionPrep AI learner guidance for this topic."}</p>
        <span>${post.source?.title || post.category}</span>
      </aside>
    `;
  }

  return `
    <article class="post-card" data-category="${post.category}">
      <div>
        ${meta}
        <h3>${post.title}</h3>
        <p>${post.summary}</p>
      </div>
      <span class="card-foot">Module: ${post.source?.title || post.category}</span>
    </article>
  `;
}

function renderPaths(paths) {
  const pathGrid = document.querySelector("#path-grid");
  pathGrid.innerHTML = paths
    .map(
      (path) => `
        <article class="path-card">
          <div>
            <div class="post-meta">
              <span class="pill">${path.level}</span>
              <span class="pill">${path.duration}</span>
            </div>
            <h3>${path.title}</h3>
            <p>${path.summary}</p>
          </div>
          <ol>
            ${path.steps.map((step) => `<li>${step}</li>`).join("")}
          </ol>
        </article>
      `,
    )
    .join("");
}

function renderModules(guides) {
  const moduleGrid = document.querySelector("#module-grid");
  moduleGrid.innerHTML = guides
    .map(
      (guide) => `
        <article class="module-card">
          <div>
            <div class="post-meta">
              <span class="pill">${guide.module}</span>
              <span class="pill">${guide.level}</span>
            </div>
            <h3>${guide.title}</h3>
            <p>${guide.summary}</p>
          </div>
          <div class="guide-columns">
            <div>
              <strong>Implementation focus</strong>
              <ul>${guide.implementation.map((item) => `<li>${item}</li>`).join("")}</ul>
            </div>
            <div>
              <strong>Interview prep</strong>
              <ul>${guide.interview.map((item) => `<li>${item}</li>`).join("")}</ul>
            </div>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderLabs(labs) {
  const labGrid = document.querySelector("#lab-grid");
  labGrid.innerHTML = labs
    .map(
      (lab) => `
        <article class="lab-card">
          <div>
            <div class="post-meta">
              <span class="pill">${lab.module}</span>
              <span class="pill">${lab.duration}</span>
            </div>
            <h3>${lab.title}</h3>
            <p>${lab.scenario}</p>
          </div>
          <ol>
            ${lab.tasks.map((task) => `<li>${task}</li>`).join("")}
          </ol>
        </article>
      `,
    )
    .join("");
}

function resourceTemplate(resource) {
  const slug = resource.type.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return `
    <article class="resource-card" data-search="${`${resource.title} ${resource.type} ${resource.note}`.toLowerCase()}">
      <span class="resource-type ${slug}">${resource.type}</span>
      <h3>${resource.title}</h3>
      <p>${resource.note}</p>
      <span class="card-foot">FusionPrep AI original note</span>
    </article>
  `;
}

function renderResources(resources) {
  const resourceGrid = document.querySelector("#resource-grid");
  const search = document.querySelector("#resource-search");
  resourceGrid.innerHTML = resources.map(resourceTemplate).join("");

  search.addEventListener("input", () => {
    const query = search.value.trim().toLowerCase();
    [...resourceGrid.children].forEach((card) => {
      card.hidden = query && !card.dataset.search.includes(query);
    });
  });
}

function setupPractice(cards) {
  if (!cards.length) return;
  const category = document.querySelector("#flashcard-category");
  const question = document.querySelector("#flashcard-question");
  const answer = document.querySelector("#flashcard-answer");
  const reveal = document.querySelector("#reveal-answer");
  const next = document.querySelector("#next-card");
  const save = document.querySelector("#save-card");
  let index = 0;

  function renderCard() {
    const card = cards[index % cards.length];
    category.textContent = card.category;
    question.textContent = card.question;
    answer.textContent = card.answer;
    answer.hidden = true;
    reveal.textContent = "Reveal answer";
  }

  reveal.addEventListener("click", () => {
    answer.hidden = !answer.hidden;
    reveal.textContent = answer.hidden ? "Reveal answer" : "Hide answer";
  });

  next.addEventListener("click", () => {
    index += 1;
    renderCard();
  });

  save.addEventListener("click", () => {
    const card = cards[index % cards.length];
    const saved = JSON.parse(localStorage.getItem("fusionprep-saved-cards") || "[]");
    if (!saved.some((item) => item.question === card.question)) {
      saved.push(card);
      localStorage.setItem("fusionprep-saved-cards", JSON.stringify(saved));
    }
    save.textContent = "Saved";
    setTimeout(() => {
      save.textContent = "Save for later";
    }, 1400);
  });

  renderCard();
}

function setupChecklist(items) {
  if (!items.length) return;
  const checklist = document.querySelector("#readiness-checklist");
  const progressBar = document.querySelector("#progress-bar");
  const progressLabel = document.querySelector("#progress-label");
  const saved = new Set(JSON.parse(localStorage.getItem("fusionprep-checklist") || "[]"));

  function updateProgress() {
    const checked = [...checklist.querySelectorAll("input:checked")].length;
    const percent = Math.round((checked / items.length) * 100);
    progressBar.style.width = `${percent}%`;
    progressLabel.textContent = `${percent}% complete`;
    const selected = [...checklist.querySelectorAll("input:checked")].map((input) => input.value);
    localStorage.setItem("fusionprep-checklist", JSON.stringify(selected));
  }

  checklist.innerHTML = items
    .map(
      (item) => `
        <label>
          <input type="checkbox" value="${item}" ${saved.has(item) ? "checked" : ""} />
          <span>${item}</span>
        </label>
      `,
    )
    .join("");

  checklist.addEventListener("change", updateProgress);
  updateProgress();
}

function wireFilters() {
  const buttons = [...document.querySelectorAll(".filter")];
  const cards = [...document.querySelectorAll(".post-card")];

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      const filter = button.dataset.filter;

      cards.forEach((card) => {
        card.hidden = filter !== "All" && card.dataset.category !== filter;
      });
    });
  });
}

async function loadData() {
  try {
    const response = await fetch("./data/posts.json", { cache: "no-store" });
    if (!response.ok) throw new Error("No content file found");
    return await response.json();
  } catch {
    return fallbackData;
  }
}

async function init() {
  const data = await loadData();
  const resources = resourcesFrom(data);
  const archivedPosts = data.posts.map((post) => normalizePost(post, data));
  const storedDailyPost = archivedPosts.find((post) => post.date === todayKey());
  const dailyPost = storedDailyPost || buildGeneratedPost(data);
  const allPosts = storedDailyPost ? archivedPosts : [dailyPost, ...archivedPosts];

  document.querySelector("#today-date").textContent = dateFormatter.format(new Date());
  document.querySelector("#today-post").innerHTML = postTemplate(dailyPost, true);
  document.querySelector("#post-grid").innerHTML = allPosts.map((post) => postTemplate(post)).join("");
  document.querySelector("#queue-count").textContent = allPosts.length;
  document.querySelector("#stat-posts").textContent = allPosts.length;
  document.querySelector("#stat-resources").textContent = resources.length;

  renderPaths(data.paths || []);
  renderModules(data.moduleGuides || []);
  renderLabs(data.labs || []);
  renderResources(resources);
  setupPractice(data.practiceCards || []);
  setupChecklist(data.checklist || []);
  wireFilters();
}

init();
