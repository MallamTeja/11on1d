import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Code, 
  Trophy, 
  TrendingUp, 
  Calendar,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  UserPlus,
  Settings,
  BarChart3,
  PieChart,
  Activity,
  Clock
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, LineChart, Line, Area, AreaChart, Pie } from 'recharts';

// Mock data for charts
const userGrowthData = [
  { month: 'Jan', students: 120, mentors: 15, total: 135 },
  { month: 'Feb', students: 180, mentors: 22, total: 202 },
  { month: 'Mar', students: 250, mentors: 28, total: 278 },
  { month: 'Apr', students: 320, mentors: 35, total: 355 },
  { month: 'May', students: 420, mentors: 45, total: 465 },
  { month: 'Jun', students: 580, mentors: 52, total: 632 }
];

const problemDifficultyData = [
  { name: 'Easy', value: 45, color: '#10B981' },
  { name: 'Medium', value: 35, color: '#F59E0B' },
  { name: 'Hard', value: 20, color: '#EF4444' }
];

const activityData = [
  { day: 'Mon', problems: 324, sessions: 89, submissions: 156 },
  { day: 'Tue', problems: 298, sessions: 95, submissions: 142 },
  { day: 'Wed', problems: 356, sessions: 102, submissions: 178 },
  { day: 'Thu', problems: 402, sessions: 87, submissions: 201 },
  { day: 'Fri', problems: 378, sessions: 110, submissions: 189 },
  { day: 'Sat', problems: 289, sessions: 76, submissions: 134 },
  { day: 'Sun', problems: 245, sessions: 68, submissions: 98 }
];

// Mock users data
const mockUsers = [
  {
    id: '1',
    name: 'Arjun Patel',
    email: 'arjun.patel@gmail.com',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1681164315430-6159b2361615?w=150&h=150&fit=crop&crop=face',
    joinDate: '2024-01-15',
    lastActive: '2 hours ago',
    problemsSolved: 47,
    status: 'active'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya.sharma@flipkart.com',
    role: 'mentor',
    avatar: 'https://images.unsplash.com/photo-1653671832574-029b950a5749?w=150&h=150&fit=crop&crop=face',
    joinDate: '2024-01-10',
    lastActive: '1 hour ago',
    problemsSolved: 234,
    status: 'active',
    rating: 4.9,
    sessions: 45
  },
  {
    id: '3',
    name: 'Vikash Kumar',
    email: 'vikash.kumar@zomato.com',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1681165232934-c09dfa5ee694?w=150&h=150&fit=crop&crop=face',
    joinDate: '2024-02-01',
    lastActive: '1 day ago',
    problemsSolved: 23,
    status: 'inactive'
  },
  {
    id: '4',
    name: 'Ananya Singh',
    email: 'ananya.singh@byjus.com',
    role: 'mentor',
    avatar: 'https://images.unsplash.com/photo-1681165232934-c09dfa5ee694?w=150&h=150&fit=crop&crop=face',
    joinDate: '2024-01-20',
    lastActive: '30 min ago',
    problemsSolved: 189,
    status: 'active',
    rating: 4.8,
    sessions: 38
  }
];

const mockProblems = [
  {
    id: 'p1',
    title: 'Indian Railway Platform Problem',
    difficulty: 'Easy',
    category: 'Array',
    submissions: 1247,
    successRate: 85,
    avgTime: '8:30',
    createdBy: 'System',
    status: 'active'
  },
  {
    id: 'p2',
    title: 'Mumbai Local Train Scheduler',
    difficulty: 'Medium',
    category: 'Graph',
    submissions: 892,
    successRate: 67,
    avgTime: '15:45',
    createdBy: 'Admin',
    status: 'active'
  },
  {
    id: 'p3',
    title: 'Bangalore Traffic Optimization',
    difficulty: 'Hard',
    category: 'DP',
    submissions: 234,
    successRate: 34,
    avgTime: '35:20',
    createdBy: 'Admin',
    status: 'draft'
  }
];

