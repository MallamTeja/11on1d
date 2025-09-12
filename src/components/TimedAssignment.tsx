import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Clock, 
  CheckCircle, 
  Circle, 
  AlertTriangle, 
  Play, 
  Pause,
  RotateCcw,
  Flag,
  Trophy,
  Target,
  Code,
  Timer
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { toast } from 'sonner@2.0.3';

// Mock assignment data
const mockAssignment = {
  id: 'assignment-1',
  title: 'Indian IT Company Assessment - TCS CodeVita Style',
  description: 'Complete 6 coding problems within 90 minutes. This assignment tests your knowledge of arrays, strings, trees, and DP - similar to TCS, Infosys, and Wipro coding rounds.',
  timeLimit: 90, // minutes
  totalProblems: 6,
  points: 100,
  problems: [
    {
      id: 1,
      title: 'Train Platform Problem',
      difficulty: 'Easy',
      points: 10,
      status: 'completed',
      timeSpent: '12:30'
    },
    {
      id: 2,
      title: 'Cricket Tournament Scheduler',
      difficulty: 'Easy', 
      points: 10,
      status: 'completed',
      timeSpent: '8:45'
    },
    {
      id: 3,
      title: 'Merge Two Sorted Lists',
      difficulty: 'Easy',
      points: 15,
      status: 'attempted',
      timeSpent: '12:20'
    },
    {
      id: 4,
      title: 'Binary Tree Inorder Traversal',
      difficulty: 'Medium',
      points: 20,
      status: 'viewing',
      timeSpent: '3:15'
    },
    {
      id: 5,
      title: 'Longest Palindromic Substring',
      difficulty: 'Medium',
      points: 25,
      status: 'not_started',
      timeSpent: '0:00'
    },
    {
      id: 6,
      title: 'Edit Distance',
      difficulty: 'Hard',
      points: 30,
      status: 'not_started',
      timeSpent: '0:00'
    }
  ]
};

