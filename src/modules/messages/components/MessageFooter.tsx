import { ReactComponent as SendButton } from 'assets/send_svg.svg';
import { ReactComponent as Smiley } from 'assets/smiley.svg';
import { ReactComponent as Buttons } from 'assets/imgupload.svg';
import { authSelectors } from 'modules/authentication';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Message } from '../models';
import classes from './style/MessageFooter.module.css';
import { useFirestore } from 'modules/firebase';

interface Props {
  chatId: string;
  to: string;
}

export const MessageFooter: React.FC<Props> = ({ chatId, to }) => {
  const [message, setMessage] = useState('');
  const user = useRecoilValue(authSelectors.user);
  const { sendMessage } = useFirestore();

  async function sendNewMessage(event: React.FormEvent) {
    if (!user?.userUid) return;
    event.preventDefault();

    const messageData: Message = {
      text: message,
      to,
      uid: user?.userUid,
      createdAt: new Date(),
    };

    sendMessage(chatId, messageData);
    setMessage('');
  }
  return (
    <div className={classes.sticky}>
      <hr className={classes.horizontal_line} />
      <form onSubmit={sendNewMessage} className={classes.footer}>
        <button type="button" className={classes.footer__smiley} disabled>
          <Smiley />
        </button>

        <input
          placeholder="Type a message"
          value={message}
          onChange={e => setMessage(e.target.value)}
          className={classes.footer__input}
        />
        <button
          className={
            !message.length
              ? classes.footer__not__allowed
              : classes.footer__send
          }
          type="submit"
          disabled={!message.length}
        >
          {!message.length ? <Buttons /> : <SendButton />}
        </button>
      </form>
    </div>
  );
};
