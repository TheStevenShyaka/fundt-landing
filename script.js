/*
 * Fundt landing — waitlist signup + small niceties.
 *
 * Wire up email collection below: set WAITLIST_ENDPOINT to your
 * Formspree / Google Form / backend URL. Until then, emails are
 * stored in localStorage so you can test the flow end to end.
 */

const WAITLIST_ENDPOINT = ""; // e.g. "https://formspree.io/f/xxxxxxx"

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function setNote(note, message, kind) {
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
  const button = form.querySelector("button");
  const note = form.nextElementSibling;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = input.value.trim();
    if (!isValidEmail(email)) {
      setNote(note, "That email doesn\u2019t look right \u2014 mind checking it?", "error");
      input.focus();
      return;
    }

    button.disabled = true;
    const originalLabel = button.textContent;
    button.textContent = "Joining\u2026";

    try {
      await submitEmail(email);
      setNote(note, "You\u2019re on the list! We\u2019ll email you when Fundt ships.", "success");
      input.value = "";
    } catch {
      setNote(note, "Something went wrong. Please try again in a moment.", "error");
    } finally {
      button.disabled = false;
      button.textContent = originalLabel;
    }
  });

  input.addEventListener("input", () => {
    setNote(note, note.dataset.default, null);
  });
});

/* Show the demo video only if the file actually exists. */
const demoVideo = document.querySelector(".screen-video");
if (demoVideo) {
  demoVideo.addEventListener("loadeddata", () => {
    demoVideo.hidden = false;
    const placeholder = document.querySelector(".screen-placeholder");
    if (placeholder) placeholder.style.display = "none";
  });
}

document.getElementById("year").textContent = new Date().getFullYear();
