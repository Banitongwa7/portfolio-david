
'use client';

import { useEffect } from 'react';
import Clarity from '@microsoft/clarity';

const ClarityComponent = () => {
  useEffect(() => {
    Clarity.init(`${process.env.NEXT_PUBLIC_CLARITY_ID}`);
  }, []);

  return null;
};

export default ClarityComponent;
