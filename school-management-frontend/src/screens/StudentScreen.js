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

function StudentScreen(props) {
  const [students, setStudents] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDOB] = useState("");
  const [classroomID, setClassRoomID] = useState("");
  const [studentID, setStudentID] = useState("");

  const fetchData = async () => {
    const { data } = await axios.get(constants.backendApi + "/Student");
    setStudents(data);
  };

  useEffect(() => {
    fetchData();
    const fetchClassrooms = async () => {
      const { data } = await axios.get(constants.backendApi +"/Classroom");
      setClassrooms(data);
    };
    fetchClassrooms();
  }, []);

  const emptyValues = () => {
    setFirstName("");
    setLastName("");
    setContactPerson("");
    setContactNumber("");
    setEmail("");
    setDOB("");
    setClassRoomID("");
  };

  const validateForm = () => {
    if (
      !firstName ||
      !lastName ||
      !contactPerson ||
      !contactNumber ||
      !email ||
      !dob ||
      !classroomID
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
    const newStudent = {
      FirstName: firstName,
      LastName: lastName,
      ContactPerson: contactPerson,
      ContactNo: contactNumber,
      Email: email,
      DOB: dob,
      ClassroomID: classroomID,
    };
    await axios.post(constants.backendApi +"/Student", newStudent);
    fetchData();
    toast.success("Student added successfully");
    emptyValues();
  };

  const onclickRow = (tableData) => {
    setFirstName(tableData.FirstName);
    setLastName(tableData.LastName);
    setContactPerson(tableData.ContactPerson);
    setContactNumber(tableData.ContactNo);
    setEmail(tableData.Email);
    setDOB(tableData.DOB);
    setClassRoomID(tableData.ClassroomID);
    setStudentID(tableData.StudentID);
  };

  const handleDelete = async () => {
    await axios.delete(`${constants.backendApi}/Student/${studentID}`);
    fetchData();
    toast.error("Student deleted successfully");
    emptyValues();
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    const updatedStudent = {
      StudentID: studentID,
      FirstName: firstName,
      LastName: lastName,
      ContactPerson: contactPerson,
      ContactNo: contactNumber,
      Email: email,
      DOB: dob,
      ClassroomID: classroomID,
    };
    await axios.put(`${constants.backendApi}/Student`, updatedStudent);
    fetchData();
    toast.info("Student updated successfully");
    emptyValues();
  };

  return (
    <div>
      <Card className="my-2 mx-2">
        <CardHeader className="bg-success text-white">
          Student Details
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
                  <Label for="contactPerson">Contact Person</Label>
                  <Input
                    id="contactPerson"
                    name="contactPerson"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                  />
                </FormGroup>
              </Col>
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
            </Row>

            <Row>
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
              <Col md={6}>
                <FormGroup>
                  <Label for="dob">Date of Birth</Label>
                  <Input
                    type="date"
                    id="dob"
                    name="dob"
                    value={dob}
                    onChange={(e) => setDOB(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="classroom">Classroom</Label>
                  <Input
                    id="classroom"
                    name="classroom"
                    type="select"
                    value={classroomID}
                    onChange={(e) => setClassRoomID(e.target.value)}
                  >
                    <option disabled selected value="">
                      -- Select a Classroom --
                    </option>
                    {classrooms.map((classroom) => (
                      <option
                        key={classroom.ClassroomID}
                        value={classroom.ClassroomID}
                      >
                        {classroom.ClassroomName}
                      </option>
                    ))}
                  </Input>
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
          Existing Students
        </CardHeader>
        <CardBody>
          <Table striped bordered={false} border="1">
            <thead className="bg-secondary">
              <tr>
                <th className="text-white">First Name</th>
                <th className="text-white">Last Name</th>
                <th className="text-white">Contact Person</th>
                <th className="text-white">Contact No.</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.StudentID} onClick={() => onclickRow(student)}>
                  <td>{student.FirstName}</td>
                  <td>{student.LastName}</td>
                  <td>{student.ContactPerson}</td>
                  <td>{student.ContactNo}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}

export default StudentScreen;
