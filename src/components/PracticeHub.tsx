import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code, 
  Clock, 
  Trophy, 
  User, 
  Play,
  CheckCircle,
  XCircle,
  Star,
  Timer,
  Brain,
  Target,
  BookOpen,
  Zap,
  TrendingUp,
  Award,
  Users,
  ArrowRight
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { useAuth } from '../App';

// Mock data for coding problems
const codingProblems = [
  {
    id: 1,
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Array',
    timeEstimate: '15 min',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    solved: true,
    attempts: 3,
    acceptance: 85,
    tags: ['Array', 'Hash Table']
  },
  {
    id: 2,
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    category: 'String',
    timeEstimate: '30 min',
    description: 'Given a string s, find the length of the longest substring without repeating characters.',
    solved: false,
    attempts: 1,
    acceptance: 67,
    tags: ['String', 'Sliding Window']
  },
  {
    id: 3,
    title: 'Median of Two Sorted Arrays',
    difficulty: 'Hard',
    category: 'Binary Search',
    timeEstimate: '45 min',
    description: 'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.',
    solved: false,
    attempts: 0,
    acceptance: 34,
    tags: ['Binary Search', 'Divide and Conquer']
  }
];

// Mock data for assignments
const assignments = [
  {
    id: 1,
    title: 'Full Stack E-commerce Project',
    type: 'Project',
    mentor: 'Priya Sharma',
    deadline: '2024-01-25',
    timeRemaining: '5 days',
    difficulty: 'Hard',
    status: 'in-progress',
    progress: 60,
    description: 'Build a complete e-commerce application with React frontend and Node.js backend',
    requirements: ['User authentication', 'Product catalog', 'Shopping cart', 'Payment integration'],
    submitted: false
  },
  {
    id: 2,
    title: 'Algorithm Design Challenge',
    type: 'Assessment',
    mentor: 'Arjun Verma',
    deadline: '2024-01-22',
    timeRemaining: '2 days',
    difficulty: 'Medium',
    status: 'pending',
    progress: 0,
    description: 'Design and implement efficient algorithms for given problem statements',
    requirements: ['Time complexity analysis', 'Space optimization', 'Edge case handling'],
    submitted: false
  },
  {
    id: 3,
    title: 'System Design: Chat Application',
    type: 'Design',
    mentor: 'Sneha Patel',
    deadline: '2024-01-30',
    timeRemaining: '10 days',
    difficulty: 'Hard',
    status: 'not-started',
    progress: 0,
    description: 'Design a scalable real-time chat application architecture',
    requirements: ['Database design', 'API specifications', 'Scalability considerations'],
    submitted: false
  }
];

const mockStats = {
  problemsSolved: 47,
  totalProblems: 150,
  currentStreak: 12,
  longestStreak: 25,
  accuracy: 78,
  averageTime: '23 min',
  assignmentsCompleted: 8,
  totalAssignments: 12,
  avgScore: 85
};

