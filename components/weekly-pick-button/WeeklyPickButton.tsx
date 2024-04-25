import Image from 'next/image';
import { Label } from './Label';
import { RadioGroup, RadioGroupItem } from './RadioGroup';

export const WeeklyPickButton = () => {
  return (
    <RadioGroup className="grid w-full grid-cols-2 gap-4">
      <div className="flex items-center">
        <RadioGroupItem value="Ravens" id="option-one" />
        <Label htmlFor="option-one">
          <Image
            src="/assets/team-ravens.svg"
            alt="football"
            width={48}
            height={48}
            priority
          />
          Ravens
        </Label>
      </div>
      <div className="flex items-center">
        <RadioGroupItem value="option-two" id="option-two" />
        <Label htmlFor="option-two">
          <Image
            src="/assets/team-ravens.svg"
            alt="football"
            width={48}
            height={48}
            priority
          />
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
      </div>
    </RadioGroup>
  );
};
