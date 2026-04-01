import { useCompose } from '../../context/ComposeContext';
import WordCountBar from '../../components/compose/WordCountBar';

export default function Step2Text() {
  const { text, setText, wordCount, minWords } = useCompose();

  return (
    <div>
      <div className="px-4 pt-4 pb-2">
        <h2 className="font-bold text-gray-900 text-lg">Escribe tu carta</h2>
        <p className="text-sm text-gray-500 mt-0.5">Para: María Alejandra</p>
      </div>

      <WordCountBar current={wordCount()} min={minWords} />

      <div className="p-4">
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Escribe tu carta aquí. Cuéntale cómo estás, qué has hecho últimamente, algo que quieras compartir..."
          className="w-full min-h-[300px] bg-white border border-gray-200 rounded-xl p-4 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-compassion-blue/30 focus:border-compassion-blue resize-none leading-relaxed"
        />
        <p className="text-xs text-gray-400 mt-2">
          Tip: Las cartas con saludo personal, detalles de tu vida y una pregunta para el apadrinado son las más valoradas.
        </p>
      </div>
    </div>
  );
}