export default function PracticeHub() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('practice');
  const [selectedProblem, setSelectedProblem] = useState<any>(null);
  const [codeSubmission, setCodeSubmission] = useState('');

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 bg-green-400/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'Hard': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress': return 'text-blue-400 bg-blue-400/20';
      case 'pending': return 'text-orange-400 bg-orange-400/20';
      case 'not-started': return 'text-gray-400 bg-gray-400/20';
      case 'completed': return 'text-green-400 bg-green-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const CodeEditor = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">{selectedProblem?.title}</h3>
        <div className="flex items-center space-x-2">
          <Badge className={getDifficultyColor(selectedProblem?.difficulty)}>
            {selectedProblem?.difficulty}
          </Badge>
          <Button variant="outline" size="sm" onClick={() => setSelectedProblem(null)}>
            Back
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle className="text-white">Problem Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">{selectedProblem?.description}</p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400">Est. Time: {selectedProblem?.timeEstimate}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400">Acceptance: {selectedProblem?.acceptance}%</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mt-3">
                {selectedProblem?.tags.map((tag: string) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle className="text-white">Code Editor</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                value={codeSubmission}
                onChange={(e) => setCodeSubmission(e.target.value)}
                className="w-full h-64 p-4 bg-background border border-border rounded-lg text-white font-mono text-sm resize-none"
                placeholder="// Write your solution here..."
              />
              <div className="flex space-x-3 mt-4">
                <Button variant="outline" size="sm">
                  <Play className="w-4 h-4 mr-2" />
                  Run Code
                </Button>
                <Button size="sm">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Submit
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  if (selectedProblem) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <CodeEditor />
        </div>
      </div>
    );
  }

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
            <h1 className="text-3xl font-bold text-white mb-2">Practice & Assignments</h1>
            <p className="text-gray-300">Sharpen your skills with coding challenges and mentor-assigned projects</p>
          </motion.div>
        </div>

        {/* Stats Overview */}
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
                    <Code className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{mockStats.problemsSolved}</p>
                    <p className="text-gray-300 text-sm">Problems Solved</p>
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
            <Card className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-green-500/20 rounded-lg">
                    <Zap className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{mockStats.currentStreak}</p>
                    <p className="text-gray-300 text-sm">Current Streak</p>
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
            <Card className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-500/30">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-blue-500/20 rounded-lg">
                    <Target className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{mockStats.accuracy}%</p>
                    <p className="text-gray-300 text-sm">Accuracy Rate</p>
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
                    <Award className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{mockStats.avgScore}</p>
                    <p className="text-gray-300 text-sm">Avg. Score</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-card/50">
            <TabsTrigger value="practice" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              <Code className="w-4 h-4 mr-2" />
              Coding Practice
            </TabsTrigger>
            <TabsTrigger value="assignments" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              <BookOpen className="w-4 h-4 mr-2" />
              Assignments
            </TabsTrigger>
          </TabsList>

          <TabsContent value="practice" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {codingProblems.map((problem, index) => (
                <motion.div
                  key={problem.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-card/50 border-border hover:border-primary/50 transition-all duration-300 cursor-pointer group">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-white group-hover:text-primary transition-colors">
                            {problem.title}
                          </h3>
                          <p className="text-sm text-gray-400 mt-1">{problem.category}</p>
                        </div>
                        {problem.solved && (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        )}
                      </div>

                      <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                        {problem.description}
                      </p>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge className={getDifficultyColor(problem.difficulty)}>
                            {problem.difficulty}
                          </Badge>
                          <div className="flex items-center space-x-2 text-xs text-gray-400">
                            <Clock className="w-3 h-3" />
                            <span>{problem.timeEstimate}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {problem.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <div className="text-xs text-gray-400">
                            {problem.attempts > 0 ? `${problem.attempts} attempts` : 'Not attempted'}
                          </div>
                          <Button 
                            size="sm" 
                            onClick={() => setSelectedProblem(problem)}
                            className="flex items-center space-x-2"
                          >
                            <Play className="w-3 h-3" />
                            <span>Solve</span>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="assignments" className="space-y-6">
            <div className="space-y-6">
              {assignments.map((assignment, index) => (
                <motion.div
                  key={assignment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-card/50 border-border hover:border-primary/50 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-white text-lg">{assignment.title}</h3>
                            <Badge className={getDifficultyColor(assignment.difficulty)}>
                              {assignment.difficulty}
                            </Badge>
                            <Badge className={getStatusColor(assignment.status)}>
                              {assignment.status.replace('-', ' ')}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <div className="flex items-center space-x-1">
                              <User className="w-3 h-3" />
                              <span>Mentor: {assignment.mentor}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Timer className="w-3 h-3" />
                              <span>Due: {assignment.timeRemaining}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-400 mb-1">Progress</div>
                          <div className="flex items-center space-x-2">
                            <Progress value={assignment.progress} className="w-20" />
                            <span className="text-sm text-white">{assignment.progress}%</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-300 mb-4">{assignment.description}</p>

                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-medium text-white mb-2">Requirements:</h4>
                          <ul className="space-y-1">
                            {assignment.requirements.map((req, i) => (
                              <li key={i} className="text-sm text-gray-300 flex items-center space-x-2">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{assignment.type}</Badge>
                            <span className="text-xs text-gray-400">
                              Deadline: {assignment.deadline}
                            </span>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                            <Button size="sm" className="flex items-center space-x-2">
                              <span>Continue</span>
                              <ArrowRight className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}