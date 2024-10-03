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
//   const response = await axios.get(
//     `${process.env.NEXT_PUBLIC_COUNTRY_INFO_URL}${id}`
//   );
//   countryInfo = response.data.info;  

//   return <CountryInfo countryInfo={countryInfo} errorMessage={errorMessage} />;
  
// }

import CountryInfo from "@/app/components/CountryInfo";
import axios from "axios";

interface Params {
  params: {
    id: string;
  };
}

// Функція для генерації статичних параметрів
export async function generateStaticParams() {
  // Припустимо, що у вас є список ідентифікаторів країн
  const ids = ["1", "2", "3"]; // Замініть це на ваші дані або отримайте з API

  return ids.map(id => ({
    id,
  }));
}

export default async function CountryInfoContainer({ params }: Params) {
  const { id } = params;
  let countryInfo;
  let errorMessage = ""; 

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_COUNTRY_INFO_URL}${id}`
    );
    countryInfo = response.data.info;  
  } catch (error) {
    errorMessage = "Error fetching country information.";
  }

  return <CountryInfo countryInfo={countryInfo} errorMessage={errorMessage} />;
}

// export default async function CountryInfoContainer({ params }: Params) {
//   const { id } = params;
//   let countryInfo;
//   let errorMessage = ""; 
//   try {
//     const response = await axios.get(
//       `${process.env.NEXT_PUBLIC_COUNTRY_INFO_URL}${id}`
//     );
//     countryInfo = response.data.info;
//   } catch (error: unknown) { 
//       errorMessage = error.response.data.error || "Error fetching data";
   
//   }

//   return <CountryInfo countryInfo={countryInfo} errorMessage={errorMessage} />;
  
// }