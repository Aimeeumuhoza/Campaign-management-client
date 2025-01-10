import { ReactNode } from 'react';

interface Card {
  subtitle?: string;
  description: string;
  customClass?: string;
  number?: ReactNode; 
}

export default function DashCard({ description, customClass, number }: Card) {
  return (
    <div className={`block md:max-w-[22rem] max-w-full rounded-lg bg-white p-4 mr-5 shadow-lg text-left ${customClass}`}>
      <div className="flex items-center">
        {/* Icon with colored background */}
        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-400 text-white mr-4">
          {number}
        </div>
        
        <div>
          <p className="text-[#6C757D] text-lg">{description}</p>
        </div>
      </div>
    </div>
  );
}
