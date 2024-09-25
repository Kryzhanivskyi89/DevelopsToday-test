import axios from "axios";

async function getAvailableCountries(req, res, next) {
  try {
    res.setHeader("Content-Type", "application/json");

    const response = await axios.get(
      "https://date.nager.at/api/v3/AvailableCountries"
    );

    if (!response.data)
      return res.status(200).json({ payload: "Countries is empty" });

    return res.status(200).json({ countries: response.data });
  } catch (error) {
    next(error.message);
  }
}

async function getCountryDetails(req, res, next) {
  try {
    res.setHeader("Content-Type", "application/json");

    const cityDetailsResponse = await axios.get(
      `https://date.nager.at/api/v3/CountryInfo/${req.params.countryId}`
    );
    const cityPopulationResponse = await axios.post(
      `https://countriesnow.space/api/v0.1/countries/population`,
      { country: cityDetailsResponse.data.commonName.toLowerCase() },
      { method: "POST" }
    );
    const cityFlagResponse = await axios.post(
      `https://countriesnow.space/api/v0.1/countries/flag/images`,
      { iso2: req.params.countryId },
      { method: "POST" }
    );

    if (
      !cityDetailsResponse.data ||
      !cityPopulationResponse.data ||
      !cityFlagResponse.data
    )
      return res.status(200).json({ payload: "Country has no details" });

    const newCountryDataObject = {
      name: cityDetailsResponse.data.commonName,
      borders: cityDetailsResponse.data.borders,
      populationCounts: cityPopulationResponse.data.data.populationCounts,
      flagUrl: cityFlagResponse.data.data.flag,
    };

    return res.status(200).json({ info: newCountryDataObject });
  } catch (error) {
    next(error.message);
  }
}

function notFound(req, res) {
  res.setHeader("Content-Type", "application/json");
  return res.status(404).send("Bad request, 404 not found");
}

export default {
  getAvailableCountries,
  getCountryDetails,
  notFound,
};
