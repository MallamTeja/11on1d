import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Play, 
  Upload, 
  Code, 
  CheckCircle, 
  XCircle, 
  Clock,
  Trophy,
  Target,
  Lightbulb,
  Settings,
  Maximize2,
  RefreshCw
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { toast } from 'sonner@2.0.3';

// Mock problem data
const mockProblem = {
  id: 1,
  title: "Indian Railway Station Problem",
  difficulty: "Easy",
  description: `Given arrival and departure times of trains at a railway station, find the minimum number of platforms required.

This is a classic problem inspired by Indian Railway systems where efficient platform allocation is crucial for managing heavy train traffic.

You need to determine the minimum platforms needed so that no two trains occupy the same platform at the same time.`,
  examples: [
    {
      input: "arrivals = [900, 940, 950], departures = [910, 1200, 1120]",
      output: "1",
      explanation: "Only one platform needed as trains don't overlap"
    },
    {
      input: "arrivals = [900, 940], departures = [950, 1200]",
      output: "2", 
      explanation: "Two platforms needed as second train arrives before first departs"
    }
  ],
  constraints: [
    "2 <= nums.length <= 104",
    "-109 <= nums[i] <= 109",
    "-109 <= target <= 109",
    "Only one valid answer exists."
  ],
  hints: [
    "A really brute force way would be to search for all possible pairs of numbers but that would be too slow. Again, it's best to try out brute force solutions for just for completeness. It is from these brute force solutions that you can come up with optimizations.",
    "So, if we fix one of the numbers, say x, we have to scan the entire array to find the next number y which is value - x where value is the input parameter. Can we change our array somehow so that this search becomes faster?",
    "The second train of thought is, without changing the array, can we use additional space somehow? Like maybe a hash map to speed up the search?"
  ],
  sampleCode: {
    javascript: `function twoSum(nums, target) {
    // Write your solution here
    
}`,
    python: `def twoSum(nums, target):
    # Write your solution here
    pass`,
    java: `public int[] twoSum(int[] nums, int target) {
    // Write your solution here
    
}`
  }
};

const testCases = [
  {
    input: "[2,7,11,15], 9",
    expected: "[0,1]",
    status: null
  },
  {
    input: "[3,2,4], 6",
    expected: "[1,2]",
    status: null
  },
  {
    input: "[3,3], 6",
    expected: "[0,1]",
    status: null
  }
];

