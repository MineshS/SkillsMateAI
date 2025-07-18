import { useEffect } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  MessageSquare, 
  Target, 
  TrendingUp, 
  BookOpen,
  User,
  Calendar,
  Award
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import Navbar from "@/components/navbar";

export default function Home() {
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: skillAssessments, isLoading: skillsLoading } = useQuery({
    queryKey: ["/api/skills/assessments"],
    retry: false,
  });

  const { data: progress, isLoading: progressLoading } = useQuery({
    queryKey: ["/api/progress"],
    retry: false,
  });

  const { data: goals, isLoading: goalsLoading } = useQuery({
    queryKey: ["/api/goals"],
    retry: false,
  });

  const { data: portfolioProjects, isLoading: projectsLoading } = useQuery({
    queryKey: ["/api/portfolio/projects"],
    retry: false,
  });

  const isProfileComplete = user?.currentRole && user?.targetRole && user?.industry;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.firstName || 'there'}!
          </h1>
          <p className="text-gray-600">
            Continue your career development journey with personalized AI guidance.
          </p>
        </div>

        {/* Profile Completion Banner */}
        {!isProfileComplete && (
          <Card className="mb-8 border-amber-200 bg-amber-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-amber-900">Complete Your Profile</h3>
                  <p className="text-amber-700">
                    Add your career goals and current role to get personalized recommendations.
                  </p>
                </div>
                <Link to="/assessment">
                  <Button className="bg-amber-600 hover:bg-amber-700">
                    Complete Profile
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Link to="/assessment">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Skill Assessment</h3>
                    <p className="text-xs text-gray-600">Update your skills</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/chat">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">AI Coach</h3>
                    <p className="text-xs text-gray-600">Get career advice</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/dashboard">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Progress</h3>
                    <p className="text-xs text-gray-600">Track your growth</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Resources</h3>
                  <p className="text-xs text-gray-600">Learning materials</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Skills Overview */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>Your Skills Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {skillsLoading ? (
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ) : skillAssessments && skillAssessments.length > 0 ? (
                <div className="space-y-4">
                  {skillAssessments.slice(0, 5).map((skill: any) => (
                    <div key={skill.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{skill.skillName}</span>
                        <div className="flex items-center space-x-2">
                          <Badge variant={skill.priority >= 4 ? "destructive" : skill.priority >= 3 ? "default" : "secondary"}>
                            Priority: {skill.priority}
                          </Badge>
                          <span className="text-sm text-gray-600">
                            {skill.currentLevel}/{skill.targetLevel}
                          </span>
                        </div>
                      </div>
                      <Progress value={(skill.currentLevel / skill.targetLevel) * 100} className="h-2" />
                      <div className="text-xs text-gray-500">
                        Market Demand: {skill.marketDemand}/5
                      </div>
                    </div>
                  ))}
                  <Link to="/assessment">
                    <Button variant="outline" className="w-full mt-4">
                      View All Skills
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No skills assessed yet</h3>
                  <p className="text-gray-600 mb-4">
                    Start by taking a skill assessment to get personalized recommendations.
                  </p>
                  <Link to="/assessment">
                    <Button>Take Assessment</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* AI Coach Quick Access */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5" />
                <span>AI Career Coach</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-primary to-blue-600 rounded-lg p-4 text-white mb-4">
                <h3 className="font-semibold mb-2">Quick Tips</h3>
                <p className="text-sm opacity-90">
                  Based on your profile, I recommend focusing on developing your technical skills 
                  and building a strong portfolio to reach your career goals.
                </p>
              </div>
              <Link to="/chat">
                <Button className="w-full">
                  Chat with AI Coach
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity & Goals */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Learning Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5" />
                <span>Learning Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {progressLoading ? (
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ) : progress && progress.length > 0 ? (
                <div className="space-y-4">
                  {progress.slice(0, 3).map((item: any) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">Resource #{item.resourceId}</p>
                        <p className="text-sm text-gray-600">{item.status}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{item.progress}%</p>
                        <Progress value={item.progress} className="w-20 h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No learning progress yet</p>
                  <p className="text-sm text-gray-500">Start learning to track your progress</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Career Goals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="w-5 h-5" />
                <span>Career Goals</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {goalsLoading ? (
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ) : goals && goals.length > 0 ? (
                <div className="space-y-4">
                  {goals.slice(0, 3).map((goal: any) => (
                    <div key={goal.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{goal.title}</h3>
                        <Badge variant={goal.status === 'completed' ? 'default' : 'secondary'}>
                          {goal.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{goal.description}</p>
                      {goal.targetDate && (
                        <p className="text-xs text-gray-500 mt-1">
                          Target: {new Date(goal.targetDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No career goals set</p>
                  <p className="text-sm text-gray-500">Set goals to track your progress</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
