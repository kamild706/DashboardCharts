export const populationSizeForCountry = (countries, region) => {
  return countries
    .filter(country => country["Country Name"] === region)
    .map(country => country.Value);
};

export const getYearsList = population => {
  const arbitraryName = population[0]["Country Name"];
  return population
    .filter(country => country["Country Name"] === arbitraryName)
    .map(country => country.Year);
};
