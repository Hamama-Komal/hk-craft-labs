// HK Craft Labs — small progressive enhancements. The page works without this file.

(function () {
  "use strict";

  const EMAIL = "hamama.komal.00@gmail.com";
  const WHATSAPP = "923021976361";

  document.documentElement.classList.add("js");

  // Gentle reveal as sections scroll in.
  const targets = document.querySelectorAll(
    ".section__head, .story__head, .story__body, .lane, .topics li, .step, .promises li, .talk__intro, .brief"
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

  const form = document.getElementById("brief");
  if (!form) return;

  const topicSelect = document.getElementById("topic");
  const message = document.getElementById("message");
  const errorBox = document.getElementById("form-error");

  // Topic buttons pick the topic, then take the visitor to the message box.
  document.querySelectorAll(".topic[data-topic]").forEach((btn) => {
    btn.addEventListener("click", () => {
      topicSelect.value = btn.dataset.topic;
      document.getElementById("talk").scrollIntoView({ behavior: "smooth", block: "start" });
      const field = message.closest(".field");
      field.classList.add("is-flash");
      setTimeout(() => field.classList.remove("is-flash"), 1600);
      setTimeout(() => message.focus({ preventScroll: true }), 450);
    });
  });

  // The form composes a message and hands it to the visitor's WhatsApp or email.
  let channel = "whatsapp";
  form.querySelectorAll("button[data-channel]").forEach((btn) => {
    btn.addEventListener("click", () => {
      channel = btn.dataset.channel;
    });
  });

  function showError(text, field) {
    errorBox.textContent = text;
    errorBox.hidden = false;
    field.setAttribute("aria-invalid", "true");
    field.focus();
  }

  form.addEventListener("input", (event) => {
    event.target.removeAttribute("aria-invalid");
    errorBox.hidden = true;
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const topic = data.get("topic") || "Something else";
    const text = (data.get("message") || "").trim();
    const name = (data.get("name") || "").trim();

    if (text.length < 10) {
      showError("Add a line or two so I know what you'd like to talk about.", form.elements.message);
      return;
    }
    if (!name) {
      showError("Let me know what to call you.", form.elements.name);
      return;
    }

    const body = [`Hi Hamama,`, ``, `Topic: ${topic}`, ``, text, ``, `— ${name}`].join("\n");

    if (channel === "whatsapp") {
      window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(body)}`, "_blank", "noopener");
    } else {
      const subject = `HK Craft Labs: ${topic}`;
      window.location.href =
        `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
  });
})();
