export default class Alert {
  constructor(containerId = "alertContainer") {
    this.container = document.getElementById(containerId);
  }

  show(message, type = "success", duration = 3000) {
    const alert = document.createElement("div");
    alert.classList.add("alert", type);
    alert.textContent = message;

    this.container.appendChild(alert);

    // Trigger animation
    setTimeout(() => alert.classList.add("show"), 10);

    // Remove alert after duration
    setTimeout(() => {
      alert.classList.remove("show");
      setTimeout(() => this.container.removeChild(alert), 400);
    }, duration);
  }
}
