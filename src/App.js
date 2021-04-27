import * as React from 'react'
import InteractiveScatterplot from './InteractiveScatterplot'
import data from './data.json'
import InteractiveTable from './InteractiveTable'
import {Grid, Modal, useMediaQuery} from '@material-ui/core'

function App() {
  const [hoveredDatum, setHoveredDatum] = React.useState(null)
  const [selectedDatum, setSelectedDatum] = React.useState(null)

  const isMobile = !useMediaQuery('(min-width:1280px)')

  return (
    <div style={{height: isMobile ? 1000 : 500, width: isMobile ? 600 : 1250, padding: '10px'}}>
      <Grid container direction={'row-reverse'}>
        <Grid item container md={12} lg={6}>
          <InteractiveScatterplot data={data} selectedDatum={selectedDatum} setSelectedDatum={setSelectedDatum}
                                  hoveredDatum={hoveredDatum} setHoveredDatum={setHoveredDatum} />
        </Grid>
        <Grid item container md={12} lg={6}>
          <InteractiveTable data={data} selectedDatum={selectedDatum} setSelectedDatum={setSelectedDatum}
                            hoveredDatum={hoveredDatum} setHoveredDatum={setHoveredDatum} isMobile={isMobile} />
        </Grid>
      </Grid>
      <Modal
        open={selectedDatum !== null}
        onClose={() => setSelectedDatum(null)}
        onClick={() => setSelectedDatum(null)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{justifyContent: 'center', alignItems: 'center', display: 'flex'}}
      >
        {
          selectedDatum !== null &&
          <img style={{maxHeight: '90%'}} src={'/images/' + data.filter((datum) => datum.id === selectedDatum)[0].image} />
        }
      </Modal>
    </div>
  )
}

export default App
