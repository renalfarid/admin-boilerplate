export default function daftar() {
    const contentHtml = `
    <div class="p-6 bg-white shadow-md rounded-lg">
  <h1 class="text-2xl font-bold mb-4 text-gray-700">Jenis Pajak</h1>

  <!-- Form Tambah/Edit Jenis Pajak -->
  <div class="mb-6">
    <form id="form-jenis-pajak" class="flex flex-col gap-4">
      <input
        type="text"
        id="jenis-pajak-name"
        class="p-2 border rounded w-full"
        placeholder="Nama Jenis Pajak"
      />
      <button
        type="button"
        id="save-jenis-pajak"
        class="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
      >
        Simpan
      </button>
    </form>
  </div>

  <!-- Tabel Daftar Jenis Pajak -->
  <table class="w-full text-left border-collapse">
    <thead class="bg-red-800 text-white">
      <tr>
        <th class="border-b p-2">No</th>
        <th class="border-b p-2">Nama Jenis Pajak</th>
        <th class="border-b p-2 text-center">Aksi</th>
      </tr>
    </thead>
    <tbody id="jenis-pajak-list">
      <!-- Data jenis pajak akan di-render di sini -->
    </tbody>
  </table>
</div>`
return contentHtml; 
  }

  $(document).ready(function () {
    const jenisPajakList = [];
  
    // Render daftar jenis pajak
    function renderJenisPajak() {
      const tableBody = $("#jenis-pajak-list");
      tableBody.empty();
  
      jenisPajakList.forEach((jenis, index) => {
        tableBody.append(`
          <tr>
            <td class="border-b p-2">${index + 1}</td>
            <td class="border-b p-2">${jenis}</td>
            <td class="border-b p-2 text-center">
              <button class="bg-yellow-500 text-white px-2 py-1 rounded edit-btn" data-index="${index}">Edit</button>
              <button class="bg-red-500 text-white px-2 py-1 rounded delete-btn" data-index="${index}">Hapus</button>
            </td>
          </tr>
        `);
      });
    }
  
    // Tambah atau edit jenis pajak
    $("#save-jenis-pajak").click(function () {
      const jenisPajakName = $("#jenis-pajak-name").val().trim();
      if (jenisPajakName) {
        const editingIndex = $("#save-jenis-pajak").data("editingIndex");
  
        if (editingIndex !== undefined) {
          // Update data
          jenisPajakList[editingIndex] = jenisPajakName;
          $("#save-jenis-pajak").removeData("editingIndex");
        } else {
          // Tambah data baru
          jenisPajakList.push(jenisPajakName);
        }
  
        $("#jenis-pajak-name").val("");
        renderJenisPajak();
      } else {
        alert("Nama jenis pajak tidak boleh kosong!");
      }
    });
  
    // Edit jenis pajak
    $(document).on("click", ".edit-btn", function () {
      const index = $(this).data("index");
      $("#jenis-pajak-name").val(jenisPajakList[index]);
      $("#save-jenis-pajak").data("editingIndex", index);
    });
  
    // Hapus jenis pajak
    $(document).on("click", ".delete-btn", function () {
      const index = $(this).data("index");
      if (confirm("Anda yakin ingin menghapus jenis pajak ini?")) {
        jenisPajakList.splice(index, 1);
        renderJenisPajak();
      }
    });
  });
  
  