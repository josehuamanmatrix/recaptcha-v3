import "../styles/style.css";

const container = document.getElementById("container");
const clipboardIcon = document.getElementById("clipboard-icon");
const recaptchaToken = document.getElementById("recaptcha-token");

const snackId = "snack";

window.addEventListener("load", () => {
  clipboardIcon?.addEventListener("click", async () => {
    const token = recaptchaToken?.textContent;
    if (!token) {
      return;
    }
    await navigator.clipboard.writeText(token);

    if (container) {
      const snack = document.getElementById(snackId);
      if (snack) {
        container.removeChild(snack);
      }

      const div = document.createElement("div");
      div.id = snackId;
      div.classList.add("snack");
      div.textContent = "Copied";

      container.appendChild(div);

      setTimeout(async () => {
        const { log } = await import("./util");
        log();

        div.classList.toggle("snack-show");

        div.addEventListener(
          "transitionend",
          () => {
            div.classList.toggle("snack-show");
          },
          { once: true }
        );
      }, 100);
    }
  });
});
