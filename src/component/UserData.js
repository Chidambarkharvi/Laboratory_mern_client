import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Report2 from "./CustomComp/Report2";
import Report3 from "./CustomComp/Report3";
import CheckToken from "../Auth";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../redux/actions/userAction";
import Report1 from "./CustomComp/Report1";
import { Button, FormControl, Table } from "react-bootstrap";
import UpdateModal from "./CustomComp/UpdateModal";

function UserData() {
  const [userData, setuserData] = useState([]);

  const [openModal, setopenModal] = useState(false);
  const [openModal1, setopenModal1] = useState(false);
  const [openModal2, setopenModal2] = useState(false);

  const [updateModal, setupdateModal] = useState(false);
  const role = localStorage.getItem("role");
  const id = CheckToken();

  const [close, setclose] = useState(true);
  const [selectedUser, setSelectedUser] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const date = new Date();
  const dispatch = useDispatch();

  const isLogin = useSelector((state) => state.isAuth);

  const callUserPage = async () => {
    try {
      const url = "http://localhost:7000/user/details";
      const res = await fetch(url, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
        }),
      });

      const data = await res.json();
      console.log(data);
      setuserData([...data]);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const reload = () => {
    callUserPage();
  };

  const removeUser = async (id) => {
    console.log(id);
    try {
      const res = await axios.post("http://localhost:7000/user/removeUser", {
        id,
      });
      // console.log(res.data.error);
      if (!res.data.error) {
        reload();
      }
    } catch (err) {
      console.log(err, "delete error");
    }
  };

  useEffect(() => {
    dispatch(userAction(true));
    callUserPage();
  }, []);

  return (
    <div>

      <form style={{ margin: "70px" }}>
        <Table variant="dark" responsive striped hover size="sm">
          <thead>
            <FormControl
              type="search"
              placeholder="Search"
              onChange={(e) => {
                // search(e);
                setSearchValue(e.target.value);
              }}
              className="me-2"
              aria-label="Search"
            />
          </thead>

          <thead>
            <tr>
              <th scope="col">User ID</th>
              <th scope="col">Email</th>
              <th>Name</th>

              <th scope="col">Haematology</th>
              <th scope="col">Thyroid </th>
              <th scope="col">Glucometry</th>
            </tr>
          </thead>

          {isLogin && (
            <>
              <tbody>
                {userData &&
                  userData
                    .filter((item, index) =>
                      item.name.includes(searchValue.toLowerCase())
                    )
                    .map((val) => {
                      return (
                        <tr style={{ color: "black" }} key={val._id}>
                          <td>{val._id}</td>
                          <td> {val.email} </td>
                          <td> {val.name}</td>
                          <td>
                            <Button
                              onClick={(e) => {
                                e.preventDefault();
                                setopenModal(true);
                                setSelectedUser(val);
                                console.log(selectedUser, "==========select");
                              }}
                              variant={val?.heamatology ? "primary" : "danger"}
                              disabled={!val?.heamatology}
                            >
                              {val?.heamatology ? "view Details" : "N/A"}
                            </Button>{" "}
                          </td>
                          <td>
                            <Button
                              onClick={(e) => {
                                e.preventDefault();
                                setopenModal1(true);
                                console.log(val);
                                console.log(val, "---------> ssss");
                                setSelectedUser(val);
                              }}
                              variant={val?.thyroid ? "primary" : "danger"}
                              disabled={!val?.thyroid}
                            >
                              {" "}
                              {val?.thyroid ? "view Details" : "N/A"}
                            </Button>{" "}
                          </td>
                          <td>
                            <Button
                              onClick={(e) => {
                                e.preventDefault();

                                setopenModal2(true);
                                console.log(val, "--------->");
                                setSelectedUser(val);
                              }}
                              variant={val?.glucometry ? "primary" : "danger"}
                              disabled={!val?.glucometry}
                            >
                              {val?.glucometry ? "view Details" : "N/A"}
                            </Button>
                          </td>
                          <td>
                            {role !== "user" && (
                              <Button
                                onClick={() => {
                                  removeUser(val._id);
                                }}
                                variant="danger"
                              >
                                {" "}
                                Delete{val.name}
                              </Button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
              </tbody>
            </>
          )}
        </Table>
      </form>

      <Report1
        Backdrop={close}
        userData={selectedUser}
        open={openModal}
        setopenModal={setopenModal}
        setupdateModal={setupdateModal}
        handleClose={() => {
          setopenModal(false);
        }}
      />
      <Report2
        Backdrop={close}
        userData={selectedUser}
        open={openModal1}
        setopenModal={setopenModal1}
        handleClose={() => {
          setopenModal1(false);
        }}
      />
      <Report3
        Backdrop={close}
        userData={selectedUser}
        open={openModal2}
        setopenModal={setopenModal2}
        handleClose={() => {
          setopenModal2(false);
        }}
      />

      <UpdateModal
        reload={reload}
        updateModal={updateModal}
        setupdateModal={setupdateModal}
        userData={selectedUser}
      />
    </div>
  );
}

export default UserData;
