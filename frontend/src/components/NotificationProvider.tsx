import React from 'react';
import NotifyContext from '../contexts/notification';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { pushMessage } from '../redux/notifications.slicer';
import { ToastContent, ToastMessage } from '../types';
import { ToastNotificationList } from '@fabrigeas/react-components';
import { popMessage } from '../redux/notifications.slicer';
export interface NotificationHOCProps {
  children: React.ReactNode;
}

const NotificationProvider = ({
  children,
}: NotificationHOCProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector<ToastMessage[]>(({ notifications }) =>
    Object.values(notifications)
  );
  const toast = (data: ToastContent) =>
    dispatch(
      pushMessage({
        id: `${new Date()}`,
        ...data,
      })
    );
  const destroy = (message: ToastMessage) => dispatch(popMessage(message));

  return (
    <>
      <ToastNotificationList destroy={destroy} notifications={notifications} />
      <NotifyContext.Provider
        value={{
          success(content: string, title?: string, time?: string) {
            toast({
              content,
              title,
              time,
              type: 'success',
            });
          },
          error(content: string, title?: string, time?: string) {
            toast({
              content,
              title,
              time,
              type: 'error',
            });
          },
          warn(content: string, title?: string, time?: string) {
            toast({
              content,
              title,
              time,
              type: 'warning',
            });
          },
          info(content: string, title?: string, time?: string) {
            toast({
              content,
              title,
              time,
              type: 'info',
            });
          },
        }}
      >
        {children}
      </NotifyContext.Provider>
    </>
  );
};

export default NotificationProvider;
