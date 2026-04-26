const fallbackData = {
  site: {
    launchDate: "2026-04-26",
  },
  sources: [
    {
      title: "Oracle Cloud Applications Readiness - HCM",
      type: "Latest Releases",
      url: "https://docs.oracle.com/en/cloud/saas/readiness/hcm.html",
      note: "Official readiness hub for quarterly HCM updates, including 26B materials.",
    },
    {
      title: "Implementing Global Human Resources",
      type: "Implementation",
      url: "https://docs.oracle.com/en/cloud/saas/human-resources/faigh/index.html",
      note: "Oracle guide for Workforce Deployment and Global HR implementation setup.",
    },
    {
      title: "Human Capital Management features with AI",
      type: "AI Agents",
      url: "https://docs.oracle.com/en/cloud/saas/fusion-ai/aiafl/ai-hcm.html",
      note: "Official list of Oracle Fusion HCM AI and generative AI features by update.",
    },
    {
      title: "Overview of AI Agent Studio",
      type: "AI Agents",
      url: "https://docs.oracle.com/en/cloud/saas/fusion-ai/aiaas/overview.html",
      note: "Oracle overview of the design-time environment for AI agents.",
    },
  ],
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
      sourceTitle: "Implementing Global Human Resources",
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
      sourceTitle: "Implementing Global Human Resources",
    },
    {
      category: "AI Agents",
      title: "AI Agent Studio for HCM: governance questions before configuration",
      summary:
        "AI agent work should begin with a clear owner, approved knowledge sources, security review, test cases, and a fallback process for sensitive HR scenarios.",
      takeaways: [
        "Define what the agent can answer, what it must refuse, and when it should hand off.",
        "Use only approved internal content and official product documentation.",
        "Test with employee, manager, HR specialist, and administrator personas.",
      ],
      sourceTitle: "Overview of AI Agent Studio",
    },
    {
      category: "Latest Releases",
      title: "Release-readiness habit: review HCM 26B impact by product area",
      summary:
        "Treat each quarterly release as a mini-project: scan HCM readiness notes, map changes to enabled modules, confirm opt-in items, and test priority transactions.",
      takeaways: [
        "Separate informational changes from setup-impacting changes.",
        "Prioritize regression tests for HR, payroll, recruiting, talent, and security flows in use.",
        "Keep links to official readiness pages rather than republishing Oracle release text.",
      ],
      sourceTitle: "Oracle Cloud Applications Readiness - HCM",
    },
  ];

  const offset = daysSinceLaunch(data.site.launchDate);
  const selected = topics[offset % topics.length];
  const source = data.sources.find((item) => item.title === selected.sourceTitle) || data.sources[0];

  return {
    id: `auto-${offset + 1}`,
    date: new Date().toISOString().slice(0, 10),
    readTime: "4 min",
    source,
    ...selected,
  };
}

function normalizePost(post, data) {
  const source =
    post.source ||
    data.sources.find((item) => item.title === post.sourceTitle) ||
    data.sources.find((item) => item.type === post.category) ||
    data.sources[0];

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
        <strong>Official reference</strong>
        <p>${post.source.note}</p>
        <a href="${post.source.url}" target="_blank" rel="noreferrer">${post.source.title}</a>
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
      <a href="${post.source.url}" target="_blank" rel="noreferrer">Official source</a>
    </article>
  `;
}

function renderPaths(paths) {
  const pathGrid = document.querySelector("#path-grid");
  if (!paths.length) {
    pathGrid.innerHTML = "";
    return;
  }
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

function resourceTemplate(source) {
  const slug = source.type.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return `
    <article class="resource-card" data-search="${`${source.title} ${source.type} ${source.note}`.toLowerCase()}">
      <span class="resource-type ${slug}">${source.type}</span>
      <h3>${source.title}</h3>
      <p>${source.note}</p>
      <a href="${source.url}" target="_blank" rel="noreferrer">Open official Oracle page</a>
    </article>
  `;
}

function renderResources(sources) {
  const resourceGrid = document.querySelector("#resource-grid");
  const search = document.querySelector("#resource-search");
  resourceGrid.innerHTML = sources.map(resourceTemplate).join("");

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

function renderSources(sources) {
  const sourceList = document.querySelector("#source-list");
  sourceList.innerHTML = sources
    .map(
      (source) => `
        <article class="source-card">
          <div>
            <span class="pill">${source.type}</span>
            <h3>${source.title}</h3>
            <p>${source.note}</p>
          </div>
          <a href="${source.url}" target="_blank" rel="noreferrer">Open official page</a>
        </article>
      `,
    )
    .join("");
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
  const archivedPosts = data.posts.map((post) => normalizePost(post, data));
  const storedDailyPost = archivedPosts.find((post) => post.date === todayKey());
  const dailyPost = storedDailyPost || buildGeneratedPost(data);
  const allPosts = storedDailyPost ? archivedPosts : [dailyPost, ...archivedPosts];

  document.querySelector("#today-date").textContent = dateFormatter.format(new Date());
  document.querySelector("#today-post").innerHTML = postTemplate(dailyPost, true);
  document.querySelector("#post-grid").innerHTML = allPosts.map((post) => postTemplate(post)).join("");
  document.querySelector("#queue-count").textContent = allPosts.length;
  document.querySelector("#stat-posts").textContent = allPosts.length;
  document.querySelector("#stat-resources").textContent = data.sources.length;

  renderPaths(data.paths);
  renderResources(data.sources);
  renderSources(data.sources);
  setupPractice(data.practiceCards);
  setupChecklist(data.checklist);
  wireFilters();
}

init();
