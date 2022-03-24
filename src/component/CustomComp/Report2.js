import React from "react";

import { Button, Form, Modal, Table } from "react-bootstrap";

function Report2({
  userData,
  open,
  handleClose,
  setopenModal,
}) {

  const  role = localStorage.getItem("role")
  

  const onHide = () => {
    setopenModal(false);
  };

  return (
    <Modal show={open} onClose={handleClose}    >
      <Modal.Body style={{}}>
        <h4>Enter Thyroid Reports </h4>
        <Form>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Test Name</th>
                <th>Result</th>
              </tr>
            </thead>

            <tbody>
    
              <tr>
                <th>Tri</th>
                <td>{userData?.thyroid?.tri} </td>
              </tr>
              <tr>
                <th>Throxine</th>
                <td> {userData?.thyroid?.thyroxine}</td>
              </tr>
              <tr>
                <th>Thyroid</th>
                <td>{userData?.thyroid?.tsh} </td>
              </tr>
            </tbody>
          </Table>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="button"
          class="btn btn-secondary"
          data-dismiss="modal"
          onClick={() => onHide()}
        >
          Close
        </Button>
       {role !== "user" && <Button
            type="button"
            variant="success"
   
          >
            Update
          </Button>}
      </Modal.Footer>
 

    </Modal>
  );
}

export default Report2;
