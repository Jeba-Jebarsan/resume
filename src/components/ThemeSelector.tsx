import { Card } from "@/components/ui/card";

const themeColors = [
  { id: 'red', color: '#ea384c' },
  { id: 'blue', color: '#0EA5E9' },
  { id: 'purple', color: '#9b87f5' },
  { id: 'green', color: '#10B981' },
  { id: 'orange', color: '#F97316' },
  { id: 'pink', color: '#D946EF' },
];

interface ThemeSelectorProps {
  selectedTheme: string;
  onThemeSelect: (theme: string) => void;
}

export function ThemeSelector({ selectedTheme, onThemeSelect }: ThemeSelectorProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Select Theme Color</h3>
      <div className="grid grid-cols-6 gap-3">
        {themeColors.map((theme) => (
          <button
            key={theme.id}
            onClick={() => onThemeSelect(theme.id)}
            className={`w-8 h-8 rounded-full transition-all duration-200 ${
              selectedTheme === theme.id ? 'ring-2 ring-offset-2 ring-primary' : ''
            }`}
            style={{ backgroundColor: theme.color }}
            aria-label={`Select ${theme.id} theme`}
          />
        ))}
      </div>
    </Card>
  );
}