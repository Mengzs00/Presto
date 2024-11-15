import { create } from 'zustand';

const alertStore = create((set) => ({
  // the vertical direction
  vertical: 'top',
  // the horizontal direction
  horizontal: 'center',
  isOpen: false,
  // showing message
  message: '',
  // the seriouse degree color
  severity: 'info',
  openAlert: (message, severity = 'info', vertical, horizontal) => set({ isOpen: true, message, severity, vertical, horizontal }),
  closeAlert: () => set({ isOpen: false }),
}));

export default alertStore;
