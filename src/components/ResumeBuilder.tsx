import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { generateImprovedContent, initializeGemini } from "@/lib/gemini";
import { ProfileSection } from "./ProfileSection";
import { PromptSection } from "./PromptSection";
import { DesignSelector } from "./DesignSelector";

interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  summary: string;
  experience: string[];
  education: string[];
  skills: string[];
}

export function ResumeBuilder() {
  const [apiKeySet, setApiKeySet] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState("modern");
  const [resumeData, setResumeData] = useState<ResumeData>({
    fullName: "",
    email: "",
    phone: "",
    summary: "",
    experience: [""],
    education: [""],
    skills: [""],
  });
  const { toast } = useToast();

  const handleApiKeySubmit = (apiKey: string) => {
    try {
      initializeGemini(apiKey);
      setApiKeySet(true);
      toast({
        title: "API Key Set",
        description: "You can now use AI features to enhance your resume",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to initialize AI features",
        variant: "destructive",
      });
    }
  };

  const updateResumeData = (field: keyof ResumeData, value: string | string[]) => {
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
      } else if (type === "skills" && typeof index === "number") {
        const newSkills = [...resumeData.skills];
        newSkills[index] = improved;
        updateResumeData("skills", newSkills);
      }
      toast({
        title: "Content Improved",
        description: "AI has enhanced your content",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to improve content",
        variant: "destructive",
      });
    }
  };

  const addField = (type: "experience" | "education" | "skills") => {
    setResumeData((prev) => ({
      ...prev,
      [type]: [...prev[type], ""],
    }));
  };

  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
        AI Resume Builder
      </h1>

      {!apiKeySet && (
        <Card className="p-6 mb-8 border-2 border-primary/20">
          <h2 className="text-2xl font-semibold mb-4">Set Up AI Features</h2>
          <div className="flex gap-4">
            <Input
              placeholder="Enter your Gemini API Key"
              type="password"
              onChange={(e) => handleApiKeySubmit(e.target.value)}
              className="flex-1"
            />
          </div>
        </Card>
      )}

      <DesignSelector selectedDesign={selectedDesign} onSelectDesign={setSelectedDesign} />

      <ProfileSection
        fullName={resumeData.fullName}
        email={resumeData.email}
        phone={resumeData.phone}
        onUpdate={(field, value) => updateResumeData(field as keyof ResumeData, value)}
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

      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Skills</h2>
        <div className="space-y-4">
          {resumeData.skills.map((skill, index) => (
            <PromptSection
              key={index}
              label={`Skill ${index + 1}`}
              content={skill}
              onContentChange={(value) => {
                const newSkills = [...resumeData.skills];
                newSkills[index] = value;
                updateResumeData("skills", newSkills);
              }}
              onEnhance={() => improveContent("skills", skill, index)}
              placeholder="Add a skill..."
            />
          ))}
          <Button onClick={() => addField("skills")} variant="outline" className="w-full">
            Add Skill
          </Button>
        </div>
      </Card>
    </div>
  );
}