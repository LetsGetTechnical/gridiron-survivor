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
      <RadioGroupItem value={team} id={team} />
      <Label htmlFor={team}>
        <Image
          className="max-h-12"
      <RadioGroupItem value={team} id={team} data-testid="team-radio" />
      <Label htmlFor={team} data-testid="team-label">
        <Image
          src={src}
          alt={team}
          width={48}
          height={48}
          priority
          data-testid="team-image"
        />
        {team}
      </Label>
    </div>
  );
};

export { WeeklyPickButton };
