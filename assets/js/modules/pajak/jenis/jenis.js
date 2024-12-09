export default function jenis() {
  const contentHtml = `
  <div class="p-6 bg-white shadow-md rounded-lg">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold text-gray-700">Jenis Pajak</h1>
      <button
        id="add-jenis-pajak"
        class="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
      >
        + Tambah Jenis Pajak
      </button>
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
  </div>

  <!-- Modal Form -->
  <div id="form-modal" class="fixed inset-0 bg-black bg-opacity-50 hidden flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 id="modal-title" class="text-xl font-bold text-gray-700 mb-4">Tambah Jenis Pajak</h2>
      <form id="form-jenis-pajak" class="flex flex-col gap-4">
        <input
          type="text"
          id="jenis-pajak-name"
          class="p-2 border rounded w-full"
          placeholder="Nama Jenis Pajak"
          required
        />
        <div class="flex justify-end gap-2">
          <button
            type="button"
            id="cancel-button"
            class="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          >
            Batal
          </button>
          <button
            type="button"
            id="save-jenis-pajak"
            class="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  </div>
  `;
  return contentHtml;
}

$(document).ready(function () {
  const jenisPajakList = []; // Data array untuk jenis pajak

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

  // Tampilkan modal form
  function showModal(title, index = null) {
    $("#modal-title").text(title);
    if (index !== null) {
      $("#jenis-pajak-name").val(jenisPajakList[index]);
      $("#save-jenis-pajak").data("editingIndex", index); // Simpan index untuk update
    } else {
      $("#jenis-pajak-name").val(""); // Kosongkan input untuk tambah baru
      $("#save-jenis-pajak").removeData("editingIndex");
    }
    $("#form-modal").removeClass("hidden");
  }

  // Sembunyikan modal form
  function hideModal() {
    $("#form-modal").addClass("hidden");
    $("#jenis-pajak-name").val("");
    $("#save-jenis-pajak").removeData("editingIndex");
  }

  // Tambah/Edit jenis pajak
  $("#save-jenis-pajak").click(function () {
    const jenisPajakName = $("#jenis-pajak-name").val().trim();
    if (!jenisPajakName) {
      alert("Nama jenis pajak tidak boleh kosong!");
      return;
    }

    const editingIndex = $(this).data("editingIndex");

    if (editingIndex !== undefined) {
      // Update data
      jenisPajakList[editingIndex] = jenisPajakName;
      $(this).removeData("editingIndex");
    } else {
      // Tambah data baru
      jenisPajakList.push(jenisPajakName);
    }

    renderJenisPajak();
    hideModal();
  });

  // Batal (sembunyikan modal)
  $("#cancel-button").click(function () {
    hideModal();
  });

  // Klik tombol tambah jenis pajak
  $("#add-jenis-pajak").click(function () {
    showModal("Tambah Jenis Pajak");
  });

  // Klik tombol edit
  $(document).on("click", ".edit-btn", function () {
    const index = $(this).data("index");
    showModal("Edit Jenis Pajak", index);
  });

  // Klik tombol hapus
  $(document).on("click", ".delete-btn", function () {
    const index = $(this).data("index");
    if (confirm("Anda yakin ingin menghapus jenis pajak ini?")) {
      jenisPajakList.splice(index, 1);
      renderJenisPajak();
    }
  });
});

