import InputWithLabel from '@/shared/ui/inputWithLabel';
import { ClinicPageChangeHandlerKey } from '@/types/profilePages.types';
import { FC, useEffect, useState } from 'react';

interface IAddresInfo {
  address: {
    city: string;
    street: string;
    building?: string;
    postalCode?: string;
  };
  onChange: (key: ClinicPageChangeHandlerKey, value: string) => void;
  isEditMode: boolean;
  isSomeDataChanged: boolean;
}

const AddressInfo: FC<IAddresInfo> = ({ address, onChange, isEditMode, isSomeDataChanged }) => {
  const [city, setCity] = useState(address.city);
  const [street, setStreet] = useState(address.street);
  const [building, setBuilding] = useState(address.building || '');
  const [postalCode, setPostalCode] = useState(address.postalCode || '');

  useEffect(() => {
    setCity(address.city);
    setStreet(address.street);
    setBuilding(address.building || '');
    setPostalCode(address.postalCode || '');
  }, [isSomeDataChanged]);
  return (
    <div className="flex flex-col gap-2 mt-4">
      <div className="flex gap-4">
        <InputWithLabel
          disabled={!isEditMode}
          label="Город"
          value={city}
          onChange={(e) => {
            onChange('city', e.target.value);
            setCity(e.target.value);
          }}
          type="text"
          placeholder="Город"
        />

        {address?.street && (
          <InputWithLabel
            disabled={!isEditMode}
            label="Улица"
            value={street}
            onChange={(e) => {
            onChange('street', e.target.value);
            setStreet(e.target.value);
          }}
          type="text"
          placeholder="Улица"
          />
        )}
      </div>
      <div className="flex gap-4">
        <InputWithLabel
          disabled={!isEditMode}
          label="Номер дома"
          value={building}
          onChange={(e) => {
            onChange('building', e.target.value);
            setBuilding(e.target.value);
          }}
          type="text"
          placeholder="Номер дома"
        />
        <InputWithLabel
          disabled={!isEditMode}
          label="Почтовый индекс"
          value={postalCode}
          onChange={(e) => {
            onChange('postalCode', e.target.value);
            setPostalCode(e.target.value);
          }}
          type="text"
          placeholder="Почтовый индекс"
        />
      </div>
    </div>
  );
};

export default AddressInfo;
