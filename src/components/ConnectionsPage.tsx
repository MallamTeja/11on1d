import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter, 
  Users, 
  MessageCircle, 
  Phone, 
  Star,
  MapPin,
  Code,
  Calendar,
  UserPlus,
  UserCheck,
  Grid,
  List
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardContent } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner@2.0.3';

// Mock users data
const mockUsers = [
  {
    id: '1',
    name: 'Priya Sharma',
    role: 'Senior Frontend Developer',
    company: 'Flipkart',
    avatar: 'https://images.unsplash.com/photo-1653671832574-029b950a5749?w=150&h=150&fit=crop&crop=face',
    rating: 4.9,
    location: 'Bengaluru, Karnataka',
    skills: ['React', 'TypeScript', 'GraphQL'],
    isMentor: true,
    isConnected: false,
    requestSent: false,
    lastActive: '2 hours ago',
    mentoringRate: '₹3000/hr',
    bio: 'Frontend architect with 8+ years experience. IIT Bombay alumni. Building scalable e-commerce platforms.'
  },
  {
    id: '2',
    name: 'Vikash Kumar',
    role: 'Full Stack Engineer',
    company: 'Zomato',
    avatar: 'https://images.unsplash.com/photo-1681164315430-6159b2361615?w=150&h=150&fit=crop&crop=face',
    rating: 4.8,
    location: 'Gurugram, Haryana',
    skills: ['Node.js', 'Java', 'Spring Boot'],
    isMentor: true,
    isConnected: true,
    requestSent: false,
    lastActive: '1 hour ago',
    mentoringRate: '₹2500/hr',
    bio: 'Backend specialist from NIT Warangal. Expert in microservices and food delivery systems.'
  },
  {
    id: '3',
    name: 'Ananya Singh',
    role: 'ML Engineer',
    company: 'BYJU\'S',
    avatar: 'https://images.unsplash.com/photo-1681165232934-c09dfa5ee694?w=150&h=150&fit=crop&crop=face',
    rating: 4.9,
    location: 'Bengaluru, Karnataka',
    skills: ['Python', 'TensorFlow', 'PyTorch'],
    isMentor: true,
    isConnected: false,
    requestSent: true,
    lastActive: '30 min ago',
    mentoringRate: '₹4000/hr',
    bio: 'AI/ML researcher from IISC. Passionate about EdTech and teaching ML concepts to students.'
  },
  {
    id: '4',
    name: 'Rohit Gupta',
    role: 'DevOps Engineer',
    company: 'Paytm',
    avatar: 'https://images.unsplash.com/photo-1681165232934-c09dfa5ee694?w=150&h=150&fit=crop&crop=face',
    rating: 4.7,
    location: 'Noida, UP',
    skills: ['Docker', 'Kubernetes', 'AWS'],
    isMentor: true,
    isConnected: false,
    requestSent: false,
    lastActive: '5 min ago',
    mentoringRate: '₹3500/hr',
    bio: 'DevOps expert from DTU. Helping teams build reliable deployment pipelines for fintech apps.'
  },
  {
    id: '5',
    name: 'Kavya Menon',
    role: 'Junior Developer',
    company: 'Freshworks',
    avatar: 'https://images.unsplash.com/photo-1653671832574-029b950a5749?w=150&h=150&fit=crop&crop=face',
    rating: 4.5,
    location: 'Chennai, Tamil Nadu',
    skills: ['JavaScript', 'React', 'CSS'],
    isMentor: false,
    isConnected: false,
    requestSent: false,
    lastActive: '1 day ago',
    mentoringRate: null,
    bio: 'Fresh graduate from VIT Chennai. Aspiring full-stack developer looking to learn from experienced mentors.'
  },
  {
    id: '6',
    name: 'Arjun Reddy',
    role: 'Mobile Developer',
    company: 'Ola',
    avatar: 'https://images.unsplash.com/photo-1681164315430-6159b2361615?w=150&h=150&fit=crop&crop=face',
    rating: 4.8,
    location: 'Hyderabad, Telangana',
    skills: ['React Native', 'Flutter', 'Kotlin'],
    isMentor: true,
    isConnected: false,
    requestSent: false,
    lastActive: '3 hours ago',
    mentoringRate: '₹2800/hr',
    bio: 'Mobile development specialist from BITS Pilani. Expert in ride-sharing and mobility apps.'
  }
];

