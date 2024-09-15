import { Grid, Table } from '@mui/material'
import React from 'react'
import Cards from '../views/cards'
import GroupedBar from '../views/groupedBar'
import DataTable from './table'
import DonutChart from './donutChart'

const dashboard = () => {
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12} lg={12}>
                    <Cards />
                </Grid>
            </Grid>
          
            <Grid container columnSpacing={1}>
                <Grid item xs={12} md={6}>
                    <GroupedBar />
                </Grid>
                <Grid item xs={12} md={6}>
                    <DonutChart />
                </Grid>
            </Grid>
            <br/>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <DataTable />
                </Grid>
            </Grid>
        </div >
    )
}

export default dashboard