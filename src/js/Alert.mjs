export default class Alert {
  constructor(containerId = "alertContainer") {
    this.container = document.getElementById(containerId);
  }

  show(message, type = "success", duration = 3000) {
    if (!this.container) return;

    const alert = document.createElement("div");
    alert.className = `alert ${type}`;
    alert.textContent = message;

    this.container.appendChild(alert);

    requestAnimationFrame(() => {
      alert.classList.add("show");
    });

    setTimeout(() => {
      alert.classList.remove("show");

      setTimeout(() => {
        alert.remove();
      }, 400);
    }, duration);
  }
}
