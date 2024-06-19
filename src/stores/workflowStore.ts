import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';
import { API_BASE_URL } from '@/config';
const WORKFLOWS_URL = `${API_BASE_URL}/workflows`
import orders from '../overview/data/orders.json'

interface Workflow {
  [key: string]: any;
}

export const useWorkflowStore = defineStore('workflows', () => {
  const workflows = ref<Workflow[]>([]);
  const currentWorkflow = ref<Workflow>()
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchWorkflows = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get(WORKFLOWS_URL);
      workflows.value = response.data;
    } catch (err: any) {
      console.error('Failed to fetch /workflows from API. Using backup data', err);
      workflows.value = orders;
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const fetchWorkflowById = async (id: number | any) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get(`${WORKFLOWS_URL}/${id}`);
      currentWorkflow.value = response.data;
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const addWorkflow = async (newWorkflow: Workflow) => {
    try {
      const response = await axios.post(WORKFLOWS_URL, newWorkflow);
      workflows.value.push(response.data);
    } catch (err: any) {
      error.value = err.message;
    }
  };

  const updateWorkflow = async (updatedWorkflow: Workflow) => {
    try {
      await axios.put(`${WORKFLOWS_URL}/${updatedWorkflow.id}`, updatedWorkflow);
      const index = workflows.value.findIndex(obj => obj.id === updatedWorkflow.id);
      if (index !== -1) {
        workflows.value[index] = updatedWorkflow;
      }
    } catch (err: any) {
      error.value = err.message;
    }  
  };

  const deleteWorkflow = async (id: number) => {
    try {
      await axios.delete(`${WORKFLOWS_URL}/${id}`);
      workflows.value = workflows.value.filter(obj => obj.id !== id);
    } catch (err: any) {
      error.value = err.message;
    }
  };


  return {
    workflows,
    currentWorkflow,
    loading,
    error,
    fetchWorkflows,
    fetchWorkflowById,
    addWorkflow,
    updateWorkflow,
    deleteWorkflow,
  };
});
