import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Trophy, 
  Star, 
  Zap, 
  Target, 
  Code, 
  Users, 
  Clock, 
  Award,
  Filter,
  Search,
  Sparkles,
  Crown,
  Flame,
  Shield
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

// Mock badges data
const badgeCategories = [
  {
    name: 'Problem Solving',
    badges: [
      {
        id: 'first-solve',
        name: 'Railway Solver',
        description: 'Solved your first Indian Railway platform problem',
        icon: '🚂',
        rarity: 'bronze',
        earned: true,
        earnedDate: '2024-01-15',
        progress: 100,
        requirements: 'Solve 1 railway problem'
      },
      {
        id: 'problem-crusher',
        name: 'Code Samurai',
        description: 'Mastered 50 Indian coding challenges',
        icon: '🥷',
        rarity: 'silver',
        earned: true,
        earnedDate: '2024-02-20',
        progress: 100,
        requirements: 'Solve 50 Indian context problems'
      },
      {
        id: 'algorithm-master',
        name: 'Tech Maharaja',
        description: 'Conquered 100 advanced algorithms',
        icon: '👑',
        rarity: 'gold',
        earned: false,
        progress: 73,
        requirements: 'Solve 100 algorithmic problems'
      },
      {
        id: 'legendary-coder',
        name: 'Silicon Valley Ready',
        description: 'Completed 500 problems - ready for top tech companies',
        icon: '🚀',
        rarity: 'legendary',
        earned: false,
        progress: 15,
        requirements: 'Solve 500 problems'
      }
    ]
  },
  {
    name: 'Speed & Efficiency',
    badges: [
      {
        id: 'speed-demon',
        name: 'Speed Demon',
        description: 'Solved a problem in under 5 minutes',
        icon: '⚡',
        rarity: 'bronze',
        earned: true,
        earnedDate: '2024-01-22',
        progress: 100,
        requirements: 'Solve in < 5 minutes'
      },
      {
        id: 'lightning-fast',
        name: 'Lightning Fast',
        description: 'Solved 10 problems in under 10 minutes each',
        icon: '🌟',
        rarity: 'silver',
        earned: false,
        progress: 60,
        requirements: 'Solve 10 problems < 10 min each'
      },
      {
        id: 'time-master',
        name: 'Time Master',
        description: 'Completed a timed assignment with perfect score',
        icon: '⏰',
        rarity: 'gold',
        earned: false,
        progress: 0,
        requirements: 'Perfect score on timed assignment'
      }
    ]
  },
  {
    name: 'Mentorship',
    badges: [
      {
        id: 'helpful-peer',
        name: 'Community Helper',
        description: 'Helped 10 junior developers in their coding journey',
        icon: '🤝',
        rarity: 'bronze',
        earned: true,
        earnedDate: '2024-02-10',
        progress: 100,
        requirements: 'Help 10 junior developers'
      },
      {
        id: 'mentor',
        name: 'Senior Developer',
        description: 'Successfully mentored 25 coding sessions',
        icon: '🎓',
        rarity: 'silver',
        earned: true,
        earnedDate: '2024-02-28',
        progress: 100,
        requirements: 'Complete 25 mentoring sessions'
      },
      {
        id: 'guru',
        name: 'Tech Lead',
        description: 'Achieved 4.8+ average rating as senior mentor',
        icon: '🏆',
        rarity: 'gold',
        earned: false,
        progress: 85,
        requirements: 'Maintain 4.8+ mentor rating'
      }
    ]
  },
  {
    name: 'Consistency',
    badges: [
      {
        id: 'week-streak',
        name: 'Week Warrior',
        description: 'Coded for 7 days straight',
        icon: '🔥',
        rarity: 'bronze',
        earned: true,
        earnedDate: '2024-01-28',
        progress: 100,
        requirements: '7 day streak'
      },
      {
        id: 'month-streak',
        name: 'Month Champion',
        description: 'Coded for 30 days straight',
        icon: '📅',
        rarity: 'silver',
        earned: false,
        progress: 47,
        requirements: '30 day streak'
      },
      {
        id: 'year-streak',
        name: 'Unstoppable',
        description: 'Coded for 365 days straight',
        icon: '🌟',
        rarity: 'legendary',
        earned: false,
        progress: 12,
        requirements: '365 day streak'
      }
    ]
  }
];

