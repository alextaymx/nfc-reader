'use client';

import toast, { type ToastOptions } from 'react-hot-toast';

type Messages = Parameters<typeof toast.promise>[1];

export function notify(message: string, options: ToastOptions = {}) {
  toast(message, options);
}

export function notifyError(message: string, options: ToastOptions = {}) {
  toast.error(message, options);
}

export function notifySuccess(message: string, options: ToastOptions = {}) {
  toast.success(message, options);
}

export function notifyPromise<T>(
  promise: Promise<T>,
  messages: Messages,
  options: ToastOptions = {},
) {
  return toast.promise(promise, messages, options);
}

export function notifyLoading(message: string, options: ToastOptions = {}) {
  return toast.loading(message, options);
}

export function notifyDismiss(toastId?: string) {
  toast.dismiss(toastId);
}
