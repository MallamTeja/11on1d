.import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Edit, 
  MapPin, 
  Calendar, 
  Award, 
  Code, 
  Users, 
  MessageCircle,
  Star,
  TrendingUp,
  BookOpen,
  Target
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { useAuth } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Mock data for the profile with updated images
const mockProfileData = {
  coverImage: "https://i.imgur.com/3ZQ3ZQZ.jpg", // Indian professional background image with Ghibli effect
  bio: "Full-stack developer working at Flipkart, Bangalore. 4+ years experience in React, Node.js, and Java. Alumni of IIT Delhi. Love mentoring junior developers and contributing to open source.",
  location: "Bengaluru, Karnataka",
  joinDate: "March 2022",
  skills: ["React", "Java", "Spring Boot", "Node.js", "Python", "AWS", "Microservices", "MySQL"],
  stats: {
    problemsSolved: 324,
    mentoringHours: 189,
    rating: 4.8,
    connections: 456,
    badges: 15,
    streakDays: 62
  },
  recentBadges: [
    { name: "Code Samurai", icon: "🥷", color: "from-yellow-400 to-orange-500" },
    { name: "Mentor Guru", icon: "🧘‍♂️", color: "from-blue-400 to-purple-500" },
    { name: "Algorithm Master", icon: "🧠", color: "from-green-400 to-teal-500" },
    { name: "Team Lead", icon: "👑", color: "from-pink-400 to-red-500" }
  ]
};

export default function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const StatCard = ({ icon: Icon, label, value, trend }: any) => (
    <motion.div
      className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center justify-between mb-4">
        <Icon className="w-8 h-8 text-blue-300" />
        {trend && (
          <div className="flex items-center text-green-400 text-sm">
            <TrendingUp className="w-4 h-4 mr-1" />
            {trend}
          </div>
        )}
      </div>
      <div className="text-2xl text-white mb-1">{value}</div>
      <div className="text-blue-200 text-sm">{label}</div>
    </motion.div>
  );

  return (
    <div className="min-h-screen pt-4 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Cover and Profile Section */}
        <motion.div
          className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Cover Image */}
          <div className="relative h-48 lg:h-64">
            <ImageWithFallback
              src={mockProfileData.coverImage}
              alt="Cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            
            {/* Edit Button */}
            <Button
              onClick={() => setIsEditing(!isEditing)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-lg border border-white/20 text-white rounded-xl"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>

          {/* Profile Info */}
          <div className="relative p-6 -mt-16">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-6">
              <div className="flex flex-col sm:flex-row sm:items-end space-y-4 sm:space-y-0 sm:space-x-6">
                <Avatar className="w-32 h-32 border-4 border-white/20 shadow-xl">
                  <AvatarImage src="https://i.imgur.com/4AiXzf8.png" className="object-cover" />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-2xl">
                    {user?.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <h1 className="text-3xl text-white">{user?.name}</h1>
                    {user?.isMentor && (
                      <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0">
                        Mentor
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-blue-200 text-sm">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {mockProfileData.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Joined {mockProfileData.joinDate}
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={\`w-5 h-5 \${
                          star <= Math.floor(mockProfileData.stats.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-400'
                        }\`}
                      />
                    ))}
                    <span className="text-white ml-2">
                      {mockProfileData.stats.rating} rating
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            <p className="text-blue-100 mb-6 max-w-3xl leading-relaxed">
              {mockProfileData.bio}
            </p>

            {/* Skills */}
            <div className="mb-6">
              <h3 className="text-white text-lg mb-3">Skills & Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {mockProfileData.skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Badge variant="secondary" className="bg-white/10 border-white/20 text-blue-100 hover:bg-white/20 transition-all duration-200">
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <StatCard
            icon={Code}
            label="Problems Solved"
            value={mockProfileData.stats.problemsSolved}
            trend="+12"
          />
          <StatCard
            icon={BookOpen}
            label="Mentoring Hours"
            value={mockProfileData.stats.mentoringHours}
            trend="+8"
          />
          <StatCard
            icon={Users}
            label="Connections"
            value={mockProfileData.stats.connections}
            trend="+15"
          />
          <StatCard
            icon={Award}
            label="Badges Earned"
            value={mockProfileData.stats.badges}
            trend="+2"
          />
          <StatCard
            icon={Target}
            label="Current Streak"
            value={\`\${mockProfileData.stats.streakDays} days\`}
          />
          <StatCard
            icon={Star}
            label="Avg Rating"
            value={mockProfileData.stats.rating}
          />
        </motion.div>

        {/* Progress and Badges Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-blue-300" />
                  Progress Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-blue-200">Weekly Coding Goal</span>
                    <span className="text-white">32/40 hours</span>
                  </div>
                  <Progress value={80} className="bg-white/20" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-blue-200">Monthly Problems</span>
                    <span className="text-white">47/60 solved</span>
                  </div>
                  <Progress value={78} className="bg-white/20" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-blue-200">Mentoring Sessions</span>
                    <span className="text-white">8/10 completed</span>
                  </div>
                  <Progress value={80} className="bg-white/20" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Badges */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Award className="w-5 h-5 mr-2 text-blue-300" />
                    Recent Badges
                  </div>
                  <Button variant="ghost" size="sm" className="text-blue-300 hover:text-white">
                    View All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {mockProfileData.recentBadges.map((badge, index) => (
                    <motion.div
                      key={badge.name}
                      className={\`relative p-4 bg-gradient-to-br \${badge.color} rounded-xl group cursor-pointer\`}
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="text-center">
                        <div className="text-3xl mb-2">{badge.icon}</div>
                        <div className="text-white text-sm">{badge.name}</div>
                      </div>
                      <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
