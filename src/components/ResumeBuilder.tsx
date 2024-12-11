import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { generateImprovedContent, initializeGemini } from "@/lib/gemini";
import { Wand2 } from "lucide-react";

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

  const improveContent = async (
    type: "summary" | "experience" | "skills",
    content: string,
    index?: number
  ) => {
    try {
      const improved = await generateImprovedContent(content, type);
      if (type === "summary") {
        setResumeData((prev) => ({ ...prev, summary: improved }));
      } else if (type === "experience" && typeof index === "number") {
        setResumeData((prev) => ({
          ...prev,
          experience: prev.experience.map((exp, i) =>
            i === index ? improved : exp
          ),
        }));
      } else if (type === "skills" && typeof index === "number") {
        setResumeData((prev) => ({
          ...prev,
          skills: prev.skills.map((skill, i) => (i === index ? improved : skill)),
        }));
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
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">AI Resume Builder</h1>

      {!apiKeySet && (
        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Set Up AI Features</h2>
          <div className="flex gap-4">
            <Input
              placeholder="Enter your Gemini API Key"
              type="password"
              onChange={(e) => handleApiKeySubmit(e.target.value)}
            />
          </div>
        </Card>
      )}

      <div className="space-y-8">
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
          <div className="space-y-4">
            <Input
              placeholder="Full Name"
              value={resumeData.fullName}
              onChange={(e) =>
                setResumeData((prev) => ({
                  ...prev,
                  fullName: e.target.value,
                }))
              }
            />
            <Input
              placeholder="Email"
              type="email"
              value={resumeData.email}
              onChange={(e) =>
                setResumeData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
            <Input
              placeholder="Phone"
              value={resumeData.phone}
              onChange={(e) =>
                setResumeData((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Professional Summary</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <Textarea
                placeholder="Write your professional summary..."
                value={resumeData.summary}
                onChange={(e) =>
                  setResumeData((prev) => ({
                    ...prev,
                    summary: e.target.value,
                  }))
                }
              />
              {apiKeySet && (
                <Button
                  onClick={() => improveContent("summary", resumeData.summary)}
                  variant="outline"
                >
                  <Wand2 className="w-4 h-4 mr-2" />
                  Enhance
                </Button>
              )}
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Work Experience</h2>
          <div className="space-y-4">
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="flex gap-4">
                <Textarea
                  placeholder="Describe your work experience..."
                  value={exp}
                  onChange={(e) =>
                    setResumeData((prev) => ({
                      ...prev,
                      experience: prev.experience.map((exp, i) =>
                        i === index ? e.target.value : exp
                      ),
                    }))
                  }
                />
                {apiKeySet && (
                  <Button
                    onClick={() => improveContent("experience", exp, index)}
                    variant="outline"
                  >
                    <Wand2 className="w-4 h-4 mr-2" />
                    Enhance
                  </Button>
                )}
              </div>
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
                onChange={(e) =>
                  setResumeData((prev) => ({
                    ...prev,
                    education: prev.education.map((edu, i) =>
                      i === index ? e.target.value : edu
                    ),
                  }))
                }
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
              <div key={index} className="flex gap-4">
                <Input
                  placeholder="Add a skill..."
                  value={skill}
                  onChange={(e) =>
                    setResumeData((prev) => ({
                      ...prev,
                      skills: prev.skills.map((skill, i) =>
                        i === index ? e.target.value : skill
                      ),
                    }))
                  }
                />
                {apiKeySet && (
                  <Button
                    onClick={() => improveContent("skills", skill, index)}
                    variant="outline"
                  >
                    <Wand2 className="w-4 h-4 mr-2" />
                    Enhance
                  </Button>
                )}
              </div>
            ))}
            <Button
              onClick={() => addField("skills")}
              variant="outline"
              className="w-full"
            >
              Add Skill
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}