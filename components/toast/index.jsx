import React from 'react';
import Notification from 'rc-notification';
import Icon from '../icon';

let messageInstance;
let key = 1;
let prefixCls = 'am-toast';

function getMessageInstance() {
  messageInstance = messageInstance || Notification.newInstance({
    prefixCls,
    style: { top: '40%' },
  });
  return messageInstance;
}

function notice(content, duration = 3, onClose, type) {
  let iconType = ({
    info: '',
    success: 'check-circle-o',
    fail: 'cross-circle-o',
    network: 'frown',
    loading: 'loading'
  })[type];

  if (typeof duration === 'function') {
    onClose = duration;
    duration = 3;
  }

  let instance = getMessageInstance();
  instance.notice({
    key,
    duration,
    style: {},
    content: (
      <div className={`${prefixCls}-text`}>
        {!!iconType && <Icon type={iconType} />}
        <div>{content}</div>
      </div>
    ),
    onClose,
  });
  return (function () {
    let target = key++;
    return function () {
      instance.removeNotice(target);
    };
  }());
}

export default {
  info(content, duration, onClose) {
    return notice(content, duration, onClose, 'info');
  },
  success(content, duration, onClose) {
    return notice(content, duration, onClose, 'success');
  },
  fail(content, duration, onClose) {
    return notice(content, duration, onClose, 'fail');
  },
  network(content, duration, onClose) {
    return notice(content, duration, onClose, 'network');
  },
  loading(content, duration, onClose) {
    return notice(content, duration, onClose, 'loading');
  },
  destroy() {
    if (messageInstance) {
      messageInstance.destroy();
      messageInstance = null;
    }
  },
};
