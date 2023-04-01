import { Box } from '@mui/material';

type Props = {
  children: React.ReactNode;
};

export function Layout({ children }: Props) {
  return (
    <Box
      width="calc(100vw - 20px)"
      height="calc(100vh - 20px)"
      display="flex"
      alignItems="center"
    >
      {children}
    </Box>
  );
}
