import { showChart } from "./ChartDefinitions/LineChart";
import { getYearsList, populationSizeForCountry } from "./Population";

export const createMultiCountriesChart = population => {
  const chartData = {
    labels: getYearsList(population),
    datasets: [
      {
        label: "Unia Europejska",
        data: populationSizeForCountry(population, "European Union"),
        backgroundColor: "transparent",
        borderColor: "#4d97ff"
      },
      {
        label: "Stany Zjednoczone",
        data: populationSizeForCountry(population, "United States"),
        backgroundColor: "transparent",
        borderColor: "#ff7e37"
      },
      {
        label: "Kraje Arabskie",
        data: populationSizeForCountry(population, "Arab World"),
        backgroundColor: "transparent",
        borderColor: "#ff4e5f"
      }
    ]
  };

  const element = document.getElementById("multi_countries_population");
  showChart(element, chartData, "Populacja wybranych regionów na przestzeni lat 1960-2016");
};
