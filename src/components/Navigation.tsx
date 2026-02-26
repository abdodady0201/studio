
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Book, Moon, Clock, Search, Settings, Heart } from "lucide-react"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { name: "المصحف", href: "/quran", icon: Book },
  { name: "الأذكار", href: "/adhkar", icon: Moon },
  { name: "المواقيت", href: "/prayer-times", icon: Clock },
  { name: "المفضلة", href: "/favorites", icon: Heart },
  { name: "الإعدادات", href: "/settings", icon: Settings },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border/50 backdrop-blur-lg flex justify-around items-center px-2 py-3">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname.startsWith(item.href) || (item.href === "/quran" && pathname === "/")
        const Icon = item.icon
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 transition-all duration-300",
              isActive ? "text-secondary scale-110" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className={cn("w-6 h-6", isActive && "fill-secondary/20")} />
            <span className="text-[10px] font-headline">{item.name}</span>
          </Link>
        )
      })}
    </nav>
  )
}
