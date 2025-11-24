import { motion, useInView } from "framer-motion";
import { useMemo, useRef } from "react";
import { skillCategories } from "@/data/skillsData";

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const }
    }
  };

  const accentGradients = useMemo(
    () => [
      "from-primary/40 via-primary/10 to-transparent",
      "from-secondary/40 via-secondary/10 to-transparent",
      "from-accent/40 via-accent/10 to-transparent"
    ],
    []
  );

  return (
    <section
      id="skills"
      className="relative py-24 bg-gradient-to-b from-background via-surface-secondary/40 to-background overflow-hidden"
      ref={ref}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/2 w-[32rem] h-[32rem] bg-primary/5 blur-3xl rounded-full" />
        <div className="absolute top-1/3 -right-10 w-[28rem] h-[28rem] bg-secondary/10 blur-[200px] rounded-full" />
        <div className="absolute bottom-0 -left-10 w-[26rem] h-[26rem] bg-accent/5 blur-[180px] rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground mb-3">
            Capabilities
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
            My <span className="text-primary">Skillset</span>
          </h2>
          <p className="text-base text-muted-foreground mt-4 max-w-2xl mx-auto">
            A curated mix of design thinking, engineering rigor, and delivery tools that shape polished digital experiences.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
        >
          {skillCategories.map((category, categoryIndex) => {
            const gradient = accentGradients[categoryIndex % accentGradients.length];
            const midpoint = Math.ceil(category.skills.length / 2);
            const columns = [
              category.skills.slice(0, midpoint),
              category.skills.slice(midpoint)
            ];

            return (
              <motion.div
                key={category.id}
                variants={itemVariants}
                className="relative group"
                whileHover={{ y: -6 }}
              >
                <div className={`absolute inset-0 rounded-[32px] bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-500`} />

                <div className="relative h-full p-6 rounded-[28px] border border-border/60 bg-card/70 backdrop-blur-xl shadow-[0_25px_60px_-30px_rgba(0,0,0,0.7)] flex flex-col gap-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground/80">
                        Category {String(categoryIndex + 1).padStart(2, "0")}
                      </p>
                      <h3 className="text-2xl font-semibold text-foreground mt-2">
                        {category.label}
                      </h3>
                    </div>
                    <motion.span
                      aria-hidden="true"
                      className="text-4xl font-bold text-primary/70"
                      animate={{ rotate: isInView ? 0 : -6 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                    >
                      {category.skills.length.toString().padStart(2, "0")}
                    </motion.span>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {columns.map((column, columnIndex) => (
                      <div
                        key={`${category.id}-column-${columnIndex}`}
                        className="rounded-2xl border border-border/40 bg-background/40 p-4 space-y-3"
                      >
                        {column.map((skill, index) => (
                          <motion.div
                            key={skill.name}
                            className="flex w-full min-w-0 items-start gap-3 rounded-xl border border-primary/10 bg-primary/5 px-3 py-2 text-sm text-foreground/90 shadow-sm"
                            whileHover={{ scale: 1.02, x: 4 }}
                            transition={{ type: "spring", stiffness: 250, damping: 18 }}
                          >
                            <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_12px_rgba(99,102,241,0.6)]" />
                            <span className="flex-1 whitespace-normal break-words leading-tight">
                              {skill.name}
                            </span>
                          </motion.div>
                        ))}
                        {column.length === 0 && (
                          <div className="text-xs text-muted-foreground/70 italic">More coming soon</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
