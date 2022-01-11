import { Grid } from '@mui/material'
import React from 'react'
import './Footer.css'

function Footer() {
    return (
        <div style={{backgroundColor:"black", width:"100vw"}}>
            <Grid container spacing={1} style={{display: "flex", justifyContent: "center"}}>
                {/* <Grid item xs={12} sm={4}> */}
                    <h1 className="heading-footer"><span>M</span>aths<span>W</span>iz</h1>
                {/* </Grid>   */}
                {/* <Grid item xs={12} sm={4}> */}
                {/* </Grid>   */}
                {/* <Grid item xs={12} sm={4}> */}
                {/* </Grid>   */}
            </Grid>   
           
        </div>
    )
}

export default Footer
