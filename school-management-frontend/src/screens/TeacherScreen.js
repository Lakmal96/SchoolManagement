import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Table,
} from "reactstrap";
import { toast } from "react-toastify";
import constants from "../constants/constant";

function TeacherScreen(props) {
  const [teachers, setTeachers] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [teacherID, setTeacherID] = useState("")

  const fetchData = async () => {
    const { data } = await axios.get(constants.backendApi +"/Teacher");
    setTeachers(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const emptyValues = () => {
    setFirstName("");
    setLastName("");
    setContactNumber("");
    setEmail("");
  }

  const validateForm = () => {
    if (
      !firstName ||
      !lastName ||
      !contactNumber ||
      !email
    ) {
      toast.warning("Please fill all the fileds");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.warning("Invalid Email");
      return false;
    }

    const contactNumberRegex = /^\d{10}$/;
    if (!contactNumberRegex.test(contactNumber)) {
      toast.warning("Invalid Phone Number");
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    const newTeacher = {
      FirstName: firstName,
      LastName: lastName,
      ContactNo: contactNumber,
      Email: email,
    };
    await axios.post(constants.backendApi +"/Teacher", newTeacher);
    fetchData();
    toast.success("Teacher added successfully");
    emptyValues();
  };

    const onClickRow = (tableData) => {
    setFirstName(tableData.FirstName);
    setLastName(tableData.LastName);
    setContactNumber(tableData.ContactNo);
    setEmail(tableData.Email);
    setTeacherID(tableData.TeacherID);
  }


  const handleDelete = async () => {
    await axios.delete(`${constants.backendApi}/Teacher/${teacherID}`);
    fetchData();
    toast.error("Teacher deleted successfully");
    emptyValues();
  }

  const handleUpdate = async (event) => {
    event.preventDefault();
    const updatedTeacher = {
      TeacherID: teacherID,
      FirstName: firstName,
      LastName: lastName,
      ContactNo: contactNumber,
      Email: email
    }
    await axios.put(constants.backendApi +'/Teacher', updatedTeacher);
    fetchData();
    toast.info("Teacher updated successfully");
    emptyValues();
  }

  return (
    <div>
      <Card className="my-2 mx-2">
        <CardHeader className="bg-success text-white">
          Teacher Details
        </CardHeader>
        <CardBody>
          <Form>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="firstname">First Name</Label>
                  <Input
                    id="firstname"
                    name="firstname"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="lastname">Last Name</Label>
                  <Input
                    id="lastname"
                    name="lastname"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="contactNumber">Contact Number</Label>
                  <Input
                    id="contactNumber"
                    name="contactNumber"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md={3}></Col>
              <Col md={3}>
                <Button color="success" block onClick={handleSubmit}>
                  Save
                </Button>
              </Col>
              <Col md={3}>
                <Button color="danger" block onClick={handleDelete}>
                  Delete
                </Button>
              </Col>
              <Col md={3}>
                <Button color="warning" block onClick={handleUpdate}>
                  Reset
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>

      <Card className="my-5 mx-2">
        <CardHeader className="bg-success text-white">
          Existing Teachers
        </CardHeader>
        <CardBody>
          <Table striped bordered={false} border="1">
            <thead className="bg-secondary">
              <tr>
                <th className="text-white">First Name</th>
                <th className="text-white">Last Name</th>
                <th className="text-white">Contact No.</th>
                <th className="text-white">Email Address</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher.TeacherID} onClick={() => onClickRow(teacher)}>
                  <td>{teacher.FirstName}</td>
                  <td>{teacher.LastName}</td>
                  <td>{teacher.ContactNo}</td>
                  <td>{teacher.Email}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}

export default TeacherScreen;
