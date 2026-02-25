import React from 'react';

interface RadioCardProps {
  id: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  label: string;
  description?: string;
}

const RadioCard: React.FC<RadioCardProps> = ({ id, name, value, checked, onChange, label, description }) => {
  return (
    <label 
      htmlFor={id} 
      className={`block p-5 rounded-xl border cursor-pointer transition-all ${
        checked 
          ? 'bg-altea-green/10 border-altea-green shadow-md' 
          : 'bg-gray-50 dark:bg-[#111] border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
      }`}
    >
      <input 
        type="radio" 
        id={id} 
        name={name} 
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="sr-only" // Cache le bouton radio par défaut
      />
      <div className="flex items-center">
        <div className={`w-5 h-5 rounded-full border-2 ${checked ? 'border-altea-green' : 'border-gray-400'} flex items-center justify-center mr-4 flex-shrink-0`}>
          {checked && <div className="w-2.5 h-2.5 bg-altea-green rounded-full"></div>}
        </div>
        <div>
          <p className="font-bold text-gray-900 dark:text-white">{label}</p>
          {description && <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>}
        </div>
      </div>
    </label>
  );
};

export default RadioCard;
