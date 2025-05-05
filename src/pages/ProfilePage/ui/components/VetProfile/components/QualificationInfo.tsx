import InputWithLabel from '@/shared/ui/inputWithLabel';
import { useState } from 'react';

import { useEffect } from 'react';

import { FC } from 'react';
import { VetPageChangeHandlerKey } from '@/types/profilePages.types';
interface IQualificationInfo {
  qualification: string;
  specialization: string;
  onChange: (key: VetPageChangeHandlerKey, value: string) => void;
  isEditMode: boolean;
  isSomeDataChanged: boolean;
}

const QualificationInfo: FC<IQualificationInfo> = ({
  qualification,
  specialization,
  onChange,
  isEditMode,
  isSomeDataChanged,
}) => {
  const [localQualification, setLocalQualification] = useState(qualification);
  const [localSpecialization, setLocalSpecialization] = useState(specialization);

  useEffect(() => {
    if (!isSomeDataChanged) {
      setLocalQualification(qualification);
      setLocalSpecialization(specialization);
    }
  }, [isSomeDataChanged]);

  return (
    <div className="flex flex-col gap-2 mt-4">
      <div className="flex gap-4">
        <InputWithLabel
          disabled={!isEditMode}
          label="Квалификация"
          value={localQualification}
          onChange={(e) => {
            setLocalQualification(e.target.value);
            onChange('qualification', e.target.value);
          }}
          type="text"
          placeholder="Квалификация"
        />
        <InputWithLabel
          disabled={!isEditMode}
          label="Специализация"
          value={localSpecialization}
          onChange={(e) => {
            setLocalSpecialization(e.target.value);
            onChange('specialization', e.target.value);
          }}
          type="text"
          placeholder="Специализация"
        />
      </div>
    </div>
  );
};

export default QualificationInfo;
