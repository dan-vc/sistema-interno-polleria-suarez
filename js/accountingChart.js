const incomeGraphDesktop = document.getElementById('incomeGraphDesktop');
const incomeGraphMobile = document.getElementById('incomeGraphMobile');

const data = [
    { date: "12/02", income: 10 },
    { date: "13/02", income: 25 },
    { date: "14/02", income: 70 },
    { date: "15/02", income: 30 },
    { date: "16/02", income: 150 },
    { date: "17/02", income: 65 },
    { date: "18/02", income: 98 },
    { date: "19/02", income: 101 },
    { date: "20/02", income: 20 },
    { date: "21/02", income: 45 },
    { date: "22/02", income: 120 },
    { date: "23/02", income: 100 },
];

const secondaryColor = '#5E77FF';

// Definir estilos globales para los gráficos
Chart.defaults.font.size = 16; // Tamaño de la fuente
Chart.defaults.font.family = 'Barlow'; // Tipo de fuente
Chart.defaults.aspectRatio = 2.5; // Relación de aspecto
Chart.defaults.backgroundColor = secondaryColor; // Color de fondo
Chart.defaults.pointRadius = 5; // Tamaño de los puntos
Chart.defaults.pointHitRadius = 10; // Tamaño de los puntos al hacer hover
Chart.defaults.borderWidth = 1.5; // Grosor de las líneas 
Chart.defaults.lineBorderColor = secondaryColor; // Color de las líneas
Chart.defaults.plugins.tooltip.enabled = true; // Mostrar tooltip
Chart.defaults.plugins.tooltip.backgroundColor = secondaryColor; // Color de fondo del tooltip
Chart.defaults.plugins.tooltip.xAlign = 'center'; // Alineación del tooltip en X
Chart.defaults.plugins.tooltip.yAlign = 'bottom'; // Alineación del tooltip en Y
Chart.defaults.plugins.legend.display = true; // Mostrar leyenda

new Chart(incomeGraphDesktop,
    {
        type: 'line',
        options: {
            tension: 0.5, // Curvatura de la línea
            scales: {
                // Definir los valores mínimos y máximos de los ejes
                y: {
                    min: 0,
                    max: 200,
                }
            }
        },
        data: {
            labels: data.map(row => row.date),
            datasets: [
                {
                    label: 'Ingresos del día (S/.)',
                    data: data.map(row => row.income),
                    fill: {
                        target: 'start',
                        above: '#5e76ff25',
                    }
                }

            ]
        }
    }
);

new Chart(incomeGraphMobile,
    {
        type: 'line',
        options: {
            tension: 0.5,
            aspectRatio: 1,
            scales: {
                x: {
                    min: "15/02",
                },
                y: {
                    min: 0,
                    max: 200,
                },
            }
        },
        data: {
            labels: data.map(row => row.date),
            datasets: [
                {
                    label: 'Ingresos del día (S/.)',
                    data: data.map(row => row.income),
                    fill: {
                        target: 'start',
                        above: '#5e76ff25',

                    }
                }

            ]
        }
    }
);
