import React from 'react'
import { Button, Form, Modal, Table } from "react-bootstrap";


function UpdateModal2() {
  return (
    <div>
      
      <Modal
          onClose={() => {
            setopenModal(false);
          }}
        >
          <Modal.Dialog>
            <Modal.Body>
              <h4>Enter Thyroid Reports </h4>
              <Form>
                <Row className="my-4">
                  <Col>
                    <Form.Control
                      name="tri"
                      onChange={HandleChange}
                      placeholder="TRI"
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      name="thyroxine"
                      onChange={HandleChange}
                      placeholder="Thyroxine"
                    />
                  </Col>
                </Row>
                <Row className="my-4">
                  <Col>
                    <Form.Control
                      name="tsh"
                      onChange={HandleChange}
                      placeholder="Thyroid"
                    />
                  </Col>
                  <Col>
                    <Button onClick={(e) => postData(e)}>submit</Button>
                    <Button onClick={(e) => setopenModal(false)}>close</Button>
                  </Col>
                </Row>
              </Form>
            </Modal.Body>
          </Modal.Dialog>
        </Modal>

    </div>
  )
}

export default UpdateModal2