export default function ConnectionsPage() {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleConnect = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, requestSent: true }
        : user
    ));
    toast.success('Connection request sent successfully!');
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         user.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'mentors' && user.isMentor) ||
                         (selectedFilter === 'students' && !user.isMentor) ||
                         (selectedFilter === 'connected' && user.isConnected);
    
    return matchesSearch && matchesFilter;
  });

  const UserCard = ({ user }: { user: any }) => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300 group">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Avatar className="w-16 h-16 ring-2 ring-white/20">
                  <AvatarImage src={user.avatar} className="object-cover" />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {user.lastActive.includes('min') && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                )}
              </div>
              <div>
                <h3 className="text-white group-hover:text-blue-100 transition-colors">
                  {user.name}
                </h3>
                <p className="text-blue-200 text-sm">{user.role}</p>
                <p className="text-blue-300 text-xs">{user.company}</p>
              </div>
            </div>
            
            {user.isMentor && (
              <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0">
                Mentor
              </Badge>
            )}
          </div>

          <p className="text-blue-100 text-sm mb-4 line-clamp-2">{user.bio}</p>

          <div className="space-y-3 mb-4">
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center text-blue-200">
                <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                {user.rating}
              </div>
              <div className="flex items-center text-blue-200">
                <MapPin className="w-4 h-4 mr-1" />
                {user.location}
              </div>
              {user.mentoringRate && (
                <div className="text-green-400">{user.mentoringRate}</div>
              )}
            </div>

            <div className="flex items-center text-blue-200 text-xs">
              <Calendar className="w-3 h-3 mr-1" />
              Active {user.lastActive}
            </div>

            <div className="flex flex-wrap gap-1">
              {user.skills.slice(0, 3).map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-white/10 border-white/20 text-blue-100 text-xs"
                >
                  {skill}
                </Badge>
              ))}
              {user.skills.length > 3 && (
                <Badge variant="secondary" className="bg-white/10 border-white/20 text-blue-100 text-xs">
                  +{user.skills.length - 3}
                </Badge>
              )}
            </div>
          </div>

          <div className="flex space-x-2">
            {user.isConnected ? (
              <>
                <Button
                  size="sm"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Chat
                </Button>
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Phone className="w-4 h-4" />
                </Button>
              </>
            ) : user.requestSent ? (
              <Button
                size="sm"
                disabled
                className="flex-1 bg-gray-600 text-gray-300 cursor-not-allowed"
              >
                <UserCheck className="w-4 h-4 mr-1" />
                Request Sent
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={() => handleConnect(user.id)}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white"
              >
                <UserPlus className="w-4 h-4 mr-1" />
                Connect
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen pt-4 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl text-white mb-2">Connections</h1>
          <p className="text-blue-200">Discover and connect with mentors and fellow developers</p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5" />
              <Input
                placeholder="Search by name, skills, or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-blue-300 focus:border-blue-400"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="mentors">Mentors</SelectItem>
                  <SelectItem value="students">Students</SelectItem>
                  <SelectItem value="connected">Connected</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex bg-white/10 border border-white/20 rounded-lg p-1">
                <Button
                  size="sm"
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  onClick={() => setViewMode('grid')}
                  className="text-white"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  onClick={() => setViewMode('list')}
                  className="text-white"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-blue-200 text-sm">
            <Users className="w-4 h-4 inline mr-2" />
            {filteredUsers.length} users found
          </div>
        </motion.div>

        {/* Users Grid */}
        <motion.div
          className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </motion.div>

        {/* Empty state */}
        {filteredUsers.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Users className="w-16 h-16 text-blue-300 mx-auto mb-4" />
            <h3 className="text-xl text-white mb-2">No users found</h3>
            <p className="text-blue-200 max-w-md mx-auto">
              Try adjusting your search terms or filters to find more users to connect with.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}