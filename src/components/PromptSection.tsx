import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Wand2 } from "lucide-react";

interface PromptSectionProps {
  content: string;
  onContentChange: (value: string) => void;
  onEnhance: () => void;
  label: string;
  placeholder: string;
  isTextArea?: boolean;
}

export function PromptSection({
  content,
  onContentChange,
  onEnhance,
  label,
  placeholder,
  isTextArea = false,
}: PromptSectionProps) {
  const InputComponent = isTextArea ? Textarea : Input;

  return (
    <Card className="p-6 transition-all hover:shadow-md">
      <h3 className="text-lg font-semibold mb-4">{label}</h3>
      <div className="flex gap-4">
        <InputComponent
          placeholder={placeholder}
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          className="flex-1"
        />
        <Button onClick={onEnhance} variant="outline" className="shrink-0">
          <Wand2 className="w-4 h-4 mr-2" />
          Enhance
        </Button>
      </div>
    </Card>
  );
}