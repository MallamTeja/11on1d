import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, 
  Clock, 
  Star, 
  User, 
  MapPin, 
  Video, 
  MessageCircle,
  Phone,
  Filter,
  Search,
  BookOpen,
  Award,
  IndianRupee,
  Users,
  TrendingUp
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { useAuth } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Mock data for mentors
const mockMentors = [
  {
    id: '1',
    name: 'Priya Sharma',
    title: 'Senior Full Stack Developer',
    company: 'Flipkart',
    avatar: 'https://images.unsplash.com/photo-1741707041270-e51118f9553d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3b21hbiUyMHRlY2glMjBwcm9mZXNzaW9uYWwlMjBjb2Rpbmd8ZW58MXx8fHwxNzU3NjAyNDU0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.9,
    sessions: 234,
    hourlyRate: 2500,
    skills: ['React', 'Node.js', 'Python', 'AWS'],
    bio: 'Ex-Amazon engineer with 6+ years in full-stack development. Specialized in scalable web applications.',
    location: 'Bengaluru',
    languages: ['English', 'Hindi', 'Kannada'],
    availability: 'Available today'
  },
  {
    id: '2',
    name: 'Arjun Verma',
    title: 'Machine Learning Engineer',
    company: 'Google India',
    avatar: 'https://images.unsplash.com/photo-1681164315430-6159b2361615?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtYWxlJTIwc29mdHdhcmUlMjBlbmdpbmVlciUyMG1vZGVybiUyMG9mZmljZXxlbnwxfHx8fDE3NTc2MDI0NTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    sessions: 189,
    hourlyRate: 3000,
    skills: ['Python', 'TensorFlow', 'PyTorch', 'MLOps'],
    bio: 'AI/ML expert from IIT Delhi. Building production ML systems and mentoring aspiring data scientists.',
    location: 'Mumbai',
    languages: ['English', 'Hindi', 'Marathi'],
    availability: 'Next slot: Tomorrow 2 PM'
  },
  {
    id: '3',
    name: 'Sneha Patel',
    title: 'Product Manager',
    company: 'Zomato',
    avatar: 'https://images.unsplash.com/photo-1681165232934-c09dfa5ee694?w=150&h=150&fit=crop&crop=face',
    rating: 4.7,
    sessions: 156,
    hourlyRate: 2200,
    skills: ['Product Strategy', 'User Research', 'Analytics', 'Growth'],
    bio: 'Product leader with experience in B2C products. Helped launch features used by millions.',
    location: 'Delhi',
    languages: ['English', 'Hindi', 'Gujarati'],
    availability: 'Available this week'
  },
  {
    id: '4',
    name: 'Rakesh Kumar',
    title: 'DevOps Architect',
    company: 'PhonePe',
    avatar: 'https://images.unsplash.com/photo-1716703742196-9986679eb03f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0ZWNoJTIwdGVhbSUyMHByb2Zlc3Npb25hbHMlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzU3NjAyNDYwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.9,
    sessions: 278,
    hourlyRate: 2800,
    skills: ['Kubernetes', 'Docker', 'AWS', 'CI/CD'],
    bio: 'DevOps expert managing infrastructure for fintech applications. Passionate about automation.',
    location: 'Bengaluru',
    languages: ['English', 'Hindi', 'Telugu'],
    availability: 'Available today'
  }
];

