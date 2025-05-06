import useVetsStore, { addVet, deleteVet, setVets, updateVet } from "@/entities/Vets/model/vets.store";
import vetsApi from "@/entities/Vets/api";
import { useEffect } from "react";
import { VetsTable } from "./components/VetsTable";

const VetsPage = () => {
  const vets = useVetsStore((state) => state.vets); 
  useEffect(() => {
    vetsApi.getVets().then((vets) => {
      setVets(vets);
    });
  }, []);
  console.log(vets);
  
  return (
    <div className="container mx-auto py-10">
      {vets && <VetsTable vets={vets} addVet={addVet} updateVet={updateVet} deleteVet={deleteVet} />}
    </div>
  );
};

export default VetsPage;
