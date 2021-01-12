import React, { useState } from 'react'
import Table from 'react-bootstrap/Table'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { PieChart } from 'react-minimal-pie-chart'

export default function Main() {
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [participation, setParticipation] = useState('')

  function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('')
    var color = '#'
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  /*const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      firstname: firstname,
      lastname: lastname,
      participation: participation
    })
  }
  const clickHandler = (event: MouseEvent) => {
    event.preventDefault()
    fetch('http://localhost:3300/participation', requestOptions)
      .then((response) => {
        if (response.status !== 200) {
          showModal()
          throw new Error('Houve um erro')
        } else {
          response.json()
        }
      })
  }*/
  return (
    <div className='container bg-light'>
      <nav className='navbar navbar-expand-lg fixed-top bg-info'>
        <div className='container'>
          <div className='collapse navbar-collapse' id='navbarTogglerDemo02'>
            <ul className='navbar-nav'>
              <li className='nav-item' style={{ padding: '5px' }}>
                <input
                  name='email'
                  className='form-control'
                  placeholder='First name'
                  value={firstname}
                  onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                    setFirstname(ev.target.value)
                  }
                />
              </li>
              <li className='nav-item' style={{ padding: '5px' }}>
                <input
                  name='email'
                  className='form-control'
                  placeholder='Last name'
                  value={lastname}
                  onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                    setLastname(ev.target.value)
                  }
                />
              </li>
              <li className='nav-item' style={{ padding: '5px' }}>
                <input
                  type='number'
                  name='email'
                  className='form-control'
                  placeholder='Participation'
                  value={participation}
                  onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                    setParticipation(ev.target.value)
                  }
                />
              </li>
              <li className='nav-item' style={{ padding: '5px' }}>
                <button type='submit' className='btn btn-primary btn-block'>
                  Enviar
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div style={{ paddingTop: '70px' }} className='text-center'>
        <h3 className='text-center'>Dados</h3>
        <span>Informações de cada funcionário</span>
      </div>

      <Row style={{ paddingTop: '10px' }}>
        <Col>
          <Table responsive bordered size='sm'>
            <thead>
              <tr>
                <th></th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Participation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                {Array.from({ length: 3 }).map((_, index) => (
                  <td key={index}>Table cell {index}</td>
                ))}
              </tr>
              <tr>
                <td>2</td>
                {Array.from({ length: 3 }).map((_, index) => (
                  <td key={index}>Table cell {index}</td>
                ))}
              </tr>
              <tr>
                <td>3</td>
                {Array.from({ length: 3 }).map((_, index) => (
                  <td key={index}>Table cell {index}</td>
                ))}
              </tr>
            </tbody>
          </Table>
        </Col>
        <Col>
          <PieChart
            data={[
              { title: 'One', value: 10, color: getRandomColor() },
              { title: 'Two', value: 15, color: getRandomColor() },
              { title: 'Three', value: 20, color: getRandomColor() }
            ]}
            radius={3}
            viewBoxSize={[10, 8]}
            center={[5, 3]}
            segmentsShift={0.02}
          />
        </Col>
      </Row>
    </div>
  )
}
