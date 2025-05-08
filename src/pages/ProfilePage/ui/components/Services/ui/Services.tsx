import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { X } from 'lucide-react';
import { FC, useRef } from 'react';

interface IServices {
  services: string[];
  removeService: (service: string) => void;
  addService: (service: string) => void;
}

const Services: FC<IServices> = ({ services, removeService, addService }) => {
  const serviceNameRef = useRef<string>('');
  return (
    <div className="flex flex-col gap-2 mt-4">
      <Label>Vet Services</Label>
      <div className="flex gap-2">
        <div className="flex gap-2 w-[80%] ">
          {services?.map((service) => (
            <Badge
              className="h-fit"
              key={service}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                removeService(service);
              }}>
              {service}
              <X />
            </Badge>
          ))}
        </div>
        <div className="flex gap-2 ml-auto">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Добавить услугу</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none mb-4">Add new service</h4>
                  <Input
                    className="mb-0"
                    placeholder="Service name"
                    onChange={(e) => (serviceNameRef.current = e.target.value)}
                  />
                  <Button
                    className="mt-4"
                    onClick={() => {
                      addService(serviceNameRef.current);
                    }}>
                    Добавить
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Services;
