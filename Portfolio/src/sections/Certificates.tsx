import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, ExternalLink } from "lucide-react";
import { certificatesData } from "@/data/certificatesData";
import { Button } from "@/components/ui/button";

const Certificates = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certificates" className="py-20 bg-surface-secondary" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Certificates & <span className="text-primary">Achievements</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificatesData.map((cert, index) => (
            <CertificateCard 
              key={cert.id} 
              certificate={cert} 
              index={index} 
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const CertificateCard = ({ 
  certificate, 
  index, 
  isInView 
}: { 
  certificate: typeof certificatesData[0]; 
  index: number; 
  isInView: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      <div className="h-full p-6 rounded-xl bg-card border border-border hover:border-primary hover:shadow-lg transition-smooth group">
        {/* Icon */}
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
          className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4"
        >
          <Award className="w-7 h-7 text-primary" />
        </motion.div>

        {/* Content */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-smooth mb-2">
            {certificate.name}
          </h3>
          <p className="text-sm font-semibold text-primary mb-1">
            {certificate.issuer}
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="px-2 py-1 rounded bg-primary/10 text-primary">
              {certificate.type}
            </span>
            <span>•</span>
            <span>{certificate.date}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {certificate.description}
        </p>

        <Button 
          variant="outline" 
          size="sm" 
          className="w-full border-primary/30 hover:bg-primary/10 group-hover:border-primary"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          View Credential
        </Button>
      </div>
    </motion.div>
  );
};

export default Certificates;
