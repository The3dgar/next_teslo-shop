import { ReactNode } from 'react';

import { Card, CardContent, Grid, Typography } from '@/components/ui';

interface Props {
  title: string | number;
  subTitle: string;
  icon: ReactNode;
}

export const SummaryTile = ({ icon, subTitle, title }: Props) => {
  return (
    <Grid item xs={12} sm={4} md={3}>
      <Card sx={{ display: 'flex' }} elevation={24}>
        <CardContent
          sx={{
            width: 50,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {icon}
        </CardContent>

        <CardContent
          sx={{
            flex: '1 0 auto',
            display: 'flex',
            flexDirection: 'column',
          }}>
          <Typography variant='h3'>{title}</Typography>
          <Typography>{subTitle}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};
