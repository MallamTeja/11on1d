import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  Paperclip, 
  Smile, 
  Phone, 
  Video, 
  MoreVertical,
  Search,
  Code,
  ImageIcon,
  Check,
  CheckCheck
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { useAuth } from '../App';

// Mock chat data
const mockChats = [
  {
    id: '1',
    name: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1653671832574-029b950a5749?w=150&h=150&fit=crop&crop=face',
    lastMessage: 'The React hooks implementation looks really good!',
    timestamp: '2:30 PM',
    unreadCount: 2,
    isOnline: true,
    isMentor: true
  },
  {
    id: '2',
    name: 'Vikash Kumar',
    avatar: 'https://images.unsplash.com/photo-1681164315430-6159b2361615?w=150&h=150&fit=crop&crop=face',
    lastMessage: 'Let me review your code and give feedback. Any doubts in Spring Boot?',
    timestamp: '1:15 PM',
    unreadCount: 0,
    isOnline: true,
    isMentor: true
  },
  {
    id: '3',
    name: 'Study Group - IIT Delhi Coders',
    avatar: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=150&h=150&fit=crop&crop=face',
    lastMessage: 'Rahul: Anyone free for DSA practice tonight?',
    timestamp: '11:45 AM',
    unreadCount: 5,
    isOnline: false,
    isGroup: true
  },
  {
    id: '4',
    name: 'Ananya Singh',
    avatar: 'https://images.unsplash.com/photo-1681165232934-c09dfa5ee694?w=150&h=150&fit=crop&crop=face',
    lastMessage: 'Thanks for the ML tutorial! PyTorch is much clearer now.',
    timestamp: 'Yesterday',
    unreadCount: 0,
    isOnline: false,
    isMentor: true
  }
];

const mockMessages = [
  {
    id: '1',
    senderId: '1',
    senderName: 'Sarah Chen',
    content: 'Hey! I reviewed your React component and it looks really good. Just a few suggestions for optimization.',
    timestamp: '2:25 PM',
    isSent: false,
    isRead: true,
    type: 'text'
  },
  {
    id: '2',
    senderId: 'me',
    senderName: 'You',
    content: 'Thank you so much for taking the time to review it! What would you suggest?',
    timestamp: '2:26 PM',
    isSent: true,
    isRead: true,
    type: 'text'
  },
  {
    id: '3',
    senderId: '1',
    senderName: 'Sarah Chen',
    content: 'First, consider using useMemo for expensive calculations. Also, you could extract the validation logic into a custom hook.',
    timestamp: '2:28 PM',
    isSent: false,
    isRead: true,
    type: 'text'
  },
  {
    id: '4',
    senderId: '1',
    senderName: 'Sarah Chen',
    content: `const useFormValidation = (values) => {
  return useMemo(() => {
    // validation logic here
    return errors;
  }, [values]);
};`,
    timestamp: '2:29 PM',
    isSent: false,
    isRead: true,
    type: 'code'
  },
  {
    id: '5',
    senderId: 'me',
    senderName: 'You',
    content: 'Perfect! That makes a lot of sense. I\'ll implement those changes right away.',
    timestamp: '2:30 PM',
    isSent: true,
    isRead: false,
    type: 'text'
  }
];

