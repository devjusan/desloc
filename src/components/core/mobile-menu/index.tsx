import { Fade, IconButton, Menu, MenuItem } from '@mui/material';
import Link from 'next/link';
import { FC, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const MobileMenu: FC = () => {
  {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <div>
        <IconButton
          id='fade-button'
          aria-controls={open ? 'fade-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{
            background: (theme) => theme.palette.primary.main,
            margin: '0 2rem',
          }}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id='fade-menu'
          MenuListProps={{
            'aria-labelledby': 'fade-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={handleClose}>
            <Link href='/'>Clientes</Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link href='/drivers'>Condutores</Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link href='/vehicles'>Veículos</Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link href='/displacements'>Deslocamentos</Link>
          </MenuItem>
        </Menu>
      </div>
    );
  }
};

export default MobileMenu;
