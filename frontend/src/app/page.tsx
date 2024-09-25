
import axios from "axios";
import CountriesList from "./components/CountriesList";
// import styles from "./page.module.css";

interface Country {
  countryCode: string;
  name: string;
}

export default async function Home() {
  const { data } = await axios.get<{ countries: Country[] }>(
    process.env.NEXT_PUBLIC_COUNTRIES_URL as string
  );

  return <CountriesList countries={data.countries} />;
}
