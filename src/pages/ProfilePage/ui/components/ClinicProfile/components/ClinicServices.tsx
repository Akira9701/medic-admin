import { Badge } from '@/shared/ui/badge';
import { Label } from '@/shared/ui/label';
import { FC } from 'react';

interface IClinicServices {
  services: string[];
}

const ClinicServices: FC<IClinicServices> = ({ services }) => {
  return (
    <div className="flex flex-col gap-2 mt-4">
      <Label>Clinic Services</Label>
      <div className="flex gap-2">
        {services.map((service) => (
          <Badge key={service}>{service}</Badge>
        ))}
      </div>
    </div>
  );
};

export default ClinicServices;
