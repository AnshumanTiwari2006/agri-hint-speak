import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Info } from "lucide-react";
import GuideModal from "./GuideModal";

interface FilterDropdownProps {
  label: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  guideTitle: string;
  guideDescription: string;
}

export default function FilterDropdown({
  label,
  placeholder,
  options,
  value,
  onChange,
  guideTitle,
  guideDescription,
}: FilterDropdownProps) {
  const [showGuide, setShowGuide] = useState(false);

  const handleValueChange = (newValue: string) => {
    if (newValue === "guide") {
      setShowGuide(true);
    } else {
      onChange(newValue === "all" ? "" : newValue);
    }
  };

  return (
    <>
      <div className="min-w-[160px] sm:min-w-[180px]">
        <label className="block text-sm font-medium text-foreground mb-2">
          {label}
        </label>
        <Select value={value || "all"} onValueChange={handleValueChange}>
          <SelectTrigger className="w-full bg-background border-border hover:border-primary/50 focus:ring-primary/20">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border shadow-lg z-50">
            <SelectItem 
              value="guide" 
              className="text-accent cursor-pointer hover:bg-accent/10"
            >
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                ℹ️ मार्गदर्शन
              </div>
            </SelectItem>
            <SelectItem value="all" className="hover:bg-muted/50">
              सभी
            </SelectItem>
            {options.map((option) => (
              <SelectItem 
                key={option} 
                value={option}
                className="hover:bg-muted/50"
              >
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <GuideModal
        isOpen={showGuide}
        onClose={() => setShowGuide(false)}
        title={guideTitle}
        description={guideDescription}
      />
    </>
  );
}