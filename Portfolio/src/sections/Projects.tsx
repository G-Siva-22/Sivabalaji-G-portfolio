import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Github, ExternalLink, X } from "lucide-react";
import { projectsData, projectCategories } from "@/data/projectsData";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<typeof projectsData[0] | null>(null);

  const filteredProjects = activeCategory === "all"
    ? projectsData
    : projectsData.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="py-20 bg-surface-secondary" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto" />
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {projectCategories.map((cat) => (
            <Button
              key={cat.id}
              variant={activeCategory === cat.id ? "default" : "outline"}
              onClick={() => setActiveCategory(cat.id)}
              className={`transition-smooth ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground shadow-glow"
                  : "border-primary/30 hover:border-primary hover:bg-primary/10"
              }`}
            >
              {cat.label}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          layout
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isInView={isInView}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </motion.div>

        {/* Project Detail Modal */}
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            {selectedProject && (
              <ProjectDetailView project={selectedProject} />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

const ProjectCard = ({ 
  project, 
  index, 
  isInView,
  onClick 
}: { 
  project: typeof projectsData[0]; 
  index: number; 
  isInView: boolean;
  onClick: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      layout
    >
      <motion.div
        whileHover={{ y: -8, transition: { duration: 0.3 } }}
        className="h-full p-6 rounded-xl bg-card border border-border hover:border-primary hover:shadow-xl transition-smooth cursor-pointer group"
        onClick={onClick}
      >
        {/* Project Header */}
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-smooth mb-2">
            {project.title}
          </h3>
          <p className="text-sm font-medium text-primary">{project.subtitle}</p>
        </div>

        {/* Description */}
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/30"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground">
              +{project.tech.length - 4} more
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-border">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 border-primary/30 hover:bg-primary/10"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            View Details
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={(e) => e.stopPropagation()}
          >
            <Github className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectDetailView = ({ project }: { project: typeof projectsData[0] }) => {
  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle className="text-3xl font-bold">{project.title}</DialogTitle>
        <p className="text-primary font-medium">{project.subtitle}</p>
      </DialogHeader>

      <div className="space-y-4">
        <div>
          <h4 className="text-lg font-semibold text-foreground mb-2">Problem</h4>
          <p className="text-muted-foreground">{project.problem}</p>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-foreground mb-2">Solution</h4>
          <p className="text-muted-foreground">{project.solution}</p>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-foreground mb-2">Key Features</h4>
          <ul className="space-y-2">
            {project.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                <span className="text-primary mt-1">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-foreground mb-2">Technology Stack</h4>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/30"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-lg bg-primary/5 border border-primary/30">
          <h4 className="text-lg font-semibold text-primary mb-2">Impact</h4>
          <p className="text-muted-foreground">{project.impact}</p>
        </div>

        <div className="flex gap-3 pt-4">
          <Button className="flex-1 bg-primary hover:bg-primary/90">
            <Github className="w-4 h-4 mr-2" />
            View on GitHub
          </Button>
          <Button variant="outline" className="flex-1 border-primary hover:bg-primary/10">
            <ExternalLink className="w-4 h-4 mr-2" />
            Live Demo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Projects;
