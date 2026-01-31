export default class Alert {
  constructor() {
    this.alerts = [];
  }

  async init() {
    const response = await fetch("/js/alerts.json");
    this.alerts = await response.json();

    if (this.alerts.length > 0) {
      this.renderAlerts();
    }
  }

  renderAlerts() {
    const section = document.createElement("section");
    section.className = "alert-list";

    this.alerts.forEach((alert) => {
      const p = document.createElement("p");
      p.textContent = alert.message;
      p.style.backgroundColor = alert.background;
      p.style.color = alert.color;
      section.appendChild(p);
    });

    const main = document.querySelector("main");
    main.prepend(section);
  }
}
