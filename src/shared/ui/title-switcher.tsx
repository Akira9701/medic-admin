import { FC } from 'react';
import { Label } from './label';
import { Switch } from './switch';
import { cn } from '../lib/utils';

interface ITitleSwitcher {
  isChecked: boolean;
  setIsChecked: (isChecked: boolean) => void;
  title: string;
  className?: string;
}

export const TitleSwitcher: FC<ITitleSwitcher> = ({
  isChecked,
  setIsChecked,
  title,
  className,
}) => {
  return (
    <div className={cn('flex items-center space-x-2 top-0 right-0', className)}>
      <Switch id="airplane-mode" checked={isChecked} onCheckedChange={setIsChecked} />
      <Label htmlFor="airplane-mode">{title}</Label>
    </div>
  );
};
