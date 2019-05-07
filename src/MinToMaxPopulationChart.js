import { showChart } from "./ChartDefinitions/ScatterChart";

export const createMinToMaxPopulationChart = (population, countryCodes) => {
  const europeanPopulation = filterPopulationByContinent(population, countryCodes, "EU");
  const minMaxPopulation = minMaxPopulationByCountry(europeanPopulation);
  const dataset = mapToChartDataset(minMaxPopulation);

  const element = document.getElementById("minmax_population");
  showChart(element, dataset, "Populacja państw europejskich");
};

const filterPopulationByContinent = (population, countryCodes, continent) => {
  return population.filter(p => {
    const countryCode = countryCodes.find(c => c["CLDR display name"] === p["Country Name"]);
    return countryCode && countryCode["Continent"] === continent;
  });
};

const minMaxPopulationByCountry = countries => {
  const minMaxPopulation = {};

  for (const country of countries) {
    let countryName = country["Country Name"];
    let countryPopulation = minMaxPopulation[countryName];

    if (!countryPopulation) {
      minMaxPopulation[countryName] = { min: Number.MAX_VALUE, max: 0 };
      countryPopulation = minMaxPopulation[countryName];
    }

    let currentPopulation = country.Value;

    if (currentPopulation < countryPopulation.min) {
      countryPopulation.min = currentPopulation;
    }
    if (currentPopulation > countryPopulation.max) {
      countryPopulation.max = currentPopulation;
    }
  }

  return minMaxPopulation;
};

const mapToChartDataset = minMaxPopulation => {
  const datasets = [];
  Object.entries(minMaxPopulation).forEach(entry => {
    datasets.push({
      label: entry[0],
      data: [
        {
          x: entry[1].min,
          y: entry[1].max
        }
      ],
      backgroundColor: getRandomColor()
    });
  });
  return datasets;
};

export const getRandomColor = () => {
  const letters = "0123456789ABCDEF".split("");
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
