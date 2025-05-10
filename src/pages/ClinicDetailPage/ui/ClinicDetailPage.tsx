import { useEffect, useState } from 'react';
import { LoaderPinwheel } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Link } from 'react-router';
import { toast } from 'sonner';
import ClinicProfile from '@/pages/ProfilePage/ui/components/ClinicProfile/ClinicProfile';
import { IClinic } from '@/entities/Clinic/types';
import { clinicApi } from '@/entities/Clinic/api/clinic.api';
import { useLocation } from 'react-router';

export default function ClinicDetailPage() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [clinic, setClinic] = useState<IClinic | null>(null);
  const clinicId = location.pathname.split('/').pop() as string;

  const fetchClinic = async () => {
    try {
      setLoading(true);
      const clinic = await clinicApi.getClinic({ id: clinicId });
      setClinic(clinic);
    } catch (error) {
      console.error('Error fetching clinic:', error);
      toast.error('Failed to load clinic information');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClinic();
  }, [clinicId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4 h-64">
        <LoaderPinwheel className="animate-spin" />
      </div>
    );
  }

  if (!clinic) {
    return (
      <div className="mx-auto max-w-md text-center p-4 border rounded-lg">
        <h2 className="text-2xl font-semibold mb-2">Clinic Not Found</h2>
        <p className="text-muted-foreground mb-4">The requested clinic could not be found.</p>
        <Button asChild>
          <Link to="/all-clinics">Back to Clinics</Link>
        </Button>
      </div>
    );
  }

  return <ClinicProfile clinic={clinic} />;
}