export default function ChatInterface() {
  const [selectedChat, setSelectedChat] = useState(mockChats[0]);
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now().toString(),
      senderId: 'me',
      senderName: 'You',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSent: true,
      isRead: false,
      type: 'text' as const
    };

    setMessages([...messages, message]);
    setNewMessage('');

    // Simulate typing and response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      // Add a mock response
      const response = {
        id: (Date.now() + 1).toString(),
        senderId: selectedChat.id,
        senderName: selectedChat.name,
        content: "Thanks for your message! I'll get back to you shortly.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSent: false,
        isRead: true,
        type: 'text' as const
      };
      setMessages(prev => [...prev, response]);
    }, 2000);
  };

  const filteredChats = mockChats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const MessageBubble = ({ message }: { message: any }) => (
    <motion.div
      className={`flex ${message.isSent ? 'justify-end' : 'justify-start'} mb-4`}
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`max-w-xs lg:max-w-md ${message.isSent ? 'order-2' : 'order-1'}`}>
        {!message.isSent && (
          <div className="flex items-center mb-1">
            <Avatar className="w-6 h-6 mr-2">
              <AvatarImage src={selectedChat.avatar} />
              <AvatarFallback className="text-xs bg-blue-500 text-white">
                {selectedChat.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="text-blue-300 text-xs">{message.senderName}</span>
          </div>
        )}
        
        <div
          className={`rounded-2xl px-4 py-3 ${
            message.isSent
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white ml-4'
              : 'bg-white/10 text-white mr-4 backdrop-blur-lg border border-white/20'
          } ${message.type === 'code' ? 'font-mono text-sm' : ''}`}
        >
          {message.type === 'code' ? (
            <div>
              <div className="flex items-center mb-2 text-xs opacity-75">
                <Code className="w-3 h-3 mr-1" />
                Code
              </div>
              <pre className="whitespace-pre-wrap">{message.content}</pre>
            </div>
          ) : (
            <p>{message.content}</p>
          )}
        </div>
        
        <div className={`flex items-center mt-1 text-xs text-blue-300 ${
          message.isSent ? 'justify-end' : 'justify-start'
        }`}>
          <span className="mr-2">{message.timestamp}</span>
          {message.isSent && (
            <div className="flex items-center">
              {message.isRead ? (
                <CheckCheck className="w-3 h-3 text-blue-400" />
              ) : (
                <Check className="w-3 h-3 text-blue-300" />
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen pt-4">
      <div className="max-w-7xl mx-auto px-4 h-[calc(100vh-5rem)]">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl h-full overflow-hidden flex">
          {/* Sidebar */}
          <div className="w-80 border-r border-white/20 flex flex-col">
            {/* Search Header */}
            <div className="p-4 border-b border-white/20">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-4 h-4" />
                <Input
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-blue-300 focus:border-blue-400"
                />
              </div>
            </div>

            {/* Chat List */}
            <ScrollArea className="flex-1">
              <div className="p-2">
                {filteredChats.map((chat) => (
                  <motion.div
                    key={chat.id}
                    className={`p-3 rounded-xl cursor-pointer transition-all duration-200 mb-2 ${
                      selectedChat.id === chat.id
                        ? 'bg-white/20 border border-white/30'
                        : 'hover:bg-white/10'
                    }`}
                    onClick={() => setSelectedChat(chat)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={chat.avatar} />
                          <AvatarFallback className="bg-blue-500 text-white">
                            {chat.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        {chat.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <h3 className="text-white truncate">
                              {chat.name}
                            </h3>
                            {chat.isMentor && (
                              <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30 text-xs">
                                Mentor
                              </Badge>
                            )}
                            {chat.isGroup && (
                              <Badge className="bg-green-500/20 text-green-300 border-green-400/30 text-xs">
                                Group
                              </Badge>
                            )}
                          </div>
                          <span className="text-blue-300 text-xs">{chat.timestamp}</span>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-blue-200 text-sm truncate">{chat.lastMessage}</p>
                          {chat.unreadCount > 0 && (
                            <Badge className="bg-blue-500 text-white text-xs min-w-[1.25rem] h-5 flex items-center justify-center rounded-full">
                              {chat.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={selectedChat.avatar} />
                    <AvatarFallback className="bg-blue-500 text-white">
                      {selectedChat.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-white">{selectedChat.name}</h2>
                    <p className="text-blue-300 text-sm">
                      {selectedChat.isOnline ? 'Active now' : 'Last seen recently'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="ghost" className="text-blue-300 hover:text-white hover:bg-white/10">
                    <Phone className="w-5 h-5" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-blue-300 hover:text-white hover:bg-white/10">
                    <Video className="w-5 h-5" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-blue-300 hover:text-white hover:bg-white/10">
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div>
                {messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}
                
                {/* Typing Indicator */}
                <AnimatePresence>
                  {isTyping && (
                    <motion.div
                      className="flex items-center space-x-2 mb-4"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={selectedChat.avatar} />
                        <AvatarFallback className="text-xs bg-blue-500 text-white">
                          {selectedChat.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl px-4 py-3">
                        <div className="flex space-x-1">
                          <motion.div
                            className="w-2 h-2 bg-blue-400 rounded-full"
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-blue-400 rounded-full"
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-blue-400 rounded-full"
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t border-white/20">
              <form onSubmit={handleSendMessage} className="flex items-end space-x-3">
                <div className="flex-1 space-y-2">
                  <div className="flex space-x-2">
                    <Button type="button" size="sm" variant="ghost" className="text-blue-300 hover:text-white hover:bg-white/10">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <Button type="button" size="sm" variant="ghost" className="text-blue-300 hover:text-white hover:bg-white/10">
                      <ImageIcon className="w-4 h-4" />
                    </Button>
                    <Button type="button" size="sm" variant="ghost" className="text-blue-300 hover:text-white hover:bg-white/10">
                      <Code className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="relative">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="pr-12 bg-white/10 border-white/20 text-white placeholder:text-blue-300 focus:border-blue-400 rounded-xl"
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-white hover:bg-white/10"
                    >
                      <Smile className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <Button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}