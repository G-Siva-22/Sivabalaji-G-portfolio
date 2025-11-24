import { motion } from "framer-motion";
import { useEffect, useState, type KeyboardEvent } from "react";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { personalInfo } from "@/data/personalInfo";
import profilePhoto from "@/siva.jpg";

const Hero = () => {
  const [isAvatarFlipped, setIsAvatarFlipped] = useState(false);
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  const initials = personalInfo.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  const toggleAvatarFlip = () => setIsAvatarFlipped((prev) => !prev);

  const handleAvatarKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleAvatarFlip();
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-lg font-medium text-primary mb-2">Hi, I'm</h2>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-4">
                {personalInfo.name}
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl sm:text-2xl text-muted-foreground font-medium min-h-[80px]"
            >
              <TypewriterText texts={[
                personalInfo.role,
                "AI Enthusiast",
                personalInfo.subtitle,
                "Problem Solver"
              ]} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-lg text-muted-foreground max-w-xl"
            >
              Building scalable, production-ready solutions with the SERN stack and AI integration.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-glow transition-all"
                onClick={() => scrollToSection("projects")}
              >
                View My Work
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
                asChild
              >
                <a 
                  href="/Siva%20resume.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Open resume PDF in a new tab"
                >
                  Download Resume
                </a>
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex gap-4 pt-4"
            >
              <a 
                href={personalInfo.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-card border border-border hover:border-primary hover:bg-primary/10 transition-smooth"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href={personalInfo.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-card border border-border hover:border-primary hover:bg-primary/10 transition-smooth"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href={`mailto:${personalInfo.email}`}
                className="p-3 rounded-lg bg-card border border-border hover:border-primary hover:bg-primary/10 transition-smooth"
              >
                <Mail className="w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right Content - Avatar Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div
                className="flip-card hero-flip-card cursor-pointer rounded-[32px] w-72 h-72 sm:w-96 sm:h-96"
                role="button"
                tabIndex={0}
                aria-label={isAvatarFlipped ? "Show profile details" : "Show profile photo"}
                aria-pressed={isAvatarFlipped}
                onClick={toggleAvatarFlip}
                onKeyDown={handleAvatarKeyDown}
                data-flipped={isAvatarFlipped}
              >
                <div className="flip-card-inner h-full">
                  <div className="flip-card-face flex flex-col items-center justify-center gap-6 text-center">
                    <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-full bg-primary/20 flex items-center justify-center text-6xl sm:text-7xl font-bold text-primary shadow-inner">
                      {initials}
                    </div>
                    <div className="px-4 space-y-1">
                      <p className="text-lg font-semibold text-foreground">
                        {personalInfo.role}
                      </p>
                      <p className="text-sm text-muted-foreground">{personalInfo.location}</p>
                      <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground/80 mt-3">
                        tap to reveal
                      </p>
                    </div>
                  </div>
                  <div className="flip-card-face flip-card-back overflow-hidden p-0">
                    <img
                      src={profilePhoto}
                      alt={`${personalInfo.name} portrait`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="cursor-pointer"
            onClick={() => scrollToSection("about")}
          >
            <ArrowDown className="w-6 h-6 text-primary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Typewriter Component
const TypewriterText = ({ texts }: { texts: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[currentIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((currentIndex + 1) % texts.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex, texts]);

  return (
    <span className="text-primary">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

// Floating Icon Component
const FloatingIcon = ({ icon, delay, position }: { icon: string; delay: number; position: string }) => (
  <motion.div
    animate={{ y: [0, -15, 0], rotate: [0, 5, 0, -5, 0] }}
    transition={{ duration: 3, repeat: Infinity, delay }}
    className={`absolute ${position} text-3xl opacity-50 hover:opacity-100 transition-smooth`}
  >
    {icon}
  </motion.div>
);

export default Hero;
