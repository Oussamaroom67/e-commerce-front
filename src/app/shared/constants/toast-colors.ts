import { ToastType } from '../enums/toast-types';

export const TOAST_COLORS: { [key in ToastType]: string } = {
  [ToastType.Success]: '#28a745',
  [ToastType.Error]: '#dc3545',
  [ToastType.Info]: '#007bff',
  [ToastType.Warning]: '#ffc107',
  [ToastType.Critical]: '#800000'
};
