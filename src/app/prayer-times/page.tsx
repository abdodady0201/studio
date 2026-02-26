
"use client"

import { useState, useEffect } from "react"
import { MapPin, Bell, BellOff, Volume2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/Navigation"
import { cn } from "@/lib/utils"

const PRAYERS = [
  { name: "الفجر", time: "05:12", icon: "🌅" },
  { name: "الشروق", time: "06:45", icon: "☀️" },
  { name: "الظهر", time: "12:15", icon: "☀️" },
  { name: "العصر", time: "15:42", icon: "🌤️" },
  { name: "المغرب", time: "18:05", icon: "🌇" },
  { name: "العشاء", time: "19:35", icon: "🌙" },
]

export default function PrayerTimesPage() {
  const [nextPrayer, setNextPrayer] = useState(PRAYERS[4]) // Default to Maghrib for UI demo
  const [notifications, setNotifications] = useState<Record<string, boolean>>({ "المغرب": true })
  const [currentTime, setCurrentTime] = useState<string | null>(null)

  // Avoid hydration error by setting the timer on mount
  useEffect(() => {
    setCurrentTime("01:42:05") // In a real app, this would be a real interval
    const interval = setInterval(() => {
      // Mock countdown logic
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen p-4 max-w-lg mx-auto animate-fade-in pb-24">
      <header className="mb-8 pt-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-headline font-bold text-foreground">مواقيت الصلاة</h1>
          <div className="flex items-center gap-1 text-muted-foreground text-sm font-headline mt-1">
            <MapPin className="w-3 h-3 text-primary" />
            <span>الرياض، المملكة العربية السعودية</span>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10">
          <Volume2 className="w-6 h-6" />
        </Button>
      </header>

      <Card className="bg-gradient-to-br from-primary to-primary/80 border-none text-primary-foreground mb-8 overflow-hidden shadow-xl shadow-primary/30 text-center py-8">
        <p className="text-secondary/90 font-headline font-bold mb-2">الصلاة القادمة</p>
        <h2 className="text-4xl font-headline font-bold mb-1">{nextPrayer.name}</h2>
        <div className="text-5xl font-headline font-bold tracking-tighter tabular-nums mb-4">
          {currentTime || "--:--:--"}
        </div>
        <p className="text-primary-foreground/60 text-sm font-body italic">الوقت المتبقي للأذان</p>
      </Card>

      <div className="space-y-3">
        {PRAYERS.map((prayer) => {
          const isNext = prayer.name === nextPrayer.name
          const isNotified = notifications[prayer.name]

          return (
            <div 
              key={prayer.name}
              className={cn(
                "flex items-center justify-between p-4 rounded-2xl border transition-all",
                isNext 
                  ? "bg-accent border-secondary/50 shadow-md scale-[1.02]" 
                  : "bg-card border-border/50"
              )}
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl">{prayer.icon}</span>
                <div>
                  <h4 className={cn("font-headline font-bold", isNext && "text-primary")}>
                    {prayer.name}
                  </h4>
                  {isNext && <span className="text-[10px] text-secondary font-bold uppercase">قادمة</span>}
                </div>
              </div>
              <div className="flex items-center gap-6">
                <span className="font-headline font-bold text-lg tabular-nums">
                  {prayer.time}
                </span>
                <button 
                  onClick={() => setNotifications({ ...notifications, [prayer.name]: !isNotified })}
                  className={cn(
                    "p-2 rounded-lg transition-colors",
                    isNotified ? "bg-secondary/10 text-secondary" : "bg-muted text-muted-foreground"
                  )}
                >
                  {isNotified ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <Navigation />
    </main>
  )
}
