interface ImagePreviewProps {
  imageUrl: string;
  foodName: string;
}

export function ImagePreview({ imageUrl, foodName }: ImagePreviewProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="relative aspect-video">
        <img
          src={imageUrl}
          alt="Selected food"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      {foodName && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Detected Food:
          </h3>
          <p className="text-gray-700 mt-1">{foodName}</p>
        </div>
      )}
    </div>
  );
}
