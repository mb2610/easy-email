import { IArticle } from '@demo/services/article';
import React, { useCallback } from 'react';
import { useHistory, Link as RouterLink } from 'react-router-dom';
import template from '@demo/store/template';
import { useDispatch } from 'react-redux';
import templateList from '@demo/store/templateList';
import { pushEvent } from '@demo/utils/pushEvent';
import { getLoadingByKey, useLoading } from '@demo/hooks/useLoading';
import { Loading } from '@demo/components/loading';
import { Delete, FileCopy } from '@mui/icons-material';
import { Box, Card, Link, Typography, Stack, IconButton } from '@mui/material';
import styled from '@emotion/styled';

// ----------------------------------------------------------------------

const ProductImgStyle = styled.img`
  top: 0,
  width: '100%',
  height: '100%',
  object-fit: 'cover',
  position: 'absolute',
`;

interface CardItemProps {
  data: IArticle;
}

export function CardItem(props: CardItemProps) {
  const { data } = props;
  const dispatch = useDispatch();
  const history = useHistory();

  const loading = useLoading([
    getLoadingByKey(template.loadings.duplicate, data.article_id),
    getLoadingByKey(template.loadings.removeById, data.article_id),
  ]);

  const onDelete = useCallback(() => {
    dispatch(
      template.actions.removeById({
        id: data.article_id,
        _actionKey: data.article_id,
        success() {
          dispatch(templateList.actions.fetch(undefined));
        },
      })
    );
  }, [data, dispatch]);

  const onDuplicate: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (ev) => {
      ev.preventDefault();
      dispatch(
        template.actions.duplicate({
          article: data,
          _actionKey: data.article_id,
          success(id) {
            history.push(`/editor?id=${id}`);
          },
        })
      );
    },
    [data, dispatch, history]
  );

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <ProductImgStyle alt={data.title} src={data.picture} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to={`/editor?id=${data.article_id}&userId=${data.user_id}`}
                onClick={() =>
                  pushEvent({
                    event: 'Edit',
                    payload: { article_id: data.article_id, title: data.title },
                  })
                }
                color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {data.title}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Loading loading={loading}>
            <>
              <IconButton onClick={onDelete}>
                <Delete/>
              </IconButton>
              <IconButton onClick={onDuplicate}>
                <FileCopy/>
              </IconButton>
            </>
          </Loading>
        </Stack>
      </Stack>
    </Card>
  );
};
