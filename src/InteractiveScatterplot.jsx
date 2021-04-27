import React from 'react'
import * as d3 from 'd3'
import {Modal, useMediaQuery} from '@material-ui/core'

class InteractiveScatterplot extends React.Component {
  constructor(props) {
    super(props)

    this.ellipses = [
      {'cx': new Date('2018-01-12'), 'cy': -8.1, 'rx': 45, 'ry': 17, color: '#400080'},
      {'cx': new Date('2018-07-12'), 'cy': -7.1, 'rx': 55, 'ry': 17, color: '#800040'},
      {'cx': new Date('2018-08-12'), 'cy': 7.9, 'rx': 120, 'ry': 17, color: 'darkgreen'},
      {'cx': new Date('2019-12-04'), 'cy': -8.1, 'rx': 30, 'ry': 17, color: '#400080'},
      {'cx': new Date('2020-07-24'), 'cy': -7.1, 'rx': 45, 'ry': 17, color: '#800040'},
    ]
  }

  componentDidMount() {
    this.drawChart()
    console.log(this.props.data)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.drawChart()
  }

  drawChart() {
    console.log('Re-rendering...')
    const margin = {top: 10, right: 40, bottom: 60, left: 30},
      width = 600 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom

    d3.select('g').remove()
    d3.select('#chart').remove()

    const svg = d3
      .select('#area')
      .append('svg')
      .attr('id', 'chart')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    // Draw x axis
    const x = d3.scaleTime().domain([new Date('2017-09-01'), new Date('2020-11-1')]).range([0, width])
    svg
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .style('color', 'white')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-60)')
      .style('color', 'black')

    // x axis label

    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 490)
      .style('text-anchor', 'middle')
      .text('Date')

    // Draw y axis
    const y = d3.scaleLinear().domain([-9, 9]).range([height, 0])
    const y_axis = d3.axisLeft().scale(y).tickValues([-8, -7, 8])
    .tickFormat(function(utc_offset) {
        return utc_offset > 0 ? '+' + utc_offset : '−' + -1 * utc_offset
    })
    svg
      .append('g')
      .style('color', 'white')
      .call(y_axis)
      .selectAll('text')
      .style('color', 'black')

    // y axis label
    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left - 2)
      .attr('x', 0 - (height / 2))
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text('Time Diff (Hours)')


    // Draw background
    svg
      .append('rect')
      .attr('x', 1)
      .attr('y', 0)
      .attr('width', 'calc(100% - 71px)')
      .attr('height', 'calc(100% - 70px)')
      .style('fill', '#eaeaf2')

    // Draw grid lines
    const xAxisGrid = d3.axisBottom(x).tickSize(-height).tickFormat('').ticks(10)
    const yAxisGrid = d3.axisLeft(y).tickSize(-width).tickFormat('')
    .tickValues([-8, -7, 8])

    svg.append('g')
      .attr('class', 'x axis-grid')
      .attr('transform', 'translate(0,' + height + ')')
      .style('color', 'white')
      .call(xAxisGrid)
    svg.append('g')
      .attr('class', 'y axis-grid')
      .style('color', 'white')
      .call(yAxisGrid)

    const svgEllipses = svg
      .selectAll('ellipse')
      .data(this.ellipses)
      .enter()
      .append('ellipse')

    svgEllipses
      .attr('cx', (d) => {
        return x(d.cx)
      })
      .attr('cy', (d) => {
        return y(d.cy)
      })
      .attr('rx', (d) => {
        return (d.rx)
      })
      .attr('ry', (d) => {
        return (d.ry)
      })
      .style('fill', (d) => {
        return (d.color)
      })
      .style('opacity', 0.3)

    svg
      .selectAll('dots')
      .data(this.props.data)
      .enter()
      .append('circle')
      .attr('cx', (d) => x(new Date(d.DateCreated)))
      .attr('cy', (d) => y(d.timediff))
      .attr('r', 2)
      .style('fill', 'darkblue')
      .style('stroke', 'grey')

    this.props.hoveredDatum !== null &&
    svg
      .selectAll('dots')
      .data(this.props.data.filter((datum) => datum.id === this.props.hoveredDatum))
      .enter()
      .append('circle')
      .attr('cx', (d) => x(new Date(d.DateCreated)))
      .attr('cy', (d) => y(d.timediff))
      .attr('id', (d) => d.id)
      .attr('r', 4)
      .style('fill', 'white')
      .style('stroke', 'black')
      .style('stroke-width', 2)
  }


  render() {
    return (

      <div style={{height: '100%', paddingBottom: '10px'}}>
        <svg id="area" height={500} width={600} />
      </div>
    )
  }
}

export default InteractiveScatterplot
