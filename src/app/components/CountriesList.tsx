"use client"
import Link from "next/link";
import Pagination from "./Pagination";
import { useState } from "react";
import styles from './countryList.module.css';

interface Country {
  countryCode: string;
  name: string;
}

interface CountriesListProps {
  countries: Country[];
}

const CountriesList: React.FC<CountriesListProps> = ({ countries }) => {
  const [page, setPage] = useState<number>(1);
  const maxPage = Math.ceil(countries.length / 10);
  return (
    <>
      <h1 className={styles.title}>Country list</h1>
      <ul className={styles.list}>
        {countries.slice(page * 10 - 10, page * 10).map((country) => (
          <li key={country.countryCode} className={styles.listItem}>
            <Link className={styles.link} href={`/country/info/${country.countryCode}`}>
              {country.name}
            </Link>
          </li>
        ))}
      </ul>
      <Pagination page={page} setPage={setPage} maxPage={maxPage} />
    </>
  );
};

export default CountriesList;