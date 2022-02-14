import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { FunctionComponent } from "react";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

interface LoginErrorModalProps {
  hideMe: () => void
  showMe: boolean
}

const WarningDialogTitle = styled(Typography)(({theme}) =>({
  color: theme.palette.text.primary,
  fontSize: '20px', 
  paddingTop: '8px', 
  paddingBottom: '8px'
}));

const LoginErrorModal: FunctionComponent<LoginErrorModalProps> = ({ hideMe, showMe }) => {
  return (
    <Dialog open={showMe} sx={{ borderRadius: '8px', padding: '15px' }}>
      <DialogTitle sx={{ fontSize: '30px', display: 'flex' }} id="alert-dialog-title">
        <WarningAmberIcon fontSize='large' sx={{ alignSelf: 'center' }} /> &nbsp;
        Unable to sign in.
      </DialogTitle>
      <DialogContent>
        <WarningDialogTitle>
          Login error:
        </WarningDialogTitle>
        <DialogContentText id="alert-dialog-description" pl='5px'>
          Make sure you got the name right.
        </DialogContentText>
        <WarningDialogTitle>
          Sign up error:
        </WarningDialogTitle>
        <DialogContentText id="alert-dialog-description" pl='5px'>
          Your username must be unique and at least 7 characters.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={hideMe} color='secondary' autoFocus id="closemodal">
          Back to login
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default LoginErrorModal;