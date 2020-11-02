import React, { useContext } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import IconMore from '@material-ui/icons/MoreVert'
import IconFilter from '@material-ui/icons/Tune'
import IconDropDown from '@material-ui/icons/ArrowDropDown'
import IconNew from '@material-ui/icons/Add'

import dashboardContext from './dashboardContext'

const DashboardActions = () => {
  const classes = useStyles()
  const { filter } = useContext(dashboardContext)

  const dateFilterLabel = filter
    ? `${filter.dateFrom.format('ll')} - ${filter.dateTo.format('ll')}`
    : 'Date Filter'

  return (
    <div>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  iconNew: {
    marginRight: 5,
  },
}))

export default DashboardActions
