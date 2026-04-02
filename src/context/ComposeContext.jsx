import { createContext, useContext, useState } from 'react';

const ComposeContext = createContext(null);

export function ComposeProvider({ children }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFormat, setSelectedFormat] = useState(null);
  const [text, setText] = useState('');
  const [photos, setPhotos] = useState([]);
  const [isSent, setIsSent] = useState(false);
  const [sending, setSending] = useState(false);
  const minWords = 50;

  function handleSend() {
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setIsSent(true);
    }, 1500);
  }

  function resetCompose() {
    setCurrentStep(1);
    setSelectedFormat(null);
    setText('');
    setPhotos([]);
    setIsSent(false);
    setSending(false);
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
      isSent, setIsSent,
      sending, handleSend,
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
