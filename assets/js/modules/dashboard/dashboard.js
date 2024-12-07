import initializeCharts from './dashboard_chart.js';

export default async function dashboard() {
  const data = {
    "realisasi_bulan_ini": 5488760686,
    "realisasi_total": 270717080527,
    "target_tahun_ini": 345550000000,
    "sisa": 74832919473
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

  // Konten HTML untuk dashboard
  const htmlContent = `
    <h1 class="text-2xl font-bold mb-4">Dashboard Pajak Daerah</h1>

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

    <div id="dashboard_chart" class="grid grid-cols-2 md:grid-cols-2 gap-6 mt-6">
      <!-- Grafik akan ditambahkan di sini -->
    </div>

    <!-- Detail Pajak -->
    <div class="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 class="text-lg font-bold mb-4">Detail Realisasi</h2>
      <table class="w-full border-collapse">
        <thead>
          <tr>
            <th class="border p-2 text-left">Jenis Pajak</th>
            <th class="border p-2 text-right">Target</th>
            <th class="border p-2 text-right">Realisasi</th>
            <th class="border p-2 text-right">Sisa</th>
          </tr>
        </thead>
        <tbody>
          ${detailPajak.map(pajak => {
            const persentaseRealisasi = (pajak.realisasi / pajak.target) * 100;

            return `
              <tr>
                <td class="border p-2">
                  ${pajak.jenis}
                  <div class="mt-2">
                    <div class="w-full bg-gray-200 rounded-full h-2">
                      <div class="${persentaseRealisasi >= 100 ? 'bg-green-500' : 'bg-blue-500'} h-2 rounded-full" style="width: ${Math.min(persentaseRealisasi, 100)}%;"></div>
                    </div>
                    <p class="text-sm text-gray-500 mt-1">${persentaseRealisasi.toFixed(2)}% dari target</p>
                  </div>
                </td>
                <td class="border p-2 text-right">${formatCurrency(pajak.target)}</td>
                <td class="border p-2 text-right">${formatCurrency(pajak.realisasi)}</td>
                <td class="border p-2 text-right">${formatCurrency(pajak.sisa)}</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
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
