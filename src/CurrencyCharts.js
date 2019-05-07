import { showChart } from "./ChartDefinitions/BarChart";

const computeCurrencyDistribution = countries => {
  return countries.reduce((obj, country) => {
    const currencyCode = country["ISO4217-currency_alphabetic_code"];
    if (currencyCode != null) {
      currencyCode.split(",").forEach(code => {
        obj[code] = (obj[code] || 0) + 1;
      });
    }
    return obj;
  }, {});
};

const createDistributionChart = currencyDistribution => {
  const labels = Object.keys(currencyDistribution);
  const dataset = {
    label: "Popularność",
    data: Object.values(currencyDistribution),
    backgroundColor: "#4d97ff"
  };
  const scales = {
    yAxes: [
      {
        scaleLabel: {
          display: true,
          labelString: "Liczba wystąpień"
        }
      }
    ],
    xAxes: [
      {
        position: "bottom",
        scaleLabel: {
          display: true,
          labelString: "Waluty"
        }
      }
    ]
  };
  const element = document.getElementById("currency_distribution");
  showChart(element, labels, dataset, scales, "Rozkład ilościowy walut na świecie");
};

const findDistinctCountryNames = countries => {
  return countries
    .filter(country => country["is_independent"] === "Yes")
    .map(country => country["CLDR display name"]);
};

const showNumberOfCountries = num => {
  const element = document.getElementById("number_of_countries");
  element.innerHTML = num;
};

const showNumberOfEurozoneCountries = num => {
  const element = document.getElementById("eurozone_countries");
  element.innerHTML = num;
};

export const createCurrencyCharts = countries => {
  const currencyDistribution = computeCurrencyDistribution(countries);
  createDistributionChart(currencyDistribution);

  const distinctNames = findDistinctCountryNames(countries);
  showNumberOfCountries(distinctNames.length);

  const eurozone = currencyDistribution["EUR"];
  showNumberOfEurozoneCountries(eurozone);
};
