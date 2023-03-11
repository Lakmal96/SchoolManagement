import axios from "axios";
import React, { useEffect, useState } from "react";
import {
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
import constants from "../constants/constant";

function StudentDetails(props) {
  const [students, setStudents] = useState([]);
  const [studentID, setStudentID] = useState("");
  const [studentDetails, setSudentDetails] = useState([]);
  const [classDetails, setClassDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(constants.backendApi +"/Student");
      setStudents(data);
    };
    fetchData();
  }, []);

  const handleClick = async (id) => {
    const { data } = await axios.get(
      `${constants.backendApi}/StudentDetails/${id}`
    );
    setSudentDetails(data[0]);
    setClassDetails(data);
  };

  console.log(classDetails);

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
                  <Label for="students">Student</Label>
                  <Input
                    id="students"
                    name="students"
                    type="select"
                    onChange={(e) => handleClick(e.target.value)}
                  >
                    <option disabled selected value="">
                      -- Select a Student --
                    </option>
                    {students.map((student) => (
                      <option key={student.StudentID} value={student.StudentID}>
                        {student.FirstName} {student.LastName}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup>
                  <Label for="classroom">Classroom</Label>
                  <Input
                    id="classroom"
                    name="classroom"
                    value={studentDetails.ClassroomName}
                    disabled
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
                    value={studentDetails.ContactPerson}
                    disabled
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
                    value={studentDetails.Email}
                    disabled
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
                    value={studentDetails.ContactNo}
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="dob">Date of Birth</Label>
                  <Input id="dob" name="dob" value={studentDetails && studentDetails.DOB ? studentDetails.DOB.slice(0,10): ''} disabled/>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>

      <Card className="my-5 mx-2">
        <CardHeader className="bg-success text-white">
          Teacher & Subject Details
        </CardHeader>
        <CardBody>
          <Table striped bordered border="1">
            <thead className="bg-secondary">
              <tr>
                <th className="text-white">Subject</th>
                <th className="text-white">Teacher</th>
              </tr>
            </thead>
            <tbody>
              {classDetails.map((classDetail) => (
                <tr>
                  <td>{classDetail.SubjectName}</td>
                  <td>
                    {classDetail.TeacherFirstName} {classDetail.TeacherLastName}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}

export default StudentDetails;
