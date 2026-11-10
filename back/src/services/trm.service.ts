
interface TrmApiResponse{

    valor: string;
    unidad: string;
    vigenciadesde: string;
    vigenciahasta: string;
}

const TRM_API_URL = "https://www.datos.gov.co/resource/32sa-8pi3.json";

export const findValidTRM = (
  data: TrmApiResponse[],
  todayDate: string
) => {
  return data.find((item) => {
    const startDate = item.vigenciadesde.split("T")[0];
    const endDate = item.vigenciahasta.split("T")[0];

    return todayDate >= startDate && todayDate <= endDate;
  });
};

export const getTRM = async (): Promise<number> => {
  const response = await fetch(TRM_API_URL);

  if (!response.ok) {
    throw new Error("Error fetching TRM data");
  }

  const data: TrmApiResponse[] = await response.json();

  if (data.length === 0) {
  throw new Error("No TRM data available");
}

 const todayDate = new Date().toLocaleDateString("en-CA", {
  timeZone: "America/Bogota",
});

const validTRM = findValidTRM(data, todayDate);

if (!validTRM) {
  throw new Error("No TRM available for today");
}
const trmValue = Number(validTRM.valor);

if (!Number.isFinite(trmValue) || trmValue <= 0) {
  throw new Error("Invalid TRM value");
}

  return trmValue;
};