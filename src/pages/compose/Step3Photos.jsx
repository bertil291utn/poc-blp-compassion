import { useCompose } from '../../context/ComposeContext';
import PhotoUploader from '../../components/compose/PhotoUploader';

export default function Step3Photos() {
  const { photos, setPhotos } = useCompose();

  return (
    <div>
      <div className="px-4 pt-4 pb-2">
        <h2 className="font-bold text-gray-900 text-lg">Adjuntar fotos</h2>
        <p className="text-sm text-gray-500 mt-0.5">Opcional · Hasta 5 fotos</p>
      </div>
      <PhotoUploader photos={photos} onChange={setPhotos} />
    </div>
  );
}
