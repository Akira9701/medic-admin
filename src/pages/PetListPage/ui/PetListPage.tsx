import { useState } from 'react';
import usePetStore from '@/entities/Pet/model/pet.store';
import { setSelectedPet } from '@/entities/Pet/model/pet.store';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { LoaderPinwheel, Search } from 'lucide-react';
import { Badge } from '@/shared/ui/badge';
import { Link } from 'react-router';

export default function PetListPage() {
  // Get store state with separate selectors
  const pets = usePetStore((state) => state.pets);
  const loading = usePetStore((state) => state.loading);

  const [nameFilter, setNameFilter] = useState('');

  // Filter pets based on name and type
  const filteredPets = pets.filter((pet) => {
    const matchesName = pet.name.toLowerCase().includes(nameFilter.toLowerCase());
    return matchesName;
  });

  return (
    <>
      <div className="relative flex justify-between items-center border-b mb-3">
        <h2 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Питомцы
        </h2>
      </div>

      <div className="">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск по имени..."
                value={nameFilter}
                onChange={(event) => setNameFilter(event.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <div className="rounded-md border">
            {loading ? (
              <div className="flex justify-center items-center h-24">
                <LoaderPinwheel className="animate-spin" />
              </div>
            ) : filteredPets.length === 0 ? (
              <div className="text-center p-6">Питомцы не найдены.</div>
            ) : (
              <div className="w-full">
                {/* Header */}
                <div className="grid grid-cols-5 border-b bg-muted/50">
                  <div className="h-10 px-4 flex items-center font-medium">Имя</div>
                  <div className="h-10 px-4 flex items-center font-medium">Тип</div>
                  <div className="h-10 px-4 flex items-center font-medium">Порода</div>
                  <div className="h-10 px-4 flex items-center font-medium">Номер чипа</div>
                  <div className="h-10 px-4 flex items-center font-medium">Действия</div>
                </div>

                {/* Rows */}
                {filteredPets.map((pet) => (
                  <div key={pet.id} className="grid grid-cols-5 border-b">
                    <div className="p-4 flex items-center font-medium">{pet.name}</div>
                    <div className="p-4 flex items-center">
                      <Badge variant="outline">{pet.type}</Badge>
                    </div>
                    <div className="p-4 flex items-center">{pet.breed}</div>
                    <div className="p-4 flex items-center font-mono text-sm">{pet.chipNumber}</div>
                    <div className="p-4 flex items-center">
                      <Link to={`/pets/${pet.id}`}>
                        <Button variant="outline" size="sm" onClick={() => setSelectedPet(pet)}>
                          Просмотр
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
