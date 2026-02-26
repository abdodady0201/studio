
"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowRight, Settings, Bookmark, Share2, Play, Info, Sparkles, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"
import { SURAHS } from "@/lib/quran-data"
import { cn } from "@/lib/utils"
import { useFirestore, useUser } from "@/firebase"
import { doc, setDoc, deleteDoc, collection, query, where, getDocs } from "firebase/firestore"
import { toast } from "@/hooks/use-toast"

interface ApiVerse {
  number: number;
  text: string;
  numberInSurah: number;
}

export default function SurahReader() {
  const router = useRouter()
  const params = useParams()
  const { user } = useUser()
  const db = useFirestore()
  const surahId = Number(params.surahId)
  
  const [fontSize, setFontSize] = useState(24)
  const [verses, setVerses] = useState<ApiVerse[]>([])
  const [loading, setLoading] = useState(true)
  const [favorites, setFavorites] = useState<number[]>([])
  const [isPlaying, setIsPlaying] = useState(false)

  const surah = SURAHS.find(s => s.id === surahId)

  useEffect(() => {
    async function fetchSurah() {
      try {
        setLoading(true)
        const res = await fetch(`https://api.alquran.cloud/v1/surah/${surahId}`)
        const data = await res.json()
        setVerses(data.data.verses)
      } catch (error) {
        toast({ variant: "destructive", title: "خطأ", description: "فشل في تحميل السورة" })
      } finally {
        setLoading(false)
      }
    }
    fetchSurah()
  }, [surahId])

  useEffect(() => {
    if (!user) return
    async function fetchFavorites() {
      const q = query(collection(db, `users/${user?.uid}/favorites`), where("surahId", "==", surahId))
      const querySnapshot = await getDocs(q)
      setFavorites(querySnapshot.docs.map(doc => doc.data().verseNumber))
    }
    fetchFavorites()
  }, [user, surahId, db])

  const toggleFavorite = async (verseNumber: number) => {
    if (!user) {
      toast({ title: "تنبيه", description: "يجب تسجيل الدخول لحفظ المفضلات" })
      return
    }

    const favRef = doc(db, `users/${user.uid}/favorites`, `${surahId}_${verseNumber}`)
    
    if (favorites.includes(verseNumber)) {
      await deleteDoc(favRef)
      setFavorites(f => f.filter(v => v !== verseNumber))
      toast({ title: "تم المسح", description: "تمت إزالة الآية من المفضلة" })
    } else {
      await setDoc(favRef, {
        surahId,
        verseNumber,
        surahName: surah?.name,
        createdAt: new Date().toISOString(),
        type: "verse"
      })
      setFavorites(f => [...f, verseNumber])
      toast({ title: "تم الحفظ", description: "تمت إضافة الآية للمفضلة" })
    }
  }

  if (!surah) return <div className="p-10 text-center font-headline">السورة غير موجودة</div>

  return (
    <main className="min-h-screen bg-background text-foreground animate-fade-in pb-24">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/50 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowRight className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="font-headline font-bold text-xl">{surah.name}</h1>
            <p className="text-[10px] text-muted-foreground">{surah.versesCount} آية • {surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="font-headline">
              <DialogHeader>
                <DialogTitle>إعدادات القراءة</DialogTitle>
              </DialogHeader>
              <div className="py-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>حجم الخط</span>
                    <span className="text-secondary">{fontSize}px</span>
                  </div>
                  <Slider 
                    value={[fontSize]} 
                    min={18} 
                    max={48} 
                    step={1} 
                    onValueChange={(val) => setFontSize(val[0])}
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button 
            variant={isPlaying ? "secondary" : "ghost"} 
            size="icon" 
            className="rounded-full"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            <Play className={cn("w-5 h-5", isPlaying && "fill-primary")} />
          </Button>
        </div>
      </header>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-40 gap-4">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <p className="font-headline text-muted-foreground">جاري تحميل كلام الله...</p>
        </div>
      ) : (
        <>
          {surahId !== 9 && surahId !== 1 && (
            <div className="py-8 text-center quran-text text-3xl opacity-90 border-b border-border/10 mb-8">
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
            </div>
          )}

          <div className="max-w-3xl mx-auto px-6 space-y-12 py-4">
            {verses.map((verse) => (
              <div key={verse.number} className="relative group">
                <div 
                  className="quran-text transition-all duration-300 select-none leading-[3.5] text-right" 
                  style={{ fontSize: `${fontSize}px` }}
                >
                  {verse.text}
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-secondary/30 mx-3 text-xs font-headline text-secondary align-middle">
                    {verse.numberInSurah}
                  </span>
                </div>
                
                <div className="mt-4 flex items-center justify-start gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 gap-2 text-xs font-headline text-muted-foreground hover:text-secondary"
                  >
                    <Sparkles className="w-4 h-4" />
                    شرح الآية
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={cn("h-8 w-8 transition-colors", favorites.includes(verse.numberInSurah) ? "text-secondary fill-secondary" : "text-muted-foreground hover:text-secondary")}
                    onClick={() => toggleFavorite(verse.numberInSurah)}
                  >
                    <Bookmark className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-secondary">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  )
}
