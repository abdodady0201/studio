
"use client"

import { useState } from "react"
import { Heart, BookOpen, Moon, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function FavoritesPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("surahs")

  return (
    <main className="min-h-screen p-4 max-w-lg mx-auto animate-fade-in pb-24">
      <header className="mb-6 pt-4">
        <h1 className="text-2xl font-headline font-bold text-foreground">المفضلة</h1>
        <p className="text-muted-foreground font-body">الآيات والسور التي حفظتها</p>
      </header>

      <Tabs defaultValue="surahs" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="w-full grid grid-cols-2 bg-card p-1 rounded-xl mb-6">
          <TabsTrigger value="surahs" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-headline">
            السور
          </TabsTrigger>
          <TabsTrigger value="verses" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-headline">
            الآيات
          </TabsTrigger>
        </TabsList>

        <TabsContent value="surahs" className="space-y-4">
          {/* Example Data */}
          {[
            { id: 18, name: "سورة الكهف", type: "مكية" },
            { id: 36, name: "سورة يس", type: "مكية" },
          ].map((item) => (
            <Card key={item.id} className="bg-card border-border/50 overflow-hidden hover:border-primary/30 transition-all cursor-pointer" onClick={() => router.push(`/quran/${item.id}`)}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-headline font-bold">{item.name}</h4>
                    <p className="text-xs text-muted-foreground">{item.type}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="verses" className="space-y-4">
           {/* Empty State Illustration */}
           <div className="py-20 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
              <Heart className="w-10 h-10 text-muted-foreground/30" />
            </div>
            <h3 className="font-headline font-bold text-lg text-foreground/70">لا توجد آيات مفضلة</h3>
            <p className="text-sm text-muted-foreground max-w-[200px] mt-2">قم بتمييز الآيات التي تعجبك لتظهر هنا</p>
          </div>
        </TabsContent>
      </Tabs>

      <Navigation />
    </main>
  )
}
