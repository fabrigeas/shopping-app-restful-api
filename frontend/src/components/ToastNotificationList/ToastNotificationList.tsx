import React from 'react';
import './ToastNotificationList.scss';
import ToastNotification from '../ToastNotification/ToastNotification';
import { ToastMessage } from '../../types';

export interface ToastNotificationListProps {
  notifications: ToastMessage[];
}

export const testId = 'toast-notification-list';

const ToastNotificationList = ({
  notifications,
}: ToastNotificationListProps): JSX.Element => {
  return (
    <div className='toast-notification-list' data-testid={testId}>
      <div className='notification-list'>
        {notifications.map((args, i) => (
          <ToastNotification key={i} {...args} />
        ))}
      </div>
    </div>
  );
};

export default ToastNotificationList;
