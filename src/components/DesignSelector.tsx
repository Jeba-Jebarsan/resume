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
      <h2 className="text-2xl font-bold mb-4">Choose Template</h2>
      <div className="space-y-3">
        {designs.map((design) => (
          <Button
            key={design.id}
            variant={selectedDesign === design.id ? "default" : "outline"}
            className={`w-full h-auto p-4 flex items-start gap-3 relative text-left ${
              selectedDesign === design.id ? 'bg-[#0A2472] hover:bg-[#0A2472]/90 text-white' : 'hover:bg-slate-50'
            }`}
            onClick={() => onSelectDesign(design.id)}
          >
            <div className="flex-1">
              <span className="block font-semibold text-base mb-1">{design.name}</span>
              <span className="block text-sm opacity-90">
                {design.description}
              </span>
            </div>
            {selectedDesign === design.id && (
              <Check className="w-5 h-5 absolute top-4 right-4 shrink-0" />
            )}
          </Button>
        ))}
      </div>
    </Card>
  );
}