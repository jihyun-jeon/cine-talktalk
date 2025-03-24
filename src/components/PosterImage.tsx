import { getImageUrl } from '@/utils/tmdbUtils';

type posterImageType = { posterPath: string | null | undefined; size: string };

const PosterImage = ({ posterPath, size }: posterImageType) => (
  <>
    {posterPath ? (
      <img src={getImageUrl(posterPath, size)} alt="movie_poster" className="w-full h-full" />
    ) : (
      <div className="absolute inset-0 w-full h-full bg-gray-200"> no poster </div>
    )}
  </>
);

export default PosterImage;
