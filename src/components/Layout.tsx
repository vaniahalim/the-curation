import { Link, useLocation } from "react-router-dom";
import { BookOpen, Compass, LayoutDashboard } from "lucide-react";

const navItems = [
  { path: "/", label: "Daily Intel", icon: LayoutDashboard },
  { path: "/pillars", label: "Pillars", icon: Compass },
  { path: "/library", label: "Library", icon: BookOpen },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-50 bg-background/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-gold font-mono text-xs tracking-widest uppercase">▪</span>
            <span className="font-serif text-lg text-ivory tracking-tight">
              Dangerously Educated
            </span>
          </Link>
          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm transition-colors ${
                    isActive
                      ? "text-gold bg-secondary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  <item.icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        {children}
      </main>
    </div>
  );
};

export default Layout;
