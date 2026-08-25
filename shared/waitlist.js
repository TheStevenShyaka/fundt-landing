/*
 * Shared waitlist + year stamp for every landing variant.
 * Posts to the Loops form endpoint (urlencoded). Do not use the Loops API key here.
 */

const WAITLIST_ENDPOINT =
  "https://app.loops.so/api/newsletter-form/cmt8xu1ee00us0jwu2ndsa9mx";

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
  const res = await fetch(WAITLIST_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: new URLSearchParams({
      email,
      source: "fundt.app",
      userGroup: "Waitlist",
    }),
  });

  if (res.status === 429) {
    const err = new Error("rate-limit");
    err.code = "rate-limit";
    throw err;
  }

  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok || data?.success === false) {
    throw new Error(data?.message || "Request failed");
  }
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
    } catch (err) {
      const rateLimited = err && err.code === "rate-limit";
      setNote(
        note,
        rateLimited
          ? "Too many signups just now. Please try again in a moment."
          : "Something went wrong. Please try again in a moment.",
        "error"
      );
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
