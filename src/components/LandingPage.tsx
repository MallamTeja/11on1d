import { motion } from 'motion/react';
import { ArrowRight, Code, Users, Trophy, BookOpen, MessageCircle, Star, Target, Search, Calendar, Zap, Brain, Award } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '../App';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleStartJourney = () => {
    login('student@test.com', 'password');
    navigate('/book-sessions');
  };

  const handleLearnMore = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  const stats = [
    { number: '₹2.5L+', label: 'Average Package' },
    { number: '15K+', label: 'Coding Challenges' },
    { number: '50K+', label: 'Indian Developers' }
  ];

  const howItWorksFeatures = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Sign Up & Create Profile",
      description: "Start by creating your profile and setting your learning goals and preferences."
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "Build Your Network",
      description: "Connect with a diverse community of peers, mentors and experts from your field."
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Book 1-on-1 Sessions",
      description: "Schedule personal mentoring sessions with experienced professionals."
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Start Coding & Learning",
      description: "Practice coding challenges, join live sessions and start your knowledge with real-time feedback."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Find Your Mentor",
      description: "Browse a directory of experienced industry leading developers from leading top companies from around the world."
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Track Your Progress",
      description: "Complete coding challenges, track your development with tutorials and earn certifications through our grading system."
    }
  ];

  const keyFeatures = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Mentorship & Guidance",
      description: "Connect with experienced developers and get personalized guidance to accelerate your career growth."
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Interactive Coding Challenges",
      description: "Solve real-world coding problems with built-in code editor and instant feedback to improve your skills."
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Real-time Communication",
      description: "Chat with mentors and peers in real-time, share knowledge and collaborate on projects."
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Project-Based Assignments",
      description: "Work on challenging coding projects and programming challenges to build practical experience."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Community & Networking",
      description: "Join a vibrant community of developers, participate in events and expand your professional network."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-foreground">Skill Exchange</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#" className="text-foreground hover:text-primary transition-colors">Home</a>
              <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</a>
              <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">Services</a>
              <a href="#challenges" className="text-muted-foreground hover:text-primary transition-colors">Challenges</a>
              <a href="#community" className="text-muted-foreground hover:text-primary transition-colors">Community</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-6xl mb-6 text-foreground">
              Book 1on1 & Exchange Skills
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Connect with expert mentors, book personal sessions, and exchange your skills with peers in India's largest skill-sharing community
            </p>
            
            <Button
              onClick={handleStartJourney}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105"
            >
              Start Your Journey
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Why DevNetwork Section */}
      <section className="py-16 px-6" id="why">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl text-foreground mb-4">
              Why Skill Exchange?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              India's premier platform for 1-on-1 mentorship and skill exchange. Connect with senior developers from top companies like Flipkart, Google, Amazon, and startups across Bangalore, Mumbai, and Hyderabad.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-card border border-border rounded-lg p-8 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl lg:text-4xl mb-2 text-primary">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-6" id="how-it-works">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our streamlined process connects students with mentors, resources, and opportunities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {howItWorksFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-card border border-border rounded-lg p-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg mb-3 text-card-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 px-6" id="features">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl text-foreground mb-4">
              Key Features
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Unlock your full potential with TechGuru's powerful suite of tools designed specifically for Indian developers and tech aspirants.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-card border border-border rounded-lg p-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg mb-3 text-card-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-4xl text-foreground mb-4">
            Ready to Transform Your Skills?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join TechGuru today and unlock opportunities with India's leading tech companies and startups.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleStartJourney}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg transition-all duration-300"
            >
              Start Now
            </Button>
            <Button
              onClick={handleLearnMore}
              variant="outline"
              className="border-border text-foreground hover:bg-muted px-8 py-3 rounded-lg transition-all duration-300"
            >
              Learn More
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-muted-foreground text-sm mb-4 md:mb-0">
              © 2024 TechGuru India. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 bg-muted rounded flex items-center justify-center">
                <div className="w-3 h-3 bg-muted-foreground rounded-full"></div>
              </div>
              <div className="w-6 h-6 bg-muted rounded flex items-center justify-center">
                <div className="w-3 h-3 bg-muted-foreground rounded-full"></div>
              </div>
              <div className="w-6 h-6 bg-muted rounded flex items-center justify-center">
                <div className="w-3 h-3 bg-muted-foreground rounded-full"></div>
              </div>
              <div className="w-6 h-6 bg-muted rounded flex items-center justify-center">
                <div className="w-3 h-3 bg-muted-foreground rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}