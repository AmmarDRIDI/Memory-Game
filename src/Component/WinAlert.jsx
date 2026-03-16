import { useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import EmojiEventsTwoToneIcon from '@mui/icons-material/EmojiEventsTwoTone';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function WinAlert({ handleClose ,open}) {


    return (
        <><BootstrapDialog
            
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            
                <DialogContent dividers className='win-message' >

                    <IconButton aria-label="WIN" >
                        <EmojiEventsTwoToneIcon
                            className='win-icon'
                            color="primary"
                            fontSize="large" />
                    </IconButton>
                    Congratulations! You've won the game!

                </DialogContent>
                <DialogActions>
                    <Button color='white' className='reset-btn' onClick={handleClose} >
                        New Game
                    </Button>
                </DialogActions>

        </BootstrapDialog></>

    );
}
