
export interface Surah {
  id: number;
  name: string;
  englishName: string;
  versesCount: number;
  revelationType: 'Meccan' | 'Medinan';
  page: number;
}

export const SURAHS: Surah[] = [
  { id: 1, name: "الفاتحة", englishName: "Al-Fatiha", versesCount: 7, revelationType: 'Meccan', page: 1 },
  { id: 2, name: "البقرة", englishName: "Al-Baqarah", versesCount: 286, revelationType: 'Medinan', page: 2 },
  { id: 3, name: "آل عمران", englishName: "Aal-E-Imran", versesCount: 200, revelationType: 'Medinan', page: 50 },
  { id: 4, name: "النساء", englishName: "An-Nisa", versesCount: 176, revelationType: 'Medinan', page: 77 },
  { id: 18, name: "الكهف", englishName: "Al-Kahf", versesCount: 110, revelationType: 'Meccan', page: 293 },
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
  surahId: number;
  number: number;
  text: string;
  tafsir: string;
}

export const MOCK_VERSES: Record<number, Verse[]> = {
  1: [
    { id: 1, surahId: 1, number: 1, text: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ", tafsir: "أي أبتدئ بكل اسم لله تعالى، لأن لفظ (اسم) مفرد مضاف، فيشمل جميع الأسماء الحسنى." },
    { id: 2, surahId: 1, number: 2, text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", tafsir: "هو الثناء على الله بصفات الكمال، وبأفعاله الدائرة بين الفضل والعدل، فله الحمد الكامل بجميع الوجوه." },
    { id: 3, surahId: 1, number: 3, text: "الرَّحْمَنِ الرَّحِيمِ", tafsir: "اسمان دالان على أنه تعالى ذو الرحمة الواسعة العظيمة التي وسعت كل شيء." },
    { id: 4, surahId: 1, number: 4, text: "مَالِكِ يَوْمِ الدِّينِ", tafsir: "المالك هو من اتصف بصفة الملك التي من آثارها أنه يأمر وينهى، ويثيب ويعاقب." },
    { id: 5, surahId: 1, number: 5, text: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", tafsir: "أي: نخصك وحدك بالعبادة والاستعانة." },
    { id: 6, surahId: 1, number: 6, text: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", tafsir: "أي: دلنا وأرشدنا، ووفقنا للصراط المستقيم، وهو الطريق الواضح الموصل إلى الله وإلى جنته." },
    { id: 7, surahId: 1, number: 7, text: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", tafsir: "صراط الذين أنعمت عليهم من النبيين والصديقين والشهداء والصالحين." },
  ]
};
