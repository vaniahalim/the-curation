import { Link, useLocation } from "react-router-dom";
import { BookOpen, Compass, LayoutDashboard, Cpu } from "lucide-react";
import FontSizeControl from "./FontSizeControl";

const navItems = [
  { path: "/", label: "Home", icon: LayoutDashboard },
  { path: "/today", label: "Today", icon: Compass },
  { path: "/pillars", label: "Pillars", icon: Compass },
  { path: "/ai-updates", label: "AI Updates", icon: Cpu },
  { path: "/library", label: "Library", icon: BookOpen },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="text-champagne font-mono text-[10px] tracking-[0.3em] uppercase">▪</span>
            <span className="font-serif text-lg text-ivory tracking-tight">
              The Curation
            </span>
          </Link>
          <nav className="flex items-center gap-0.5">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs tracking-wide transition-colors ${
                    isActive
                      ? "text-champagne bg-secondary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  <item.icon className="w-3 h-3" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
            <div className="ml-2 border-l border-border pl-2">
              <FontSizeControl />
            </div>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {children}
      </main>
    </div>
  );
};

export default Layout;
