
import axios from 'axios';
import CountriesList from './components/CountriesList';

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
      <main className='section'>
        <div className='container'>
          <CountriesList countries={data.countries} />
        </div>
      </main>
    )
  } catch (error) {
    console.error('Error fetching countries:', error);
    return <CountriesList countries={[]} />;
  }
}