export default function BadgesGallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRarity, setFilterRarity] = useState('all');

  const allBadges = badgeCategories.flatMap(category => 
    category.badges.map(badge => ({ ...badge, category: category.name }))
  );

  const filteredBadges = allBadges.filter(badge => {
    const matchesSearch = badge.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         badge.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
                           badge.category === selectedCategory;
    
    const matchesRarity = filterRarity === 'all' || badge.rarity === filterRarity;
    
    return matchesSearch && matchesCategory && matchesRarity;
  });

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'bronze': return 'from-amber-600 to-orange-700';
      case 'silver': return 'from-gray-400 to-gray-600';
      case 'gold': return 'from-yellow-400 to-yellow-600';
      case 'legendary': return 'from-purple-500 to-pink-500';
      default: return 'from-blue-400 to-blue-600';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'bronze': return 'border-orange-500/50';
      case 'silver': return 'border-gray-400/50';
      case 'gold': return 'border-yellow-400/50';
      case 'legendary': return 'border-purple-500/50';
      default: return 'border-blue-400/50';
    }
  };

  const earnedBadges = allBadges.filter(badge => badge.earned);
  const totalProgress = allBadges.reduce((sum, badge) => sum + badge.progress, 0) / allBadges.length;

  const BadgeCard = ({ badge }: { badge: any }) => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ 
        scale: 1.05, 
        rotateY: badge.earned ? 5 : 0,
        z: 50 
      }}
      className="group relative"
    >
      <Card className={`bg-white/10 backdrop-blur-lg border-2 transition-all duration-500 overflow-hidden ${
        badge.earned 
          ? `${getRarityBorder(badge.rarity)} hover:shadow-2xl hover:shadow-${badge.rarity === 'gold' ? 'yellow' : badge.rarity === 'legendary' ? 'purple' : 'blue'}-500/25` 
          : 'border-white/20 opacity-60 hover:opacity-80'
      }`}>
        {/* Glow effect for earned badges */}
        {badge.earned && (
          <motion.div
            className={`absolute inset-0 bg-gradient-to-r ${getRarityColor(badge.rarity)} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
            animate={{
              opacity: [0, 0.1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}

        <CardHeader className="text-center pb-2">
          <div className="relative mx-auto w-20 h-20 mb-4">
            <motion.div
              className={`w-full h-full rounded-full bg-gradient-to-br ${getRarityColor(badge.rarity)} flex items-center justify-center text-4xl relative overflow-hidden`}
              animate={badge.earned ? {
                boxShadow: [
                  "0 0 0 0 rgba(59, 130, 246, 0)",
                  "0 0 0 10px rgba(59, 130, 246, 0.1)",
                  "0 0 0 0 rgba(59, 130, 246, 0)"
                ]
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {badge.earned && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
              )}
              <span className="relative z-10">{badge.icon}</span>
            </motion.div>
            
            {/* Legendary sparkles */}
            {badge.earned && badge.rarity === 'legendary' && (
              <div className="absolute inset-0">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-yellow-300 rounded-full"
                    style={{
                      top: `${20 + Math.sin(i) * 40}%`,
                      left: `${20 + Math.cos(i) * 40}%`,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          <CardTitle className="text-white text-lg mb-1">{badge.name}</CardTitle>
          <Badge className={`bg-gradient-to-r ${getRarityColor(badge.rarity)} text-white border-0 text-xs uppercase tracking-wide`}>
            {badge.rarity}
          </Badge>
        </CardHeader>

        <CardContent className="text-center space-y-3">
          <p className="text-blue-200 text-sm leading-relaxed">{badge.description}</p>
          
          <div className="text-xs text-blue-300 bg-white/5 rounded-lg p-2">
            {badge.requirements}
          </div>

          {badge.earned ? (
            <div className="space-y-2">
              <div className="flex items-center justify-center text-green-400 text-sm">
                <Sparkles className="w-4 h-4 mr-1" />
                Earned!
              </div>
              <div className="text-xs text-blue-300">
                {new Date(badge.earnedDate).toLocaleDateString()}
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-blue-300">
                <span>Progress</span>
                <span>{badge.progress}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${getRarityColor(badge.rarity)} rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${badge.progress}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </div>
          )}
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
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl text-white mb-2">Badges & Achievements</h1>
              <p className="text-blue-200">Showcase your coding journey and accomplishments</p>
            </div>
            <div className="text-right">
              <div className="text-blue-200 text-sm">Overall Progress</div>
              <div className="text-2xl text-white">{Math.round(totalProgress)}%</div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardContent className="p-4 text-center">
                <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl text-white">{earnedBadges.length}</div>
                <div className="text-xs text-blue-200">Badges Earned</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardContent className="p-4 text-center">
                <Crown className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl text-white">
                  {earnedBadges.filter(b => b.rarity === 'legendary').length}
                </div>
                <div className="text-xs text-blue-200">Legendary</div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardContent className="p-4 text-center">
                <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-2xl text-white">
                  {earnedBadges.filter(b => b.rarity === 'gold').length}
                </div>
                <div className="text-xs text-blue-200">Gold</div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardContent className="p-4 text-center">
                <Flame className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                <div className="text-2xl text-white">47</div>
                <div className="text-xs text-blue-200">Day Streak</div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Filters */}
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
                placeholder="Search badges..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-blue-300 focus:border-blue-400"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="all">All Categories</SelectItem>
                  {badgeCategories.map(category => (
                    <SelectItem key={category.name} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterRarity} onValueChange={setFilterRarity}>
                <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="all">All Rarity</SelectItem>
                  <SelectItem value="bronze">Bronze</SelectItem>
                  <SelectItem value="silver">Silver</SelectItem>
                  <SelectItem value="gold">Gold</SelectItem>
                  <SelectItem value="legendary">Legendary</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4 text-blue-200 text-sm">
            <Award className="w-4 h-4 inline mr-2" />
            {filteredBadges.length} badges found
          </div>
        </motion.div>

        {/* Badges Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filteredBadges.map((badge) => (
            <BadgeCard key={badge.id} badge={badge} />
          ))}
        </motion.div>

        {/* Empty state */}
        {filteredBadges.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Trophy className="w-16 h-16 text-blue-300 mx-auto mb-4" />
            <h3 className="text-xl text-white mb-2">No badges found</h3>
            <p className="text-blue-200 max-w-md mx-auto">
              Try adjusting your search terms or filters to find more badges.
            </p>
          </motion.div>
        )}

        {/* Next Achievement Hint */}
        <motion.div
          className="mt-12 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-lg border border-purple-400/30 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white text-lg mb-2">🎯 Next Achievement</h3>
              <p className="text-blue-200 mb-2">
                You're 27 problems away from earning the <span className="text-yellow-400">Tech Maharaja</span> badge!
              </p>
              <div className="w-64 bg-white/20 rounded-full h-2 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full w-3/4" />
              </div>
            </div>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white">
              Start Coding
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}