export default function CodingPractice() {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [code, setCode] = useState(mockProblem.sampleCode.javascript);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testResults, setTestResults] = useState(testCases);
  const [showHints, setShowHints] = useState(false);
  const [executionTime, setExecutionTime] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState(0);

  useEffect(() => {
    setCode(mockProblem.sampleCode[selectedLanguage as keyof typeof mockProblem.sampleCode]);
  }, [selectedLanguage]);

  const handleRun = async () => {
    setIsRunning(true);
    
    // Simulate code execution
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock test results
    const results = testResults.map((test, index) => ({
      ...test,
      status: Math.random() > 0.3 ? 'passed' : 'failed'
    }));
    
    setTestResults(results);
    setExecutionTime(Math.floor(Math.random() * 100) + 50);
    setMemoryUsage(Math.floor(Math.random() * 20) + 10);
    setIsRunning(false);
    
    const passedTests = results.filter(r => r.status === 'passed').length;
    toast.success(`${passedTests}/${results.length} test cases passed`);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const allPassed = testResults.every(test => test.status === 'passed');
    
    if (allPassed) {
      toast.success('🎉 Solution accepted! Great job!', {
        description: 'You earned 10 points and a Problem Solver badge!'
      });
    } else {
      toast.error('Some test cases failed. Please review your solution.');
    }
    
    setIsSubmitting(false);
  };

  const resetCode = () => {
    setCode(mockProblem.sampleCode[selectedLanguage as keyof typeof mockProblem.sampleCode]);
    setTestResults(testCases.map(test => ({ ...test, status: null })));
    setExecutionTime(0);
    setMemoryUsage(0);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-500/20 text-green-300 border-green-400/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30';
      case 'hard': return 'bg-red-500/20 text-red-300 border-red-400/30';
      default: return 'bg-blue-500/20 text-blue-300 border-blue-400/30';
    }
  };

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
              <h1 className="text-2xl text-white mb-2">Coding Practice</h1>
              <p className="text-blue-200">Solve problems and improve your coding skills</p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className={getDifficultyColor(mockProblem.difficulty)}>
                {mockProblem.difficulty}
              </Badge>
              <Button variant="ghost" size="sm" className="text-blue-300 hover:text-white hover:bg-white/10">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-10rem)]">
          {/* Problem Description */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Target className="w-5 h-5 mr-2 text-blue-300" />
                  {mockProblem.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-blue-100 space-y-4">
                <div className="whitespace-pre-wrap leading-relaxed">
                  {mockProblem.description}
                </div>
                
                <div className="space-y-4">
                  {mockProblem.examples.map((example, index) => (
                    <div key={index} className="bg-white/5 rounded-lg p-4">
                      <h4 className="text-white mb-2">Example {index + 1}:</h4>
                      <div className="space-y-1 font-mono text-sm">
                        <div><span className="text-blue-300">Input:</span> {example.input}</div>
                        <div><span className="text-green-300">Output:</span> {example.output}</div>
                        {example.explanation && (
                          <div><span className="text-yellow-300">Explanation:</span> {example.explanation}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <h4 className="text-white mb-2">Constraints:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {mockProblem.constraints.map((constraint, index) => (
                      <li key={index}>{constraint}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Hints */}
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle 
                  className="flex items-center justify-between text-white cursor-pointer"
                  onClick={() => setShowHints(!showHints)}
                >
                  <div className="flex items-center">
                    <Lightbulb className="w-5 h-5 mr-2 text-yellow-400" />
                    Hints ({mockProblem.hints.length})
                  </div>
                  <Button variant="ghost" size="sm">
                    {showHints ? 'Hide' : 'Show'}
                  </Button>
                </CardTitle>
              </CardHeader>
              {showHints && (
                <CardContent className="text-blue-100 space-y-3">
                  {mockProblem.hints.map((hint, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ delay: index * 0.2 }}
                      className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3"
                    >
                      <div className="flex items-start">
                        <span className="text-yellow-400 mr-2">💡</span>
                        <p className="text-sm leading-relaxed">{hint}</p>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              )}
            </Card>

            {/* Test Results */}
            {testResults.some(t => t.status) && (
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                    Test Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {testResults.map((test, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div className="space-y-1">
                        <div className="text-white text-sm">Test Case {index + 1}</div>
                        <div className="font-mono text-xs text-blue-200">
                          Input: {test.input}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {test.status === 'passed' ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : test.status === 'failed' ? (
                          <XCircle className="w-5 h-5 text-red-400" />
                        ) : null}
                        <span className={`text-sm ${
                          test.status === 'passed' ? 'text-green-400' :
                          test.status === 'failed' ? 'text-red-400' : 'text-gray-400'
                        }`}>
                          {test.status || 'Not tested'}
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  {executionTime > 0 && (
                    <div className="flex justify-between items-center pt-3 border-t border-white/20">
                      <div className="text-blue-200 text-sm">
                        <Clock className="w-4 h-4 inline mr-1" />
                        Runtime: {executionTime}ms
                      </div>
                      <div className="text-blue-200 text-sm">
                        Memory: {memoryUsage}MB
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </motion.div>

          {/* Code Editor */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 h-full flex flex-col">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center text-white">
                    <Code className="w-5 h-5 mr-2 text-blue-300" />
                    Code Editor
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                      <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        <SelectItem value="javascript">JavaScript</SelectItem>
                        <SelectItem value="python">Python</SelectItem>
                        <SelectItem value="java">Java</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      onClick={resetCode}
                      variant="ghost"
                      size="sm"
                      className="text-blue-300 hover:text-white hover:bg-white/10"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-300 hover:text-white hover:bg-white/10"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col">
                <div className="flex-1 bg-gray-900/50 border border-white/20 rounded-lg overflow-hidden">
                  <Textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Write your solution here..."
                    className="w-full h-full resize-none bg-transparent border-0 text-white font-mono text-sm p-4 focus:ring-0 focus:outline-none"
                    style={{ minHeight: '400px' }}
                  />
                </div>

                <Separator className="my-4 bg-white/20" />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Button
                      onClick={handleRun}
                      disabled={isRunning || isSubmitting}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      {isRunning ? (
                        <motion.div
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                      ) : (
                        <Play className="w-4 h-4 mr-2" />
                      )}
                      {isRunning ? 'Running...' : 'Run Code'}
                    </Button>
                    
                    <Button
                      onClick={handleSubmit}
                      disabled={isSubmitting || isRunning}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white"
                    >
                      {isSubmitting ? (
                        <motion.div
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                      ) : (
                        <Upload className="w-4 h-4 mr-2" />
                      )}
                      {isSubmitting ? 'Submitting...' : 'Submit'}
                    </Button>
                  </div>

                  <div className="flex items-center text-blue-200 text-sm">
                    <Trophy className="w-4 h-4 mr-1" />
                    10 points
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}