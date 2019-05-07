import Chart from "chart.js";

export const showChart = (ctx, labels, dataset, scales, title) => {
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [dataset]
    },
    options: {
      scales: scales,
      title: {
        display: true,
        text: title
      }
    }
  });
};
