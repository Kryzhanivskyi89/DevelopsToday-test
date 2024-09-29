
import axios from 'axios';
import CountriesList from './components/CountriesList';
import styles from './page.module.css';

interface Country {
  countryCode: string;
  name: string;
}

export default async function Home() {
  try {
    const { data } = await axios.get<{ countries: Country[] }>(
      process.env.NEXT_PUBLIC_COUNTRIES_URL as string
    );

    return (
      <div className={styles.section}>
        <div className={styles.container}>
          <CountriesList countries={data.countries} />
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error fetching countries:', error);
    return <CountriesList countries={[]} />;
  }
}