export default function TimedAssignment() {
  const [timeRemaining, setTimeRemaining] = useState(60 * 60); // 60 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [problems, setProblems] = useState(mockAssignment.problems);
  const [currentProblem, setCurrentProblem] = useState(mockAssignment.problems[3]); // Currently viewing problem 4

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && !isPaused && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(time => time - 1);
      }, 1000);
    }
    
    if (timeRemaining === 0) {
      setIsActive(false);
      toast.error('⏰ Time\'s up! Assignment has been auto-submitted.');
    }
    
    return () => clearInterval(interval);
  }, [isActive, isPaused, timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    const percentage = (timeRemaining / (60 * 60)) * 100;
    if (percentage <= 10) return 'text-red-400';
    if (percentage <= 25) return 'text-yellow-400';
    return 'text-green-400';
  };

  const startTimer = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsPaused(!isPaused);
  };

  const resetTimer = () => {
    setTimeRemaining(60 * 60);
    setIsActive(false);
    setIsPaused(false);
  };

  const submitAssignment = () => {
    setIsActive(false);
    const completedProblems = problems.filter(p => p.status === 'completed').length;
    const totalPoints = problems
      .filter(p => p.status === 'completed')
      .reduce((sum, p) => sum + p.points, 0);
    
    toast.success(`🎉 Assignment submitted! ${completedProblems}/${problems.length} problems completed. Score: ${totalPoints}/${mockAssignment.points} points`);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'attempted':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'viewing':
        return <Code className="w-5 h-5 text-blue-400" />;
      default:
        return <Circle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-500/20 text-green-300 border-green-400/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30';
      case 'hard': return 'bg-red-500/20 text-red-300 border-red-400/30';
      default: return 'bg-blue-500/20 text-blue-300 border-blue-400/30';
    }
  };

  const completedProblems = problems.filter(p => p.status === 'completed').length;
  const totalPoints = problems
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.points, 0);
  const progressPercentage = (completedProblems / problems.length) * 100;

  return (
    <div className="min-h-screen pt-4 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl text-white mb-2">{mockAssignment.title}</h1>
              <p className="text-blue-200">{mockAssignment.description}</p>
            </div>
            <div className="text-right">
              <div className="text-blue-200 text-sm">Total Points</div>
              <div className="text-2xl text-white">{mockAssignment.points}</div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Timer and Progress */}
          <motion.div
            className="lg:col-span-1 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Timer Card */}
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center justify-center text-white">
                  <Timer className="w-5 h-5 mr-2 text-blue-300" />
                  Time Remaining
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <motion.div
                  className={`text-6xl ${getTimerColor()} transition-colors duration-300`}
                  animate={{
                    scale: timeRemaining <= 300 && timeRemaining % 2 === 0 ? 1.05 : 1
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {formatTime(timeRemaining)}
                </motion.div>
                
                {/* Circular Progress */}
                <div className="relative w-32 h-32 mx-auto">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-white/20"
                    />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className={getTimerColor()}
                      strokeLinecap="round"
                      initial={{ strokeDasharray: "283 283", strokeDashoffset: 283 }}
                      animate={{
                        strokeDashoffset: 283 - (timeRemaining / (60 * 60)) * 283
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Clock className={`w-8 h-8 ${getTimerColor()}`} />
                  </div>
                </div>

                {/* Timer Controls */}
                <div className="flex justify-center space-x-2">
                  {!isActive ? (
                    <Button
                      onClick={startTimer}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start
                    </Button>
                  ) : (
                    <Button
                      onClick={pauseTimer}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white"
                    >
                      <Pause className="w-4 h-4 mr-2" />
                      {isPaused ? 'Resume' : 'Pause'}
                    </Button>
                  )}
                  
                  <Button
                    onClick={resetTimer}
                    variant="ghost"
                    className="text-blue-300 hover:text-white hover:bg-white/10"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>

                {/* Warning for low time */}
                {timeRemaining <= 300 && (
                  <Alert className="bg-red-500/20 border-red-400/30 text-red-300">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      Less than 5 minutes remaining!
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Progress Overview */}
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Target className="w-5 h-5 mr-2 text-blue-300" />
                  Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-200">Problems Completed</span>
                    <span className="text-white">{completedProblems}/{problems.length}</span>
                  </div>
                  <Progress value={progressPercentage} className="bg-white/20" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-200">Points Earned</span>
                    <span className="text-white">{totalPoints}/{mockAssignment.points}</span>
                  </div>
                  <Progress value={(totalPoints / mockAssignment.points) * 100} className="bg-white/20" />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="text-center">
                    <div className="text-2xl text-green-400">{completedProblems}</div>
                    <div className="text-xs text-blue-200">Solved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl text-yellow-400">
                      {problems.filter(p => p.status === 'attempted').length}
                    </div>
                    <div className="text-xs text-blue-200">Attempted</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <Button
              onClick={submitAssignment}
              className={`w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white py-3 ${
                timeRemaining <= 300 ? 'animate-pulse' : ''
              }`}
            >
              <Flag className="w-5 h-5 mr-2" />
              Submit Assignment
            </Button>
          </motion.div>

          {/* Problems List */}
          <motion.div
            className="lg:col-span-2 space-y-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-white">
                  <div className="flex items-center">
                    <Code className="w-5 h-5 mr-2 text-blue-300" />
                    Problems ({completedProblems}/{problems.length} completed)
                  </div>
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30">
                    <Trophy className="w-4 h-4 mr-1" />
                    {totalPoints} pts
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {problems.map((problem, index) => (
                    <motion.div
                      key={problem.id}
                      className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                        problem.status === 'viewing'
                          ? 'bg-blue-500/20 border-blue-400/50'
                          : 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/30'
                      }`}
                      onClick={() => setCurrentProblem(problem)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(problem.status)}
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="text-white">
                                {index + 1}. {problem.title}
                              </h3>
                              <Badge className={getDifficultyColor(problem.difficulty)}>
                                {problem.difficulty}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-4 mt-1">
                              <span className="text-blue-200 text-sm">
                                {problem.points} points
                              </span>
                              <span className="text-blue-300 text-sm">
                                Time: {problem.timeSpent}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          {problem.status === 'completed' && (
                            <Badge className="bg-green-500/20 text-green-300 border-green-400/30">
                              ✓ Solved
                            </Badge>
                          )}
                          {problem.status === 'attempted' && (
                            <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-400/30">
                              ⚠ Incomplete
                            </Badge>
                          )}
                          {problem.status === 'viewing' && (
                            <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30">
                              👁 Viewing
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Progress bar for current problem */}
                      {problem.status === 'attempted' && (
                        <div className="mt-3">
                          <div className="flex justify-between text-xs text-blue-300 mb-1">
                            <span>Progress</span>
                            <span>60%</span>
                          </div>
                          <Progress value={60} className="bg-white/20" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Current Problem Preview */}
            {currentProblem && (
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">
                    Currently Viewing: {currentProblem.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-blue-100">
                  <p>This is where the full problem statement would be displayed with examples, constraints, and a code editor interface.</p>
                  <div className="mt-4 flex space-x-3">
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                      <Play className="w-4 h-4 mr-2" />
                      Start Solving
                    </Button>
                    <Button variant="ghost" className="text-blue-300 hover:text-white hover:bg-white/10">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}