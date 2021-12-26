/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FC } from 'react';
import { useAppSelector } from '../app/hooks';
import { getWalletAddress } from '../actions/WalletAction';
import { DialogContentText } from '@mui/material';

export interface FundsModalProps {
    balance?: number
    symbol: string
    open: boolean
    type: 'deposit' | 'withdraw'
    onClose?: ()=>void;
}
const FundsDialog: FC<FundsModalProps> = (props: FundsModalProps) => {
    const address = useAppSelector(getWalletAddress)
    const [open, setOpen] = React.useState(false);
    const [funds, setFunds] = React.useState('');

    React.useEffect(()=>{
        if(props.open !== open) {
            setOpen(props.open)
        }
    },[props.open])
    const handleClose = () => {
        setOpen(false);
        props.onClose && props.onClose()
    };
    const handleOK = () => {
        if(!funds) return;
        alert('transfor funds!')
        handleClose();
    }
    const onChangeFunds = (e: any) => {
        setFunds(e.target.value)
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{props.symbol}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please fill in the ga.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Address"
                        disabled={true}
                        defaultValue={address}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Balance"
                        type="text"
                        value={props.balance ? String(props.balance): ''}
                        onChange={onChangeFunds}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="warning">Cancel</Button>
                    <Button onClick={handleOK} disabled={funds===''} color="info">{props.type}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default FundsDialog;
