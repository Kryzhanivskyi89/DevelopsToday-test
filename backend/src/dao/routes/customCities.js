import { MyRouter } from "./Schema/router.js";
import countriesController from "../../controllers/countriesController.js";

class CustomCountriesRouter extends MyRouter {
  init() {
    this.get(
      "/getAvailableCountries",
      ["PUBLIC"],
      countriesController.getAvailableCountries
    );

    this.get(
      "/getCountryInfo/:countryId",
      ["PUBLIC"],
      countriesController.getCountryDetails
    );

    this.get("*", ["PUBLIC"], countriesController.notFound);
  }
}

export default CustomCountriesRouter;
