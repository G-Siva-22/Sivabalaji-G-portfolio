import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import { experienceData } from "@/data/experienceData";

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-20 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground mb-3">
            Journey
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Work <span className="text-primary">Experience</span>
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Flip through the roles that shaped my craft—front side for the essentials, back side for the impact.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 }
            }
          }}
          className="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
        >
          {experienceData.map((exp, index) => (
            <ExperienceCard key={exp.id} experience={exp} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const ExperienceCard = ({ 
  experience, 
  index
}: { 
  experience: typeof experienceData[0]; 
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="flip-card focus-visible:ring-2 focus-visible:ring-primary/60 rounded-[32px] outline-none"
      tabIndex={0}
    >
      <div className="flip-card-inner min-h-[340px]">
        <div className="flip-card-face flex flex-col gap-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground/80">
                {experience.type}
              </p>
              <h3 className="text-2xl font-semibold text-foreground mt-2">
                {experience.role}
              </h3>
              <p className="text-lg font-semibold text-primary">
                {experience.company}
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>

          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{experience.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{experience.duration}</span>
            </div>
          </div>

          <div className="mt-auto flex items-center justify-between text-xs uppercase tracking-[0.35em] text-muted-foreground">
            <span>flip card</span>
            <span className="text-primary">↺</span>
          </div>
        </div>

        <div className="flip-card-face flip-card-back flex flex-col gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-primary/70">
              Impact
            </p>
            <h4 className="text-xl font-semibold text-foreground">
              Key Contributions
            </h4>
          </div>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {experience.description.map((point, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="text-primary mt-1">•</span>
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
          <p className="mt-auto text-xs text-muted-foreground/80">
            Click or tap again to view the front.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Experience;
