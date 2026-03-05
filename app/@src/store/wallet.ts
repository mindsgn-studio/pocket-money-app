import { create } from 'zustand'

const useWallet = create((set) => ({
  balance: 0,
  setBalance: (balance: number) => set({ balance }),
  transactions: () => set({ bears: 0 }),
  setTransactions: () => set(() => ({}))
}))

export default useWallet;