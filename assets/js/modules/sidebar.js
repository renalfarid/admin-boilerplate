export default function sidebar() {
  const menu = [
    { id: "dashboard", name: "Dashboard", icon: "fas fa-chart-line" },
    {
      id: "pajak",
      name: "Manajemen Pajak",
      icon: "fas fa-landmark",
      submenu: [
        { id: "kategori", name: "Kategori Pajak" },
        { id: "wp", name: "Wajib Pajak" },
        { id: "laporan", name: "Laporan Pajak" },
      ],
    },
    
    {
      id: "retribusi",
      name: "Manajemen Retribusi",
      icon: "fas fa-receipt",
      submenu: [
        { id: "kategori_r", name: "Kategori Retribusi" },
        { id: "wr", name: "Data Wajib Retribusi" },
        { id: "laporan_r", name: "Laporan Retribusi" },
      ],
    },
    {
      id: "aset",
      name: "Manajemen Aset Daerah",
      icon: "fas fa-gem",
      submenu: [
        { id: "data_aset", name: "Data Aset" },
        { id: "laporan_aset", name: "Laporan Aset" },
      ],
    },
    {
      id: "pendapatan",
      name: "Monitoring Pendapatan",
      icon: "fas fa-coins",
      submenu: [
        { id: "laporan_pendapatan", name: "Laporan Pendapatan" },
        { id: "pencapaian", name: "Target Pencapaian" },
        { id: "evaluasi", name: "Hasil Evaluasi" },
      ],
    },
    {
      id: "users",
      name: "Pengguna",
      icon: "fas fa-users",
      submenu: [
        { id: "roles", name: "Role" },
        { id: "user-list", name: "Pengguna" },
      ],
    },
    {
      id: "settings",
      name: "Pengaturan",
      icon: "fas fa-cogs",
      submenu: [
        { id: "profil", name: "Profil Daerah" },
        { id: "konfigurasi", name: "Konfigurasi Pajak" },
        { id: "backup", name: "Backup & Restore" },
      ],
    },
    {
      id: "laporan",
      name: "Laporan",
      icon: "fas fa-file-alt",
      submenu: [
        { id: "harian", name: "Laporan Harian" },
        { id: "bulanan", name: "Laporan Bulanan" },
        { id: "tahunan", name: "Laporan Tahunan" },
      ],
    },
    { id: "notifikasi", name: "Notifikasi", icon: "fas fa-bell" },
    { id: "logs", name: "Log Aktifitas", icon: "fas fa-history" },
    { id: "bantuan", name: "Bantuan", icon: "fas fa-question-circle" },
  ];

  return `
    <div>
      <!-- Hamburger Icon -->
      <button
        id="menu-toggle"
        class="p-4 text-white bg-red-900 w-full md:w-full focus:outline-none flex justify-start"
        aria-label="Toggle Sidebar"
      >
        <i class="fas fa-bars"></i>
      </button>
      
      <!-- Sidebar -->
      <aside
        id="sidebar-menu"
        class="bg-red-900 text-white w-full md:w-full lg:w-full p-4 min-h-screen hidden"
      >
        <ul>
          ${menu
            .map((item) =>
              item.submenu
                ? `
              <li class="p-2">
                <div class="flex items-center space-x-2 cursor-pointer" data-id="${item.id}" onclick="toggleSubmenu('${item.id}')">
                  <i class="${item.icon}"></i>
                  <span>${item.name}</span>
                  <i class="pr-4 fas fa-chevron-down ml-auto text-red-400"></i>
                </div>
                <ul id="${item.id}-submenu" class="hidden ml-4">
                  ${item.submenu
                    .map(
                      (sub) => `
                    <li class="p-2 hover:bg-red-700 cursor-pointer" data-id="${sub.id}">
                      <span>${sub.name}</span>
                    </li>
                  `
                    )
                    .join("")}
                </ul>
              </li>
            `
                : `
              <li class="p-2 hover:bg-red-700 cursor-pointer" data-id="${item.id}">
                <div class="flex items-center space-x-2">
                  <i class="${item.icon}"></i>
                  <span>${item.name}</span>
                </div>
              </li>
            `
            )
            .join("")}
        </ul>
      </aside>
    </div>
  `;
}

$(document).ready(function () {
  // Toggle Sidebar
  $("#menu-toggle").click(function () {
    const $menu = $("#sidebar-menu");
    if ($menu.hasClass("hidden")) {
      $menu.removeClass("hidden");
    } else {
      $menu.addClass("hidden");
    }
  });
});
