import { useState, useRef, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { ChatInterface } from "@/components/ui/chat-interface";
import { 
  MessageSquare, 
  Send, 
  Bot, 
  User, 
  Sparkles,
  Brain,
  Target,
  BookOpen,
  Briefcase,
  TrendingUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/navbar";

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export default function Chat() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const { data: skillAssessments = [] } = useQuery({
    queryKey: ["/api/skills/assessments"],
    retry: false,
  });

  const { data: goals = [] } = useQuery({
    queryKey: ["/api/goals"],
    retry: false,
  });

  const { data: chatSessions = [] } = useQuery({
    queryKey: ["/api/chat/sessions"],
    retry: false,
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await apiRequest("POST", "/api/chat/advice", {
        question: message,
      });
      return response.json();
    },
    onMutate: (message) => {
      // Optimistically add user message
      const userMessage: ChatMessage = {
        role: 'user',
        content: message,
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, userMessage]);
      setInputMessage("");
      setIsTyping(true);
    },
    onSuccess: (data) => {
      setIsTyping(false);
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: data.message,
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      
      // Show recommendations if available
      if (data.recommendations && data.recommendations.length > 0) {
        toast({
          title: "New Recommendations",
          description: `I have ${data.recommendations.length} recommendations for you!`,
        });
      }
    },
    onError: (error) => {
      setIsTyping(false);
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to get response from AI coach. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    
    sendMessageMutation.mutate(inputMessage);
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Initial greeting message
  useEffect(() => {
    if (messages.length === 0) {
      const greeting: ChatMessage = {
        role: 'assistant',
        content: `Hello ${user?.firstName || 'there'}! I'm your AI career coach. I'm here to help you with career advice, skill development, and achieving your professional goals. What would you like to discuss today?`,
        timestamp: new Date().toISOString(),
      };
      setMessages([greeting]);
    }
  }, [user?.firstName]);

  const suggestedQuestions = [
    "What skills should I focus on for my career goals?",
    "How can I improve my resume?",
    "What are the current market trends in my field?",
    "Can you help me plan my learning roadmap?",
    "How do I prepare for job interviews?",
    "What portfolio projects should I build?",
  ];

  const quickActions = [
    {
      icon: Target,
      label: "Career Goals",
      description: "Get advice on setting and achieving career objectives",
      color: "bg-blue-500",
    },
    {
      icon: BookOpen,
      label: "Skill Development",
      description: "Learn about improving your technical and soft skills",
      color: "bg-green-500",
    },
    {
      icon: Briefcase,
      label: "Job Search",
      description: "Get tips for job hunting and interview preparation",
      color: "bg-purple-500",
    },
    {
      icon: TrendingUp,
      label: "Market Trends",
      description: "Stay updated with industry trends and opportunities",
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Career Coach</h1>
          <p className="text-gray-600">
            Get personalized career advice and guidance powered by artificial intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-[700px] flex flex-col">
              <CardHeader className="flex-shrink-0 border-b">
                <CardTitle className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <span>AI Career Coach</span>
                  <Badge variant="secondary" className="ml-2">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Online
                  </Badge>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col p-0">
                {/* Messages */}
                <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] p-3 rounded-lg ${
                            message.role === 'user'
                              ? 'bg-primary text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <div className="flex items-start space-x-2">
                            {message.role === 'assistant' && (
                              <Bot className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            )}
                            <div className="flex-1">
                              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                              <p className={`text-xs mt-1 ${
                                message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                              }`}>
                                {new Date(message.timestamp).toLocaleTimeString()}
                              </p>
                            </div>
                            {message.role === 'user' && (
                              <User className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 p-3 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Bot className="w-4 h-4" />
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* Input */}
                <div className="p-4 border-t bg-white">
                  <form onSubmit={handleSendMessage} className="flex space-x-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Ask me anything about your career..."
                      className="flex-1"
                      disabled={sendMessageMutation.isPending}
                    />
                    <Button 
                      type="submit" 
                      disabled={sendMessageMutation.isPending || !inputMessage.trim()}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
                  
                  {/* Suggested Questions */}
                  {messages.length <= 1 && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 mb-2">Try asking:</p>
                      <div className="flex flex-wrap gap-2">
                        {suggestedQuestions.slice(0, 3).map((question, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => setInputMessage(question)}
                            className="text-xs"
                          >
                            {question}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => setInputMessage(`Tell me about ${action.label.toLowerCase()}`)}
                      className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <action.icon className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{action.label}</p>
                          <p className="text-xs text-gray-600">{action.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Your Profile Context */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-600">Current Role:</span>
                    <p className="font-medium">{user?.currentRole || 'Not specified'}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Target Role:</span>
                    <p className="font-medium">{user?.targetRole || 'Not specified'}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Industry:</span>
                    <p className="font-medium">{user?.industry || 'Not specified'}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Skills Tracked:</span>
                    <p className="font-medium">{skillAssessments.length} skills</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Active Goals:</span>
                    <p className="font-medium">{goals.filter((g: any) => g.status === 'active').length} goals</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Sessions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                {chatSessions.length > 0 ? (
                  <div className="space-y-3">
                    {chatSessions.slice(0, 3).map((session: any) => (
                      <div key={session.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-2 mb-1">
                          <MessageSquare className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium">{session.topic || 'General Chat'}</span>
                        </div>
                        <p className="text-xs text-gray-600">
                          {new Date(session.updatedAt).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {session.messages.length} messages
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <MessageSquare className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">No previous sessions</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
