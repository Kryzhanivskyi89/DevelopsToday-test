// Dynamic pages
// import CountryInfo from "@/app/components/CountryInfo";
// import axios from "axios";

// interface Params {
//   params: {
//     id: string;
//   };
// }

// export default async function CountryInfoContainer({ params }: Params) {
//   const { id } = params;
//   let countryInfo;
//   let errorMessage = ""; 
//   try {
//     const response = await axios.get(
//       `${process.env.NEXT_PUBLIC_COUNTRY_INFO_URL}${id}`
//     );
//     countryInfo = response.data.info;  
//   } catch (error) {
//     errorMessage = "Could not fetch country information.";
//   }

//   return <CountryInfo countryInfo={countryInfo} errorMessage={errorMessage} />;
// }

// Static pages
import CountryInfo from "@/app/components/CountryInfo";
import axios from "axios";

interface Country {
  countryCode: string; 
  name: string;      
}

interface Params {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  let countries: Country[] = []; 
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_COUNTRIES_URL}`);
    countries = response.data.countries || [];
  } catch (error) {
    console.error("Error fetching countries:", error);
  }

  return countries.map((country: Country) => ({ 
    id: country.countryCode, 
  }));
}

export default async function CountryInfoContainer({ params }: Params) {
  const { id } = params;
  let countryInfo = null;
  let errorMessage = ""; 

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_COUNTRY_INFO_URL}${id}`
    );

    if (response.status === 200) {
      countryInfo = response.data.info;  
    } else {
      errorMessage = "Не вдалося отримати інформацію про країну.";
    }
  } catch (error) {
    console.error("Error fetching country info:", error);
    errorMessage = "Сталася помилка при отриманні інформації про країну.";
  }

  return (
    <CountryInfo countryInfo={countryInfo} errorMessage={errorMessage} />
  );
}