import InputWithLabel from '@/shared/ui/inputWithLabel';
import { Textarea } from '@/shared/ui/textarea';
import { FC, useEffect, useState } from 'react';

interface ITitleInfo {
  isSomeDataChanged: boolean;
  name: string;
  email: string;
  description: string;
  onChange: (key: string, value: string) => void;
  isEditMode: boolean;
}

const TitleInfo: FC<ITitleInfo> = ({
  name,
  email,
  description,
  onChange,
  isEditMode,
  isSomeDataChanged,
}) => {
  const [localName, setLocalName] = useState(name);
  const [localEmail, setLocalEmail] = useState(email);
  const [localDescription, setLocalDescription] = useState(description);

  useEffect(() => {
    if (!isSomeDataChanged) {
      setLocalName(name);
      setLocalEmail(email);
      setLocalDescription(description);
    }
  }, [isSomeDataChanged]);

  return (
    <div className="flex flex-col gap-2 mt-4">
      <div className="flex gap-4">
        <InputWithLabel
          disabled={!isEditMode}
          label="Name"
          value={localName}
          onChange={(e) => {
            setLocalName(e.target.value);
            onChange('name', e.target.value);
          }}
          type="text"
          placeholder="Name"
        />
        <InputWithLabel
          disabled={!isEditMode}
          label="Email"
          value={localEmail}
          onChange={(e) => {
            setLocalEmail(e.target.value);
            onChange('email', e.target.value);
          }}
          type="text"
          placeholder="Email"
        />
      </div>
      <Textarea
        disabled={!isEditMode}
        placeholder="Description"
        value={localDescription}
        onChange={(e) => {
          setLocalDescription(e.target.value);
          onChange('description', e.target.value);
        }}
      />
    </div>
  );
};

export default TitleInfo;
