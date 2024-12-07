export default function registrasi_wp() {
  const wajibPajak = {
    "NIK": "737111890xxxx",
    "nama": "Zainal Farid"
  }
  const contentHtml = `<div class="p-4">
  <h1 class="text-2xl font-bold mb-4">Pendaftaran Wajib Pajak</h1>
  <form id="form-registrasi" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="nama">
        Nama Wajib Pajak
      </label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="nama" type="text" placeholder="Masukkan Nama"
      />
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="npwp">
        NPWP
      </label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="npwp" type="text" placeholder="Masukkan NPWP"
      />
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="alamat">
        Alamat
      </label>
      <textarea
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="alamat" rows="3" placeholder="Masukkan Alamat"
      ></textarea>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="jenis_pajak">
        Jenis Pajak
      </label>
      <select
        id="jenis_pajak"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="pajak_penghasilan">Pajak Penghasilan</option>
        <option value="pajak_bumi_bangunan">Pajak Bumi dan Bangunan</option>
        <option value="pajak_kendaraan">Pajak Kendaraan</option>
      </select>
    </div>
    <div class="flex items-center justify-between">
      <button
        id="submit-button"
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
      >
        Daftar
      </button>
    </div>
  </form>
</div>
`;
  return contentHtml;
}

$(document).ready(function () {
  // Handle Form Submission
  $("#submit-button").click(function () {
    const nama = $("#nama").val();
    const npwp = $("#npwp").val();
    const alamat = $("#alamat").val();
    const jenisPajak = $("#jenis_pajak").val();

    if (!nama || !npwp || !alamat || !jenisPajak) {
      alert("Harap isi semua field!");
      return;
    }

    // Simpan Data ke Server (Simulasi)
    const data = { nama, npwp, alamat, jenisPajak };
    console.log("Data yang dikirim:", data);

    // Simpan data ke localStorage (Sementara)
    const existingData = JSON.parse(localStorage.getItem("wp_data")) || [];
    existingData.push(data);
    localStorage.setItem("wp_data", JSON.stringify(existingData));

    alert("Wajib Pajak berhasil didaftarkan!");
    $("#form-registrasi")[0].reset(); // Reset Form
  });
});

  