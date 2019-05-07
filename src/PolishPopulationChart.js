import { getYearsList, populationSizeForCountry } from "./Population";
import { showChart } from "./ChartDefinitions/LineChart";

export const createPolishPopulationChart = population => {
  const polishData = {
    labels: getYearsList(population),
    datasets: [
      {
        label: "Polska",
        data: populationSizeForCountry(population, "Poland"),
        backgroundColor: "transparent",
        borderColor: "#4d97ff"
      }
    ]
  };

  const element = document.getElementById("polish_population");
  showChart(element, polishData, "Populacja Polski na przestzeni lat 1960-2016");
};
