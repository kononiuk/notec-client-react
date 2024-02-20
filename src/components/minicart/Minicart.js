import React, { useState } from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { Popper } from '@mui/base/Popper';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';

function Minicart() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <div className='w-full h-full flex items-center'>
      <ClickAwayListener onClickAway={handleClose}>
        <div>
          <ShoppingCartIcon 
            className="h-6 w-6 text-black cursor-pointer z-50"
            aria-describedby={id}
            onClick={handleClick}
          />
          <Popper
            id={id}
            open={open}
            anchorEl={anchorEl}
          >
            <div 
              className="z-50"
              placement="bottom-end"
            >
              <div className='mt-7 p-4 pl-8 bg-white shadow-md flex flex-col items-end'>
                Minicart
              </div>
            </div>
          </Popper>
        </div>
      </ClickAwayListener>
    </div>
  );
}

export default Minicart;