import React, { useEffect } from 'react';
import { githubButtonGenerate } from '@demo/utils/githubButtonGenerate';
import { Container } from '@mui/material';

interface FrameProps {
  title: string;
  breadcrumb?: React.ReactElement;
  primaryAction?: React.ReactElement;
  children: React.ReactElement;
}

export default function Frame({
  children,
}: FrameProps) {
  useEffect(() => {
    githubButtonGenerate();
  }, []);

  return (
    <Container fixed>
      {children}
    </Container>
  );
}
