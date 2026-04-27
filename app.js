  const search = document.querySelector("#resource-search");
  if (!resourceGrid || !search) return;
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
  document.querySelector("#queue-count").textContent = data.implementationGuides.length;
  document.querySelector("#stat-posts").textContent = allPosts.length;
  document.querySelector("#stat-guides").textContent = data.implementationGuides.length;
  document.querySelector("#stat-interviews").textContent = data.interviewQuestions.length;

  renderBeginnerStart(data.beginnerStart || []);
  renderGuides(data.implementationGuides || []);
  renderInterviews(data.interviewQuestions || []);
  renderLabs(data.labs || []);
  renderResources(resources);
  setupPractice(data.practiceCards || []);
  setupChecklist(data.checklist || []);
  wireFilters();
}

init();
