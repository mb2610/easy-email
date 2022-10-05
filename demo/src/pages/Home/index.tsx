import { useAppSelector } from '@demo/hooks/useAppSelector';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Frame from '@demo/components/Frame';
import templateList from '@demo/store/templateList'
import { Stack } from '@demo/components/Stack';
import { history } from '@demo/utils/history';
import { pushEvent } from '@demo/utils/pushEvent';
import templates from '@demo/config/templates.json';
import { CardItem } from './Template';
import { Button, Grid } from '@mui/material';
import { IArticle } from '@demo/services/article';

export default function Home() {
  const dispatch = useDispatch();
  const list : IArticle[] = useAppSelector('templateList');

  useEffect(() => {
    dispatch(templateList.actions.fetch(undefined));
  }, [dispatch]);

  return (
    <Frame
      title='Templates'
      primaryAction={
        <Button
          onClick={() => {
            pushEvent({ event: 'Create' });
            history.push('/editor');
          }}
        >
          Add
        </Button>
      }
    >

      <Stack>
      <Grid container spacing={3}>
        {[...templates, ...list].map((template) => (
          <Grid key={template.article_id} item xs={12} sm={6} md={3}>
            <CardItem data={template} />
          </Grid>
        ))}
      </Grid>
      </Stack>
    </Frame>
  );
}
