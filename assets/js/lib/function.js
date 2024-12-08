function closeMenu() {
    $(document).ready(function () {
     const $menu = $("#sidebar-menu");
     if (!$menu.hasClass("hidden")) {
        $menu.addClass("hidden");
    } 
    });
}

function showSpinner() {
    document.getElementById('content').innerHTML = `
      <div class="flex justify-center items-center h-64">
        <i class="fas fa-spinner fa-spin text-4xl text-red-500"></i>
      </div>
    `;
  }  