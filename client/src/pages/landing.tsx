import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Target, 
  MessageSquare, 
  Video, 
  TrendingUp, 
  FileText,
  Shield,
  Lock,
  Zap,
  Users,
  Award,
  CheckCircle,
  ArrowRight,
  Brain,
  Lightbulb,
  Rocket
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      
      {/* Hero Section */}
      <main id="main-content">
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Your AI-Powered
              <span className="text-primary"> Career Coach</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Get personalized skill development, career guidance, and job market insights powered by AI. 
              Bridge your skill gaps and accelerate your career growth with data-driven recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200"
                onClick={() => window.location.href = '/api/login'}
                aria-label="Start your free career assessment"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    window.location.href = '/api/login';
                  }
                }}
              >
                Start Free Assessment
                <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-gray-300 dark:border-gray-600 px-8 py-4 text-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200"
                aria-label="Watch product demo video"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    // Add video modal functionality here
                  }
                }}
              >
                <Video className="mr-2 w-5 h-5" aria-hidden="true" />
                Watch Demo
              </Button>
            </div>
          </div>
          
          {/* Hero Dashboard Preview */}
          <div className="mt-20 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-3xl"></div>
            <Card className="relative max-w-6xl mx-auto shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Skills Assessment Preview */}
                  <div className="lg:col-span-2">
                    <Card className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border-0 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          <div className="w-3 h-3 bg-secondary rounded-full mr-3"></div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Skills Assessment
                          </h3>
                          <Badge className="ml-auto bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                            Complete
                          </Badge>
                        </div>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">JavaScript</span>
                              <span className="text-sm font-bold text-secondary">Advanced</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                              <div className="bg-secondary h-2.5 rounded-full w-4/5 transition-all duration-500"></div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">React</span>
                              <span className="text-sm font-bold text-primary">Intermediate</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                              <div className="bg-primary h-2.5 rounded-full w-3/5 transition-all duration-500"></div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">AI/ML</span>
                              <span className="text-sm font-bold text-accent">Beginner</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                              <div className="bg-accent h-2.5 rounded-full w-1/5 transition-all duration-500"></div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* AI Coach Preview */}
                  <Card className="bg-gradient-to-br from-primary to-blue-600 text-white border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-3 h-3 bg-white rounded-full mr-3"></div>
                        <h3 className="text-lg font-semibold">AI Coach Insight</h3>
                        <Brain className="ml-auto w-5 h-5" />
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-4">
                        <p className="text-sm text-white/90">
                          "Based on your goals and current market trends, I recommend focusing on AI/ML skills. 
                          There's a 340% increase in demand for these skills in your target role."
                        </p>
                      </div>
                      <Button 
                        className="bg-white text-primary hover:bg-gray-50 w-full font-semibold transition-all duration-200"
                        aria-label="Start chat with AI career coach"
                      >
                        <MessageSquare className="mr-2 w-4 h-4" />
                        Chat with AI Coach
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Powered by AI, Designed for You
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Advanced AI technology meets personalized career development to accelerate your professional growth
              with intelligent insights and actionable recommendations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1: Skill Gap Analysis */}
            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                  Smart Skill Gap Analysis
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 line-height-relaxed">
                  AI analyzes your current skills against real job market data to identify exactly what you need to learn
                  for your target role with precision and market relevance.
                </p>
                <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <TrendingUp className="w-4 h-4 text-red-500 mr-2" />
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Market Demand vs Your Skills
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Python</span>
                      <span className="text-sm font-bold text-red-600 dark:text-red-400">Gap: 65%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Cloud Computing</span>
                      <span className="text-sm font-bold text-red-600 dark:text-red-400">Gap: 80%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feature 2: Personalized Learning Path */}
            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-gradient-to-br from-secondary to-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                  Dynamic Learning Roadmap
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 line-height-relaxed">
                  Get a personalized learning path that adapts based on your progress, learning style, and 
                  changing market demands to ensure maximum efficiency.
                </p>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <Rocket className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Your Learning Path
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Python Fundamentals
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-accent rounded-full mr-3"></div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Machine Learning Basics
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded-full mr-3"></div>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Deep Learning (Next)
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feature 3: AI Career Coach */}
            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-gradient-to-br from-accent to-orange-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <MessageSquare className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                  24/7 AI Career Coach
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 line-height-relaxed">
                  Get instant career advice, resume feedback, and interview practice with your personal AI coach
                  that understands your goals and industry trends.
                </p>
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <Brain className="w-4 h-4 text-orange-500 mr-2" />
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Recent Coaching Session
                    </span>
                  </div>
                  <div className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-3">
                    <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                      "Your resume shows strong technical skills. Let's work on highlighting your leadership 
                      experience for senior roles."
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feature 4: Mock Interviews */}
            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Video className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                  AI-Powered Mock Interviews
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 line-height-relaxed">
                  Practice interviews with real-time feedback on your communication, technical knowledge, and confidence
                  to prepare for any interview scenario.
                </p>
                <div className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <Award className="w-4 h-4 text-purple-500 mr-2" />
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Last Interview Score
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Overall Performance</span>
                    <span className="text-sm font-bold text-purple-600 dark:text-purple-400">85/100</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                    <div className="bg-purple-500 h-2.5 rounded-full w-4/5 transition-all duration-500"></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feature 5: Progress Tracking */}
            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                  Advanced Progress Tracking
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 line-height-relaxed">
                  Visualize your learning journey with detailed analytics, milestone celebrations, and 
                  market readiness indicators to stay motivated.
                </p>
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      This Month's Progress
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Courses Completed</span>
                      <span className="text-sm font-bold text-green-600 dark:text-green-400">3</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Skills Improved</span>
                      <span className="text-sm font-bold text-green-600 dark:text-green-400">5</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Market Readiness</span>
                      <span className="text-sm font-bold text-green-600 dark:text-green-400">+15%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feature 6: Portfolio Builder */}
            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                  Smart Portfolio Builder
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 line-height-relaxed">
                  Get AI-suggested project ideas that showcase your skills and attract employers in your field
                  with industry-specific recommendations.
                </p>
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <Lightbulb className="w-4 h-4 text-indigo-500 mr-2" />
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Recommended Projects
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        E-commerce ML Recommender
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Data Visualization Dashboard
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust & Security Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Your Privacy & Security Matter
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Enterprise-grade security with complete transparency about how we handle your data and career information.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  End-to-End Encryption
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  All your career data and conversations are encrypted both in transit and at rest with industry-standard protocols.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Data Privacy First
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Your personal information is never shared with third parties. You maintain complete control over your data.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Trusted by Professionals
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Join thousands of professionals who trust us with their career development and skill advancement.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who are already using AI to accelerate their career growth 
            and achieve their professional goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary transition-all duration-200"
              onClick={() => window.location.href = '/api/login'}
              aria-label="Get started with SkillMate for free"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  window.location.href = '/api/login';
                }
              }}
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary transition-all duration-200"
              aria-label="Contact our sales team"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  // Add contact modal functionality here
                }
              }}
            >
              Contact Sales
            </Button>
          </div>
          <p className="text-sm text-blue-100 mt-4">
            No credit card required • Free 14-day trial • Cancel anytime
          </p>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
}

