import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table, Col, Row } from "react-bootstrap";
import { RiXingLine } from "react-icons/ri";

function UpdateModal({ setupdateModal, updateModal, userData,reload }) {
  const onhide = () => {
    setupdateModal(false);
    reload()
  };

  const [update, setupdate] = useState({
    haemoglobin: "",
    neutrophils: "",
    eosinophiles: "",
    basophills: "",
    pcv: "",
    wbc: "",
    lymphocytes: "",
    monocytes: "",
    rbc: "",
    mcv: "",
  });

  useEffect(() => {
    console.log(userData, "------");
    console.log(userData._id, "========id");
    setupdate({
      haemoglobin: userData?.heamatology?.haemoglobin,
      neutrophils: userData?.heamatology?.neutrophils,
      eosinophiles: userData?.heamatology?.eosinophiles,
      basophills: userData?.heamatology?.basophills,
      pcv: userData?.heamatology?.pcv,
      wbc: userData?.heamatology?.wbc,
      lymphocytes: userData?.heamatology?.lymphocytes,
      monocytes: userData?.heamatology?.monocytes,
      rbc: userData?.heamatology?.rbc,
      mcv: userData?.heamatology?.mcv,
    });
  }, [userData]);

  const HandleChange = (e) => {
    const updateCopy = { ...update };
    updateCopy[e.target.name] = e.target.value;
    setupdate(updateCopy);
  };

const valid = () =>{
  const {
    haemoglobin,
    neutrophils,
    eosinophiles,
    basophills,
    pcv,
    wbc,
    lymphocytes,
    monocytes,
    rbc,
    mcv,
  } = update;
  if( !haemoglobin,
    !neutrophils,
    !eosinophiles,
    !basophills,
    !pcv,
    !wbc,
    !lymphocytes,
    !monocytes,
    !rbc,
    !mcv){
      alert("enter all fields")
    }else{
      changeUpdate()
    }
}

  const changeUpdate = async (e) => {
    const {
      haemoglobin,
      neutrophils,
      eosinophiles,
      basophills,
      pcv,
      wbc,
      lymphocytes,
      monocytes,
      rbc,
      mcv,
    } = update;
console.log(haemoglobin)   
    try {
      const url = "http://localhost:7000/user/update";
      const res = await fetch(url, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          _id: userData._id,
          heamatology: {
            haemoglobin,
            neutrophils,
            eosinophiles,
            basophills,
            pcv,
            wbc,
            lymphocytes,
            monocytes,
            rbc,
            mcv,
          },
        }),
      });

      const data = await res.json();
      console.log("res ============>", data);
      if (res.status === 200) {
        
        console.log(data.data,"----------update");
        alert("update succesfull");
      } else {
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Modal show={updateModal}>
        <Modal.Body>
          <h4>update Haematology Reports </h4>
          <Form>
            <Row className="my-4">
              <Col>
                <Form.Control
                  value={update.haemoglobin}
                  onChange={HandleChange}
                  name="haemoglobin"
                  placeholder="haemoglobin"
                />
              </Col>
              <Col>
                <Form.Control
                  value={update.neutrophils}
                  onChange={HandleChange}
                  name="neutrophils"
                  placeholder="neutrophils"
                />
              </Col>
            </Row>
            <Row className="my-4">
              <Col>
                <Form.Control
                  value={update.eosinophiles}
                  onChange={HandleChange}
                  name="eosinophiles"
                  placeholder="eosinophiles"
                />
              </Col>
              <Col>
                <Form.Control
                  value={update.basophills}
                  onChange={HandleChange}
                  name="basophills"
                  placeholder="basophills"
                />
              </Col>
            </Row>
            <Row className="my-4">
              <Col>
                <Form.Control
                  value={update.pcv}
                  onChange={HandleChange}
                  name="pcv"
                  placeholder="pcv"
                />
              </Col>
              <Col>
                <Form.Control
                  value={update.wbc}
                  onChange={HandleChange}
                  name="wbc"
                  placeholder="wbc"
                />
              </Col>
            </Row>
            <Row className="my-4">
              <Col>
                <Form.Control
                  value={update.lymphocytes}
                  onChange={HandleChange}
                  name="lymphocytes"
                  placeholder="lymphocytes"
                />
              </Col>
              <Col>
                <Form.Control
                  value={update.monocytes}
                  onChange={HandleChange}
                  name="monocytes"
                  placeholder="monocytes"
                />
              </Col>
            </Row>
            <Row className="my-4">
              <Col>
                <Form.Control
                  value={update.rbc}
                  onChange={HandleChange}
                  name="rbc"
                  placeholder="rbc"
                />
              </Col>
              <Col>
                <Form.Control
                  value={update.mcv}
                  onChange={HandleChange}
                  name="mcv"
                  placeholder="mcv"
                />
              </Col>
            </Row>
          </Form>
          <Modal.Footer>
            <Button
              onClick={(e) => {
                valid();
                onhide();
              }}
            >
              Submit
            </Button>
            <Button
              onClick={(e) => {
                onhide();
              }}
            >
              close
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default UpdateModal;
