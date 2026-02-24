import React from 'react';

interface RadioCardProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  value: string;
  title: string;
  subtitle?: string;
}

const RadioCard: React.FC<RadioCardProps> = ({ checked, onChange, name, value, title, subtitle }) => {
  return (
    <label 
      className={`cursor-pointer border rounded-xl p-4 flex items-start gap-3 transition-all duration-200 ${
        checked 
          ? 'border-altea-green bg-green-50/40 dark:bg-altea-green/10 shadow-sm' 
          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
      }`}
    >
      <input 
        type="radio" 
        name={name} 
        value={value}
        checked={checked}
        onChange={onChange}
        // Utilisation de accent-color pour teindre le bouton radio natif en vert
        className="w-5 h-5 mt-0.5 accent-altea-green cursor-pointer"
      />
      <div>
        <span className={`font-bold block ${checked ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
          {title}
        </span>
        {subtitle && (
          <span className="text-sm text-gray-500 dark:text-gray-400 block mt-0.5">
            {subtitle}
          </span>
        )}
      </div>
    </label>
  );
};

export default RadioCard;
