import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles'

const lightColor = 'rgba(255, 255, 255, 0.7)'

const styles = (theme: Theme) =>
  createStyles({
    secondaryBar: {
      zIndex: 0,
    },
    menuButton: {
      marginLeft: -theme.spacing(1),
    },
    iconButtonAvatar: {
      padding: 4,
    },
    link: {
      textDecoration: 'none',
      color: lightColor,
      '&:hover': {
        color: theme.palette.common.white,
      },
    },
    button: {
      borderColor: lightColor,
    },
    title: {
      fontSize: 24,
    },
  })

interface Props extends WithStyles<typeof styles> {
  onDrawerToggle: () => void
  title: string
}

const Header: React.FC<Props> = ({ classes, onDrawerToggle, title }) => (
  <AppBar color="primary" position="sticky" elevation={0}>
    <Toolbar>
      <Grid container spacing={1} alignItems="center">
        <Hidden smUp>
          <Grid item>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={onDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          </Grid>
        </Hidden>
        <Grid item xs>
          <h1 className={classes.title}>{title}</h1>
        </Grid>
        <Grid item>
          <IconButton color="inherit" className={classes.iconButtonAvatar}>
            <Avatar src="/static/images/avatar/1.jpg" alt="Dy Avatar" />
          </IconButton>
        </Grid>
      </Grid>
    </Toolbar>
  </AppBar>
)

export default withStyles(styles)(Header)
