import React from 'react';
import './ToastNotification.scss';
import { useAppDispatch } from '../../redux/hooks';
import { popMessage } from '../../redux/notifications.slicer';
import { ToastMessage } from '../../types';

export const testId = 'toast-notification';

const ToastNotification = (props: ToastMessage): JSX.Element => {
  const { type, time, title, content, id } = props;
  const notificationType = type ?? 'info';
  const className = `toast-notification ${notificationType}`;
  const dispatch = useAppDispatch();
  const destroy = (): void => {
    dispatch(popMessage(props));
  };

  setTimeout(destroy, 5000);

  return (
    <div
      id={id}
      className={className}
      role='alert'
      aria-live='assertive'
      aria-atomic={true}
      data-testid={testId}
    >
      <div className='header'>
        <strong className='title'>{title}</strong>
        {time && <small className='time'>{time}</small>}
        <button
          type='button'
          className='close'
          data-dismiss='toast'
          aria-label='Close'
          onClick={destroy}
        >
          <span aria-hidden='true'>×</span>
        </button>
      </div>
      {content && <div className='content'>{content}</div>}
      <div className='footer'>
        <div className='progressBar'></div>
      </div>
    </div>
  );
};

export default ToastNotification;
