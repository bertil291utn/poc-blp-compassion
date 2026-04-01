import { ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import { ComposeProvider, useCompose } from '../../context/ComposeContext';
import StepperBar from '../../components/compose/StepperBar';
import Step1Format from './Step1Format';
import Step2Text from './Step2Text';
import Step3Photos from './Step3Photos';
import Step4Send from './Step4Send';

function ComposeWizard() {
  const { currentStep, setCurrentStep, selectedFormat, wordCount, minWords } = useCompose();

  const canGoNext = () => {
    if (currentStep === 1) return !!selectedFormat;
    if (currentStep === 2) return wordCount() >= minWords;
    return true;
  };

  const stepComponents = {
    1: <Step1Format />,
    2: <Step2Text />,
    3: <Step3Photos />,
    4: <Step4Send />,
  };

  const isLastStep = currentStep === 4;

  return (
    <div className="max-w-lg mx-auto flex flex-col min-h-[calc(100vh-8rem)] sm:min-h-[calc(100vh-4rem)]">
      <StepperBar currentStep={currentStep} />

      <div className="flex-1 overflow-y-auto">
        {stepComponents[currentStep]}
      </div>

      {/* Navigation buttons — hidden on step 4 where the send button handles it */}
      {!isLastStep && (
        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-4 py-3 flex gap-3">
          {currentStep > 1 && (
            <button
              onClick={() => setCurrentStep(s => s - 1)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft size={16} />
              Atrás
            </button>
          )}
          <button
            onClick={() => setCurrentStep(s => s + 1)}
            disabled={!canGoNext()}
            className={clsx(
              'flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold transition-colors',
              canGoNext()
                ? 'bg-compassion-blue text-white hover:bg-compassion-blue-dark'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            )}
          >
            Siguiente
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* Hint when step is blocked */}
      {!canGoNext() && (
        <div className="px-4 pb-2 bg-white">
          <p className="text-xs text-center text-gray-400">
            {currentStep === 1 && 'Selecciona un formato para continuar'}
            {currentStep === 2 && `Escribe al menos ${minWords} palabras para continuar`}
          </p>
        </div>
      )}
    </div>
  );
}

export default function ComposePage() {
  return (
    <ComposeProvider>
      <ComposeWizard />
    </ComposeProvider>
  );
}
