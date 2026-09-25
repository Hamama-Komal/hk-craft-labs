// HK Craft Labs — small progressive enhancements. The page works without this file.

(function () {
  "use strict";

  const EMAIL = "hamama.komal.00@gmail.com";
  const WHATSAPP = "923021976361";

  document.documentElement.classList.add("js");

  // Gentle reveal for section content as it scrolls in.
  const targets = document.querySelectorAll(
    ".section__label, .prose, .case, .shipped li, .steps li, .faq, .brief, .ledger"
  );
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    targets.forEach((el) => {
      el.classList.add("reveal");
      io.observe(el);
    });
  }

  // The brief form composes a message and hands it to the visitor's email or WhatsApp.
  const form = document.getElementById("brief");
  if (!form) return;

  const errorBox = document.getElementById("form-error");
  let channel = "email";

  form.querySelectorAll("button[data-channel]").forEach((btn) => {
    btn.addEventListener("click", () => {
      channel = btn.dataset.channel;
    });
  });

  function showError(message, field) {
    errorBox.textContent = message;
    errorBox.hidden = false;
    if (field) {
      field.setAttribute("aria-invalid", "true");
      field.focus();
    }
  }

  form.addEventListener("input", (event) => {
    if (event.target.hasAttribute("aria-invalid")) event.target.removeAttribute("aria-invalid");
    if (!errorBox.hidden) errorBox.hidden = true;
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const problem = (data.get("problem") || "").trim();
    const name = (data.get("name") || "").trim();
    const org = (data.get("org") || "").trim();
    const stage = data.get("stage") || "";
    const timeline = data.get("timeline") || "Not sure yet";

    if (problem.length < 15) {
      showError("Add a sentence or two about the problem so I have something to reply to.", form.elements.problem);
      return;
    }
    if (!name) {
      showError("Let me know what to call you.", form.elements.name);
      return;
    }

    const lines = [
      `Hi Hamama,`,
      ``,
      problem,
      ``,
      `Where I am: ${stage}`,
      `Timeline: ${timeline}`,
    ];
    if (org) lines.push(`Company / project: ${org}`);
    lines.push(``, `— ${name}`);
    const body = lines.join("\n");

    if (channel === "whatsapp") {
      const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(body)}`;
      window.open(url, "_blank", "noopener");
    } else {
      const subject = `HK Craft Labs: ${stage}${org ? " — " + org : ""}`;
      window.location.href =
        `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
  });
})();
