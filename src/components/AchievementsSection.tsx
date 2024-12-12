import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trophy, Plus, X } from "lucide-react";

interface AchievementsSectionProps {
  achievements: string[];
  onUpdate: (achievements: string[]) => void;
}

export function AchievementsSection({ achievements, onUpdate }: AchievementsSectionProps) {
  const addAchievement = () => {
    onUpdate([...achievements, ""]);
  };

  const updateAchievement = (index: number, value: string) => {
    const updated = [...achievements];
    updated[index] = value;
    onUpdate(updated);
  };

  const removeAchievement = (index: number) => {
    const updated = achievements.filter((_, i) => i !== index);
    onUpdate(updated);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-6 h-6 text-yellow-500" />
        <h2 className="text-2xl font-semibold">Key Achievements</h2>
      </div>

      <div className="space-y-4">
        {achievements.map((achievement, index) => (
          <div key={index} className="flex gap-2">
            <Input
              placeholder="Describe your achievement..."
              value={achievement}
              onChange={(e) => updateAchievement(index, e.target.value)}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeAchievement(index)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
        <Button onClick={addAchievement} variant="outline" className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Achievement
        </Button>
      </div>
    </Card>
  );
}