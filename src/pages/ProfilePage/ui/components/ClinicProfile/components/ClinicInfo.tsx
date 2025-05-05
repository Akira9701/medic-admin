import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { FC } from 'react';

interface IClinicInfo {
  title: string;
  email: string;
  avatarUrl: string;
}

const ClinicInfo: FC<IClinicInfo> = ({ title, email, avatarUrl }) => {
  return (
    <div className="flex gap-4 w-full">
      <Avatar className="w-24 h-24">
        <AvatarImage src={avatarUrl} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1 ">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">{title}</h3>
        <p className="leading-7">{email}</p>
      </div>
    </div>
  );
};

export default ClinicInfo;
