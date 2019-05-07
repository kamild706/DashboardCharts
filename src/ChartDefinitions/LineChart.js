import Chart from "chart.js";

export const withSeparator = num => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const toMillions = num => {
  return `${num / 1000000} M`;
};

export const showChart = (ctx, data, title) => {
  return new Chart(ctx, {
    type: "line",
    data: data,
    options: {
      title: {
        display: true,
        text: title
      },
      scales: {
        yAxes: [
          {
            ticks: {
              callback(value) {
                return toMillions(value);
              }
            },
            scaleLabel: {
              display: true,
              labelString: "Licba ludności"
            }
          }
        ],
        xAxes: [
          {
            position: "bottom",
            scaleLabel: {
              display: true,
              labelString: "Lata"
            }
          }
        ]
      },
      tooltips: {
        callbacks: {
          label(tooltipItem, data) {
            const value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
            return withSeparator(value);
          }
        }
      }
    }
  });
};
