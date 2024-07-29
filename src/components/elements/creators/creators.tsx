import { text } from '../../../lib/text.ts';
import { CreatorsItem } from './components/creators-item/creators-item.tsx';
import { CreatorsItemSkeleton } from './components/creators-item/creators-item-skeleton.tsx';
import { SlidingPanel } from '../sliding-panel';
import { IdType } from '../../../lib/types';
import { Creator } from '../../../lib/types/flipa-clip-api-types.ts';

type CreatorsProps = {
  onClick?: (authorId: IdType) => void;
  creators: Creator[];
};

export const Creators = ({ onClick, creators }: CreatorsProps) => {
  return (
    <SlidingPanel title={text.creators} skeletonItem={CreatorsItemSkeleton}>
      {creators.map(({ name, id, avatar }) => {
        return (
          <CreatorsItem
            key={id}
            id={id}
            name={name}
            thumbnail={avatar}
            onClick={onClick}
          />
        );
      })}
    </SlidingPanel>
  );
};
