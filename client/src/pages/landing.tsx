import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  BarChart3, 
  Target, 
  MessageSquare, 
  Video, 
  TrendingUp, 
  FileText,
  Shield,
  Lock,
  Zap
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-neutral-dark mb-6">
              Your AI-Powered
              <span className="text-primary"> Career Coach</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Get personalized skill development, career guidance, and job market insights powered by AI. 
              Bridge your skill gaps and accelerate your career growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-blue-700">
                Start Free Assessment
              </Button>
              <Button variant="outline" size="lg" className="border-gray-300">
                Watch Demo
              </Button>
            </div>
          </div>
          
          {/* Hero Dashboard Preview */}
          <div className="mt-16 relative">
            <Card className="max-w-5xl mx-auto">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Skill Assessment Preview */}
                  <div className="lg:col-span-2">
                    <Card className="bg-neutral-light">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                          <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                          Current Skills Assessment
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">JavaScript</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div className="bg-secondary h-2 rounded-full w-4/5"></div>
                              </div>
                              <span className="text-sm font-medium text-secondary">Advanced</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">React</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div className="bg-secondary h-2 rounded-full w-3/5"></div>
                              </div>
                              <span className="text-sm font-medium text-secondary">Intermediate</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">AI/ML</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div className="bg-accent h-2 rounded-full w-1/5"></div>
                              </div>
                              <span className="text-sm font-medium text-accent">Beginner</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* AI Coach Preview */}
                  <Card className="bg-gradient-to-br from-primary to-blue-600 text-white">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                        AI Coach Insight
                      </h3>
                      <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-4">
                        <p className="text-sm">
                          "Based on your goals and current market trends, I recommend focusing on AI/ML skills. 
                          There's a 340% increase in demand for these skills in your target role."
                        </p>
                      </div>
                      <Button className="bg-white text-primary hover:bg-gray-100">
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral-dark mb-4">Powered by AI, Designed for You</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Advanced AI technology meets personalized career development to accelerate your professional growth.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1: Skill Gap Analysis */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-6">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Smart Skill Gap Analysis</h3>
                <p className="text-gray-600 mb-4">
                  AI analyzes your current skills against real job market data to identify exactly what you need to learn.
                </p>
                <Card className="bg-white">
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-500 mb-2">Market Demand vs Your Skills</div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Python</span>
                        <span className="text-sm font-medium text-red-500">Gap: 65%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Cloud Computing</span>
                        <span className="text-sm font-medium text-red-500">Gap: 80%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            {/* Feature 2: Personalized Learning Path */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-6">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Dynamic Learning Roadmap</h3>
                <p className="text-gray-600 mb-4">
                  Get a personalized learning path that adapts based on your progress and changing market demands.
                </p>
                <Card className="bg-white">
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-500 mb-2">Your Learning Path</div>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                        <span className="text-sm text-secondary">Python Fundamentals (Complete)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                        <span className="text-sm text-accent">Machine Learning Basics (In Progress)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-gray-300 rounded-full mr-3"></div>
                        <span className="text-sm text-gray-500">Deep Learning (Next)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            {/* Feature 3: AI Career Coach */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-6">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">24/7 AI Career Coach</h3>
                <p className="text-gray-600 mb-4">
                  Get instant career advice, resume feedback, and interview practice with your personal AI coach.
                </p>
                <Card className="bg-white">
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-500 mb-2">Recent Coaching Session</div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-700">
                        "Your resume shows strong technical skills. Let's work on highlighting your leadership experience for senior roles."
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            {/* Feature 4: Mock Interviews */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-6">
                  <Video className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">AI-Powered Mock Interviews</h3>
                <p className="text-gray-600 mb-4">
                  Practice interviews with real-time feedback on your communication, technical knowledge, and confidence.
                </p>
                <Card className="bg-white">
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-500 mb-2">Last Interview Score</div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Overall Performance</span>
                      <span className="text-sm font-medium text-secondary">85/100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-secondary h-2 rounded-full w-4/5"></div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            {/* Feature 5: Progress Tracking */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-6">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Advanced Progress Tracking</h3>
                <p className="text-gray-600 mb-4">
                  Visualize your learning journey with detailed analytics and milestone celebrations.
                </p>
                <Card className="bg-white">
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-500 mb-2">This Month's Progress</div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Courses Completed</span>
                        <span className="text-sm font-medium text-secondary">3</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Skills Improved</span>
                        <span className="text-sm font-medium text-secondary">5</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Market Readiness</span>
                        <span className="text-sm font-medium text-secondary">+15%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            {/* Feature 6: Portfolio Builder */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center mb-6">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Smart Portfolio Builder</h3>
                <p className="text-gray-600 mb-4">
                  Get AI-suggested project ideas that showcase your skills and attract employers in your field.
                </p>
                <Card className="bg-white">
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-500 mb-2">Recommended Projects</div>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                        <span className="text-sm">E-commerce ML Recommender</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                        <span className="text-sm">Data Visualization Dashboard</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust & Security Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral-dark mb-4">Your Privacy & Security Matter</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Enterprise-grade security with complete transparency about how we handle your data.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">GDPR Compliant</h3>
                <p className="text-gray-600">Full compliance with GDPR and international data protection regulations.</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lock className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">End-to-End Encryption</h3>
                <p className="text-gray-600">All your data is encrypted in transit and at rest using industry-standard encryption.</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">No Data Sharing</h3>
                <p className="text-gray-600">Your personal information and career data are never shared with third parties.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Accelerate Your Career?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of professionals who are already using AI to advance their careers. Start your personalized journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
              <a href="/api/login">Start Free Assessment</a>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
              Schedule Demo
            </Button>
          </div>
          <p className="mt-4 text-sm opacity-80">No credit card required • 7-day free trial • Cancel anytime</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
