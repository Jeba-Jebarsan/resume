import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

const designs = [
  {
    id: "modern",
    name: "Modern",
    gradient: "bg-gradient-to-r from-purple-50 to-white",
  },
  {
    id: "professional",
    name: "Professional",
    gradient: "bg-gradient-to-r from-blue-50 to-white",
  },
  {
    id: "creative",
    name: "Creative",
    gradient: "bg-gradient-to-r from-pink-50 to-white",
  },
];

interface DesignSelectorProps {
  selectedDesign: string;
  onSelectDesign: (design: string) => void;
}

export function DesignSelector({ selectedDesign, onSelectDesign }: DesignSelectorProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Choose Design</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {designs.map((design) => (
          <Button
            key={design.id}
            variant={selectedDesign === design.id ? "default" : "outline"}
            className={`h-20 relative ${design.gradient}`}
            onClick={() => onSelectDesign(design.id)}
          >
            {selectedDesign === design.id && (
              <Check className="absolute top-2 right-2 w-4 h-4" />
            )}
            {design.name}
          </Button>
        ))}
      </div>
    </Card>
  );
}