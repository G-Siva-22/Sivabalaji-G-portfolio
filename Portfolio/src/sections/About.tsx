import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { MapPin, GraduationCap, Calendar, Briefcase } from "lucide-react";
import { personalInfo } from "@/data/personalInfo";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="about" className="py-20 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              About <span className="text-primary">Me</span>
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Professional Summary */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  {personalInfo.professionalSummary}
                </p>
              </div>

              {/* Quick Info Cards */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <InfoCard 
                  icon={<MapPin className="w-5 h-5" />}
                  label="Location"
                  value={personalInfo.location}
                />
                <InfoCard 
                  icon={<GraduationCap className="w-5 h-5" />}
                  label="Degree"
                  value="B.Tech IT"
                />
                <InfoCard 
                  icon={<Calendar className="w-5 h-5" />}
                  label="Graduation"
                  value="2025"
                />
                <InfoCard 
                  icon={<Briefcase className="w-5 h-5" />}
                  label="Status"
                  value="Open to Work"
                />
              </div>
            </motion.div>

            {/* Right: Stats Counter */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                {personalInfo.quickStats.map((stat, index) => (
                  <StatCard 
                    key={index}
                    stat={stat}
                    delay={index * 0.1}
                    isInView={isInView}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const InfoCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="p-4 rounded-lg bg-card border border-border hover:border-primary hover:shadow-md transition-smooth">
    <div className="flex items-center gap-2 mb-2 text-primary">
      {icon}
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
    <p className="text-sm font-semibold text-foreground">{value}</p>
  </div>
);

const StatCard = ({ stat, delay, isInView }: { stat: { label: string; value: number }; delay: number; isInView: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const end = stat.value;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, stat.value]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay, duration: 0.5 }}
      className="p-6 rounded-xl bg-card border-2 border-primary/30 hover:border-primary hover:shadow-glow transition-smooth text-center"
    >
      <div className="text-4xl font-bold text-primary mb-2">
        {count}
        {stat.label === "Current CGPA" ? "" : "+"}
      </div>
      <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
    </motion.div>
  );
};

export default About;
