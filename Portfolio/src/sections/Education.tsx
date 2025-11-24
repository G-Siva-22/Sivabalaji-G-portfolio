import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, MapPin, Calendar, Award } from "lucide-react";
import { educationData } from "@/data/educationData";

const Education = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="py-20 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            My <span className="text-primary">Education</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto" />
        </motion.div>

        <div className="space-y-8 max-w-4xl mx-auto">
          {educationData.map((edu, index) => (
            <EducationCard 
              key={edu.id} 
              education={edu} 
              index={index} 
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const EducationCard = ({ 
  education, 
  index, 
  isInView 
}: { 
  education: typeof educationData[0]; 
  index: number; 
  isInView: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <div className="p-6 rounded-xl bg-card border border-border hover:border-primary hover:shadow-lg transition-smooth group">
        <div className="flex items-start gap-6">
          {/* Icon */}
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="p-4 rounded-lg bg-primary/10 text-primary shrink-0"
          >
            <GraduationCap className="w-8 h-8" />
          </motion.div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-smooth">
                  {education.degree}
                </h3>
                <p className="text-lg font-semibold text-primary mt-1">
                  {education.institution}
                </p>
              </div>
              {education.status === "Current" && (
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary border border-primary/30">
                  Current
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{education.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{education.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-primary" />
                <span className="font-semibold text-primary">{education.score}</span>
              </div>
            </div>

            {education.highlights && education.highlights.length > 0 && (
              <ul className="space-y-2">
                {education.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-primary mt-1">•</span>
                    <span className="flex-1">{highlight}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Education;
