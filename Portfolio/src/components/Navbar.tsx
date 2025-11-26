import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { Button } from "./ui/button";

const NAVBAR_OFFSET = 80; // height of your fixed navbar in px (tune if needed)

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Education", href: "#education" },
    { label: "Certificates", href: "#certificates" },
    { label: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navLinks.map((link) => link.href.substring(1));
      const scrollPosition = window.scrollY + NAVBAR_OFFSET + 10;

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // navLinks are static, so OK to leave deps empty

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);

    const id = href.replace("#", "");
    const section = document.getElementById(id);

    if (!section) return;

    const y =
      section.getBoundingClientRect().top + window.pageYOffset - NAVBAR_OFFSET;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "glass-navbar shadow-lg" : "bg-background/30 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-primary"
          >
            SB
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <motion.button
                  key={link.href}
                  type="button"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollToSection(link.href)}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group ${
                    isActive
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute inset-0 bg-primary/10 backdrop-blur-xl rounded-lg border border-primary/20 glass-nav-item"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                  <span className="absolute bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </motion.button>
              );
            })}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-navbar border-t border-border/50"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <button
                    key={link.href}
                    type="button"
                    onClick={() => scrollToSection(link.href)}
                    className={`block w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                      isActive
                        ? "bg-primary/10 text-primary border border-primary/20 glass-nav-item"
                        : "text-foreground hover:bg-primary/10 hover:text-primary"
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
