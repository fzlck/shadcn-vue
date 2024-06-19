import { defineStore } from 'pinia';
import axios from 'axios';
import { ref, computed } from 'vue';
import { API_BASE_URL } from '@/config';
const OBJECT_DEFINITIONS_URL = `${API_BASE_URL}/objectdefinitions`
import properties from '../settings/data/properties.json'

interface PropertyDefinition {
  id: number;
  [key: string]: any;
}

export const usePropertyDefinitionsStore = defineStore('propertyDefinitions', () => {
  const propertyDefinitions = ref<PropertyDefinition[]>([]);
  const currentProperty = ref<PropertyDefinition>();
  const loading = ref(false);
  const fetchByIdLoading = ref(false);
  const error = ref<string | null>(null);

  const fetchPropertyDefinitions = async (id: number) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get(`${OBJECT_DEFINITIONS_URL}/${id}/propertydefinitions`);
      propertyDefinitions.value = response.data;
    } catch (err: any) {
      console.error('Failed to fetch /propertydefinitions from API. Using backup data', err);
      const filteredProperties = properties.filter((property) => property.objectdefinitionId === id)
      propertyDefinitions.value = filteredProperties;
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };
  const fetchPropertyById = async (objectId: number, propertyId: number) => {
    fetchByIdLoading.value = true;
    try {
      const response = await axios.get(`${OBJECT_DEFINITIONS_URL}/${objectId}/propertydefinitions/${propertyId}`);
      currentProperty.value = response.data;
    } catch (err: any) {
      error.value = err.message;
    } finally {
      fetchByIdLoading.value = false;
    }
  };
  const addPropertyDefinition = async (id: number, newPropertyDefinition: PropertyDefinition | any) => {
    try {
      const response = await axios.post(`${OBJECT_DEFINITIONS_URL}/${id}/propertydefinitions`, newPropertyDefinition);
      propertyDefinitions.value.push(response.data);
    } catch (err: any) {
      error.value = err.message;
    }
  };

  const updatePropertyDefinition = async (objectId: number, propertyId: number, updatedProperty: PropertyDefinition | any) => {
    try {
      await axios.put(`${OBJECT_DEFINITIONS_URL}/${objectId}/propertydefinitions/${propertyId}`, updatedProperty);
      const index = propertyDefinitions.value.findIndex(property => property.id === propertyId);
      if (index !== -1) {
        propertyDefinitions.value[index] = updatedProperty;
      }
    } catch (err: any) {
      error.value = err.message;
    }
  };

  const deletePropertyDefinition = async (objectId: number, propertyId: number) => {
    try {
      await axios.delete(`${OBJECT_DEFINITIONS_URL}/${objectId}/propertydefinitions/${propertyId}`);
      propertyDefinitions.value = propertyDefinitions.value.filter(property => property.id !== propertyId);
    } catch (err: any) {
      error.value = err.message;
    }
  };

  return {
    propertyDefinitions,
    currentProperty,
    loading,
    fetchByIdLoading,
    error,
    fetchPropertyById,
    fetchPropertyDefinitions,
    addPropertyDefinition,
    updatePropertyDefinition,
    deletePropertyDefinition,
  };
});
