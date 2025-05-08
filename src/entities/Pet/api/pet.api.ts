import { IPet, IMedicalRecord } from '../types';
import { EPetType } from '@/shared/constants/pet.constants';
import { delay } from '@/shared/lib/utils/delay.utils';
import { petMedicalRecordsMock, petsMock } from '@/shared/mocks/pet.mock';
import { v4 as uuidv4 } from 'uuid';

// Mock data for pets

// Simulate network delay

const petApi = {
  /**
   * Fetch all pets
   */

  getPets: async (): Promise<IPet[]> => {
    await delay(800);
    return [...petsMock];
  },

  /**
   * Get a pet by ID
   */
  getPetMedicalRecords: async (id: string): Promise<IMedicalRecord[]> => {
    await delay(600);
    console.log('id', id);
    return petMedicalRecordsMock;
  },

  /**
   * Add a new medical record to a pet
   */
  addMedicalRecord: async (petId: string, record: IMedicalRecord): Promise<boolean> => {
    console.log('petId', petId, record);
    await delay(600);
    return true;
  },

  /**
   * Create a new pet
   */
  createPet: async (pet: Omit<IPet, 'id'>): Promise<IPet> => {
    await delay(800);
    const newPet: IPet = {
      ...pet,
      id: uuidv4(),
    };
    petsMock.push(newPet);
    return { ...newPet };
  },

  /**
   * Update an existing pet
   */
  updatePet: async (id: string, pet: Partial<IPet>): Promise<IPet> => {
    await delay(800);
    const petIndex = petsMock.findIndex((p) => p.id === id);
    if (petIndex >= 0) {
      petsMock[petIndex] = {
        ...petsMock[petIndex],
        ...pet,
      };
      return { ...petsMock[petIndex] };
    }
    throw new Error(`Pet with id ${id} not found`);
  },

  /**
   * Delete a pet
   */
  deletePet: async (id: string): Promise<void> => {
    await delay(600);
    const petIndex = petsMock.findIndex((p) => p.id === id);
    if (petIndex >= 0) {
      petsMock.splice(petIndex, 1);
    } else {
      throw new Error(`Pet with id ${id} not found`);
    }
  },

  /**
   * Get pets by owner ID
   */
  //   getPetsByOwnerId: async (ownerId: string): Promise<IPet[]> => {
  //     await delay(800);
  //     return petsMock.filter((pet) => pet.owner.id === ownerId);
  //   },

  /**
   * Get pets by type
   */
  getPetsByType: async (type: EPetType): Promise<IPet[]> => {
    await delay(800);
    return petsMock.filter((pet) => pet.type === type);
  },
};

export default petApi;
