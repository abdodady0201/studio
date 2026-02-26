
"use client"

import { useState, useMemo } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowRight, Settings, Bookmark, Share2, Play, Info, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SURAHS, MOCK_VERSES } from "@/lib/quran-data"
import { cn } from "@/lib/utils"

export default function SurahReader() {
  const router = useRouter()
  const params = useParams()
  const surahId = Number(params.surahId)
  
  const [fontSize, setFontSize] = useState(24)
  const [showTafsir, setShowTafsir] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const surah = SURAHS.find(s => s.id === surahId)
  const verses = MOCK_VERSES[surahId] || [
    { id: 99, surahId, number: 1, text: "نموذج لنص قرآني لهذه السورة (تحميل البيانات...)", tafsir: "سيتم تحميل التفسير قريباً" }
  ]

  if (!surah) return <div>السورة غير موجودة</div>

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

      {/* Bismillah */}
      {surahId !== 9 && surahId !== 1 && (
        <div className="py-8 text-center quran-text text-3xl opacity-90 border-b border-border/10 mb-8">
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </div>
      )}

      <div className="max-w-3xl mx-auto px-6 space-y-12 py-4">
        {verses.map((verse) => (
          <div key={verse.id} className="relative group">
            <div 
              className="quran-text transition-all duration-300 select-none leading-[3.5] text-right" 
              style={{ fontSize: `${fontSize}px` }}
            >
              {verse.text}
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-secondary/30 mx-3 text-xs font-headline text-secondary align-middle">
                {verse.number}
              </span>
            </div>
            
            <div className="mt-4 flex items-center justify-start gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 gap-2 text-xs font-headline text-muted-foreground hover:text-secondary"
                onClick={() => setShowTafsir(showTafsir === verse.id ? null : verse.id)}
              >
                <Info className="w-4 h-4" />
                التفسير
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-secondary">
                <Bookmark className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-secondary">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>

            {showTafsir === verse.id && (
              <div className="mt-4 p-4 bg-accent/50 rounded-xl border border-secondary/20 animate-slide-up text-sm font-body leading-relaxed">
                <p className="text-secondary font-headline font-bold mb-2">تفسير السعدي:</p>
                {verse.tafsir}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Reader Controls (Floating) */}
      {isPlaying && (
        <div className="fixed bottom-24 left-4 right-4 z-50 bg-primary/95 backdrop-blur-lg border border-secondary/30 p-4 rounded-2xl flex items-center justify-between shadow-2xl animate-slide-up text-primary-foreground">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
              <Play className="fill-primary text-primary w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-secondary/80 font-headline">جارٍ الاستماع</p>
              <p className="text-sm font-headline font-bold">الشيخ ماهر المعيقلي</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsPlaying(false)} className="text-secondary hover:text-secondary hover:bg-secondary/10">
            <Info className="w-6 h-6" />
          </Button>
        </div>
      )}
    </main>
  )
}
