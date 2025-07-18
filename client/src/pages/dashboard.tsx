import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  BookOpen, 
  Award, 
  Calendar,
  User,
  Zap,
  Clock,
  CheckCircle,
  AlertCircle,
  ExternalLink
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/navbar";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from "recharts";

export default function Dashboard() {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState("30d");

  const { data: skillAssessments = [], isLoading: skillsLoading } = useQuery({
    queryKey: ["/api/skills/assessments"],
    retry: false,
  });

  const { data: progress = [], isLoading: progressLoading } = useQuery({
    queryKey: ["/api/progress"],
    retry: false,
  });

  const { data: goals = [], isLoading: goalsLoading } = useQuery({
    queryKey: ["/api/goals"],
    retry: false,
  });

  const { data: portfolioProjects = [], isLoading: projectsLoading } = useQuery({
    queryKey: ["/api/portfolio/projects"],
    retry: false,
  });

  const { data: resources = [], isLoading: resourcesLoading } = useQuery({
    queryKey: ["/api/resources"],
    retry: false,
  });

  // Calculate dashboard metrics
  const completedCourses = progress.filter((p: any) => p.status === "completed").length;
  const inProgressCourses = progress.filter((p: any) => p.status === "in_progress").length;
  const averageProgress = progress.length > 0 
    ? Math.round(progress.reduce((sum: number, p: any) => sum + p.progress, 0) / progress.length)
    : 0;

  const completedGoals = goals.filter((g: any) => g.status === "completed").length;
  const activeGoals = goals.filter((g: any) => g.status === "active").length;

  const completedProjects = portfolioProjects.filter((p: any) => p.status === "completed").length;
  const inProgressProjects = portfolioProjects.filter((p: any) => p.status === "in_progress").length;

  // Skill level distribution for chart
  const skillLevelData = [
    { level: "Beginner (1-2)", count: skillAssessments.filter((s: any) => s.currentLevel <= 2).length },
    { level: "Intermediate (3)", count: skillAssessments.filter((s: any) => s.currentLevel === 3).length },
    { level: "Advanced (4-5)", count: skillAssessments.filter((s: any) => s.currentLevel >= 4).length },
  ];

  // Priority distribution for pie chart
  const priorityData = [
    { name: "High Priority", value: skillAssessments.filter((s: any) => s.priority >= 4).length, color: "#ef4444" },
    { name: "Medium Priority", value: skillAssessments.filter((s: any) => s.priority === 3).length, color: "#f59e0b" },
    { name: "Low Priority", value: skillAssessments.filter((s: any) => s.priority <= 2).length, color: "#10b981" },
  ];

  // Mock progress trend data (in a real app, this would come from the backend)
  const progressTrendData = [
    { month: "Jan", skills: 12, courses: 2, projects: 1 },
    { month: "Feb", skills: 15, courses: 3, projects: 1 },
    { month: "Mar", skills: 18, courses: 5, projects: 2 },
    { month: "Apr", skills: 22, courses: 7, projects: 3 },
    { month: "May", skills: 25, courses: 9, projects: 4 },
    { month: "Jun", skills: 28, courses: 12, projects: 5 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Dashboard</h1>
          <p className="text-gray-600">
            Track your progress and visualize your career development journey.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Skills Tracked</p>
                  <p className="text-2xl font-bold text-gray-900">{skillAssessments.length}</p>
                </div>
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+{skillAssessments.filter((s: any) => s.priority >= 4).length} high priority</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Learning Progress</p>
                  <p className="text-2xl font-bold text-gray-900">{averageProgress}%</p>
                </div>
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center">
                  <span className="text-sm text-gray-600">{completedCourses} completed, {inProgressCourses} in progress</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Career Goals</p>
                  <p className="text-2xl font-bold text-gray-900">{completedGoals}/{goals.length}</p>
                </div>
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center">
                  <span className="text-sm text-gray-600">{activeGoals} active goals</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Portfolio Projects</p>
                  <p className="text-2xl font-bold text-gray-900">{completedProjects}/{portfolioProjects.length}</p>
                </div>
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center">
                  <span className="text-sm text-gray-600">{inProgressProjects} in progress</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="skills">Skills Analysis</TabsTrigger>
            <TabsTrigger value="progress">Learning Progress</TabsTrigger>
            <TabsTrigger value="goals">Goals & Projects</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Progress Trend Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Progress Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={progressTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="skills" stroke="hsl(207, 90%, 54%)" strokeWidth={2} />
                        <Line type="monotone" dataKey="courses" stroke="hsl(142, 76%, 36%)" strokeWidth={2} />
                        <Line type="monotone" dataKey="projects" stroke="hsl(38, 92%, 50%)" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Skill Priority Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Skill Priority Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={priorityData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {priorityData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {progress.slice(0, 5).map((item: any, index: number) => (
                    <div key={item.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-medium">Learning Resource #{item.resourceId}</p>
                        <p className="text-sm text-gray-600">Status: {item.status}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{item.progress}%</p>
                        <Progress value={item.progress} className="w-20 h-2" />
                      </div>
                    </div>
                  ))}
                  
                  {progress.length === 0 && (
                    <div className="text-center py-8">
                      <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No recent activity</p>
                      <p className="text-sm text-gray-500">Start learning to see your progress here</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Skill Level Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Skill Level Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={skillLevelData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="level" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="hsl(207, 90%, 54%)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Top Skills by Priority */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Priority Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {skillAssessments
                      .sort((a: any, b: any) => b.priority - a.priority)
                      .slice(0, 8)
                      .map((skill: any) => (
                        <div key={skill.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium">{skill.skillName}</p>
                            <p className="text-sm text-gray-600">
                              Level {skill.currentLevel} → {skill.targetLevel}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={skill.priority >= 4 ? "destructive" : skill.priority >= 3 ? "default" : "secondary"}>
                              P{skill.priority}
                            </Badge>
                            <div className="text-sm text-gray-600">
                              {skill.marketDemand}/5 demand
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Skill Gap Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Skill Gap Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {skillAssessments.map((skill: any) => (
                    <div key={skill.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-medium">{skill.skillName}</h4>
                        <Badge variant={skill.priority >= 4 ? "destructive" : skill.priority >= 3 ? "default" : "secondary"}>
                          P{skill.priority}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Current:</span>
                          <span className="font-medium">{skill.currentLevel}/5</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Target:</span>
                          <span className="font-medium">{skill.targetLevel}/5</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Market:</span>
                          <span className="font-medium">{skill.marketDemand}/5</span>
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="text-sm text-gray-600 mb-1">Progress</div>
                        <Progress value={(skill.currentLevel / skill.targetLevel) * 100} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Learning Resources */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Recommended Learning Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {resourcesLoading ? (
                      <div className="space-y-4">
                        <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    ) : resources.length > 0 ? (
                      resources.slice(0, 6).map((resource: any) => (
                        <div key={resource.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                              <BookOpen className="w-6 h-6 text-blue-600" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{resource.title}</h4>
                            <p className="text-sm text-gray-600">{resource.description}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              <Badge variant="outline">{resource.provider}</Badge>
                              <Badge variant="outline">{resource.difficulty}</Badge>
                              <Badge variant="outline">{resource.duration}</Badge>
                            </div>
                          </div>
                          <div className="flex-shrink-0">
                            <Button variant="outline" size="sm" asChild>
                              <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4 mr-1" />
                                View
                              </a>
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">No learning resources available</p>
                        <p className="text-sm text-gray-500">Complete your skill assessment to get recommendations</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Progress Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Progress Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">{averageProgress}%</div>
                      <p className="text-sm text-gray-600">Overall Progress</p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Completed</span>
                        <span className="font-medium">{completedCourses}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">In Progress</span>
                        <span className="font-medium">{inProgressCourses}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Not Started</span>
                        <span className="font-medium">{progress.filter((p: any) => p.status === "not_started").length}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-2">This Month</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Courses completed:</span>
                          <span className="font-medium">{completedCourses}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Skills improved:</span>
                          <span className="font-medium">{skillAssessments.filter((s: any) => s.currentLevel > 1).length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Projects completed:</span>
                          <span className="font-medium">{completedProjects}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Career Goals */}
              <Card>
                <CardHeader>
                  <CardTitle>Career Goals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {goalsLoading ? (
                      <div className="space-y-4">
                        <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    ) : goals.length > 0 ? (
                      goals.map((goal: any) => (
                        <div key={goal.id} className="p-4 border rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium">{goal.title}</h4>
                            <Badge variant={goal.status === 'completed' ? 'default' : goal.status === 'active' ? 'secondary' : 'outline'}>
                              {goal.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{goal.description}</p>
                          
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">
                                {goal.targetDate ? new Date(goal.targetDate).toLocaleDateString() : 'No deadline'}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <div className="flex">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <div
                                    key={i}
                                    className={`w-2 h-2 rounded-full mr-1 ${
                                      i < goal.priority ? 'bg-primary' : 'bg-gray-200'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-gray-600">Priority</span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">No career goals set</p>
                        <p className="text-sm text-gray-500">Set goals to track your progress</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Portfolio Projects */}
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {projectsLoading ? (
                      <div className="space-y-4">
                        <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    ) : portfolioProjects.length > 0 ? (
                      portfolioProjects.map((project: any) => (
                        <div key={project.id} className="p-4 border rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium">{project.title}</h4>
                            <Badge variant={
                              project.status === 'completed' ? 'default' : 
                              project.status === 'in_progress' ? 'secondary' : 
                              'outline'
                            }>
                              {project.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                          
                          <div className="flex flex-wrap gap-1 mb-3">
                            {project.technologies.map((tech: string) => (
                              <Badge key={tech} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">{project.estimatedTime}</span>
                            </div>
                            <Badge variant="outline">{project.difficulty}</Badge>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <Zap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">No portfolio projects</p>
                        <p className="text-sm text-gray-500">Get AI-generated project suggestions</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
