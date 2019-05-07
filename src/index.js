import { createPolishPopulationChart } from "./PolishPopulationChart";
import { createMultiCountriesChart } from "./MultiCountriesPopulationChart";
import { createCurrencyCharts } from "./CurrencyCharts";
import { createAmericanCitiesChart } from "./AmericanCitiesChart";
import { createWorldMap } from "./WorldMap";
import { createMinToMaxPopulationChart } from "./MinToMaxPopulationChart";

const URLS = {
  POPULATION: "https://datahub.io/core/population/datapackage.json",
  COUNTRY_CODES: "https://datahub.io/core/country-codes/datapackage.json",
  WORLD_CITIES: "https://datahub.io/core/world-cities/datapackage.json"
};

const populationPromise = fetchData(URLS.POPULATION);
const countryCodesPromise = fetchData(URLS.COUNTRY_CODES);
const worldCitiesPromise = fetchData(URLS.WORLD_CITIES);

Promise.all([populationPromise, countryCodesPromise, worldCitiesPromise]).then(values => {
  const [population, countryCodes, worldCities] = values;

  createPolishPopulationChart(population);
  createMultiCountriesChart(population);
  createCurrencyCharts(countryCodes);
  createAmericanCitiesChart(countryCodes, worldCities);
  createWorldMap(population);
  createMinToMaxPopulationChart(population, countryCodes);
});

async function fetchData(url, resourceName = extractResourceName(url)) {
  let response = await fetch(url);
  let json = await response.json();

  const resource = json.resources.find(resource => resource.name === resourceName);
  if (resource) {
    response = await fetch(resource.path);
    return await response.json();
  } else {
    return [];
  }
}

function extractResourceName(url) {
  const regex = /core\/(.+)\//;
  const match = regex.exec(url);
  return match[1] ? `${match[1]}_json` : "";
}
