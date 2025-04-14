import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Define available languages
const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
];

const Header = () => {
  const [location] = useLocation();
  const [showShadow, setShowShadow] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(languages[0]);

  // Add shadow to header on scroll
  useEffect(() => {
    const updateHeader = () => {
      const scrollY = window.scrollY;
      if (scrollY > 50) {
        setShowShadow(true);
      } else {
        setShowShadow(false);
      }
    };

    window.addEventListener("scroll", updateHeader);
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return (
    <header
      className={`bg-white sticky top-0 z-50 transition-shadow ${
        showShadow ? "shadow-md" : "shadow-sm"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <FontAwesomeIcon
            icon="paper-plane"
            className="text-accent text-2xl"
          />
          <span className="text-xl font-bold text-primary font-poppins">
            One Sky Quest
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className={
              location === "/"
                ? "text-primary font-medium"
                : "text-neutral-500 hover:text-primary transition"
            }
          >
            Home
          </Link>
          <Link
            to="/explore"
            className={
              location === "/explore"
                ? "text-primary font-medium"
                : "text-neutral-500 hover:text-primary transition"
            }
          >
            Explore
          </Link>
          <Link
            to="/my-trips"
            className={
              location === "/my-trips"
                ? "text-primary font-medium"
                : "text-neutral-500 hover:text-primary transition"
            }
          >
            My Trips
          </Link>
          <Link
            to="/community"
            className={
              location === "/community"
                ? "text-primary font-medium"
                : "text-neutral-500 hover:text-primary transition"
            }
          >
            Community
          </Link>
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex text-neutral-500 hover:text-primary"
              >
                <span className="mr-1 text-base">{currentLanguage.flag}</span>
                <FontAwesomeIcon icon="globe" className="text-lg" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px]">
              {languages.map((language) => (
                <DropdownMenuItem
                  key={language.code}
                  className={`flex items-center cursor-pointer ${
                    language.code === currentLanguage.code
                      ? "bg-primary/10 text-primary"
                      : ""
                  }`}
                  onClick={() => setCurrentLanguage(language)}
                >
                  <span className="mr-2 text-base">{language.flag}</span>
                  <span>{language.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex text-neutral-500 hover:text-primary"
          >
            <FontAwesomeIcon icon="bell" className="text-lg" />
          </Button>
          <Avatar className="h-9 w-9 border-2 border-accent">
            <AvatarImage
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&q=80"
              alt="User profile"
            />
            <AvatarFallback>DU</AvatarFallback>
          </Avatar>

          {/* Mobile menu button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-neutral-800"
              >
                <FontAwesomeIcon icon="bars" className="text-lg" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4 mt-6">
                <Link
                  to="/"
                  className={
                    location === "/"
                      ? "text-primary font-medium text-lg"
                      : "text-neutral-700 hover:text-primary transition text-lg"
                  }
                >
                  Home
                </Link>
                <Link
                  to="/explore"
                  className={
                    location === "/explore"
                      ? "text-primary font-medium text-lg"
                      : "text-neutral-700 hover:text-primary transition text-lg"
                  }
                >
                  Explore
                </Link>
                <Link
                  to="/my-trips"
                  className={
                    location === "/my-trips"
                      ? "text-primary font-medium text-lg"
                      : "text-neutral-700 hover:text-primary transition text-lg"
                  }
                >
                  My Trips
                </Link>
                <Link
                  to="/community"
                  className={
                    location === "/community"
                      ? "text-primary font-medium text-lg"
                      : "text-neutral-700 hover:text-primary transition text-lg"
                  }
                >
                  Community
                </Link>
                <div className="pt-4 border-t border-neutral-200">
                  <Button variant="outline" className="w-full justify-start">
                    <FontAwesomeIcon icon="bell" className="mr-2" />{" "}
                    Notifications
                  </Button>
                </div>
                <Button variant="outline" className="w-full justify-start">
                  <FontAwesomeIcon icon="user-circle" className="mr-2" /> My
                  Profile
                </Button>

                {/* Mobile language selector */}
                <div className="pt-4 border-t border-neutral-200">
                  <p className="text-sm text-neutral-500 mb-2">Language</p>
                  <div className="grid grid-cols-2 gap-2">
                    {languages.map((language) => (
                      <Button
                        key={language.code}
                        variant={
                          language.code === currentLanguage.code
                            ? "secondary"
                            : "outline"
                        }
                        size="sm"
                        className="justify-start"
                        onClick={() => setCurrentLanguage(language)}
                      >
                        <span className="mr-2">{language.flag}</span>
                        <span>{language.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
