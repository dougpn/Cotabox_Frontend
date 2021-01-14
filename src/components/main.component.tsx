import React, { useState } from 'react'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { PieChart } from 'react-minimal-pie-chart'

interface IPart {
  _id: number
  firstname: string
  lastname: [string]
  participation: number
}
const defaultProps: IPart[] = []

export default function Main() {
  const [part, setPart]: [IPart[], (part: IPart[]) => void] = React.useState(
    defaultProps
  )
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [participation, setParticipation] = useState('')
  const [isOpen1, setIsOpen1] = useState(false)
  const [isOpen2, setIsOpen2] = useState(false)

  const showModal1 = () => {
    setIsOpen1(true)
  }
  const showModal2 = () => {
    setIsOpen2(true)
    setFirstname('')
    setLastname('')
    setParticipation('')
  }
  const hideModal = () => {
    setIsOpen1(false)
    setIsOpen2(false)
  }
  function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('')
    var color = '#'
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      firstname: firstname,
      lastname: lastname,
      participation: participation
    })
  }
  const clickHandler = () => {
    if (!firstname || !lastname || !participation) {
      showModal1()
      return
    } else {
      fetch('http://localhost:3300/participation', requestOptions)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error('Houve um erro')
          } else {
            response.json()
          }
        })
        .then(() => showModal2())
    }
  }
  async function clickHandler2() {
    await axios
      .post<IPart[]>('http://localhost:3300/findpart')
      .then((response) => {
        setPart(response.data)
      })
  }

  return (
    <div className='container bg-light'>
      <Modal show={isOpen1} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title>Olá</Modal.Title>
        </Modal.Header>
        <Modal.Body>Nenhum campo pode ser vazio.</Modal.Body>
        <Modal.Footer>
          <button onClick={hideModal}>Cancel</button>
        </Modal.Footer>
      </Modal>
      <Modal show={isOpen2} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title>Olá</Modal.Title>
        </Modal.Header>
        <Modal.Body>Dados gravados com sucesso!</Modal.Body>
        <Modal.Footer>
          <button onClick={hideModal}>Cancel</button>
        </Modal.Footer>
      </Modal>
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
                <button
                  type='submit'
                  className='btn btn-primary btn-block'
                  onClick={clickHandler}
                >
                  Enviar
                </button>
              </li>
              <li className='nav-item' style={{ padding: '5px' }}>
                <button
                  type='submit'
                  className='btn btn-primary btn-block'
                  onClick={clickHandler2}
                >
                  Ver
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
              {part.map((par, index) => (
                <tr>
                  <td key={par._id}>{index + 1}</td>
                  <td key={par._id}>{par.firstname}</td>
                  <td key={par._id}>{par.lastname}</td>
                  <td key={par._id}>{par.participation}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col>
          <PieChart
            data={part.map((par) => ({
              title: par.firstname,
              value: par.participation,
              color: getRandomColor()
            }))}
            radius={3}
            viewBoxSize={[10, 7]}
            center={[5, 3]}
            segmentsShift={0.02}
            lineWidth={25}
          />
        </Col>
      </Row>
    </div>
  )
}
