
export interface Surah {
  id: number;
  name: string;
  englishName: string;
  versesCount: number;
  revelationType: 'Meccan' | 'Medinan';
  page: number;
}

// قائمة السور الأساسية (يمكن التوسع لتشمل الـ 114 كاملة، هنا عينة شاملة للأكثر قراءة)
export const SURAHS: Surah[] = [
  { id: 1, name: "الفاتحة", englishName: "Al-Fatiha", versesCount: 7, revelationType: 'Meccan', page: 1 },
  { id: 2, name: "البقرة", englishName: "Al-Baqarah", versesCount: 286, revelationType: 'Medinan', page: 2 },
  { id: 3, name: "آل عمران", englishName: "Aal-E-Imran", versesCount: 200, revelationType: 'Medinan', page: 50 },
  { id: 4, name: "النساء", englishName: "An-Nisa", versesCount: 176, revelationType: 'Medinan', page: 77 },
  { id: 5, name: "المائدة", englishName: "Al-Ma'idah", versesCount: 120, revelationType: 'Medinan', page: 106 },
  { id: 6, name: "الأنعام", englishName: "Al-An'am", versesCount: 165, revelationType: 'Meccan', page: 128 },
  { id: 7, name: "الأعراف", englishName: "Al-A'raf", versesCount: 206, revelationType: 'Meccan', page: 151 },
  { id: 18, name: "الكهف", englishName: "Al-Kahf", versesCount: 110, revelationType: 'Meccan', page: 293 },
  { id: 19, name: "مريم", englishName: "Maryam", versesCount: 98, revelationType: 'Meccan', page: 305 },
  { id: 20, name: "طه", englishName: "Ta-Ha", versesCount: 135, revelationType: 'Meccan', page: 312 },
  { id: 36, name: "يس", englishName: "Ya-Seen", versesCount: 83, revelationType: 'Meccan', page: 440 },
  { id: 55, name: "الرحمن", englishName: "Ar-Rahman", versesCount: 78, revelationType: 'Medinan', page: 531 },
  { id: 56, name: "الواقعة", englishName: "Al-Waqi'a", versesCount: 96, revelationType: 'Meccan', page: 534 },
  { id: 67, name: "الملك", englishName: "Al-Mulk", versesCount: 30, revelationType: 'Meccan', page: 562 },
  { id: 112, name: "الإخلاص", englishName: "Al-Ikhlas", versesCount: 4, revelationType: 'Meccan', page: 604 },
  { id: 113, name: "الفلق", englishName: "Al-Falaq", versesCount: 5, revelationType: 'Meccan', page: 604 },
  { id: 114, name: "الناس", englishName: "An-Nas", versesCount: 6, revelationType: 'Meccan', page: 604 },
];

export interface Verse {
  id: number;
  number: number;
  text: string;
  translation?: string;
}
