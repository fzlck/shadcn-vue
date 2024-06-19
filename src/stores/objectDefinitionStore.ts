import { defineStore } from 'pinia';
import axios from 'axios';
import { ref, computed } from 'vue';
import { API_BASE_URL } from '@/config';
const OBJECT_DEFINITIONS_URL = `${API_BASE_URL}/objectdefinitions`
import objects from '../settings/data/objects.json'

interface ObjectDefinition {
  id: number;
  [key: string]: any;
}

export const useObjectDefinitionsStore = defineStore('objectDefinitions', () => {
  const objectDefinitions = ref<ObjectDefinition[]>([]);
  const selectedObjectId = ref<number | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchObjectDefinitions = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get(OBJECT_DEFINITIONS_URL);
      objectDefinitions.value = response.data;
    } catch (err: any) {
      console.error('Failed to fetch /objectdefinitions from API. Using backup data', err);
      objectDefinitions.value = objects;
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const addObjectDefinition = async (newObjectDefinition: ObjectDefinition) => {
    try {
      const response = await axios.post(OBJECT_DEFINITIONS_URL, newObjectDefinition);
      objectDefinitions.value.push(response.data);
    } catch (err: any) {
      error.value = err.message;
    }
  };

  const updateObjectDefinition = async (updatedObject: ObjectDefinition) => {
    try {
      await axios.put(`${OBJECT_DEFINITIONS_URL}/${updatedObject.id}`, updatedObject);
      const index = objectDefinitions.value.findIndex(obj => obj.id === updatedObject.id);
      if (index !== -1) {
        objectDefinitions.value[index] = updatedObject;
      }
    } catch (err: any) {
      error.value = err.message;
    }  
  };

  const deleteObjectDefinition = async (id: number) => {
    try {
      await axios.delete(`${OBJECT_DEFINITIONS_URL}/${id}`);
      objectDefinitions.value = objectDefinitions.value.filter(obj => obj.id !== id);
    } catch (err: any) {
      error.value = err.message;
    }
  };

  const setSelectedObjectId = (id: number | null) => {
    selectedObjectId.value = id;
  };

  const getSelectedObjectId = () => {
    return selectedObjectId.value;
  };

  return {
    objectDefinitions,
    loading,
    error,
    fetchObjectDefinitions,
    addObjectDefinition,
    updateObjectDefinition,
    deleteObjectDefinition,
    setSelectedObjectId,
    getSelectedObjectId
  };
});
