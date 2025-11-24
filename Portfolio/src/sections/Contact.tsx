import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Mail, Phone, MapPin, Send, Github, Linkedin, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { personalInfo } from "@/data/personalInfo";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    if (!serviceId || !templateId || !publicKey) {
      toast({
        title: "Configuration missing",
        description: "Email service is not configured. Please try another contact option.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          reply_to: formData.email,
          user_subject: formData.subject || "New portfolio inquiry",
          message: formData.message,
        },
        { publicKey }
      );

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon!",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast({
        title: "Unable to send",
        description: "Please try again later or use the email button.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setEmailCopied(true);
    toast({
      title: "Email copied!",
      description: "Email address copied to clipboard.",
    });
    setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-20 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-4" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Let's build something impactful together. Feel free to reach out for collaborations, opportunities, or just a friendly chat!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                <ContactItem 
                  icon={<Mail className="w-5 h-5" />}
                  label="Email"
                  value={personalInfo.email}
                  action={
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={copyEmail}
                      className="hover:bg-primary/10"
                    >
                      {emailCopied ? (
                        <Check className="w-4 h-4 text-primary" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  }
                />
                <ContactItem 
                  icon={<Phone className="w-5 h-5" />}
                  label="Phone"
                  value={personalInfo.phone}
                />
                <ContactItem 
                  icon={<MapPin className="w-5 h-5" />}
                  label="Location"
                  value={personalInfo.location}
                />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">Connect with me</h3>
              <div className="flex gap-4">
                <SocialButton 
                  icon={<Github className="w-5 h-5" />}
                  href={personalInfo.github}
                  label="GitHub"
                />
                <SocialButton 
                  icon={<Linkedin className="w-5 h-5" />}
                  href={personalInfo.linkedin}
                  label="LinkedIn"
                />
                <SocialButton 
                  icon={<Mail className="w-5 h-5" />}
                  href={`mailto:${personalInfo.email}`}
                  label="Email"
                />
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Name *
                  </label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="border-border focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email *
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    className="border-border focus:border-primary"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Subject
                </label>
                <Input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="What is this about?"
                  className="border-border focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Message *
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Your message..."
                  rows={6}
                  className="border-border focus:border-primary resize-none"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-glow transition-all"
                size="lg"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ContactItem = ({ 
  icon, 
  label, 
  value,
  action 
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string;
  action?: React.ReactNode;
}) => (
  <div className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border hover:border-primary transition-smooth">
    <div className="p-3 rounded-lg bg-primary/10 text-primary">
      {icon}
    </div>
    <div className="flex-1">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-foreground font-medium">{value}</p>
    </div>
    {action}
  </div>
);

const SocialButton = ({ 
  icon, 
  href, 
  label 
}: { 
  icon: React.ReactNode; 
  href: string; 
  label: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-4 rounded-lg bg-card border border-border hover:border-primary hover:bg-primary/10 hover:shadow-lg transition-smooth group"
    aria-label={label}
  >
    <div className="text-foreground group-hover:text-primary transition-smooth">
      {icon}
    </div>
  </a>
);

export default Contact;
