import React from 'react'

import Grid from '@material-ui/core/Grid'

import BasePageContainer from '../_common/BasePageContainer'
import BasePageToolbar from '../_common/BasePageToolbar'

import DashboardActions from './DashboardActions'
import SubscriptionsHistory from './SubscriptionsHistory'
import KeyNumbers from './KeyNumbers'
import SubscriptionsRecent from './SubscriptionsRecent'
import SubscriptionsBreakdown from './SubscriptionsBreakdown'
import { Button } from '@material-ui/core'

const Dashboard = () => {
  return (
    <BasePageContainer>
      <BasePageToolbar
        title={'Pedidos'}
        actionsComponent={DashboardActions}
      ></BasePageToolbar>
        
        <form>
          <p>
            <label>
              Entregar a:
              <input type="text" name = " destinatario " />
            </label>
          </p>

          <p>
            <label>
              Dirección: 
              <input type="text" name = " direccion " />
            </label>
          </p>

          <p>
            <label>
              Teléfono: 
              <input type="number" name = " tel " />
            </label>
          </p>

          <p>
            <label>
              Estado:
              <Button variant="outlined" name = "estado">
                Entregado
              </Button>
            </label>
          </p>

        </form>

    </BasePageContainer>
  )
}

export default Dashboard
