export default function sidebar() {
  const menu = [
    { id: "dashboard", name: "Dashboard", icon: "fas fa-chart-line" },
    {
      id: "jenis",
      name: "Jenis Pajak",
      icon: "fas fa-tags",
      submenu: [
        { id: "daftar", name: "Daftar Jenis Pajak" },
      ],
    },
    {
      id: "wp",
      name: "Wajib Pajak",
      icon: "fas fa-user",
      submenu: [
        { id: "registrasi_wp", name: "Pendaftaran Wajib Pajak" },
        { id: "list_wp", name: "List Wajib Pajak" },
        { id: "status_wp", name: "Status Wajib Pajak" },
      ],
    },
    {
      id: "transaksi",
      name: "Transaksi Pajak",
      icon: "fas fa-receipt",
      submenu: [
        { id: "setor_pajak", name: "Setor Pajak" },
        { id: "riwayat", name: "Riwayat Transaksi" },
        { id: "rekapitulasi", name: "Rekapitulasi Pajak" },
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
    <aside class="bg-gray-800 text-white w-full md:w-full lg:w-full p-4 min-h-screen">
      <ul>
        ${menu
          .map((item) =>
            item.submenu
              ? `
            <li class="p-2">
              <div class="flex items-center space-x-2 cursor-pointer" data-id="${item.id}" onclick="toggleSubmenu('${item.id}')">
                <i class="${item.icon}"></i>
                <span>${item.name}</span>
                <i class="pr-4 fas fa-chevron-down ml-auto text-gray-400"></i>
              </div>
              <ul id="${item.id}-submenu" class="hidden ml-4">
                ${item.submenu
                  .map(
                    (sub) => `
                  <li class="p-2 hover:bg-gray-700 cursor-pointer" data-id="${sub.id}">
                    <span>${sub.name}</span>
                  </li>
                `
                  )
                  .join("")}
              </ul>
            </li>
          `
              : `
            <li class="p-2 hover:bg-gray-700 cursor-pointer" data-id="${item.id}">
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
  `;
}
