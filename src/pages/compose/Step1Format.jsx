import { useCompose } from '../../context/ComposeContext';
import FormatPicker from '../../components/compose/FormatPicker';

export default function Step1Format() {
  const { selectedFormat, setSelectedFormat } = useCompose();

  return (
    <div>
      <div className="px-4 pt-4 pb-2">
        <h2 className="font-bold text-gray-900 text-lg">Elige un formato</h2>
        <p className="text-sm text-gray-500 mt-0.5">Selecciona la plantilla para tu carta</p>
      </div>
      <FormatPicker selected={selectedFormat} onSelect={setSelectedFormat} />
    </div>
  );
}
