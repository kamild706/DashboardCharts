import L from "leaflet";
import { withSeparator } from "./ChartDefinitions/LineChart";
import { MAPBOX_ACCESS_TOKEN } from "./config";

async function getGeojson() {
  const { default: geojson } = await import(/* webpackChunkName: "geojson" */ "./geojson/countries.geojson");
  return geojson;
}

const populationInYear = (population, year) => {
  return population.filter(country => country.Year === year);
};

export const createWorldMap = async population => {
  const population2016 = populationInYear(population, 2016);
  const mymap = L.map("worldmap").setView([50, 23], 5);

  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: `Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors,
                    <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>`,
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: MAPBOX_ACCESS_TOKEN
  }).addTo(mymap);

  const geojson = await getGeojson();
  L.geoJSON(geojson.features)
    .bindTooltip(
      layer => {
        const { ISO_A3: countryCode, ADMIN: countryName } = layer.feature.properties;
        const country = population2016.find(country => country["Country Code"] === countryCode);
        if (country) {
          const population = withSeparator(country.Value);
          return `${countryName}<br>Populacja w roku 2016:<br>${population}`;
        }
      },
      {
        sticky: true
      }
    )
    .addTo(mymap);
};
