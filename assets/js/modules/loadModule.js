
export default async function loadModule(moduleId) {
  try {
    const module = await import(`./${getModulePath(moduleId)}.js`);
    closeMenu()
    return module.default();
  } catch (error) {
    console.error(`Failed to load module: ${moduleId}`, error);
    return `
      <h1 class="text-2xl font-bold text-red-500">Error</h1>
      <p>Sorry, the page you are looking for cannot be found.</p>
    `;
  }
}

export async function loadContentWithSpinner(moduleId) {
  const contentContainer = document.getElementById('content');
  
  showSpinner();

  try {
    const content = await loadModule(moduleId); 
    contentContainer.innerHTML = content; 
  } catch (error) {
    console.error("Failed to load module:", error);
    contentContainer.innerHTML = `
      <div class="text-center text-red-500">
        <h1 class="text-2xl font-bold">Error</h1>
        <p>Sorry, an error occurred while loading the module.</p>
      </div>
    `;
  }
}


// Helper function to resolve module paths for nested menus
function getModulePath(moduleId) {
  const mapping = {
    // Main menu
    "dashboard": "dashboard/dashboard",
    "notifikasi": "notifikasi/notifikasi",
    "logs": "logs/logs",
    "bantuan": "bantuan/bantuan",
    
    // Submenus under "Users"
    "roles": "users/roles",
    "user-list": "users/user-list",

    "daftar": "jenis/daftar",

    "registrasi_wp": "wp/registrasi_wp",
    "list_wp": "wp/list_wp",
    "status_wp": "wp/status_wp",
     
    "setor_pajak": "transaksi/setor_pajak",
    "riwayat": "transaksi/riwayat",
    "rekapitulasi": "transaksi/rekapitulasi",

    "konfigurasi": "settings/konfigurasi",
    "backup": "settings/backup",
    "profil": "settings/profil",

  };

  return mapping[moduleId] || "not-found";
}
