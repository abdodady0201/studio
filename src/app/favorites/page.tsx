
"use client"

import { useState } from "react"
import { Heart, BookOpen, Trash2, Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useFirestore, useUser, useCollection } from "@/firebase"
import { collection, query, deleteDoc, doc } from "firebase/firestore"
import { toast } from "@/hooks/use-toast"

export default function FavoritesPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useUser()
  const db = useFirestore()
  
  const favoritesQuery = user ? query(collection(db, `users/${user.uid}/favorites`)) : null
  const { data: favorites, loading: dataLoading } = useCollection(favoritesQuery)

  const removeFavorite = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    try {
      await deleteDoc(doc(db, `users/${user?.uid}/favorites`, id))
      toast({ title: "نجاح", description: "تم حذف المفضل" })
    } catch (error) {
      toast({ variant: "destructive", title: "خطأ", description: "فشل في الحذف" })
    }
  }

  return (
    <main className="min-h-screen p-4 max-w-lg mx-auto animate-fade-in pb-24">
      <header className="mb-6 pt-4">
        <h1 className="text-2xl font-headline font-bold text-foreground">المفضلة</h1>
        <p className="text-muted-foreground font-body">الآيات والسور التي حفظتها</p>
      </header>

      {authLoading || dataLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : !user ? (
        <div className="py-20 text-center">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-10 h-10 text-muted-foreground/30" />
          </div>
          <h3 className="font-headline font-bold text-lg">سجل دخولك أولاً</h3>
          <p className="text-sm text-muted-foreground mt-2">لحفظ المفضلات والوصول إليها من أي مكان</p>
        </div>
      ) : favorites?.length === 0 ? (
        <div className="py-20 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
            <Heart className="w-10 h-10 text-muted-foreground/30" />
          </div>
          <h3 className="font-headline font-bold text-lg text-foreground/70">لا توجد مفضلات</h3>
          <p className="text-sm text-muted-foreground max-w-[200px] mt-2">قم بتمييز الآيات التي تعجبك لتظهر هنا</p>
        </div>
      ) : (
        <div className="space-y-4">
          {favorites?.map((item: any) => (
            <Card 
              key={`${item.surahId}_${item.verseNumber}`} 
              className="bg-card border-border/50 overflow-hidden hover:border-primary/30 transition-all cursor-pointer" 
              onClick={() => router.push(`/quran/${item.surahId}`)}
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-headline font-bold">{item.surahName}</h4>
                    <p className="text-xs text-muted-foreground">الآية رقم {item.verseNumber}</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-destructive hover:bg-destructive/10"
                  onClick={(e) => removeFavorite(e, `${item.surahId}_${item.verseNumber}`)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Navigation />
    </main>
  )
}
