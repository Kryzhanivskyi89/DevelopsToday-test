import CountryInfo from "@/app/components/CountryInfo";
import axios from "axios";

interface Params {
  params: {
    id: string;
  };
}

export default async function CountryInfoContainer({ params }: Params) {
  const { id } = params;
  let countryInfo;
  let errorMessage;
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_COUNTRY_INFO_URL}${id}`
    );
    countryInfo = response.data.info;
  } catch (error: any) {
    errorMessage = error.response?.data.error || "Error fetching data";
  }

  return <CountryInfo countryInfo={countryInfo} errorMessage={errorMessage} />;
}