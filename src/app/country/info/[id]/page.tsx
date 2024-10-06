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

// Визначення інтерфейсу для країни
interface Country {
  countryCode: string; // Код країни (можливо, ISO-код)
  name: string;        // Назва країни
  // Додайте інші властивості, якщо потрібно
}

interface Params {
  params: {
    id: string;
  };
}

// Функція для генерації статичних параметрів
export async function generateStaticParams() {
  let countries: Country[] = []; // Додаємо тип для масиву країн
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_COUNTRIES_URL}`);
    countries = response.data.countries || []; // Припустимо, дані повертаються у форматі { countries: [...] }
  } catch (error) {
    console.error("Error fetching countries:", error);
  }

  return countries.map((country: Country) => ({ // Вказуємо тип для параметра country
    id: country.countryCode, // або використовуйте country.id в залежності від формату
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