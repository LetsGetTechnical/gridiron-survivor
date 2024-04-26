import Image from 'next/image';
import { Label } from './Label';
import { RadioGroup, RadioGroupItem } from './RadioGroup';

type WeeklyPickButtonProps = {
  team: string;
  src: string;
};

const WeeklyPickButton: React.FC<WeeklyPickButtonProps> = ({ team, src }) => {
  return (
    <RadioGroup>
      <div className="flex items-center">
        <RadioGroupItem value={team} id="ravens" />
        <Label htmlFor="ravens">
          <Image src={src} alt={team} width={48} height={48} priority />
          {team}
        </Label>
      </div>
      {/* <div className="flex items-center">
        <RadioGroupItem value="option-two" id="option-two" />
        <Label htmlFor="option-two">
          <Image src={src} alt={team} width={48} height={48} priority />
          Ravens
        </Label>
      </div>
      <div className="flex items-center">
        <RadioGroupItem value="option-three" id="option-three" />
        <Label htmlFor="option-three">
          <Image
            src="/assets/team-ravens.svg"
            alt="football"
            width={48}
            height={48}
            priority
          />
          Three
        </Label>
      </div> */}
    </RadioGroup>
  );
};

export { WeeklyPickButton };
