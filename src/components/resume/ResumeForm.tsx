import { ProfileSection } from "../ProfileSection";
import { PromptSection } from "../PromptSection";
import { DesignSelector } from "../DesignSelector";
import { SkillsSection } from "../SkillsSection";
import { AchievementsSection } from "../AchievementsSection";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Plus } from "lucide-react";

interface ResumeFormProps {
  data: {
    fullName: string;
    email: string;
    phone: string;
    summary: string;
    experience: string[];
    education: string[];
    skillCategories: Array<{
      name: string;
      skills: string[];
    }>;
    achievements: string[];
  };
  selectedDesign: string;
  onUpdate: (field: string, value: any) => void;
  onDesignSelect: (design: string) => void;
  onImproveContent: (type: "summary" | "experience", content: string, index?: number) => void;
}

export function ResumeForm({
  data,
  selectedDesign,
  onUpdate,
  onDesignSelect,
  onImproveContent,
}: ResumeFormProps) {
  const addField = (type: "experience" | "education") => {
    const current = data[type];
    onUpdate(type, [...current, ""]);
  };

  return (
    <div className="space-y-8">
      <DesignSelector
        selectedDesign={selectedDesign}
        onSelectDesign={onDesignSelect}
      />

      <ProfileSection
        fullName={data.fullName}
        email={data.email}
        phone={data.phone}
        onUpdate={onUpdate}
      />

      <PromptSection
        label="Professional Summary"
        content={data.summary}
        onContentChange={(value) => onUpdate("summary", value)}
        onEnhance={() => onImproveContent("summary", data.summary)}
        placeholder="Write your professional summary..."
        isTextArea
      />

      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Work Experience</h2>
        <div className="space-y-4">
          {data.experience.map((exp, index) => (
            <PromptSection
              key={index}
              label={`Experience ${index + 1}`}
              content={exp}
              onContentChange={(value) => {
                const newExperience = [...data.experience];
                newExperience[index] = value;
                onUpdate("experience", newExperience);
              }}
              onEnhance={() => onImproveContent("experience", exp, index)}
              placeholder="Describe your work experience..."
              isTextArea
            />
          ))}
          <Button
            onClick={() => addField("experience")}
            variant="outline"
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Experience
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Education</h2>
        <div className="space-y-4">
          {data.education.map((edu, index) => (
            <Input
              key={index}
              placeholder="Education details..."
              value={edu}
              onChange={(e) => {
                const newEducation = [...data.education];
                newEducation[index] = e.target.value;
                onUpdate("education", newEducation);
              }}
            />
          ))}
          <Button
            onClick={() => addField("education")}
            variant="outline"
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Education
          </Button>
        </div>
      </Card>

      <SkillsSection
        categories={data.skillCategories}
        onUpdate={(categories) => onUpdate("skillCategories", categories)}
      />

      <AchievementsSection
        achievements={data.achievements}
        onUpdate={(achievements) => onUpdate("achievements", achievements)}
      />
    </div>
  );
}