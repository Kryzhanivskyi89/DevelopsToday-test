import Link from "next/link";
import CountryPopulation from "./CountryPopulation";
import Image from "next/image";

interface BorderCountry {
  countryCode: string;
  commonName: string;
}

interface PopulationData {
  year: number;
  value: number;
}

interface CountryInfoProps {
  countryInfo?: {
    name: string;
    flagUrl: string;
    borders: BorderCountry[];
    populationCounts: PopulationData[];
  };
  errorMessage?: string;
}

const CountryInfo: React.FC<CountryInfoProps> = ({
  countryInfo = { name: "", flagUrl: "", borders: [], populationCounts: [] },
  errorMessage = "",
}) => {
  return (
    <>
      {errorMessage ? (
        <div>
          <span>Country info was not found</span>
        </div>
      ) : (
        <>
          <div>
            <h1>{countryInfo.name}</h1>
            <Image
              src={countryInfo.flagUrl}
              priority
              width="150"
              height="100"
              alt="Country flag image"
            />
          </div>

          <div>
            <h2>Border countries:</h2>
            <ul>
              {countryInfo.borders.map((borderCountry) => (
                <li key={borderCountry.countryCode}>
                  <Link href={`/country/info/${borderCountry.countryCode}`}>
                    {borderCountry.commonName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Population</h3>
            <div>
              <CountryPopulation populationData={countryInfo.populationCounts} />
            </div>
          </div>
        </>
      )}
      <Link href="/">Go back</Link>
    </>
  );
};

export default CountryInfo;