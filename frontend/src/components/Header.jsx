import { Link } from "react-router-dom";
import { Shield, Menu, X, Home, Search, UserCog } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="institution-header sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo Section */}
          <Link 
            to="/" 
            className="flex items-center gap-2 sm:gap-3 group transition-transform hover:scale-105"
          >
            <div className="relative">
              {/* <Shield className="h-7 w-7 sm:h-9 sm:w-9 transition-all" /> */}
              <div className="absolute inset-0 bg-current opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-base sm:text-lg lg:text-xl font-bold leading-tight tracking-tight">
                KEC Complaint Portal
              </h1>
              <p className="text-[10px] sm:text-xs opacity-75 leading-tight">
                Confidential Complaint Management
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <Link 
              to="/" 
              className="flex items-center gap-1.5 px-3 lg:px-4 py-2 text-sm lg:text-base rounded-lg opacity-90 hover:opacity-100 hover:bg-white/10 transition-all duration-200"
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link 
              to="/track" 
              className="flex items-center gap-1.5 px-3 lg:px-4 py-2 text-sm lg:text-base rounded-lg opacity-90 hover:opacity-100 hover:bg-white/10 transition-all duration-200"
            >
              <Search className="h-4 w-4" />
              Track Status
            </Link>
            <Link 
              to="/admin/login" 
              className="flex items-center gap-1.5 ml-2 px-4 lg:px-5 py-2 text-sm lg:text-base rounded-lg bg-white/15 hover:bg-white/25 font-medium transition-all duration-200 border border-white/20"
            >
              <UserCog className="h-4 w-4" />
              Admin Login
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-1 pt-2 border-t border-white/10">
              <Link 
                to="/" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-3 text-sm rounded-lg opacity-90 hover:opacity-100 hover:bg-white/10 transition-all"
              >
                <Home className="h-4 w-4" />
                Home
              </Link>
              <Link 
                to="/track" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-3 text-sm rounded-lg opacity-90 hover:opacity-100 hover:bg-white/10 transition-all"
              >
                <Search className="h-4 w-4" />
                Track Status
              </Link>
              <Link 
                to="/admin/login" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 mx-2 mt-2 px-4 py-3 text-sm rounded-lg bg-white/15 hover:bg-white/25 font-medium transition-all border border-white/20 text-center"
              >
                <UserCog className="h-4 w-4" />
                Admin Login
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}