export default function BookingSessions() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('all');
  const [selectedMentor, setSelectedMentor] = useState<any>(null);
  const [bookingStep, setBookingStep] = useState(1);

  const filteredMentors = mockMentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mentor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mentor.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSkill = selectedSkill === 'all' || 
                        mentor.skills.some(skill => skill.toLowerCase().includes(selectedSkill.toLowerCase()));
    return matchesSearch && matchesSkill;
  });

  const BookingModal = () => (
    <Dialog open={!!selectedMentor} onOpenChange={() => setSelectedMentor(null)}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Book 1-on-1 Session with {selectedMentor?.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {bookingStep === 1 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={selectedMentor?.avatar} />
                  <AvatarFallback>{selectedMentor?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold text-white">{selectedMentor?.name}</h3>
                  <p className="text-gray-300">{selectedMentor?.title} at {selectedMentor?.company}</p>
                  <div className="flex items-center mt-1">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-sm text-gray-300">{selectedMentor?.rating} • {selectedMentor?.sessions} sessions</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-card/50">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <IndianRupee className="w-4 h-4 text-primary" />
                      <span className="text-white font-medium">₹{selectedMentor?.hourlyRate}/hour</span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-card/50">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-white text-sm">{selectedMentor?.availability}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-white">Choose Session Type</h4>
                <div className="grid grid-cols-3 gap-3">
                  <Button variant="outline" className="flex items-center space-x-2">
                    <Video className="w-4 h-4" />
                    <span>Video Call</span>
                  </Button>
                  <Button variant="outline" className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>Audio Call</span>
                  </Button>
                  <Button variant="outline" className="flex items-center space-x-2">
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat</span>
                  </Button>
                </div>
              </div>

              <Button 
                onClick={() => setBookingStep(2)}
                className="w-full"
              >
                Continue to Schedule
              </Button>
            </div>
          )}

          {bookingStep === 2 && (
            <div className="space-y-4">
              <h4 className="font-medium text-white">Select Date & Time</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Preferred Date</label>
                  <Input type="date" className="bg-input" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Preferred Time</label>
                  <Select>
                    <SelectTrigger className="bg-input">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="09:00">9:00 AM</SelectItem>
                      <SelectItem value="10:00">10:00 AM</SelectItem>
                      <SelectItem value="14:00">2:00 PM</SelectItem>
                      <SelectItem value="16:00">4:00 PM</SelectItem>
                      <SelectItem value="18:00">6:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Session Description</label>
                <textarea 
                  className="w-full p-3 rounded-lg bg-input border border-border text-white resize-none"
                  rows={3}
                  placeholder="Describe what you'd like to discuss or learn..."
                />
              </div>

              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  onClick={() => setBookingStep(1)}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button 
                  onClick={() => {
                    setBookingStep(1);
                    setSelectedMentor(null);
                    // Here you would handle the actual booking
                  }}
                  className="flex-1"
                >
                  Confirm Booking
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-white mb-2">Book 1-on-1 Sessions</h1>
            <p className="text-gray-300">Connect with expert mentors and accelerate your learning journey</p>
          </motion.div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="bg-gradient-to-r from-primary/20 to-accent/20 border-primary/30">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-primary/20 rounded-lg">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">500+</p>
                    <p className="text-gray-300 text-sm">Expert Mentors</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-gradient-to-r from-accent/20 to-primary/20 border-accent/30">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-accent/20 rounded-lg">
                    <Clock className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">10K+</p>
                    <p className="text-gray-300 text-sm">Hours Mentored</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-green-500/20 rounded-lg">
                    <Star className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">4.8</p>
                    <p className="text-gray-300 text-sm">Avg. Rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border-orange-500/30">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-orange-500/20 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">95%</p>
                    <p className="text-gray-300 text-sm">Success Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search mentors by name, company, or expertise..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-input"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <Select value={selectedSkill} onValueChange={setSelectedSkill}>
              <SelectTrigger className="w-48 bg-input">
                <SelectValue placeholder="Filter by skill" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Skills</SelectItem>
                <SelectItem value="react">React</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="aws">AWS</SelectItem>
                <SelectItem value="product">Product</SelectItem>
                <SelectItem value="devops">DevOps</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>More Filters</span>
            </Button>
          </div>
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor, index) => (
            <motion.div
              key={mentor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-card/50 border-border hover:border-primary/50 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={mentor.avatar} />
                      <AvatarFallback className="bg-primary text-white">
                        {mentor.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white group-hover:text-primary transition-colors">
                        {mentor.name}
                      </h3>
                      <p className="text-sm text-gray-300">{mentor.title}</p>
                      <p className="text-sm text-gray-400">{mentor.company}</p>
                      <div className="flex items-center mt-1">
                        <MapPin className="w-3 h-3 text-gray-400 mr-1" />
                        <span className="text-xs text-gray-400">{mentor.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm text-white font-medium">{mentor.rating}</span>
                      <span className="text-sm text-gray-400">({mentor.sessions})</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <IndianRupee className="w-4 h-4 text-primary" />
                      <span className="font-semibold text-white">{mentor.hourlyRate}/hr</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm text-gray-300 line-clamp-2">{mentor.bio}</p>
                    
                    <div className="flex flex-wrap gap-1">
                      {mentor.skills.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {mentor.skills.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{mentor.skills.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="pt-2">
                      <div className="flex items-center space-x-2 mb-2">
                        <Clock className="w-3 h-3 text-green-400" />
                        <span className="text-xs text-green-400">{mentor.availability}</span>
                      </div>
                      <Button 
                        onClick={() => setSelectedMentor(mentor)}
                        className="w-full"
                        size="sm"
                      >
                        Book Session
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <BookingModal />
    </div>
  );
}