import { createContext, useContext, useState } from 'react';

const ComposeContext = createContext(null);

export function ComposeProvider({ children }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFormat, setSelectedFormat] = useState(null);
  const [text, setText] = useState('');
  const [photos, setPhotos] = useState([]);
  const minWords = 50;

  function resetCompose() {
    setCurrentStep(1);
    setSelectedFormat(null);
    setText('');
    setPhotos([]);
  }

  function wordCount() {
    return text.trim().split(/\s+/).filter(Boolean).length;
  }

  return (
    <ComposeContext.Provider value={{
      currentStep, setCurrentStep,
      selectedFormat, setSelectedFormat,
      text, setText,
      photos, setPhotos,
      minWords,
      wordCount,
      resetCompose,
    }}>
      {children}
    </ComposeContext.Provider>
  );
}

export function useCompose() {
  const ctx = useContext(ComposeContext);
  if (!ctx) throw new Error('useCompose must be used inside ComposeProvider');
  return ctx;
}
