import initializeCharts from './dashboard_chart.js';

export default async function dashboard() {
  
  const data = {
    "realisasi_bulan_ini": 5488760686,
    "realisasi_total": 270717080527,
    "target_tahun_ini": 345550000000,
    "sisa": 74832919473,
    "pajak": {
      "realisasi": 270717080527,
      "target": 350000000000
    },
    "retribusi": {
      "realisasi": 50000000000,
      "target": 60000000000
    },
    "kekayaan": {
      "realisasi": 20717180527,
      "target": 35550000000
    }
  };
  

  const persentaseRealisasi = (data.realisasi_total / data.target_tahun_ini) * 100;

  const detailPajak = [
    { jenis: "Pajak Hotel", target: 7000000000, realisasi: 5753164254, sisa: -1246835746 },
    { jenis: "Pajak Restoran", target: 26000000000, realisasi: 33366514597, sisa: 7166514597 },
    { jenis: "Pajak Hiburan", target: 4000000000, realisasi: 3916879447, sisa: -83120553 },
    { jenis: "Pajak Reklame", target: 10350000000, realisasi: 6110356207, sisa: -4239643793 },
    { jenis: "Pajak Penerangan Jalan", target: 95000000000, realisasi: 96468524689, sisa: 1468524689 },
    { jenis: "Pajak Parkir", target: 2000000000, realisasi: 1445362132, sisa: -554637868 },
    { jenis: "Pajak Air Bawah Tanah", target: 1000000000, realisasi: 875435972, sisa: -124564028 },
    { jenis: "Pajak Mineral", target: 20000000000, realisasi: 6222594934, sisa: -13774705066 },
    { jenis: "Pajak BPHTB", target: 100000000000, realisasi: 68741540722, sisa: -31258459278 },
    { jenis: "PBB", target: 80000000000, realisasi: 47814086064, sisa: -32185913936 },
  ];

  const detailRetribusi = [
    { jenis: "Retribusi Jasa Umum", target: 1500000000, realisasi: 1200000000, sisa: -300000000 },
    { jenis: "Retribusi Jasa Usaha", target: 800000000, realisasi: 650000000, sisa: -150000000 },
    { jenis: "Retribusi Perizinan Tertentu", target: 1000000000, realisasi: 950000000, sisa: -50000000 },
    { jenis: "Retribusi Pemakaian Kekayaan Daerah", target: 1200000000, realisasi: 1450000000, sisa: 250000000 },
    { jenis: "Retribusi Parkir Tepi Jalan Umum", target: 900000000, realisasi: 750000000, sisa: -150000000 },
    { jenis: "Retribusi Tempat Khusus Parkir", target: 500000000, realisasi: 600000000, sisa: 100000000 },
    { jenis: "Retribusi Tempat Rekreasi dan Olahraga", target: 2000000000, realisasi: 1850000000, sisa: -150000000 },
    { jenis: "Retribusi Pelayanan Pasar", target: 700000000, realisasi: 500000000, sisa: -200000000 },
    { jenis: "Retribusi Pengujian Kendaraan Bermotor", target: 600000000, realisasi: 450000000, sisa: -150000000 },
    { jenis: "Retribusi Pengelolaan Limbah", target: 1000000000, realisasi: 1200000000, sisa: 200000000 },
];


  // Konten HTML untuk dashboard
  const htmlContent = `
    <h1 class="text-2xl font-bold mb-4">Dashboard PAD Plus</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-6">
  <!-- Pajak Daerah -->
  <div class="bg-white p-6 rounded-lg shadow-md">
    <div class="flex items-center mb-4">
      <i class="fas fa-landmark text-4xl text-blue-500 mr-4"></i>
      <h2 class="text-lg font-bold">Pajak Daerah</h2>
    </div>
    <p class="text-xl">${formatCurrency(data.pajak.realisasi)}</p>
    <p class="text-sm text-gray-500 mt-2">
      ${((data.pajak.realisasi / data.pajak.target) * 100).toFixed(2)}% dari target
    </p>
    <!-- Progress Bar -->
    <div class="mt-4">
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div class="bg-blue-500 h-2 rounded-full" style="width: ${((data.pajak.realisasi / data.pajak.target) * 100).toFixed(2)}%;"></div>
      </div>
    </div>
  </div>

  <!-- Retribusi Daerah -->
  <div class="bg-white p-6 rounded-lg shadow-md">
    <div class="flex items-center mb-4">
      <i class="fas fa-coins text-4xl text-green-500 mr-4"></i>
      <h2 class="text-lg font-bold">Retribusi Daerah</h2>
    </div>
    <p class="text-xl">${formatCurrency(data.retribusi.realisasi)}</p>
    <p class="text-sm text-gray-500 mt-2">
      ${((data.retribusi.realisasi / data.retribusi.target) * 100).toFixed(2)}% dari target
    </p>
    <!-- Progress Bar -->
    <div class="mt-4">
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div class="bg-green-500 h-2 rounded-full" style="width: ${((data.retribusi.realisasi / data.retribusi.target) * 100).toFixed(2)}%;"></div>
      </div>
    </div>
  </div>

  <!-- Hasil Kekayaan Daerah -->
  <div class="bg-white p-6 rounded-lg shadow-md">
    <div class="flex items-center mb-4">
      <i class="fas fa-gem text-4xl text-purple-500 mr-4"></i>
      <h2 class="text-lg font-bold">Hasil Kekayaan Daerah</h2>
    </div>
    <p class="text-xl">${formatCurrency(data.kekayaan.realisasi)}</p>
    <p class="text-sm text-gray-500 mt-2">
      ${((data.kekayaan.realisasi / data.kekayaan.target) * 100).toFixed(2)}% dari target
    </p>
    <!-- Progress Bar -->
    <div class="mt-4">
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div class="bg-purple-500 h-2 rounded-full" style="width: ${((data.kekayaan.realisasi / data.kekayaan.target) * 100).toFixed(2)}%;"></div>
      </div>
    </div>
  </div>
</div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
      <div class="bg-white p-6 rounded-lg shadow-md flex items-center">
        <div class="text-green-500 text-3xl mr-4">
          <i class="fas fa-chart-line"></i>
        </div>
        <div>
          <h2 class="text-lg font-bold">Realisasi Total</h2>
          <p class="text-xl">${formatCurrency(data.realisasi_total)}</p>
          <!-- Progress Bar -->
          <div class="mt-4">
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-green-500 h-2 rounded-full" style="width: ${persentaseRealisasi}%;"></div>
            </div>
            <p class="text-sm text-gray-500 mt-2">${persentaseRealisasi.toFixed(2)}% dari target tahun ini</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-md flex items-center">
        <div class="text-blue-500 text-3xl mr-4">
          <i class="fas fa-calendar-day"></i>
        </div>
        <div>
          <h2 class="text-lg font-bold">Realisasi Bulan Ini</h2>
          <p class="text-xl">${formatCurrency(data.realisasi_bulan_ini)}</p>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-md flex items-center">
        <div class="text-yellow-500 text-3xl mr-4">
          <i class="fas fa-trophy"></i>
        </div>
        <div>
          <h2 class="text-lg font-bold">Target Tahun Ini</h2>
          <p class="text-xl">${formatCurrency(data.target_tahun_ini)}</p>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-md flex items-center">
        <div class="text-red-500 text-3xl mr-4">
          <i class="fas fa-hourglass-half"></i>
        </div>
        <div>
          <h2 class="text-lg font-bold">Sisa Target</h2>
          <p class="text-xl">${formatCurrency(data.sisa)}</p>
        </div>
      </div>
    </div>

    <div id="dashboard_chart" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 mt-6">
      <!-- Grafik akan ditambahkan di sini -->
    </div>

    <!-- Detail Pajak -->
<div class="bg-white p-6 rounded-lg shadow-md mt-6">
  <h2 class="text-lg font-bold mb-4">Detail Realisasi Pajak</h2>
  <div class="overflow-x-auto">
    <table class="w-full border-collapse min-w-max">
      <thead>
        <tr class="bg-red-800 text-white">
          <th class="border p-2 text-left">Jenis Pajak</th>
          <th class="border p-2 text-center">Realisasi</th>
          <th class="border p-2 text-center">Target</th>
          <th class="border p-2 text-center">Sisa</th>
        </tr>
      </thead>
      <tbody>
        ${detailPajak
          .map((pajak) => {
            const persentaseRealisasi = (pajak.realisasi / pajak.target) * 100;

            return `
            <tr>
              <td class="border p-2">
                ${pajak.jenis}
                <div class="mt-2">
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="${
                      persentaseRealisasi >= 100
                        ? "bg-green-500"
                        : "bg-blue-500"
                    } h-2 rounded-full" style="width: ${Math.min(
              persentaseRealisasi,
              100
            )}%;">
                    </div>
                  </div>
                  <p class="text-sm text-gray-500 mt-1">${persentaseRealisasi.toFixed(
                    2
                  )}% dari target</p>
                </div>
              </td>
              <td class="border p-2 text-right">${formatCurrency(
                pajak.realisasi
              )}</td>
              <td class="border p-2 text-right">${formatCurrency(
                pajak.target
              )}</td>
              <td class="border p-2 text-right">${formatCurrency(
                pajak.sisa
              )}</td>
            </tr>
          `;
          })
          .join("")}
      </tbody>
    </table>
  </div>
</div>

<div class="bg-white p-6 rounded-lg shadow-md mt-6">
  <h2 class="text-lg font-bold mb-4">Detail Retribusi</h2>
  <div class="overflow-x-auto">
    <table class="w-full border-collapse min-w-max">
      <thead>
        <tr class="bg-blue-800 text-white">
          <th class="border p-2 text-left">Jenis Retribusi</th>
          <th class="border p-2 text-center">Realisasi</th>
          <th class="border p-2 text-center">Target</th>
          <th class="border p-2 text-center">Sisa</th>
        </tr>
      </thead>
      <tbody>
        ${detailRetribusi
          .map((retribusi) => {
            const persentaseRealisasi = (retribusi.realisasi / retribusi.target) * 100;

            return `
            <tr>
              <td class="border p-2">${retribusi.jenis}

              <div class="mt-2">
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="${
                      persentaseRealisasi >= 100
                        ? "bg-green-500"
                        : "bg-blue-500"
                    } h-2 rounded-full" style="width: ${Math.min(
              persentaseRealisasi,
              100
            )}%;">
                    </div>
                  </div>
                  <p class="text-sm text-gray-500 mt-1">${persentaseRealisasi.toFixed(
                    2
                  )}% dari target</p>
                </div>
              
              </td>
              <td class="border p-2 text-right">${formatCurrency(retribusi.realisasi)}</td>
              <td class="border p-2 text-right">${formatCurrency(retribusi.target)}</td>
              <td class="border p-2 text-right">${formatCurrency(retribusi.sisa)}</td>
            </tr>`;
          })
          .join("")}
      </tbody>
    </table>
  </div>
</div>

  `;

  const container = document.getElementById('content');
  if (container) {
    container.innerHTML = htmlContent;
  }

  // Pastikan grafik dipanggil setelah konten dimuat
  setTimeout(() => {
    initializeCharts(detailPajak);
  }, 500); // Menunggu 100ms sebelum memanggil initializeCharts

  return htmlContent;
}

// Fungsi Format Currency
function formatCurrency(value) {
  return value.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
}
