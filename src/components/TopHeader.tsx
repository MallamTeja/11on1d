import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Bell, 
  Search, 
  Settings, 
  LogOut,
  User,
  ChevronDown,
  Moon,
  Sun
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Badge } from './ui/badge';
import { useAuth } from '../App';

export default function TopHeader() {
  const { user, logout } = useAuth();
  const [notifications] = useState(3); // Mock notification count

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left side - Brand and tagline */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-xl font-bold text-white">Skill Exchange</h1>
              <p className="text-xs text-gray-400">Book 1on1 and exchange your skills with peers</p>
            </motion.div>
          </div>
        </div>

        {/* Center - Search (hidden on mobile) */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search skills, mentors, or topics..."
              className="pl-10 bg-input border-border focus:border-primary"
            />
          </div>
        </div>

        {/* Right side - Notifications and Profile */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <Button variant="ghost" size="sm" className="relative p-2">
              <Bell className="w-5 h-5 text-gray-300 hover:text-white transition-colors" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-primary text-white text-xs">
                  {notifications}
                </Badge>
              )}
            </Button>
          </div>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-3 p-2 hover:bg-sidebar-accent">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="bg-primary text-white">
                    {user?.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-white">{user?.name}</p>
                  <p className="text-xs text-gray-400">
                    {user?.role === 'admin' ? 'Administrator' : user?.isMentor ? 'Mentor' : 'Student'}
                  </p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent align="end" className="w-56 bg-sidebar border-sidebar-border">
              <div className="flex items-center space-x-3 p-3 border-b border-sidebar-border">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="bg-primary text-white">
                    {user?.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sidebar-foreground truncate">{user?.name}</p>
                  <p className="text-sm text-sidebar-accent-foreground truncate">{user?.email}</p>
                </div>
              </div>
              
              <DropdownMenuItem className="text-sidebar-foreground hover:bg-sidebar-accent">
                <User className="w-4 h-4 mr-3" />
                View Profile
              </DropdownMenuItem>
              
              <DropdownMenuItem className="text-sidebar-foreground hover:bg-sidebar-accent">
                <Settings className="w-4 h-4 mr-3" />
                Account Settings
              </DropdownMenuItem>
              
              <DropdownMenuSeparator className="bg-sidebar-border" />
              
              <DropdownMenuItem 
                onClick={logout}
                className="text-red-400 hover:bg-red-500/10 hover:text-red-300"
              >
                <LogOut className="w-4 h-4 mr-3" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}