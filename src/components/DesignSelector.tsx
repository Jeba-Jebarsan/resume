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
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Choose Template</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {designs.map((design) => (
          <Button
            key={design.id}
            variant={selectedDesign === design.id ? "default" : "outline"}
            className="h-auto p-4 flex flex-col items-start gap-2 relative"
            onClick={() => onSelectDesign(design.id)}
          >
            {selectedDesign === design.id && (
              <Check className="w-4 h-4 absolute top-2 right-2" />
            )}
            <span className="font-semibold">{design.name}</span>
            <span className="text-sm text-muted-foreground text-left">
              {design.description}
            </span>
          </Button>
        ))}
      </div>
    </Card>
  );
}