"use server";

import { api } from "@/utils/axios";

const surahData = async (surahNumber: string) => {
  try {
    const { data } = await api.get(
      `/quran/verses/imlaei?chapter_number=${surahNumber}`
    );
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const surahDataTranslation = async (surahID: string) => {
  try {
    const { data } = await api.get(
      `/quran/translations/131?fields=id,chapter_id,verse_number,verse_key,verse_index&chapter_number=${surahID}`
    );
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getRandomAyah = async () => {
  try {
    const { data } = await api.get(
      `/verses/random?language=en&fields=id,chapter_id,verse_number,verse_key,verse_index,text_uthmani,text_indopak,text_uthmani_simple,juz_number,hizb_number,rub_number,audio&translations=131`
    );
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getSurahInfo = async (surahID: string) => {
  try {
    const { data } = await api.get(`/chapters/${surahID}/info`);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getChapter = async (chapterNumber: string) => {
  try {
    const { data } = await api.get(`/chapters/${chapterNumber}`);
    return data.chapter;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getTafsir = async (verse_key: string) => {
  try {
    const { data } = await api.get(
      `https://api.quran.com/api/v4/quran/tafsirs/93?verse_key=${verse_key}`
    );
    return data.tafsirs;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export {
  surahData,
  getRandomAyah,
  getSurahInfo,
  getChapter,
  surahDataTranslation,
  getTafsir,
};
