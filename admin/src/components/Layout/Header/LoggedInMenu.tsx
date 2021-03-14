import React from 'react'
import UserIcon from '@material-ui/icons/AccountCircle'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

export default function LoggedInMenu() {
  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Button color="inherit" startIcon={<UserIcon />} onClick={handleClick}>
        Margot Brun
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Mon compte</MenuItem>
        <MenuItem onClick={handleClose}>Déconnexion</MenuItem>
      </Menu>
    </div>
  )
}
