// Function to load HTML content into a placeholder
async function loadComponent(placeholderId, componentPath) {
  try {
    const response = await fetch(componentPath);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const html = await response.text();
    document.getElementById(placeholderId).innerHTML = html;
  } catch (error) {
    console.error(`Could not load ${componentPath}:`, error);
  }
}

// Function to initialize the theme toggle
function initializeThemeToggle() {
  const toggleInput = document.getElementById("theme-toggle-input");
  const root = document.documentElement;

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    // Ensure the checkbox state matches the theme (useful on initial load)
    toggleInput.checked = theme === "dark";
    localStorage.setItem("theme", theme);
  }

  // Event listener for theme change
  toggleInput.addEventListener("change", () => {
    const newTheme = toggleInput.checked ? "dark" : "light";
    setTheme(newTheme);
  });

  // Apply saved theme on initial load
  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);
}

// Load all components
document.addEventListener("DOMContentLoaded", async () => {
  // Load the theme toggle first, as it's critical
  await loadComponent("theme-toggle-container", "components/theme-toggle.html");

  // Then initialize its functionality once it's in the DOM
  // We add a small delay to ensure the element is truly rendered
  setTimeout(() => {
    if (document.getElementById("theme-toggle-input")) {
      initializeThemeToggle();
    } else {
      console.error("Theme toggle input not found after loading component.");
    }
  }, 50); // Small delay

  // Load other components in parallel (or sequentially if order matters for some reason)
  await Promise.all([
    loadComponent("header-placeholder", "components/header.html"),
    loadComponent("navigation-placeholder", "components/navigation.html"),
    loadComponent("about-section", "components/about.html"),
    loadComponent("work-experience-section", "components/work-experience.html"),
    loadComponent("education-section", "components/education.html"),
    loadComponent("skills-section", "components/skills.html"),
    loadComponent("projects-section", "components/projects.html"),
    loadComponent("contact-section", "components/contact.html"),
    loadComponent("footer-placeholder", "components/footer.html"),
  ]);
});
