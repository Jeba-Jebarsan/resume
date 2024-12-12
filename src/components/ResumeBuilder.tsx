import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { generateImprovedContent } from "@/lib/gemini";
import { ProfileSection } from "./ProfileSection";
import { PromptSection } from "./PromptSection";
import { DesignSelector } from "./DesignSelector";
import { SkillsSection } from "./SkillsSection";
import { AchievementsSection } from "./AchievementsSection";
import { Eye } from "lucide-react";

interface SkillCategory {
  name: string;
  skills: string[];
}

interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  summary: string;
  experience: string[];
  education: string[];
  skillCategories: SkillCategory[];
  achievements: string[];
}

export function ResumeBuilder() {
  const [selectedDesign, setSelectedDesign] = useState("modern");
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [resumeData, setResumeData] = useState<ResumeData>({
    fullName: "",
    email: "",
    phone: "",
    summary: "",
    experience: [""],
    education: [""],
    skillCategories: [],
    achievements: [],
  });
  const { toast } = useToast();

  const updateResumeData = (field: keyof ResumeData, value: any) => {
    setResumeData((prev) => ({ ...prev, [field]: value }));
  };

  const improveContent = async (
    type: "summary" | "experience" | "skills",
    content: string,
    index?: number
  ) => {
    try {
      const improved = await generateImprovedContent(content, type);
      if (type === "summary") {
        updateResumeData("summary", improved);
      } else if (type === "experience" && typeof index === "number") {
        const newExperience = [...resumeData.experience];
        newExperience[index] = improved;
        updateResumeData("experience", newExperience);
      }
      toast({
        title: "Content Improved",
        description: "AI has enhanced your content",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to improve content. Please try again.",
        variant: "destructive",
      });
    }
  };

  const addField = (type: "experience" | "education") => {
    setResumeData((prev) => ({
      ...prev,
      [type]: [...prev[type], ""],
    }));
  };

  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
          AI Resume Builder
        </h1>
        <Button
          variant="outline"
          onClick={() => setIsPreviewMode(!isPreviewMode)}
          className="flex items-center gap-2"
        >
          <Eye className="w-4 h-4" />
          {isPreviewMode ? "Edit Mode" : "Preview Mode"}
        </Button>
      </div>

      {!isPreviewMode ? (
        <>
          <DesignSelector
            selectedDesign={selectedDesign}
            onSelectDesign={setSelectedDesign}
          />

          <ProfileSection
            fullName={resumeData.fullName}
            email={resumeData.email}
            phone={resumeData.phone}
            onUpdate={(field, value) =>
              updateResumeData(field as keyof ResumeData, value)
            }
          />

          <PromptSection
            label="Professional Summary"
            content={resumeData.summary}
            onContentChange={(value) => updateResumeData("summary", value)}
            onEnhance={() => improveContent("summary", resumeData.summary)}
            placeholder="Write your professional summary..."
            isTextArea
          />

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Work Experience</h2>
            <div className="space-y-4">
              {resumeData.experience.map((exp, index) => (
                <PromptSection
                  key={index}
                  label={`Experience ${index + 1}`}
                  content={exp}
                  onContentChange={(value) => {
                    const newExperience = [...resumeData.experience];
                    newExperience[index] = value;
                    updateResumeData("experience", newExperience);
                  }}
                  onEnhance={() => improveContent("experience", exp, index)}
                  placeholder="Describe your work experience..."
                  isTextArea
                />
              ))}
              <Button
                onClick={() => addField("experience")}
                variant="outline"
                className="w-full"
              >
                Add Experience
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Education</h2>
            <div className="space-y-4">
              {resumeData.education.map((edu, index) => (
                <Input
                  key={index}
                  placeholder="Education details..."
                  value={edu}
                  onChange={(e) => {
                    const newEducation = [...resumeData.education];
                    newEducation[index] = e.target.value;
                    updateResumeData("education", newEducation);
                  }}
                />
              ))}
              <Button
                onClick={() => addField("education")}
                variant="outline"
                className="w-full"
              >
                Add Education
              </Button>
            </div>
          </Card>

          <SkillsSection
            categories={resumeData.skillCategories}
            onUpdate={(categories) => updateResumeData("skillCategories", categories)}
          />

          <AchievementsSection
            achievements={resumeData.achievements}
            onUpdate={(achievements) => updateResumeData("achievements", achievements)}
          />
        </>
      ) : (
        <Card className="p-6">
          <div className={`space-y-6 ${selectedDesign === "modern" ? "bg-gradient-to-r from-purple-50 to-white" : selectedDesign === "professional" ? "bg-gradient-to-r from-blue-50 to-white" : "bg-gradient-to-r from-pink-50 to-white"}`}>
            <div className="text-center">
              <h2 className="text-3xl font-bold">{resumeData.fullName}</h2>
              <p className="text-gray-600">{resumeData.email} | {resumeData.phone}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Professional Summary</h3>
              <p className="text-gray-700">{resumeData.summary}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Experience</h3>
              {resumeData.experience.map((exp, index) => (
                <div key={index} className="mb-4">
                  <p className="text-gray-700">{exp}</p>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Education</h3>
              {resumeData.education.map((edu, index) => (
                <div key={index} className="mb-2">
                  <p className="text-gray-700">{edu}</p>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Skills</h3>
              {resumeData.skillCategories.map((category, index) => (
                <div key={index} className="mb-4">
                  <h4 className="font-medium mb-2">{category.name}</h4>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {resumeData.achievements.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-2">Key Achievements</h3>
                <ul className="list-disc list-inside space-y-2">
                  {resumeData.achievements.map((achievement, index) => (
                    <li key={index} className="text-gray-700">{achievement}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}