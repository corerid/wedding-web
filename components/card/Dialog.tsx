import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export const MuiDialog = (props: { img: any, author: any, openDialog: any; setOpenDialog: any; }) => {
    const { img, author, openDialog, setOpenDialog } = props

    return (
        <>
            <Dialog 
                open={openDialog}
                // onClose={handleClose}
                aria-labelledby='dialog-title' 
                aria-describedby='dialog-description'
            >
                <DialogTitle id='dialog-title'>{author}</DialogTitle>
                <DialogContent>
                    <DialogContentText id='dialog-description'>
                    {img}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus  onClick={() => setOpenDialog(false)}>OK</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}