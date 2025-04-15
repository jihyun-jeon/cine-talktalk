import React from 'react';
import { useGetGenresQuery } from '@/hooks/query/useMovie';
import { Genre } from '@/types/movieType';
import { TMDB_LANGUAGE_KR } from '@/contants';
import { ToggleGroup, ToggleGroupItem } from '@/shadcn/components/ui/toggle-group';
import clsx from 'clsx';

interface ToggleButtonsProps {
  selectedGenres: string[];
  setSelectedGenres: React.Dispatch<React.SetStateAction<string[]>>;
}

const ToggleButtons: React.FC<ToggleButtonsProps> = ({ selectedGenres, setSelectedGenres }) => {
  const genreIds = useGetGenresQuery({ language: TMDB_LANGUAGE_KR });

  const handleToggleChange = (newValues: string[]) => {
    setSelectedGenres(newValues);
  };

  return (
    <ToggleGroup
      type="multiple"
      value={selectedGenres}
      onValueChange={handleToggleChange}
      aria-label="Genre selection"
      className="flex flex-wrap gap-2"
    >
      {genreIds.data?.genres.map((data: Genre) => (
        <ToggleGroupItem
          value={`${data.id}`}
          key={data.id}
          className={clsx('flex-none mr-1 py-2 px-4 rounded-lg transition-colors duration-200 border text-[#84868d]', {
            'bg-white border-white': selectedGenres?.includes(`${data.id}`),
            'bg-black border-[#84868d]': !selectedGenres?.includes(`${data.id}`),
          })}
        >
          {data.name}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};

export default ToggleButtons;
