
"use client"

import { useState } from "react"
import { Moon, Download, Shield, Bell, MessageCircle, Info } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Navigation } from "@/components/Navigation"
import { cn } from "@/lib/utils"

export default function SettingsPage() {
  const [isDark, setIsDark] = useState(true)

  return (
    <main className="min-h-screen p-4 max-w-lg mx-auto animate-fade-in pb-24">
      <header className="mb-6 pt-4">
        <h1 className="text-2xl font-headline font-bold text-foreground">الإعدادات</h1>
        <p className="text-muted-foreground font-body">تخصيص التطبيق حسب رغبتك</p>
      </header>

      <div className="space-y-8">
        <section>
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4 font-headline">المظهر</h3>
          <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/10 rounded-lg">
                  <Moon className="w-5 h-5 text-indigo-500" />
                </div>
                <span className="font-headline font-bold">الوضع الليلي</span>
              </div>
              <Switch checked={isDark} onCheckedChange={setIsDark} />
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Bell className="w-5 h-5 text-primary" />
                </div>
                <span className="font-headline font-bold">التنبيهات</span>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4 font-headline">البيانات والتحميل</h3>
          <div className="bg-card rounded-2xl border border-border/50 p-4 space-y-4">
            <div className="flex justify-between items-center mb-1">
              <span className="font-headline font-bold text-sm">مساحة التخزين (صوتيات)</span>
              <span className="text-xs font-headline text-muted-foreground">1.2 GB / 5 GB</span>
            </div>
            <Progress value={24} className="h-2 bg-muted" />
            <Button variant="outline" className="w-full rounded-xl gap-2 font-headline border-primary/20 hover:bg-primary/5">
              <Download className="w-4 h-4" />
              إدارة التحميلات
            </Button>
          </div>
        </section>

        <section>
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4 font-headline">عن التطبيق</h3>
          <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
            {[
              { label: "سياسة الخصوصية", icon: Shield },
              { label: "تواصل معنا", icon: MessageCircle },
              { label: "عن التطبيق", icon: Info },
            ].map((item, idx) => (
              <div 
                key={idx}
                className={cn(
                  "flex items-center justify-between p-4 cursor-pointer hover:bg-accent transition-colors",
                  idx !== 2 && "border-b border-border/50"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-muted-foreground" />
                  <span className="font-headline font-bold">{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Button className="w-full bg-secondary hover:bg-secondary/90 text-primary font-headline font-bold h-12 rounded-xl shadow-lg shadow-secondary/10">
          إزالة الإعلانات (شراء النسخة الكاملة)
        </Button>
        
        <div className="text-center pb-4">
          <p className="text-[10px] text-muted-foreground font-headline">الإصدار 1.0.0 (القرآن الكريم – تلاوة وتفسير)</p>
        </div>
      </div>

      <Navigation />
    </main>
  )
}
