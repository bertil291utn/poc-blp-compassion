import { Check } from 'lucide-react';
import clsx from 'clsx';

const steps = [
  { number: 1, label: 'Formato' },
  { number: 2, label: 'Texto' },
  { number: 3, label: 'Fotos' },
  { number: 4, label: 'Enviar' },
];

export default function StepperBar({ currentStep, onStepClick }) {
  return (
    <div className="bg-white border-b border-gray-100 px-4 py-3">
      <div className="flex items-center justify-between max-w-sm mx-auto">
        {steps.map((step, idx) => {
          const done = step.number < currentStep;
          const active = step.number === currentStep;
          return (
            <div key={step.number} className="flex items-center">
              {/* Circle */}
              <div
                className={clsx('flex flex-col items-center', done && 'cursor-pointer group')}
                onClick={() => done && onStepClick?.(step.number)}
              >
                <div className={clsx(
                  'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all',
                  done && 'bg-compassion-blue text-white group-hover:bg-compassion-blue-dark',
                  active && 'bg-compassion-blue text-white ring-2 ring-compassion-blue ring-offset-2',
                  !done && !active && 'bg-gray-200 text-gray-500'
                )}>
                  {done ? <Check size={13} strokeWidth={3} /> : step.number}
                </div>
                <span className={clsx(
                  'text-xs mt-1 whitespace-nowrap transition-colors',
                  active ? 'text-compassion-blue font-semibold' : 'text-gray-400',
                  done && 'group-hover:text-compassion-blue'
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
