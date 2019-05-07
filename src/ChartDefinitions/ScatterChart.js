import Chart from "chart.js";
import { toMillions, withSeparator } from "./LineChart";

export const showChart = (ctx, dataset, title) => {
  new Chart(ctx, {
    type: "scatter",
    data: {
      datasets: dataset
    },
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
              labelString: "Max(populacja)"
            }
          }
        ],
        xAxes: [
          {
            ticks: {
              callback(value) {
                return toMillions(value);
              }
            },
            scaleLabel: {
              display: true,
              labelString: "Min(populacja)"
            }
          }
        ]
      },
      tooltips: {
        callbacks: {
          label(tooltipItem, data) {
            const { label, data: dataArr } = data.datasets[tooltipItem.datasetIndex];
            const minMax = dataArr[0];
            const message = [];
            message.push(label);
            message.push(`Min: ${withSeparator(minMax.x)}`);
            message.push(`Max: ${withSeparator(minMax.y)}`);
            return message;
          }
        }
      }
    }
  });
};
