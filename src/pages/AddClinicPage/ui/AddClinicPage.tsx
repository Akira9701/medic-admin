import { FC, useState } from 'react';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Textarea } from '@/shared/ui/textarea';
import AlertModal from '@/shared/ui/alert-modal';
import { Button } from '@/shared/ui/button';

interface IClinicFormData {
  name: string;
  description: string;
  phone: string;
  email: string;
  city: string;
  street: string;
  building: string;
  postalCode: string;
  services: string[];
  workingHours: string[];
  logo: File | null;
}

const AddClinicPage: FC = () => {
  const [formData, setFormData] = useState<IClinicFormData>({
    name: '',
    description: '',
    phone: '',
    email: '',
    city: '',
    street: '',
    building: '',
    postalCode: '',
    services: [''],
    workingHours: [''],
    logo: null
  });

  const [isOpenAlertModal, setIsOpenAlertModal] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleWorkingHoursChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      workingHours: [value]
    }));
  };

  const handleServicesChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      services: [value]
    }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      logo: file
    }));
  };

  const handleSave = async () => {
    // Create FormData to send file
    const data = new FormData();
    
    // Add all text fields
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'services' || key === 'workingHours') {
        data.append(key, JSON.stringify(value));
      } else if (key !== 'logo') {
        data.append(key, value as string);
      }
    });

    // Add logo file if exists
    if (formData.logo) {
      data.append('logo', formData.logo);
    }

    // Here you can implement the save logic with the FormData
    console.log(data);
    setIsOpenAlertModal(false);
  };

  return (
    <div className="max-w-1xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <Input
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer">
            {formData.logo ? (
              <img 
                src={URL.createObjectURL(formData.logo)} 
                alt="Clinic logo" 
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-gray-500">+</span>
            )}
          </div>
        </div>
        <h2 className="text-2xl font-bold">Add New Clinic</h2>
      </div>
      
      <div className="flex gap-8">
        <div className="space-y-4 flex-1">
          <div className="space-y-2">
            <Label htmlFor="name">Clinic Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="services">Services</Label>
            <Input
              id="services"
              value={formData.services[0]}
              onChange={(e) => handleServicesChange(e.target.value)}
              placeholder="Enter services separated by commas"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hours">Working Hours</Label>
            <Input
              id="hours"
              value={formData.workingHours[0]}
              onChange={(e) => handleWorkingHoursChange(e.target.value)}
              placeholder="Enter working hours (e.g. Mon-Fri 9:00-18:00)"
            />
          </div>
        </div>

        <div className="space-y-10 flex-1">

          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="street">Street</Label>
            <Input
              id="street"
              value={formData.street}
              onChange={(e) => handleInputChange('street', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="building">Building</Label>
            <Input
              id="building"
              value={formData.building}
              onChange={(e) => handleInputChange('building', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="postalCode">Postal Code</Label>
            <Input
              id="postalCode"
              value={formData.postalCode}
              onChange={(e) => handleInputChange('postalCode', e.target.value)}
            />
          </div>
        </div>
      </div>

      <AlertModal
        isOpen={isOpenAlertModal}
        onOpenChange={setIsOpenAlertModal}
        classNameButton="mt-6"
        title="Save Clinic"
        description="Are you sure you want to save this clinic?"
        buttonApproveText="Save"
        buttonCancelText="Cancel"
        buttonShowModalText="Save Clinic"
        onApprove={handleSave}
        onCancel={() => setIsOpenAlertModal(false)}
      />
    </div>
  );
};

export default AddClinicPage;
