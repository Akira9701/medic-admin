import InputWithLabel from '@/shared/ui/inputWithLabel';
import { Textarea } from '@/shared/ui/textarea';
import { FC, useEffect, useState } from 'react';
import { VetPageChangeHandlerKey } from '@/types/profilePages.types';

interface ITitleInfo {
  isSomeDataChanged: boolean;
  firstName: string;
  lastName: string;
  onChange: (key: VetPageChangeHandlerKey, value: string) => void;
  isEditMode: boolean;
  bio: string;
}

const TitleInfo: FC<ITitleInfo> = ({
  firstName,
  lastName,
  onChange,
  isEditMode,
  isSomeDataChanged,
  bio,
}) => {
  const [localFirstName, setLocalFirstName] = useState(firstName);
  const [localLastName, setLocalLastName] = useState(lastName);
  const [localBio, setLocalBio] = useState(bio);

  useEffect(() => {
    if (!isSomeDataChanged) {
      setLocalFirstName(firstName);
      setLocalLastName(lastName);
      setLocalBio(bio);
    }
  }, [isSomeDataChanged]);

  return (
    <div className="flex flex-col gap-2 mt-4">
      <div className="flex gap-4">
        <InputWithLabel
          disabled={!isEditMode}
          label="Имя"
          value={localFirstName}
          onChange={(e) => {
            setLocalFirstName(e.target.value);
            onChange('firstName', e.target.value);
          }}
          type="text"
          placeholder="Имя"
        />
        <InputWithLabel
          disabled={!isEditMode}
          label="Фамилия"
          value={localLastName}
          onChange={(e) => {
            setLocalLastName(e.target.value);
            onChange('lastName', e.target.value);
          }}
          type="text"
          placeholder="Фамилия"
        />
      </div>
      <Textarea
        disabled={!isEditMode}
        placeholder="Описание"
        value={localBio}
        onChange={(e) => {
          setLocalBio(e.target.value);
          onChange('bio', e.target.value);
        }}
      />
    </div>
  );
};

export default TitleInfo;
