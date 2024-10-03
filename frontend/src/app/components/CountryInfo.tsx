"use client";
import Link from "next/link";
import dynamic from 'next/dynamic';
import Image from "next/image";
import styles from './countryInfo.module.css';


const CountryPopulation = dynamic(() => import('./CountryPopulation'), {
  ssr: false,
});

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
        <div >
          <span>Country info was not found</span>
        </div>
      ) : (
        <>
          <div className={styles.countryInfo}>
            <h1 className={styles.countryName}>
              {countryInfo.name}
            </h1>
            {countryInfo.flagUrl ? (
              <Image
                src={countryInfo.flagUrl}
                priority
                className={styles.countryImage}
                width="150"
                height="100"
                alt={`${countryInfo.name} flag`}
              />
            ) : (
              <p>Flag not available</p>
            )}
          </div>

          {countryInfo.borders.length > 0 ? (
            <nav className={styles.countryBorder}>
              <h2 className={styles.countryBorderTitle}>Border countries:</h2>
              <ul className={styles.countryBorderList}>
                {countryInfo.borders.map((borderCountry) => (
                  <li key={borderCountry.countryCode} className={styles.countryBorderItem}>
                    <Link
                      href={`/country/info/${borderCountry.countryCode}`}
                      className={styles.countryBorderLink}>
                      {borderCountry.commonName}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : (<p>No border countries available</p>)}

          <div className={styles.population}>
            <h3 className={styles.populationTitle}>Population</h3>
            <div className={styles.populationChart}>
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