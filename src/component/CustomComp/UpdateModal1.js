import React from 'react'
import { Button, Form, Modal, Table } from "react-bootstrap";


function UpdateModal() {
  return (
    <div>


<Modal
          show={openModal}
          onClose={() => {
            setopenModal(false);
          }}
        >
          <Modal.Dialog>
            <Modal.Body>
              <h4>Enter glucometry Reports </h4>
              <Form>
                <Row className="my-4">
                  <Col>
                    <Form.Control
                      name="fbs"
                      onChange={HandleChange}
                      value={glucometry.fbs}
                      placeholder="FBS"
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      name="ppbs"
                      onChange={HandleChange}
                      value={glucometry.ppbs}
                      placeholder="PPBS"
                    />
                  </Col>
                </Row>
                <Row className="my-4">
                  <Col>
                    <Form.Control
                      name="gh"
                      onChange={HandleChange}
                      value={glucometry.gh}
                      placeholder="GH"
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      name="calcium"
                      onChange={HandleChange}
                      value={glucometry.calcium}
                      placeholder="Calcium"
                    />
                  </Col>
                </Row>
                <Modal.Footer>
                  <Button
                    style={{ marginRight: "175px" }}
                    onClick={(e) => postData(e)}
                  >
                    submit
                  </Button>
                  <Button onClick={(e) => setopenModal(false)}>close</Button>
                </Modal.Footer>
              </Form>
            </Modal.Body>
          </Modal.Dialog>
        </Modal>
      
    </div>
  )
}

export default UpdateModal
