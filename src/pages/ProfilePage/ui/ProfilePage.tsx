import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
const ProfilePage = () => {
  return (
    <div className="">
      <div className="flex gap-4">
        <Avatar className="w-24 h-24">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1 ">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">The Joke Tax</h3>
          <p className="leading-7">Medic</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
