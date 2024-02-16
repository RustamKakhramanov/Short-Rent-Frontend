import { Paper, styled } from "@mui/material";

const ThemedPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'start',
  color: theme.palette.text.secondary,
  border:'1px solid rgba(224, 226, 231, 0.5)',
  borderRadius:'20px',
  [theme.breakpoints.up('xs')]: {
    padding: theme.spacing(2),
  },
}));

export default ThemedPaper;