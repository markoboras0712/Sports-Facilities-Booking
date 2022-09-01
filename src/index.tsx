import { App } from 'App';
import { RecoilRoot } from 'recoil';
import { createRoot } from 'react-dom/client';
import React from 'react';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
);
