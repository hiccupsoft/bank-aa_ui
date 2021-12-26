/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Button, Menu, MenuItem } from "@mui/material";
import React from "react";
import { FC } from "react";
import { getWalletAddress, setWalletAddress } from "../actions/WalletAction";
import { useAppDispatch, useAppSelector } from "../app/hooks";

interface Props {

}

const Header: FC<Props> = (props: Props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const dispatch = useAppDispatch();
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const onClickAddress = () => {
        dispatch(setWalletAddress('BXRQVX547LQ2VPMNRMS5ERLCIP3SNL7J'));
        handleClose();
    }
    const onRemoveAddress = () => {
        dispatch(setWalletAddress(''));
        handleClose()
    }
    const title = useAppSelector(getWalletAddress)
    return <header className="flex items-stretch px-10 py-4 justify-between" style={{ backgroundColor: '#001529' }}>
        <Box></Box>
        <Box className="flex items-center justify-end">
            <Button
                id="basic-button"
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                {console.log(useAppSelector(getWalletAddress))}
                <Box color="white">{title ? title : 'Address'}</Box>
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={onClickAddress}>Add Address</MenuItem>
                <MenuItem onClick={onRemoveAddress}>Remove Address</MenuItem>
            </Menu>
        </Box>

    </header>
}

export default Header;