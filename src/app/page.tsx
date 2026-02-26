
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { BookOpen, Star, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/Navigation"

export default function Home() {
  const [isSplash, setIsSplash] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => setIsSplash(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (isSplash) {
    return (
      <div className="fixed inset-0 z-[100] bg-primary flex flex-col items-center justify-center animate-fade-in">
        <div className="relative w-48 h-48 mb-8">
          <Image 
            src="https://picsum.photos/seed/quran1/400/400" 
            alt="Splash" 
            fill 
            className="object-cover rounded-full border-4 border-secondary opacity-80"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen className="w-20 h-20 text-secondary" />
          </div>
        </div>
        <h1 className="text-3xl font-headline text-primary-foreground font-bold mb-2">القرآن الكريم</h1>
        <p className="text-secondary text-xl font-body italic">"اقرأ وارتقِ"</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen p-4 max-w-lg mx-auto animate-slide-up">
      <header className="flex justify-between items-center mb-8 pt-4">
        <div>
          <h2 className="text-2xl font-headline font-bold text-foreground">السلام عليكم</h2>
          <p className="text-muted-foreground font-body">جاهز لتلاوة اليوم؟</p>
        </div>
        <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center shadow-lg shadow-secondary/20">
          <BookOpen className="text-primary w-6 h-6" />
        </div>
      </header>

      <Card className="bg-gradient-to-br from-primary to-primary/80 border-none text-primary-foreground mb-8 overflow-hidden relative shadow-xl shadow-primary/30">
        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full -translate-y-16 translate-x-16" />
        <CardContent className="p-6 relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-4 h-4 text-secondary fill-secondary" />
            <span className="text-xs uppercase tracking-wider font-headline font-bold">آخر قراءة</span>
          </div>
          <h3 className="text-2xl font-headline font-bold mb-1">سورة الكهف</h3>
          <p className="text-primary-foreground/80 font-body mb-6">الآية رقم 15 • الجزء 15</p>
          <Button 
            className="bg-secondary hover:bg-secondary/90 text-primary font-headline font-bold rounded-full group px-6"
            onClick={() => router.push('/quran/18')}
          >
            متابعة القراءة
            <ArrowRight className="mr-2 w-4 h-4 transition-transform group-hover:translate-x-[-4px]" />
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <Card className="bg-card hover:bg-accent transition-colors cursor-pointer border-border/50" onClick={() => router.push('/quran')}>
          <CardContent className="p-4 flex flex-col items-center text-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <BookOpen className="text-primary w-5 h-5" />
            </div>
            <span className="font-headline font-bold">السور والأجزاء</span>
          </CardContent>
        </Card>
        <Card className="bg-card hover:bg-accent transition-colors cursor-pointer border-border/50" onClick={() => router.push('/prayer-times')}>
          <CardContent className="p-4 flex flex-col items-center text-center gap-3">
            <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
              <Clock className="text-secondary w-5 h-5" />
            </div>
            <span className="font-headline font-bold">مواقيت الصلاة</span>
          </CardContent>
        </Card>
      </div>

      <h3 className="text-xl font-headline font-bold mb-4 px-1">توصيات اليوم</h3>
      <div className="space-y-4">
        {[
          { id: 36, name: "سورة يس", desc: "قلب القرآن", time: "12 دقيقة" },
          { id: 67, name: "سورة الملك", desc: "المانعة من عذاب القبر", time: "5 دقائق" },
          { id: 18, name: "سورة الكهف", desc: "نور ما بين الجمعتين", time: "25 دقيقة" },
        ].map((item) => (
          <div 
            key={item.id}
            onClick={() => router.push(`/quran/${item.id}`)}
            className="flex items-center justify-between p-4 bg-card rounded-2xl border border-border/50 hover:border-primary/30 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center font-headline font-bold text-lg group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                {item.id}
              </div>
              <div>
                <h4 className="font-headline font-bold">{item.name}</h4>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
            <div className="text-left">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {item.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      <Navigation />
    </main>
  )
}
