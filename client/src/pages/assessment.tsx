import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileUpload } from "@/components/ui/file-upload";
import { SkillProgress } from "@/components/ui/skill-progress";
import { 
  User, 
  Target, 
  Upload, 
  BarChart3, 
  Zap, 
  BookOpen,
  Plus,
  Trash2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/navbar";

const profileSchema = z.object({
  currentRole: z.string().min(1, "Current role is required"),
  targetRole: z.string().min(1, "Target role is required"),
  industry: z.string().min(1, "Industry is required"),
  experienceLevel: z.enum(["entry", "mid", "senior", "executive"]),
});

const skillSchema = z.object({
  skillName: z.string().min(1, "Skill name is required"),
  currentLevel: z.number().min(1).max(5),
  targetLevel: z.number().min(1).max(5),
});

export default function Assessment() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("profile");

  const { data: skillAssessments = [], isLoading: skillsLoading } = useQuery({
    queryKey: ["/api/skills/assessments"],
    retry: false,
  });

  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      currentRole: user?.currentRole || "",
      targetRole: user?.targetRole || "",
      industry: user?.industry || "",
      experienceLevel: user?.experienceLevel as any || "mid",
    },
  });

  const skillForm = useForm<z.infer<typeof skillSchema>>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      skillName: "",
      currentLevel: 1,
      targetLevel: 3,
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (data: z.infer<typeof profileSchema>) => {
      await apiRequest("PUT", "/api/user/profile", data);
    },
    onSuccess: () => {
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      setActiveTab("skills");
    },
    onError: (error) => {
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
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    },
  });

  const addSkillMutation = useMutation({
    mutationFn: async (data: z.infer<typeof skillSchema>) => {
      await apiRequest("POST", "/api/skills/assessment", data);
    },
    onSuccess: () => {
      toast({
        title: "Skill Added",
        description: "Your skill assessment has been saved.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/skills/assessments"] });
      skillForm.reset();
    },
    onError: (error) => {
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
        description: "Failed to add skill. Please try again.",
        variant: "destructive",
      });
    },
  });

  const resumeUploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("resume", file);
      
      const response = await fetch("/api/resume/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Resume Analyzed",
        description: "Your resume has been analyzed and skills extracted.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/skills/assessments"] });
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      setActiveTab("skills");
    },
    onError: (error) => {
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
        description: "Failed to analyze resume. Please try again.",
        variant: "destructive",
      });
    },
  });

  const gapAnalysisMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/skills/gap-analysis");
    },
    onSuccess: () => {
      toast({
        title: "Analysis Complete",
        description: "Your skill gap analysis has been updated based on market data.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/skills/assessments"] });
      setActiveTab("analysis");
    },
    onError: (error) => {
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
        description: "Failed to generate analysis. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onProfileSubmit = (data: z.infer<typeof profileSchema>) => {
    updateProfileMutation.mutate(data);
  };

  const onSkillSubmit = (data: z.infer<typeof skillSchema>) => {
    addSkillMutation.mutate(data);
  };

  const handleFileUpload = (files: File[]) => {
    if (files.length > 0) {
      resumeUploadMutation.mutate(files[0]);
    }
  };

  const handleGenerateAnalysis = () => {
    if (skillAssessments.length === 0) {
      toast({
        title: "No Skills Found",
        description: "Please add some skills first or upload your resume.",
        variant: "destructive",
      });
      return;
    }
    gapAnalysisMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Career Assessment</h1>
          <p className="text-gray-600">
            Build your profile and assess your skills to get personalized career guidance.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="resume" className="flex items-center space-x-2">
              <Upload className="w-4 h-4" />
              <span>Resume</span>
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span>Skills</span>
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Analysis</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Career Profile</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={profileForm.control}
                        name="currentRole"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Role</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Software Engineer" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={profileForm.control}
                        name="targetRole"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Target Role</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Senior Software Engineer" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={profileForm.control}
                        name="industry"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Industry</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Technology, Healthcare" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={profileForm.control}
                        name="experienceLevel"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Experience Level</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select experience level" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="entry">Entry Level</SelectItem>
                                <SelectItem value="mid">Mid Level</SelectItem>
                                <SelectItem value="senior">Senior Level</SelectItem>
                                <SelectItem value="executive">Executive</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={updateProfileMutation.isPending}
                    >
                      {updateProfileMutation.isPending ? "Updating..." : "Update Profile"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resume">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="w-5 h-5" />
                  <span>Resume Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center">
                    <p className="text-gray-600 mb-4">
                      Upload your resume to automatically extract skills and experience information.
                    </p>
                    <FileUpload
                      onFilesSelected={handleFileUpload}
                      accept=".pdf,.doc,.docx,.txt"
                      maxFiles={1}
                      disabled={resumeUploadMutation.isPending}
                    />
                  </div>

                  {resumeUploadMutation.isPending && (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                      <p className="text-gray-600">Analyzing your resume...</p>
                    </div>
                  )}

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 mb-2">What we analyze:</h3>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Technical and soft skills</li>
                      <li>• Experience level and career progression</li>
                      <li>• Industry-specific keywords</li>
                      <li>• Areas for improvement</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Plus className="w-5 h-5" />
                    <span>Add New Skill</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...skillForm}>
                    <form onSubmit={skillForm.handleSubmit(onSkillSubmit)} className="space-y-6">
                      <FormField
                        control={skillForm.control}
                        name="skillName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Skill Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Python, React, Leadership" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={skillForm.control}
                          name="currentLevel"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Current Level: {field.value}</FormLabel>
                              <FormControl>
                                <Slider
                                  min={1}
                                  max={5}
                                  step={1}
                                  value={[field.value]}
                                  onValueChange={(value) => field.onChange(value[0])}
                                />
                              </FormControl>
                              <div className="flex justify-between text-xs text-gray-500">
                                <span>Beginner</span>
                                <span>Expert</span>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={skillForm.control}
                          name="targetLevel"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Target Level: {field.value}</FormLabel>
                              <FormControl>
                                <Slider
                                  min={1}
                                  max={5}
                                  step={1}
                                  value={[field.value]}
                                  onValueChange={(value) => field.onChange(value[0])}
                                />
                              </FormControl>
                              <div className="flex justify-between text-xs text-gray-500">
                                <span>Beginner</span>
                                <span>Expert</span>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full"
                        disabled={addSkillMutation.isPending}
                      >
                        {addSkillMutation.isPending ? "Adding..." : "Add Skill"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5" />
                    <span>Your Skills</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {skillsLoading ? (
                    <div className="space-y-4">
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  ) : skillAssessments.length > 0 ? (
                    <div className="space-y-4">
                      {skillAssessments.map((skill: any) => (
                        <SkillProgress
                          key={skill.id}
                          skill={skill}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No skills added yet</h3>
                      <p className="text-gray-600">
                        Add your first skill above or upload your resume to get started.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analysis">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>Skill Gap Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center">
                    <p className="text-gray-600 mb-4">
                      Generate an AI-powered analysis of your skills against current market demand.
                    </p>
                    <Button 
                      onClick={handleGenerateAnalysis}
                      disabled={gapAnalysisMutation.isPending || skillAssessments.length === 0}
                      className="bg-secondary hover:bg-green-700"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      {gapAnalysisMutation.isPending ? "Analyzing..." : "Generate Analysis"}
                    </Button>
                  </div>

                  {gapAnalysisMutation.isPending && (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto mb-4"></div>
                      <p className="text-gray-600">Analyzing market demand and skill gaps...</p>
                    </div>
                  )}

                  {skillAssessments.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Analysis Results</h3>
                      {skillAssessments.map((skill: any) => (
                        <div key={skill.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="font-medium">{skill.skillName}</h4>
                            <Badge variant={skill.priority >= 4 ? "destructive" : skill.priority >= 3 ? "default" : "secondary"}>
                              Priority {skill.priority}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Current Level:</span>
                              <div className="font-medium">{skill.currentLevel}/5</div>
                            </div>
                            <div>
                              <span className="text-gray-600">Target Level:</span>
                              <div className="font-medium">{skill.targetLevel}/5</div>
                            </div>
                            <div>
                              <span className="text-gray-600">Market Demand:</span>
                              <div className="font-medium">{skill.marketDemand}/5</div>
                            </div>
                          </div>

                          <div className="mt-3">
                            <div className="text-sm text-gray-600 mb-1">Progress to Target</div>
                            <Progress value={(skill.currentLevel / skill.targetLevel) * 100} />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <h3 className="font-semibold text-amber-900 mb-2">Next Steps</h3>
                    <ul className="text-sm text-amber-800 space-y-1">
                      <li>• Focus on high-priority skills first</li>
                      <li>• Look for learning resources in the dashboard</li>
                      <li>• Chat with your AI coach for personalized advice</li>
                      <li>• Track your progress as you learn</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
