export default function daftar() {
  const contentHtml = `
  <div class="p-4">
     <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold mb-4">Daftar Wajib Pajak</h1>
        <!-- Button Add -->
        <button
          id="add-button"
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
        >
          + Tambah Wajib Pajak
        </button>
    </div>
    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr class="bg-red-800 text-white bg-text-200 text-left">
            <th class="border border-gray-300 px-4 py-2">No</th>
            <th class="border border-gray-300 px-4 py-2">Nama</th>
            <th class="border border-gray-300 px-4 py-2">NPWP</th>
            <th class="border border-gray-300 px-4 py-2">Alamat</th>
            <th class="border border-gray-300 px-4 py-2">Jenis Pajak</th>
          </tr>
        </thead>
        <tbody id="wpTableBody">
          <!-- Dynamic Data -->
        </tbody>
      </table>
    </div>

    <!-- Modal Form -->
    <div id="form-modal" class="fixed inset-0 bg-black bg-opacity-50 hidden flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 class="text-xl font-bold text-gray-700 mb-4">Form Pendaftaran Wajib Pajak</h2>
        <form id="form-registrasi">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="nama">Nama Wajib Pajak</label>
            <input class="w-full px-4 py-2 border rounded-lg" id="nama" type="text" placeholder="Masukkan Nama" required>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="npwp">NPWP</label>
            <input class="w-full px-4 py-2 border rounded-lg" id="npwp" type="text" placeholder="Masukkan NPWP" required>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="alamat">Alamat</label>
            <textarea class="w-full px-4 py-2 border rounded-lg" id="alamat" rows="3" placeholder="Masukkan Alamat" required></textarea>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="jenis_pajak">Jenis Pajak</label>
            <select id="jenis_pajak" class="w-full px-4 py-2 border rounded-lg">
              <option value="pajak_penghasilan">Pajak Penghasilan</option>
              <option value="pajak_bumi_bangunan">Pajak Bumi dan Bangunan</option>
              <option value="pajak_kendaraan">Pajak Kendaraan</option>
            </select>
          </div>
          <div class="flex justify-end">
            <button id="cancel-button" type="button" class="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded-lg mr-2">Batal</button>
            <button id="submit-button" type="button" class="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-lg">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  `;
  return contentHtml;
}

$(document).ready(function () {
  const wpTableBody = $("#wpTableBody");
  const formModal = $("#form-modal");
  const form = $("#form-registrasi");

  // Load data from localStorage
  const loadWajibPajak = () => {
    const data = JSON.parse(localStorage.getItem("wp_data")) || [];
    wpTableBody.empty();
    data.forEach((wp, index) => {
      const row = `
        <tr>
          <td class="border px-4 py-2">${index + 1}</td>
          <td class="border px-4 py-2">${wp.nama}</td>
          <td class="border px-4 py-2">${wp.npwp}</td>
          <td class="border px-4 py-2">${wp.alamat}</td>
          <td class="border px-4 py-2">${wp.jenisPajak}</td>
        </tr>
      `;
      wpTableBody.append(row);
    });
  };

  // Open Modal
  $("#add-button").click(() => {
    form[0].reset();
    formModal.removeClass("hidden");
  });

  // Close Modal
  $("#cancel-button").click(() => {
    formModal.addClass("hidden");
  });

  // Save Data
  $("#submit-button").click(() => {
    const nama = $("#nama").val();
    const npwp = $("#npwp").val();
    const alamat = $("#alamat").val();
    const jenisPajak = $("#jenis_pajak").val();

    if (!nama || !npwp || !alamat || !jenisPajak) {
      alert("Harap isi semua field!");
      return;
    }

    // Save data
    const newData = { nama, npwp, alamat, jenisPajak };
    const existingData = JSON.parse(localStorage.getItem("wp_data")) || [];
    existingData.push(newData);
    localStorage.setItem("wp_data", JSON.stringify(existingData));

    // Reload Table
    loadWajibPajak();
    formModal.addClass("hidden");
    alert("Wajib Pajak berhasil didaftarkan!");
  });

  // Initial load
  loadWajibPajak();
});
