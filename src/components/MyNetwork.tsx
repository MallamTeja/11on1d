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
  List,
  Settings,
  Edit,
  Plus,
  Trash2,
  ExternalLink,
  Mail,
  Building
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner@2.0.3';

// Mock network data
const mockConnections = [
  {
    id: '1',
    name: 'Priya Sharma',
    role: 'Senior Frontend Developer',
    company: 'Flipkart',
    avatar: 'https://images.unsplash.com/photo-1741707041270-e51118f9553d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3b21hbiUyMHRlY2glMjBwcm9mZXNzaW9uYWwlMjBjb2Rpbmd8ZW58MXx8fHwxNzU3NjAyNDU0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.9,
    location: 'Bengaluru, Karnataka',
    skills: ['React', 'TypeScript', 'GraphQL'],
    isMentor: true,
    connectedDate: '2023-11-15',
    lastInteraction: '2 days ago',
    mentoringRate: '₹3000/hr',
    bio: 'Frontend architect with 8+ years experience. IIT Bombay alumni. Building scalable e-commerce platforms.',
    email: 'priya.sharma@flipkart.com',
    phone: '+91 9876543210',
    linkedIn: 'linkedin.com/in/priyasharma',
    github: 'github.com/priyasharma'
  },
  {
    id: '2',
    name: 'Vikash Kumar',
    role: 'Full Stack Engineer',
    company: 'Zomato',
    avatar: 'https://images.unsplash.com/photo-1681164315430-6159b2361615?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtYWxlJTIwc29mdHdhcmUlMjBlbmdpbmVlciUyMG1vZGVybiUyMG9mZmljZXxlbnwxfHx8fDE3NTc2MDI0NTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    location: 'Mumbai, Maharashtra',
    skills: ['Node.js', 'React', 'Python', 'AWS'],
    isMentor: false,
    connectedDate: '2023-12-02',
    lastInteraction: '1 week ago',
    bio: 'Building food-tech solutions. Passionate about scalable backend systems.',
    email: 'vikash@zomato.com',
    phone: '+91 9876543211',
    linkedIn: 'linkedin.com/in/vikashkumar',
    github: 'github.com/vikashkumar'
  },
  {
    id: '3',
    name: 'Ananya Reddy',
    role: 'Data Scientist',
    company: 'Ola',
    avatar: 'https://images.unsplash.com/photo-1681165232934-c09dfa5ee694?w=150&h=150&fit=crop&crop=face',
    rating: 4.7,
    location: 'Hyderabad, Telangana',
    skills: ['Python', 'Machine Learning', 'TensorFlow'],
    isMentor: true,
    connectedDate: '2023-10-20',
    lastInteraction: '3 days ago',
    mentoringRate: '₹2800/hr',
    bio: 'ML engineer working on recommendation systems. PhD from IIIT Hyderabad.',
    email: 'ananya@ola.com',
    phone: '+91 9876543212',
    linkedIn: 'linkedin.com/in/ananyareddy',
    github: 'github.com/ananyareddy'
  }
];

const discoveryUsers = [
  {
    id: '4',
    name: 'Rohit Agarwal',
    role: 'DevOps Engineer',
    company: 'PhonePe',
    avatar: 'https://images.unsplash.com/photo-1716703742196-9986679eb03f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0ZWNoJTIwdGVhbSUyMHByb2Zlc3Npb25hbHMlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzU3NjAyNDYwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.6,
    location: 'Bengaluru, Karnataka',
    skills: ['Kubernetes', 'Docker', 'AWS', 'Terraform'],
    isMentor: true,
    mutualConnections: 5,
    mentoringRate: '₹2500/hr',
    bio: 'Infrastructure specialist building fintech platforms. Expert in cloud-native technologies.'
  },
  {
    id: '5',
    name: 'Kavya Iyer',
    role: 'UX Designer',
    company: 'Swiggy',
    avatar: 'https://images.unsplash.com/photo-1653671832574-029b950a5749?w=150&h=150&fit=crop&crop=face',
    rating: 4.8,
    location: 'Bengaluru, Karnataka',
    skills: ['Figma', 'User Research', 'Prototyping'],
    isMentor: false,
    mutualConnections: 3,
    bio: 'Product designer creating delightful user experiences for food delivery.'
  }
];

