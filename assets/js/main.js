import navbar from './modules/navbar.js';
import sidebar from './modules/sidebar.js';
import footer from './modules/footer.js';
import loadContentWithSpinner from './modules/loadModule.js';

// Render static components
document.getElementById('navbar').innerHTML = navbar();
document.getElementById('sidebar').innerHTML = sidebar();
document.getElementById('footer').innerHTML = footer();

// Handle menu navigation
document.querySelectorAll('[data-id]').forEach((menu) => {
    menu.addEventListener('click', async (e) => {
      const menuId = e.currentTarget.getAttribute('data-id');
  
      // Abaikan klik pada menu dengan submenu
      if (!e.currentTarget.hasAttribute('onclick')) {
        const content = await loadContentWithSpinner(menuId);
        document.getElementById('content').innerHTML = content;
      }
    });
  });

  // Handle submenu toggle
window.toggleSubmenu = (menuId) => {
    const submenu = document.getElementById(`${menuId}-submenu`);
    if (submenu.classList.contains("hidden")) {
      submenu.classList.remove("hidden");
    } else {
      submenu.classList.add("hidden");
    }
  };
  

// Load default content (Dashboard)
loadContentWithSpinner('dashboard').then((content) => {
  document.getElementById('content').innerHTML = content;
});
