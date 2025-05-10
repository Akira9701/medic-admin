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
  address: {
    city: string;
    street: string;
    building: string;
  };
  licenseNumber: string;
  workingHours: string[];
}

const AddClinicPage: FC = () => {
  const [formData, setFormData] = useState<IClinicFormData>({
    name: '',
    description: '',
    phone: '',
    email: '',
    address: {
      city: '',
      street: '',
      building: ''
    },
    licenseNumber: '',
    workingHours: ['']
  });

  const [isOpenAlertModal, setIsOpenAlertModal] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof IClinicFormData],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleWorkingHoursChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      workingHours: [value]
    }));
  };

  const handleSave = () => {
    // Here you can implement the save logic
    console.log(formData);
    setIsOpenAlertModal(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Add New Clinic</h2>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Clinic Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Address</h3>
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={formData.address.city}
              onChange={(e) => handleInputChange('address.city', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="street">Street</Label>
            <Input
              id="street"
              value={formData.address.street}
              onChange={(e) => handleInputChange('address.street', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="building">Building</Label>
            <Input
              id="building"
              value={formData.address.building}
              onChange={(e) => handleInputChange('address.building', e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="license">License Number</Label>
          <Input
            id="license"
            value={formData.licenseNumber}
            onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="hours">Working Hours</Label>
          <Input
            id="hours"
            value={formData.workingHours[0]}
            onChange={(e) => handleWorkingHoursChange(e.target.value)}
          />
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
