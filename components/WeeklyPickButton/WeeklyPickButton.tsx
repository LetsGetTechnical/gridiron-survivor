import Image from 'next/image';
import { Label } from '../Label/Label';
import { RadioGroupItem } from '../RadioGroup/RadioGroup';

type WeeklyPickButtonProps = {
  team: string;
  src: string;
  onClick: (e:string)=>void
};

const WeeklyPickButton: React.FC<WeeklyPickButtonProps> = ({ team, src, onClick}) => {
  return (
    <div className="flex items-center" data-custom-attribute="weeklyPickButton" onClick={()=>onClick(team)}>
      <RadioGroupItem value={team} id={team}/>
      <Label htmlFor={team}>
        <Image src={src} alt={team} width={48} height={48} priority />
        {team}
      </Label>
    </div>
  );
};

export { WeeklyPickButton };
