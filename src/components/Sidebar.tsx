import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  Users, 
  MessageCircle, 
  Code, 
  Trophy, 
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useAuth } from '../App';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  // Auto-collapse on mobile and handle mobile menu
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
        setIsMobileOpen(false);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigationItems = [
    { name: 'Book 1on1', href: '/book-sessions', icon: Calendar },
    { name: 'My Network', href: '/my-network', icon: Users },
    { name: 'Chat', href: '/chat', icon: MessageCircle },
    { name: 'Practice Hub', href: '/practice-hub', icon: Code },
    { name: 'Badges', href: '/badges', icon: Trophy },
    ...(user?.role === 'admin' ? [{ name: 'Admin', href: '/admin', icon: Shield }] : []),
  ];

  const isActive = (path: string) => location.pathname === path;

  const SidebarButton = ({ item, isActive }: { item: any; isActive: boolean }) => {
    const Icon = item.icon;
    const isDesktopCollapsed = isCollapsed && !isMobileOpen;
    
    if (isDesktopCollapsed) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to={item.href}
                className={`relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 group ${
                  isActive
                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                }`}
              >
                <Icon className="w-4 h-4" />
                {isActive && (
                  <motion.div
                    className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-full"
                    layoutId="activeIndicator"
                    transition={{ duration: 0.2 }}
                  />
                )}
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-sidebar border-sidebar-border">
              <p>{item.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return (
      <Link
        to={item.href}
        className={`relative flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
          isActive
            ? 'bg-primary text-white shadow-lg shadow-primary/25'
            : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
        }`}
      >
        <Icon className="w-4 h-4 flex-shrink-0" />
        <AnimatePresence mode="wait">
          {!isDesktopCollapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className="whitespace-nowrap overflow-hidden"
            >
              {item.name}
            </motion.span>
          )}
        </AnimatePresence>
        {isActive && !isDesktopCollapsed && (
          <motion.div
            className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-full"
            layoutId="activeIndicator"
            transition={{ duration: 0.2 }}
          />
        )}
      </Link>
    );
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="bg-sidebar border-sidebar-border text-sidebar-foreground shadow-lg"
        >
          <Menu className="w-4 h-4" />
        </Button>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`${
          isMobileOpen ? 'fixed' : 'hidden md:flex'
        } left-0 top-0 z-50 h-screen bg-sidebar border-r border-sidebar-border flex flex-col shadow-xl`}
        animate={{ 
          width: isCollapsed ? 80 : 280,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex items-center space-x-3"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                  <Code className="w-4 h-4 text-white" />
                </div>
                <span className="text-sidebar-foreground text-lg font-medium">
                  Skill Exchange
                </span>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="flex items-center space-x-2">
            {/* Mobile Close Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileOpen(false)}
                className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground p-2"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Desktop Collapse Button */}
            <div className="hidden md:block">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground p-2"
              >
                {isCollapsed ? (
                  <ChevronRight className="w-4 h-4" />
                ) : (
                  <ChevronLeft className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-b border-sidebar-border">
          <div className={`flex items-center ${isCollapsed && !isMobileOpen ? 'justify-center' : 'space-x-3'}`}>
            <Avatar className="w-10 h-10">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback className="bg-primary text-white">
                {user?.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <AnimatePresence mode="wait">
              {(!isCollapsed || isMobileOpen) && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 min-w-0"
                >
                  <p className="text-sidebar-foreground font-medium truncate">
                    {user?.name}
                  </p>
                  <p className="text-sidebar-accent-foreground text-sm truncate">
                    {user?.role === 'admin' ? 'Administrator' : user?.isMentor ? 'Mentor' : 'Student'}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navigationItems.map((item) => (
            <div
              key={item.name}
              onClick={() => setIsMobileOpen(false)}
            >
              <SidebarButton
                item={item}
                isActive={isActive(item.href)}
              />
            </div>
          ))}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-sidebar-border space-y-2">
          {isCollapsed && !isMobileOpen ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-12 h-12 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground p-0"
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-sidebar border-sidebar-border">
                  <p>Settings</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <Settings className="w-4 h-4 mr-3" />
              Settings
            </Button>
          )}
          
          {isCollapsed && !isMobileOpen ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={logout}
                    variant="ghost"
                    size="sm"
                    className="w-12 h-12 text-red-400 hover:bg-red-500/10 hover:text-red-300 p-0"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-sidebar border-sidebar-border">
                  <p>Logout</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Button
              onClick={logout}
              variant="ghost"
              size="sm"
              className="w-full justify-start text-red-400 hover:bg-red-500/10 hover:text-red-300"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Logout
            </Button>
          )}
        </div>
      </motion.aside>

      {/* Mobile Overlay */}
      <div className="md:hidden">
        {/* This can be expanded for mobile sidebar later if needed */}
      </div>
    </>
  );
}