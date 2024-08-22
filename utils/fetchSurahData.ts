"use server";
export async function fetchSurahData(id: any) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  try {
    const res = await fetch(
      `https://api.alquran.cloud/v1/surah/${id}/ar.alafasy`,
      options
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.statusText}`);
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching Surah data:", error);
    throw error;
  }
}
