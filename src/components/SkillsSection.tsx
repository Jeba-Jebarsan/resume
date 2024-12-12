import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";

interface SkillCategory {
  name: string;
  skills: string[];
}

interface SkillsSectionProps {
  categories: SkillCategory[];
  onUpdate: (categories: SkillCategory[]) => void;
}

export function SkillsSection({ categories, onUpdate }: SkillsSectionProps) {
  const [newCategory, setNewCategory] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(0);

  const addCategory = () => {
    if (newCategory.trim()) {
      onUpdate([...categories, { name: newCategory, skills: [] }]);
      setNewCategory("");
    }
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      const updatedCategories = [...categories];
      updatedCategories[selectedCategory].skills.push(newSkill.trim());
      onUpdate(updatedCategories);
      setNewSkill("");
    }
  };

  const removeSkill = (categoryIndex: number, skillIndex: number) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].skills.splice(skillIndex, 1);
    onUpdate(updatedCategories);
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Skills</h2>
      
      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="New category name..."
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <Button onClick={addCategory} variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </Button>
        </div>

        {categories.length > 0 && (
          <div className="space-y-4">
            <div className="flex gap-2">
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(Number(e.target.value))}
              >
                {categories.map((category, index) => (
                  <option key={index} value={index}>
                    {category.name}
                  </option>
                ))}
              </select>
              <Input
                placeholder="Add skill..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
              />
              <Button onClick={addSkill} variant="outline">
                Add Skill
              </Button>
            </div>

            {categories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="space-y-2">
                <h3 className="font-medium">{category.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge
                      key={skillIndex}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {skill}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => removeSkill(categoryIndex, skillIndex)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}