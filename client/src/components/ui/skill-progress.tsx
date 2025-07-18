import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Target, TrendingUp, AlertCircle } from "lucide-react";

interface SkillProgressProps {
  skill: {
    id: number;
    skillName: string;
    currentLevel: number;
    targetLevel: number;
    marketDemand: number;
    priority: number;
  };
  showDetails?: boolean;
}

export function SkillProgress({ skill, showDetails = true }: SkillProgressProps) {
  const progressPercentage = (skill.currentLevel / skill.targetLevel) * 100;
  const skillGap = skill.targetLevel - skill.currentLevel;
  
  const getPriorityColor = (priority: number) => {
    if (priority >= 4) return "destructive";
    if (priority >= 3) return "default";
    return "secondary";
  };

  const getPriorityIcon = (priority: number) => {
    if (priority >= 4) return <AlertCircle className="w-3 h-3" />;
    if (priority >= 3) return <TrendingUp className="w-3 h-3" />;
    return <Target className="w-3 h-3" />;
  };

  const getLevelLabel = (level: number) => {
    switch (level) {
      case 1: return "Beginner";
      case 2: return "Novice";
      case 3: return "Intermediate";
      case 4: return "Advanced";
      case 5: return "Expert";
      default: return "Unknown";
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{skill.skillName}</h3>
              <p className="text-sm text-gray-600">
                {getLevelLabel(skill.currentLevel)} → {getLevelLabel(skill.targetLevel)}
              </p>
            </div>
            <Badge variant={getPriorityColor(skill.priority)} className="flex items-center space-x-1">
              {getPriorityIcon(skill.priority)}
              <span>P{skill.priority}</span>
            </Badge>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Progress to Target</span>
              <span className="text-sm text-gray-600">{skill.currentLevel}/{skill.targetLevel}</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{Math.round(progressPercentage)}% Complete</span>
              <span>{skillGap > 0 ? `${skillGap} levels to go` : 'Target reached!'}</span>
            </div>
          </div>

          {/* Details */}
          {showDetails && (
            <div className="grid grid-cols-2 gap-4 pt-2 border-t">
              <div className="text-center">
                <p className="text-xs text-gray-500">Market Demand</p>
                <div className="flex items-center justify-center mt-1">
                  <div className="flex space-x-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i < skill.marketDemand ? 'bg-blue-500' : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium ml-2">{skill.marketDemand}/5</span>
                </div>
              </div>

              <div className="text-center">
                <p className="text-xs text-gray-500">Priority Level</p>
                <div className="flex items-center justify-center mt-1">
                  <div className="flex space-x-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i < skill.priority ? 'bg-red-500' : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium ml-2">{skill.priority}/5</span>
                </div>
              </div>
            </div>
          )}

          {/* Action Indicators */}
          <div className="flex flex-wrap gap-2 pt-2">
            {skillGap > 0 && (
              <Badge variant="outline" className="text-xs">
                <Target className="w-3 h-3 mr-1" />
                {skillGap} level{skillGap > 1 ? 's' : ''} gap
              </Badge>
            )}
            {skill.marketDemand >= 4 && (
              <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                <TrendingUp className="w-3 h-3 mr-1" />
                High demand
              </Badge>
            )}
            {skill.priority >= 4 && (
              <Badge variant="outline" className="text-xs bg-red-50 text-red-700">
                <AlertCircle className="w-3 h-3 mr-1" />
                Urgent
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
