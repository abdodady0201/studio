
"use client"

import { useState } from "react"
import { Sun, Moon, Sparkles, RefreshCw, Plus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/Navigation"

export default function AdhkarPage() {
  const [counter, setCounter] = useState(0)

  return (
    <main className="min-h-screen p-4 max-w-lg mx-auto animate-fade-in pb-24">
      <header className="mb-6 pt-4">
        <h1 className="text-2xl font-headline font-bold text-foreground">الأذكار والتسبيح</h1>
        <p className="text-muted-foreground font-body">بذكر الله تطمئن القلوب</p>
      </header>

      <Tabs defaultValue="adhkar" className="w-full">
        <TabsList className="w-full grid grid-cols-2 bg-card p-1 rounded-xl mb-6">
          <TabsTrigger value="adhkar" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-headline">
            الأذكار
          </TabsTrigger>
          <TabsTrigger value="tasbeeh" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-headline">
            المسبحة
          </TabsTrigger>
        </TabsList>

        <TabsContent value="adhkar" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-gradient-to-br from-orange-500/10 to-orange-500/20 border-orange-500/20 cursor-pointer hover:scale-[1.02] transition-transform">
              <CardContent className="p-6 flex flex-col items-center text-center gap-2">
                <Sun className="w-8 h-8 text-orange-500" />
                <h3 className="font-headline font-bold">أذكار الصباح</h3>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-indigo-500/10 to-indigo-500/20 border-indigo-500/20 cursor-pointer hover:scale-[1.02] transition-transform">
              <CardContent className="p-6 flex flex-col items-center text-center gap-2">
                <Moon className="w-8 h-8 text-indigo-500" />
                <h3 className="font-headline font-bold">أذكار المساء</h3>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-3">
            {[
              { title: "أذكار الاستيقاظ", icon: Sparkles },
              { title: "أذكار بعد الصلاة", icon: Plus },
              { title: "أذكار النوم", icon: Moon },
            ].map((item, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-4 p-4 bg-card rounded-2xl border border-border/50 hover:border-primary/30 transition-all cursor-pointer"
              >
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-headline font-bold">{item.title}</h4>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tasbeeh" className="flex flex-col items-center py-8">
          <div className="relative w-64 h-64 mb-12">
            <div className="absolute inset-0 bg-primary/5 rounded-full animate-pulse" />
            <div className="absolute inset-4 border-4 border-dashed border-primary/20 rounded-full" />
            <div 
              className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer active:scale-95 transition-transform"
              onClick={() => setCounter(c => c + 1)}
            >
              <span className="text-6xl font-headline font-bold text-primary tabular-nums">
                {counter}
              </span>
              <span className="text-muted-foreground font-headline mt-2">اضغط للتسبيح</span>
            </div>
          </div>

          <div className="flex gap-4">
            <Button 
              variant="outline" 
              className="rounded-full h-12 px-6 gap-2 border-primary/20"
              onClick={() => setCounter(0)}
            >
              <RefreshCw className="w-4 h-4" />
              إعادة تعيين
            </Button>
            <Button 
              className="bg-primary hover:bg-primary/90 rounded-full h-12 px-10 gap-2 shadow-lg shadow-primary/20"
              onClick={() => setCounter(c => c + 1)}
            >
              <Plus className="w-5 h-5" />
              تسبيحة
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <Navigation />
    </main>
  )
}
