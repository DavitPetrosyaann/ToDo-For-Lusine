import { PastelColor } from '../types.ts';
import { PASTEL_COLORS } from '../data/colors.ts';

interface ColorPickerRowProps {
  label: string;
  value: PastelColor;
  onChange: (color: PastelColor) => void;
}

export function ColorPickerRow({ label, value, onChange }: ColorPickerRowProps) {
  return (
    <div className="flex items-center gap-2 py-1">
      <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{label}:</span>
      {(Object.keys(PASTEL_COLORS) as PastelColor[]).map((cKey) => (
        <button
          type="button"
          key={cKey}
          onClick={() => onChange(cKey)}
          className={`w-6 h-6 rounded-full border-2 transition-all ${value === cKey ? 'border-emerald-600 scale-110' : 'border-transparent'}`}
          style={{ backgroundColor: PASTEL_COLORS[cKey].dotColor }}
        />
      ))}
    </div>
  );
}
