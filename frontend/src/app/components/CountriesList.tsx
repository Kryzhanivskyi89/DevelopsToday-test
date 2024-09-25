"use client"
import Link from "next/link";
import Pagination from "./Pagination";
import { useState } from "react";

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
      <h1>Country list</h1>
      <ul>
        {countries.slice(page * 10 - 10, page * 10).map((country) => (
          <li key={country.countryCode}>
            <Link href={`/country/info/${country.countryCode}`}>
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