import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Label } from '@/shared/ui/label';
import { Switch } from '@/shared/ui/switch';
import { FC } from 'react';

interface IUserInfo {
  title: string;
  email: string;
  avatarUrl: string;
}

const UserInfo: FC<IUserInfo> = ({ title, email, avatarUrl }) => {
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

export default UserInfo;
