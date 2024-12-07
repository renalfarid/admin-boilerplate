export default function initializeCharts(detailPajak) {
    // Buat konten grafik
    const chartContent = `
      <!-- Grafik Bar -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-lg font-bold mb-4">Grafik Bar (Realisasi vs Target)</h2>
        <canvas id="barChart"></canvas>
      </div>
      <!-- Grafik Pie -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-lg font-bold mb-4">Grafik Pie (Persentase Per Jenis Pajak)</h2>
        <canvas id="pieChart"></canvas>
      </div>
    `;
    
    // Menambahkan konten grafik ke dalam halaman
    $('#dashboard_chart').html(chartContent);
  
    $(document).ready(function() {
      const labels = detailPajak.map(pajak => pajak.jenis);
      const dataRealisasi = detailPajak.map(pajak => pajak.realisasi);
      const dataTarget = detailPajak.map(pajak => pajak.target);
  
      // Grafik Bar
      const barCtx = $('#barChart')[0].getContext('2d');
      const pieCtx = $('#pieChart')[0].getContext('2d');
  
      if (!barCtx || !pieCtx) {
        console.error("Canvas elements not found!");
        return;
      }
  
      try {
        // Grafik Bar
        new Chart(barCtx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Realisasi',
                data: dataRealisasi,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
              },
              {
                label: 'Target',
                data: dataTarget,
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
              }
            ]
          },
          options: {
            responsive: true,
            plugins: {
              legend: { position: 'top' }
            },
            scales: {
              y: { beginAtZero: true }
            }
          }
        });
  
        // Grafik Pie
        new Chart(pieCtx, {
          type: 'pie',
          data: {
            labels: labels,
            datasets: [{
              data: dataRealisasi,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#D9E021', '#F7464A', '#46BFBD', '#FDB45C']
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: { position: 'top' }
            }
          }
        });
      } catch (error) {
        console.error("Failed to render charts:", error);
      }
    });
}
