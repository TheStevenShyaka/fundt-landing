/*
 * Shared waitlist + year stamp for every landing variant.
 * Set WAITLIST_ENDPOINT to collect for real; otherwise localStorage.
 */

const WAITLIST_ENDPOINT = "";

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function setNote(note, message, kind) {
  if (!note) return;
  note.textContent = message;
  note.classList.remove("success", "error");
  if (kind) note.classList.add(kind);
}

async function submitEmail(email) {
  if (!WAITLIST_ENDPOINT) {
    const stored = JSON.parse(localStorage.getItem("fundt-waitlist") || "[]");
    if (!stored.includes(email)) stored.push(email);
    localStorage.setItem("fundt-waitlist", JSON.stringify(stored));
    return;
  }

  const res = await fetch(WAITLIST_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error("Request failed");
}

document.querySelectorAll(".waitlist-form").forEach((form) => {
  const input = form.querySelector("input[type='email']");
  const button = form.querySelector("button[type='submit'], button:not([type])");
  const note =
    form.nextElementSibling?.matches?.(".waitlist-note")
      ? form.nextElementSibling
      : form.parentElement?.querySelector(".waitlist-note");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = input.value.trim();
    if (!isValidEmail(email)) {
      setNote(note, "That email does not look right. Mind checking it?", "error");
      input.focus();
      return;
    }

    button.disabled = true;
    const originalLabel = button.textContent;
    button.textContent = "Joining…";

    try {
      await submitEmail(email);
      setNote(note, "You are on the list. We will email you when Fundt ships.", "success");
      input.value = "";
    } catch {
      setNote(note, "Something went wrong. Please try again in a moment.", "error");
    } finally {
      button.disabled = false;
      button.textContent = originalLabel;
    }
  });

  input?.addEventListener("input", () => {
    if (note?.dataset?.default) setNote(note, note.dataset.default, null);
  });
});

const demoVideo = document.querySelector(".screen-video");
if (demoVideo) {
  demoVideo.addEventListener("loadeddata", () => {
    demoVideo.hidden = false;
    const placeholder = document.querySelector(".screen-placeholder");
    if (placeholder) placeholder.style.display = "none";
  });
}

document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = String(new Date().getFullYear());
});
