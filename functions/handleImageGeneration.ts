import { createCanvas } from "canvas";
import { getChapter } from "@/context/surahContext";

export async function generateImage(id: string): Promise<Buffer> {
  try {
    const data = await getChapter(id);
    const englishName = data.name_simple || "";

    // إعداد الكanvas
    const canvas = createCanvas(1200, 600);
    const ctx = canvas.getContext("2d");

    // إعداد الخلفية
    const gradient = ctx.createLinearGradient(0, 0, 1200, 600);
    gradient.addColorStop(0, "rgb(255, 228, 230)");
    gradient.addColorStop(1, "rgb(204, 251, 241)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1200, 600);

    // إعداد النص
    ctx.fillStyle = "#000";
    ctx.font = "40px Arial";
    ctx.textAlign = "center";
    ctx.fillText(`Surah ${englishName}`, 600, 300);

    // إعداد النص الإضافي
    ctx.font = "30px Arial";
    ctx.fillStyle = "#252525";
    ctx.fillText(
      `Discover Surah ${data?.name_simple}, the ${
        data?.id
      }th chapter of the Quran, revealed in ${
        data?.revelation_place === "makkah" ? "Makkah" : "Madinah"
      }. Listen to the beautiful recitation of Surah ${
        data?.name_simple
      } and explore its profound meanings and messages.`,
      600,
      350,
      1100
    );

    // إرجاع الصورة كـ Buffer
    return canvas.toBuffer("image/png");
  } catch (error) {
    console.error("Error generating image:", error);
    throw new Error("Error generating image");
  }
}
