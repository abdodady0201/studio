
"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Filter, BookOpen, Layers } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/Navigation"
import { SURAHS } from "@/lib/quran-data"

export default function QuranIndex() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredSurahs = SURAHS.filter(s => 
    s.name.includes(searchQuery) || 
    s.englishName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <main className="min-h-screen p-4 max-w-lg mx-auto animate-fade-in">
      <header className="mb-6 pt-4 flex items-center justify-between">
        <h1 className="text-2xl font-headline font-bold text-foreground">الفهرس</h1>
        <div className="p-2 bg-muted rounded-full">
          <Filter className="w-5 h-5 text-muted-foreground" />
        </div>
      </header>

      <div className="relative mb-6">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input 
          className="pr-10 bg-card border-border/50 font-headline" 
          placeholder="ابحث عن سورة أو آية..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="surahs" className="w-full">
        <TabsList className="w-full grid grid-cols-2 bg-card p-1 rounded-xl mb-6">
          <TabsTrigger value="surahs" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-headline">
            السور
          </TabsTrigger>
          <TabsTrigger value="juz" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-headline">
            الأجزاء
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="surahs" className="space-y-3">
          {filteredSurahs.map((surah) => (
            <Link 
              key={surah.id} 
              href={`/quran/${surah.id}`}
              className="flex items-center justify-between p-4 bg-card rounded-2xl border border-border/50 hover:border-primary/30 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-primary/10 rotate-45 rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300" />
                  <span className="relative z-10 font-headline font-bold text-sm">
                    {surah.id}
                  </span>
                </div>
                <div>
                  <h4 className="font-headline font-bold text-lg">{surah.name}</h4>
                  <p className="text-xs text-muted-foreground uppercase tracking-tight">
                    {surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'} • {surah.versesCount} آية
                  </p>
                </div>
              </div>
              <div className="text-left font-headline text-secondary text-sm">
                صـ {surah.page}
              </div>
            </Link>
          ))}
        </TabsContent>

        <TabsContent value="juz" className="space-y-3">
          {Array.from({ length: 30 }).map((_, i) => (
            <div 
              key={i} 
              className="flex items-center justify-between p-4 bg-card rounded-2xl border border-border/50 hover:bg-accent transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center font-headline font-bold">
                  {i + 1}
                </div>
                <h4 className="font-headline font-bold">الجزء {i + 1}</h4>
              </div>
              <Layers className="w-4 h-4 text-muted-foreground" />
            </div>
          ))}
        </TabsContent>
      </Tabs>

      <Navigation />
    </main>
  )
}
