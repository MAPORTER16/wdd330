import { loadHeaderFooter, renderRecentlyViewed } from "./utils.mjs";
import Alert from "./Alert.js";

loadHeaderFooter();

const alerts = new Alert();
alerts.init();

renderRecentlyViewed();
