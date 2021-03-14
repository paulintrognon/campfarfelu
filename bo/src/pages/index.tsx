import { NextPage } from 'next'
import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Layout from '../components/Layout/Layout'

const IndexPage: NextPage = () => {
  return (
    <Layout title="Pages">
      <div>
        <AppBar component="div" color="primary" position="static" elevation={0}>
          <Tabs value={0} textColor="inherit">
            <Tab textColor="inherit" label="Users" />
            <Tab textColor="inherit" label="Sign-in method" />
            <Tab textColor="inherit" label="Templates" />
            <Tab textColor="inherit" label="Usage" />
          </Tabs>
        </AppBar>
      </div>
    </Layout>
  )
}
export default IndexPage
