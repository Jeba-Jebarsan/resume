import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface DesignSelectorProps {
  selectedDesign: string;
  onSelectDesign: (design: string) => void;
}

const designs = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean and contemporary design with emphasis on whitespace",
  },
  {
    id: "classic",
    name: "Classic",
    description: "Traditional format perfect for conservative industries",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold design for creative professionals",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and elegant layout",
  },
  {
    id: "professional",
    name: "Professional",
    description: "Structured layout for corporate environments",
  }
];

export function DesignSelector({
  selectedDesign,
  onSelectDesign,
}: DesignSelectorProps) {
  return (
    <Card className="p-4">
      <h2 className="text-lg font-semibold mb-3">Choose Template</h2>
      <div className="space-y-2">
        {designs.map((design) => (
          <Button
            key={design.id}
            variant={selectedDesign === design.id ? "default" : "outline"}
            className={`w-full h-auto p-3 flex items-start gap-3 relative text-left ${
              selectedDesign === design.id ? 'bg-primary text-primary-foreground' : ''
            }`}
            onClick={() => onSelectDesign(design.id)}
          >
            <div className="flex-1">
              <span className="block font-medium text-sm mb-0.5">{design.name}</span>
              <span className="block text-xs opacity-90">
                {design.description}
              </span>
            </div>
            {selectedDesign === design.id && (
              <Check className="w-4 h-4 absolute top-3 right-3 shrink-0" />
            )}
          </Button>
        ))}
      </div>
    </Card>
  );
}