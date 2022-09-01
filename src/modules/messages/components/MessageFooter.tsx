import { ReactComponent as SendButton } from 'assets/send_svg.svg';
import { ReactComponent as Smiley } from 'assets/smiley.svg';
import React from 'react';
import classes from './style/MessageFooter.module.css';

export const MessageFooter: React.FC = () => {
  return (
    <div className={classes.sticky}>
      <hr className={classes.horizontal_line} />
      <form
        onSubmit={() => console.log('submit form')}
        className={classes.footer}
      >
        <button type="button" className={classes.footer__smiley} disabled>
          <Smiley />
        </button>

        <input
          placeholder="Type a message"
          value={'Value'}
          onChange={e => console.log(e.target.value)}
          className={classes.footer__input}
        />
        <button className={classes.footer__send} type="submit">
          <SendButton />
        </button>
      </form>
    </div>
  );
};