export default function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [userFilter, setUserFilter] = useState('all');

  const stats = {
    totalUsers: 632,
    activeUsers: 489,
    totalProblems: 156,
    totalSessions: 1247,
    avgRating: 4.7,
    completionRate: 73
  };

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = userFilter === 'all' || 
                         (userFilter === 'students' && user.role === 'student') ||
                         (userFilter === 'mentors' && user.role === 'mentor') ||
                         (userFilter === 'active' && user.status === 'active') ||
                         (userFilter === 'inactive' && user.status === 'inactive');
    
    return matchesSearch && matchesFilter;
  });

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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl text-white mb-2">Admin Dashboard</h1>
              <p className="text-blue-200">Monitor platform performance and manage users</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white">
                <UserPlus className="w-4 h-4 mr-2" />
                Add User
              </Button>
              <Button variant="ghost" className="text-blue-300 hover:text-white hover:bg-white/10">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-lg border border-white/20">
            <TabsTrigger value="overview" className="text-white data-[state=active]:bg-white/20">
              Overview
            </TabsTrigger>
            <TabsTrigger value="users" className="text-white data-[state=active]:bg-white/20">
              Users
            </TabsTrigger>
            <TabsTrigger value="problems" className="text-white data-[state=active]:bg-white/20">
              Problems
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-white data-[state=active]:bg-white/20">
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300">
                  <CardContent className="p-4 text-center">
                    <Users className="w-8 h-8 text-blue-300 mx-auto mb-2" />
                    <div className="text-2xl text-white">{stats.totalUsers}</div>
                    <div className="text-xs text-blue-200">Total Users</div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300">
                  <CardContent className="p-4 text-center">
                    <Activity className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <div className="text-2xl text-white">{stats.activeUsers}</div>
                    <div className="text-xs text-blue-200">Active Users</div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300">
                  <CardContent className="p-4 text-center">
                    <Code className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <div className="text-2xl text-white">{stats.totalProblems}</div>
                    <div className="text-xs text-blue-200">Problems</div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300">
                  <CardContent className="p-4 text-center">
                    <Calendar className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                    <div className="text-2xl text-white">{stats.totalSessions}</div>
                    <div className="text-xs text-blue-200">Sessions</div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300">
                  <CardContent className="p-4 text-center">
                    <Trophy className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                    <div className="text-2xl text-white">{stats.avgRating}</div>
                    <div className="text-xs text-blue-200">Avg Rating</div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300">
                  <CardContent className="p-4 text-center">
                    <TrendingUp className="w-8 h-8 text-pink-400 mx-auto mb-2" />
                    <div className="text-2xl text-white">{stats.completionRate}%</div>
                    <div className="text-xs text-blue-200">Completion</div>
                  </CardContent>
                </Card>
              </div>

              {/* Charts */}
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                  <CardHeader>
                    <CardTitle className="flex items-center text-white">
                      <BarChart3 className="w-5 h-5 mr-2 text-blue-300" />
                      User Growth
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={userGrowthData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                        <XAxis dataKey="month" stroke="#a5b4fc" />
                        <YAxis stroke="#a5b4fc" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '8px',
                            color: '#ffffff'
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="total"
                          stroke="#3B82F6"
                          fill="url(#colorGradient)"
                          strokeWidth={2}
                        />
                        <defs>
                          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                  <CardHeader>
                    <CardTitle className="flex items-center text-white">
                      <PieChart className="w-5 h-5 mr-2 text-blue-300" />
                      Problem Difficulty
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <RechartsPieChart>
                        <Pie
                          data={problemDifficultyData}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {problemDifficultyData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Search and Filters */}
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5" />
                      <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-blue-300 focus:border-blue-400"
                      />
                    </div>
                    
                    <Select value={userFilter} onValueChange={setUserFilter}>
                      <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="students">Students</SelectItem>
                        <SelectItem value="mentors">Mentors</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="mt-4 text-blue-200 text-sm">
                    <Users className="w-4 h-4 inline mr-2" />
                    {filteredUsers.length} users found
                  </div>
                </CardContent>
              </Card>

              {/* Users Table */}
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/20">
                        <TableHead className="text-blue-200">User</TableHead>
                        <TableHead className="text-blue-200">Role</TableHead>
                        <TableHead className="text-blue-200">Joined</TableHead>
                        <TableHead className="text-blue-200">Last Active</TableHead>
                        <TableHead className="text-blue-200">Problems</TableHead>
                        <TableHead className="text-blue-200">Status</TableHead>
                        <TableHead className="text-blue-200">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id} className="border-white/20 hover:bg-white/5">
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar className="w-10 h-10">
                                <AvatarImage src={user.avatar} />
                                <AvatarFallback className="bg-blue-500 text-white">
                                  {user.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="text-white">{user.name}</div>
                                <div className="text-blue-300 text-sm">{user.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={
                              user.role === 'mentor' 
                                ? 'bg-purple-500/20 text-purple-300 border-purple-400/30'
                                : 'bg-blue-500/20 text-blue-300 border-blue-400/30'
                            }>
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-blue-200">{user.joinDate}</TableCell>
                          <TableCell className="text-blue-200">{user.lastActive}</TableCell>
                          <TableCell className="text-white">{user.problemsSolved}</TableCell>
                          <TableCell>
                            <Badge className={
                              user.status === 'active'
                                ? 'bg-green-500/20 text-green-300 border-green-400/30'
                                : 'bg-gray-500/20 text-gray-300 border-gray-400/30'
                            }>
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button size="sm" variant="ghost" className="text-blue-300 hover:text-white hover:bg-white/10">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="text-blue-300 hover:text-white hover:bg-white/10">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Problems Tab */}
          <TabsContent value="problems" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-white">
                    <div className="flex items-center">
                      <Code className="w-5 h-5 mr-2 text-blue-300" />
                      Problems Management
                    </div>
                    <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400 text-white">
                      Add Problem
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/20">
                        <TableHead className="text-blue-200">Problem</TableHead>
                        <TableHead className="text-blue-200">Difficulty</TableHead>
                        <TableHead className="text-blue-200">Category</TableHead>
                        <TableHead className="text-blue-200">Submissions</TableHead>
                        <TableHead className="text-blue-200">Success Rate</TableHead>
                        <TableHead className="text-blue-200">Avg Time</TableHead>
                        <TableHead className="text-blue-200">Status</TableHead>
                        <TableHead className="text-blue-200">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockProblems.map((problem) => (
                        <TableRow key={problem.id} className="border-white/20 hover:bg-white/5">
                          <TableCell className="text-white">{problem.title}</TableCell>
                          <TableCell>
                            <Badge className={
                              problem.difficulty === 'Easy' ? 'bg-green-500/20 text-green-300 border-green-400/30' :
                              problem.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30' :
                              'bg-red-500/20 text-red-300 border-red-400/30'
                            }>
                              {problem.difficulty}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-blue-200">{problem.category}</TableCell>
                          <TableCell className="text-white">{problem.submissions}</TableCell>
                          <TableCell className="text-white">{problem.successRate}%</TableCell>
                          <TableCell className="text-blue-200">{problem.avgTime}</TableCell>
                          <TableCell>
                            <Badge className={
                              problem.status === 'active'
                                ? 'bg-green-500/20 text-green-300 border-green-400/30'
                                : 'bg-gray-500/20 text-gray-300 border-gray-400/30'
                            }>
                              {problem.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button size="sm" variant="ghost" className="text-blue-300 hover:text-white hover:bg-white/10">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="text-blue-300 hover:text-white hover:bg-white/10">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Activity className="w-5 h-5 mr-2 text-blue-300" />
                    Weekly Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={activityData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                      <XAxis dataKey="day" stroke="#a5b4fc" />
                      <YAxis stroke="#a5b4fc" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(0, 0, 0, 0.8)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          borderRadius: '8px',
                          color: '#ffffff'
                        }}
                      />
                      <Bar dataKey="problems" fill="#3B82F6" name="Problems Solved" />
                      <Bar dataKey="sessions" fill="#8B5CF6" name="Mentoring Sessions" />
                      <Bar dataKey="submissions" fill="#10B981" name="Code Submissions" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}