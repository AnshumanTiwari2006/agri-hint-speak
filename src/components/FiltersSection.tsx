import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import FilterDropdown from "./FilterDropdown";

export interface FilterState {
  cropType: string;
  soilType: string;
  season: string;
  irrigation: string;
  fertilizer: string;
  pestDisease: string;
  region: string;
  budget: string;
}

interface FiltersSectionProps {
  filters: FilterState;
  onFilterChange: (filterType: keyof FilterState, value: string) => void;
  onClearFilters: () => void;
}

const filterOptions = {
  cropType: ["गेहूं", "चावल", "मक्का", "दाल", "गन्ना", "कपास", "आलू", "प्याज"],
  soilType: ["दोमट", "काली", "लाल", "रेतीली", "चिकनी", "कंकरीली"],
  season: ["खरीफ", "रबी", "जायद", "साल भर"],
  irrigation: ["ड्रिप", "स्प्रिंकलर", "नहर", "ट्यूबवेल", "बारिश पर निर्भर"],
  fertilizer: ["जैविक", "रासायनिक", "मिश्रित", "कंपोस्ट", "वर्मीकंपोस्ट"],
  pestDisease: ["कीट नियंत्रण", "फंगल रोग", "बैक्टीरियल रोग", "वायरल रोग", "खरपतवार"],
  region: ["उत्तर प्रदेश", "पंजाब", "हरियाणा", "महाराष्ट्र", "गुजरात", "राजस्थान", "मध्य प्रदेश", "बिहार"],
  budget: ["कम (₹10,000 तक)", "मध्यम (₹10,000-50,000)", "अधिक (₹50,000+)"]
};

const filterGuides = {
  cropType: {
    title: "फसल का प्रकार",
    description: "इस फ़िल्टर से आप चुन सकते हैं कि आपकी फसल कौन सी है। यह आपकी फसल के अनुसार सबसे उपयुक्त सलाह देने में मदद करेगा।"
  },
  soilType: {
    title: "मिट्टी का प्रकार",
    description: "इससे आप अपनी ज़मीन की मिट्टी का प्रकार चुन सकते हैं। मिट्टी के अनुसार उर्वरक और सिंचाई की सलाह मिलेगी।"
  },
  season: {
    title: "मौसम/बुआई का समय",
    description: "इससे आप मौसम/फसल बोने का समय चुन सकते हैं। यह मौसम के अनुसार उचित फसल और देखभाल की सलाह देगा।"
  },
  irrigation: {
    title: "सिंचाई की उपलब्धता",
    description: "यहाँ आप बताएं कि आपके पास सिंचाई की कौन सी सुविधा है। इससे पानी की बचत और बेहतर सिंचाई की सलाह मिलेगी।"
  },
  fertilizer: {
    title: "उर्वरक का प्रकार",
    description: "इससे आप चुन सकते हैं कि आप किस प्रकार का उर्वरक इस्तेमाल करना चाहते हैं। जैविक या रासायनिक के अनुसार सलाह मिलेगी।"
  },
  pestDisease: {
    title: "कीट/रोग की समस्या",
    description: "यहाँ आप अपनी फसल में कीट या रोग की समस्या के बारे में बताएं। इससे सही उपचार की सलाह मिलेगी।"
  },
  region: {
    title: "राज्य/क्षेत्र",
    description: "अपना राज्य या क्षेत्र चुनें। यह स्थानीय मौसम और मिट्टी के अनुसार बेहतर सलाह देने में मदद करेगा।"
  },
  budget: {
    title: "बजट सीमा",
    description: "अपना बजट चुनें ताकि आपकी आर्थिक स्थिति के अनुसार किफायती और प्रभावी समाधान सुझाए जा सकें।"
  }
};

export default function FiltersSection({ filters, onFilterChange, onClearFilters }: FiltersSectionProps) {
  const hasActiveFilters = Object.values(filters).some(value => value !== "");

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">
          फ़िल्टर द्वारा खोजें
        </h2>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            className="border-destructive/30 text-destructive hover:bg-destructive/10"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            फ़िल्टर साफ़ करें
          </Button>
        )}
      </div>
      
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
        <FilterDropdown
          label="फसल"
          placeholder="फसल चुनें"
          options={filterOptions.cropType}
          value={filters.cropType}
          onChange={(value) => onFilterChange("cropType", value)}
          guideTitle={filterGuides.cropType.title}
          guideDescription={filterGuides.cropType.description}
        />
        
        <FilterDropdown
          label="मिट्टी"
          placeholder="मिट्टी चुनें"
          options={filterOptions.soilType}
          value={filters.soilType}
          onChange={(value) => onFilterChange("soilType", value)}
          guideTitle={filterGuides.soilType.title}
          guideDescription={filterGuides.soilType.description}
        />
        
        <FilterDropdown
          label="मौसम"
          placeholder="मौसम चुनें"
          options={filterOptions.season}
          value={filters.season}
          onChange={(value) => onFilterChange("season", value)}
          guideTitle={filterGuides.season.title}
          guideDescription={filterGuides.season.description}
        />
        
        <FilterDropdown
          label="सिंचाई"
          placeholder="सिंचाई चुनें"
          options={filterOptions.irrigation}
          value={filters.irrigation}
          onChange={(value) => onFilterChange("irrigation", value)}
          guideTitle={filterGuides.irrigation.title}
          guideDescription={filterGuides.irrigation.description}
        />
        
        <FilterDropdown
          label="उर्वरक"
          placeholder="उर्वरक चुनें"
          options={filterOptions.fertilizer}
          value={filters.fertilizer}
          onChange={(value) => onFilterChange("fertilizer", value)}
          guideTitle={filterGuides.fertilizer.title}
          guideDescription={filterGuides.fertilizer.description}
        />
        
        <FilterDropdown
          label="कीट/रोग"
          placeholder="समस्या चुनें"
          options={filterOptions.pestDisease}
          value={filters.pestDisease}
          onChange={(value) => onFilterChange("pestDisease", value)}
          guideTitle={filterGuides.pestDisease.title}
          guideDescription={filterGuides.pestDisease.description}
        />
        
        <FilterDropdown
          label="राज्य"
          placeholder="राज्य चुनें"
          options={filterOptions.region}
          value={filters.region}
          onChange={(value) => onFilterChange("region", value)}
          guideTitle={filterGuides.region.title}
          guideDescription={filterGuides.region.description}
        />
        
        <FilterDropdown
          label="बजट"
          placeholder="बजट चुनें"
          options={filterOptions.budget}
          value={filters.budget}
          onChange={(value) => onFilterChange("budget", value)}
          guideTitle={filterGuides.budget.title}
          guideDescription={filterGuides.budget.description}
        />
      </div>
    </div>
  );
}