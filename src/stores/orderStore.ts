import { defineStore } from 'pinia';
import type { History, Order } from '@/overview/data/schema';

interface OrderHistoryState {
  orderHistoryData: History[];
}
interface OrderState {
  orderData: any | null
}

export const useOrderStore = defineStore('order', {
  state: (): OrderState => ({
    orderData: {},
  }),
  actions: {
    setOrderData(data: Order) {
      this.orderData = data;
    },
    setOrderHistoryData(history: History[] | any) {
      if (this.orderData) {
        this.orderData.history = history;
      }
    }
  },
  getters: {
    getOrderData: (state) => state.orderData ?? undefined,
    getOrderHistoryData: (state) => state.orderData.history ?? []
  }
})

