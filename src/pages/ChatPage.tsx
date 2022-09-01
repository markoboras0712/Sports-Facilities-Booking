import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { MessageLeft, MessageRight } from './Message';
import { TextInput } from './TextInput';
import { Navigation } from 'shared/components';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: '90vw',
      height: '90vh',
      maxWidth: '600px',
      maxHeight: '750px',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      position: 'relative',
    },
    paper2: {
      width: '80vw',
      maxWidth: '500px',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      position: 'relative',
    },
    container: {
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    messagesBody: {
      width: 'calc( 100% - 20px )',
      margin: `${theme.spacing(10)} auto`,
      overflowY: 'scroll',
      height: 'calc( 100% - 80px )',
    },
  }),
);

export default function App() {
  const classes = useStyles();
  return (
    <>
      <Navigation />
      <div className={classes.container}>
        <Paper className={classes.paper}>
          <Paper id="style-1" className={classes.messagesBody}>
            <MessageLeft
              message="YO YO YO YO"
              timestamp="MM/DD 00:00"
              photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
              displayName=""
            />
            <MessageLeft
              message="xxxxxhttps://yahoo.co.jp xxxxxxxxxあめんぼあかいなあいうえおあいうえおかきくけこさぼあかいなあいうえおあいうえおかきくけこさぼあかいなあいうえおあいうえおかきくけこさいすせそ"
              timestamp="MM/DD 00:00"
              photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
              displayName="テスト"
            />
            <MessageRight
              message="messageRあめんぼあかいなあいうえおあめんぼあかいなあいうえおあめんぼあかいなあいうえお"
              timestamp="MM/DD 00:00"
            />
            <MessageRight
              message="messageRあめんぼあかいなあいうえおあめんぼあかいなあいうえお"
              timestamp="MM/DD 00:00"
            />
            <MessageRight
              message="messageRあめんぼあかいなあいうえおあめんぼあかいなあいうえお"
              timestamp="MM/DD 00:00"
            />
            <MessageRight
              message="messageRあめんぼあかいなあいうえおあめんぼあかいなあいうえお"
              timestamp="MM/DD 00:00"
            />
            <MessageRight
              message="messageRあめんぼあかいなあいうえおあめんぼあかいなあいうえお"
              timestamp="MM/DD 00:00"
            />
            <MessageRight
              message="messageRあめんぼあかいなあいうえおあめんぼあかいなあいうえお"
              timestamp="MM/DD 00:00"
            />
            <MessageRight
              message="messageRあめんぼあかいなあいうえおあめんぼあかいなあいうえお"
              timestamp="MM/DD 00:00"
            />
            <MessageRight
              message="messageRあめんぼあかいなあいうえおあめんぼあかいなあいうえお"
              timestamp="MM/DD 00:00"
            />
          </Paper>
          <TextInput />
        </Paper>
      </div>
    </>
  );
}