export default function MyNetwork() {
  const [activeTab, setActiveTab] = useState('connections');
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConnection, setSelectedConnection] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleConnect = (userId: string) => {
    toast.success('Connection request sent!');
  };

  const handleMessage = (userId: string) => {
    toast.success('Opening chat...');
  };

  const filteredConnections = mockConnections.filter(connection =>
    connection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    connection.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    connection.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const ConnectionCard = ({ connection, isDiscovery = false }: { connection: any; isDiscovery?: boolean }) => (
    <Card className="bg-card/50 border-border hover:border-primary/50 transition-all duration-300 group">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={connection.avatar} />
            <AvatarFallback className="bg-primary text-white">
              {connection.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-white group-hover:text-primary transition-colors">
                  {connection.name}
                </h3>
                <p className="text-sm text-gray-300">{connection.role}</p>
                <p className="text-sm text-gray-400">{connection.company}</p>
              </div>
              {connection.isMentor && (
                <Badge className="bg-primary/20 text-primary border-primary/30">
                  Mentor
                </Badge>
              )}
            </div>

            <div className="flex items-center space-x-4 text-xs text-gray-400 mb-3">
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span>{connection.location}</span>
              </div>
              {connection.rating && (
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-400" />
                  <span>{connection.rating}</span>
                </div>
              )}
              {isDiscovery && connection.mutualConnections && (
                <div className="flex items-center space-x-1">
                  <Users className="w-3 h-3" />
                  <span>{connection.mutualConnections} mutual</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-1 mb-4">
              {connection.skills.slice(0, 3).map((skill: string) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {connection.skills.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{connection.skills.length - 3}
                </Badge>
              )}
            </div>

            <div className="flex space-x-2">
              {isDiscovery ? (
                <>
                  <Button 
                    size="sm" 
                    onClick={() => handleConnect(connection.id)}
                    className="flex items-center space-x-1"
                  >
                    <UserPlus className="w-3 h-3" />
                    <span>Connect</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedConnection(connection)}
                  >
                    View Profile
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    size="sm" 
                    onClick={() => handleMessage(connection.id)}
                    className="flex items-center space-x-1"
                  >
                    <MessageCircle className="w-3 h-3" />
                    <span>Message</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedConnection(connection)}
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const ConnectionModal = () => (
    <Dialog open={!!selectedConnection} onOpenChange={() => setSelectedConnection(null)}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{selectedConnection?.name}</span>
            {!isEditing && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-1"
              >
                <Edit className="w-3 h-3" />
                <span>Edit</span>
              </Button>
            )}
          </DialogTitle>
        </DialogHeader>
        
        {selectedConnection && (
          <div className="space-y-6">
            <div className="flex items-start space-x-6">
              <Avatar className="w-20 h-20">
                <AvatarImage src={selectedConnection.avatar} />
                <AvatarFallback className="bg-primary text-white text-lg">
                  {selectedConnection.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-2">
                <div>
                  <h2 className="text-xl font-semibold text-white">{selectedConnection.name}</h2>
                  <p className="text-gray-300">{selectedConnection.role}</p>
                  <p className="text-gray-400">{selectedConnection.company}</p>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{selectedConnection.location}</span>
                  </div>
                  {selectedConnection.rating && (
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-400" />
                      <span>{selectedConnection.rating}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300">Email</label>
                    <Input 
                      defaultValue={selectedConnection.email} 
                      className="bg-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300">Phone</label>
                    <Input 
                      defaultValue={selectedConnection.phone} 
                      className="bg-input"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300">LinkedIn</label>
                    <Input 
                      defaultValue={selectedConnection.linkedIn} 
                      className="bg-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300">GitHub</label>
                    <Input 
                      defaultValue={selectedConnection.github} 
                      className="bg-input"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Notes</label>
                  <textarea 
                    className="w-full p-3 rounded-lg bg-input border border-border text-white resize-none"
                    rows={3}
                    placeholder="Add personal notes about this connection..."
                    defaultValue={selectedConnection.bio}
                  />
                </div>

                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditing(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={() => {
                      setIsEditing(false);
                      toast.success('Connection updated successfully!');
                    }}
                    className="flex-1"
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-white mb-2">About</h3>
                  <p className="text-gray-300">{selectedConnection.bio}</p>
                </div>

                <div>
                  <h3 className="font-medium text-white mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedConnection.skills.map((skill: string) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-white mb-2">Contact Information</h3>
                  <div className="space-y-2">
                    {selectedConnection.email && (
                      <div className="flex items-center space-x-2 text-sm text-gray-300">
                        <Mail className="w-4 h-4" />
                        <span>{selectedConnection.email}</span>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                    {selectedConnection.phone && (
                      <div className="flex items-center space-x-2 text-sm text-gray-300">
                        <Phone className="w-4 h-4" />
                        <span>{selectedConnection.phone}</span>
                      </div>
                    )}
                    {selectedConnection.linkedIn && (
                      <div className="flex items-center space-x-2 text-sm text-gray-300">
                        <ExternalLink className="w-4 h-4" />
                        <span>{selectedConnection.linkedIn}</span>
                      </div>
                    )}
                  </div>
                </div>

                {selectedConnection.connectedDate && (
                  <div>
                    <h3 className="font-medium text-white mb-2">Connection Details</h3>
                    <div className="space-y-1 text-sm text-gray-300">
                      <p>Connected since: {new Date(selectedConnection.connectedDate).toLocaleDateString()}</p>
                      <p>Last interaction: {selectedConnection.lastInteraction}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-white mb-2">My Network</h1>
            <p className="text-gray-300">Manage and grow your professional connections</p>
          </motion.div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center bg-card/50 rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-primary/20 to-accent/20 border-primary/30">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{mockConnections.length}</p>
                  <p className="text-gray-300 text-sm">Total Connections</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <Star className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{mockConnections.filter(c => c.isMentor).length}</p>
                  <p className="text-gray-300 text-sm">Mentors</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-500/30">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <MessageCircle className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">24</p>
                  <p className="text-gray-300 text-sm">Active Chats</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search your network..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-input"
              />
            </div>
          </div>
          <Button variant="outline" className="flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-card/50">
            <TabsTrigger value="connections" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              My Connections ({mockConnections.length})
            </TabsTrigger>
            <TabsTrigger value="discover" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Discover People ({discoveryUsers.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="connections">
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
              {filteredConnections.map((connection, index) => (
                <motion.div
                  key={connection.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ConnectionCard connection={connection} />
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="discover">
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
              {discoveryUsers.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ConnectionCard connection={user} isDiscovery={true} />
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <ConnectionModal />
    </div>
  );
}