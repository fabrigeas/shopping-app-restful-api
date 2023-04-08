import { createContext } from 'react';

export interface notify {
  (content: string, title?: string, time?: string): void;
}
export interface NotifyContext {
  success: notify;
  warn: notify;
  error: notify;
  info: notify;
}

export default createContext<NotifyContext>({} as NotifyContext);
