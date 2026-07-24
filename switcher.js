const manifestPromise = fetch("variants/manifest.json").then((r) => r.json());

const skillSelect = document.getElementById("skillSelect");
const styleTabs = document.getElementById("styleTabs");
const stage = document.getElementById("stage");

const state = {
  skill: "taste",
  styleIndex: 0,
};

function readHash() {
  const raw = location.hash.replace(/^#/, "");
  if (!raw) return;
  const [skill, styleId] = raw.split("/");
  if (skill) state.skill = skill;
  if (styleId) state.styleId = styleId;
}

function writeHash(skillId, styleId) {
  const next = `#${skillId}/${styleId}`;
  if (location.hash !== next) history.replaceState(null, "", next);
}

function renderTabs(skill) {
  styleTabs.innerHTML = "";
  skill.styles.forEach((style, index) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.setAttribute("role", "tab");
    btn.id = `tab-${style.id}`;
    btn.textContent = `${index + 1}. ${style.tab}`;
    btn.dataset.styleId = style.id;
    btn.setAttribute("aria-selected", String(index === state.styleIndex));
    btn.addEventListener("click", () => {
      state.styleIndex = index;
      load(skill, style);
      renderTabs(skill);
    });
    styleTabs.appendChild(btn);
  });
}

function load(skill, style) {
  stage.src = `variants/${style.file}`;
  writeHash(skill.id, style.id);
  document.title = `Fundt — ${style.tab} (${skill.label})`;
}

async function boot() {
  readHash();
  const manifest = await manifestPromise;
  const skills = Object.fromEntries(manifest.skills.map((s) => [s.id, s]));

  if (!skills[state.skill]) state.skill = manifest.skills[0].id;
  skillSelect.value = state.skill;

  const applySkill = () => {
    const skill = skills[state.skill];
    let index = 0;
    if (state.styleId) {
      const found = skill.styles.findIndex((s) => s.id === state.styleId);
      if (found >= 0) index = found;
    }
    state.styleIndex = index;
    delete state.styleId;
    renderTabs(skill);
    load(skill, skill.styles[index]);
  };

  skillSelect.addEventListener("change", () => {
    state.skill = skillSelect.value;
    state.styleIndex = 0;
    applySkill();
  });

  applySkill();
}

boot().catch((err) => {
  console.error(err);
  styleTabs.textContent = "Could not load variants/manifest.json";
});
