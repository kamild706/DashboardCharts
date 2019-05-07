import { showChart } from "./ChartDefinitions/BarChart";

const showCitiesChart = citiesPerCountry => {
  const element = document.getElementById("south_american_cities");
  const labels = Object.keys(citiesPerCountry);
  const dataset = {
    label: "Liczba miast",
    data: Object.values(citiesPerCountry),
    backgroundColor: "#ff985c"
  };
  const scales = {
    yAxes: [
      {
        type: "logarithmic",
        ticks: {
          min: 0,
          callback(value) {
            return Number(value.toString());
          }
        },
        afterBuildTicks(chartObj) {
          chartObj.ticks = [];
          chartObj.ticks.push(0);
          chartObj.ticks.push(1);
          chartObj.ticks.push(10);
          chartObj.ticks.push(100);
          chartObj.ticks.push(1000);
        },
        scaleLabel: {
          display: true,
          labelString: "Liczba miast"
        }
      }
    ],
    xAxes: [
      {
        scaleLabel: {
          display: true,
          labelString: "Państwa"
        }
      }
    ]
  };

  showChart(element, labels, dataset, scales, "Liczba miast w państwach Ameryki Południowej");
};

const countriesInContinent = (countries, continent) => {
  return countries.filter(country => country["Continent"] === continent).map(country => country["CLDR display name"]);
};

const countCitiesInCountries = (countries, cities) => {
  return cities.reduce((obj, city) => {
    const country = countries.find(country => country === city.country);
    if (country) obj[country] = (obj[country] || 0) + 1;
    return obj;
  }, {});
};

export const createAmericanCitiesChart = (countries, cities) => {
  const southAmericanCountries = countriesInContinent(countries, "SA");
  const citiesPerCountry = countCitiesInCountries(southAmericanCountries, cities);
  showCitiesChart(citiesPerCountry);
};
