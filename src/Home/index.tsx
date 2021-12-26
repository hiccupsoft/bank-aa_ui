/* eslint-disable no-sequences */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import { getWalletAddress } from "../actions/WalletAction";
import { useAppSelector } from "../app/hooks";
import FundsDialog, { FundsModalProps } from '../FundsDialog';
import { props } from 'cypress/types/bluebird';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(
    symbol: string,
    balance: number,
) {
    return { symbol, balance };
}

const rows = [
    createData('2DSA', 159.0230123),
    createData('BAT', 237),
    createData('BTC_20200701', 262),
    createData('BNB', 305.087),
    createData('ETH', 356.5032),
];

export default function Home() {
    const address = useAppSelector(getWalletAddress)
    const initModalProps = {
        symbol: '',
        open: false,
        type: 'deposit'
    } as FundsModalProps
    const [modalProps, setModalProps] = React.useState(initModalProps)

    const onClickFunds = (param: FundsModalProps) => () => {
        setModalProps(param)
    }
    const onCloseModal = () => {
        setModalProps({...modalProps, open: false})
    }
    const renderTable = () => {
        return <TableContainer className="py-20 px-56">
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Token Symbol</StyledTableCell>
                        <StyledTableCell align="left">Balance</StyledTableCell>
                        <StyledTableCell align="left">Withdraw</StyledTableCell>
                        <StyledTableCell align="left">Deposit Funds</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.symbol}>
                            <StyledTableCell component="th" scope="row">
                                {row.symbol}
                            </StyledTableCell>
                            <StyledTableCell align="left">{row.balance}</StyledTableCell>
                            <StyledTableCell align="left">
                                <Button color='error'
                                    style={{ textTransform: 'none' }}
                                    variant='contained'
                                    onClick={onClickFunds({ symbol: row.symbol, type: "withdraw", balance: row.balance, open: true } as any)}
                                >
                                    Withdraw
                                </Button>
                            </StyledTableCell>
                            <StyledTableCell align="left">
                                <Button color="primary"
                                    style={{ textTransform: 'none' }}
                                    variant='contained'
                                    onClick={onClickFunds({ symbol: row.symbol, type: "deposite", open: true } as any)}
                                >
                                    Deposite
                                </Button>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
            <FundsDialog {...modalProps} onClose={onCloseModal}/>
        </TableContainer>
    }

    const renderNoTable = () => {
        return <p className='text-center py-20 px-36'>Please Insert your Wallet Address</p>
    }
    return address ? renderTable() : renderNoTable();
}

// export default Home;