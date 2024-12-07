export default function sidebar() {
  const menu = [
    { id: "dashboard", name: "Dashboard Pajak Daerah", icon: "📊" },
    {
      id: "users",
      name: "Pengguna",
      icon: "👥",
      submenu: [
        { id: "roles", name: "Role" },
        { id: "user-list", name: "Users" },
      ],
    },
    { id: "settings", name: "Pengaturan", icon: "⚙️" },
  ];

  return `
    <aside class="bg-gray-800 text-white w-full md:w-full lg:w-full p-4 min-h-full">
      <ul>
        ${menu
          .map((item) =>
            item.submenu
              ? `
            <li class="p-2">
              <div class="flex items-center space-x-2 cursor-pointer" data-id="${item.id}" onclick="toggleSubmenu('${item.id}')">
                <span>${item.icon || ""}</span>
                <span>${item.name}</span>
                <span class="ml-auto text-gray-400">▼</span>
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
                <span>${item.icon || ""}</span>
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
