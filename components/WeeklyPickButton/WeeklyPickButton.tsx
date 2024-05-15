import Image from 'next/image';
import { Label } from '../Label/Label';
import { RadioGroupItem } from '../RadioGroup/RadioGroup';

type WeeklyPickButtonProps = {
  team: string;
  src: string;
};

const WeeklyPickButton: React.FC<WeeklyPickButtonProps> = ({ team, src }) => {
  return (
    <div className="flex items-center">
      <RadioGroupItem value={team} id={team} data-testid />
      <Label htmlFor={team} data-testid>
        <Image
          src={src}
          alt={team}
          width={48}
          height={48}
          priority
          data-testid
        />
        {team}
      </Label>
    </div>
  );
};

export { WeeklyPickButton };
