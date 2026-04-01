import { Check } from 'lucide-react';
import clsx from 'clsx';

const steps = [
  { number: 1, label: 'Formato' },
  { number: 2, label: 'Texto' },
  { number: 3, label: 'Fotos' },
  { number: 4, label: 'Enviar' },
];

export default function StepperBar({ currentStep }) {
  return (
    <div className="bg-white border-b border-gray-100 px-4 py-3">
      <div className="flex items-center justify-between max-w-sm mx-auto">
        {steps.map((step, idx) => {
          const done = step.number < currentStep;
          const active = step.number === currentStep;
          return (
            <div key={step.number} className="flex items-center">
              {/* Circle */}
              <div className="flex flex-col items-center">
                <div className={clsx(
                  'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all',
                  done && 'bg-compassion-blue text-white',
                  active && 'bg-compassion-blue text-white ring-2 ring-compassion-blue ring-offset-2',
                  !done && !active && 'bg-gray-200 text-gray-500'
                )}>
                  {done ? <Check size={13} strokeWidth={3} /> : step.number}
                </div>
                <span className={clsx(
                  'text-xs mt-1 whitespace-nowrap',
                  active ? 'text-compassion-blue font-semibold' : 'text-gray-400'
                )}>
                  {step.label}
                </span>
              </div>
              {/* Connector */}
              {idx < steps.length - 1 && (
                <div className={clsx(
                  'h-0.5 w-8 sm:w-12 mx-1 mb-4 transition-colors',
                  done ? 'bg-compassion-blue' : 'bg-gray-200'
                )} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
