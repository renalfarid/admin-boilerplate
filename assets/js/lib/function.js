function closeMenu() {
    $(document).ready(function () {
     const $menu = $("#sidebar-menu");
     if (!$menu.hasClass("hidden")) {
        $menu.addClass("hidden");
    } 
    });
      
}