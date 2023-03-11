import axios, { all } from "axios";
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
  Table,
} from "reactstrap";
import constants from "../constants/constant";

function AllocateClassroomsScreen(props) {
  const [allocations, setAllocatios] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [teacherID, setTeacherID] = useState("");
  const [classrooms, setClassrooms] = useState([]);
  const [classroomID, setClassroomID] = useState("");
  const [allocateTeacher, setAllocateTeacher] = useState("");

  const fetchData = async () => {
    const { data } = await axios.get(
      constants.backendApi +"/Teacher_Classroom"
    );
    setAllocatios(data);
  };

  useEffect(() => {
    fetchData();

    const fetchTeachers = async () => {
      const { data } = await axios.get(constants.backendApi +"/Teacher");
      setTeachers(data);
    };

    const fetchClassrooms = async () => {
      const { data } = await axios.get(constants.backendApi +"/Classroom");
      setClassrooms(data);
    };
    fetchTeachers();
    fetchClassrooms();
  }, []);

  const handleSave = () => {
    setAllocateTeacher(teacherID);
  };

  const handleAllocate = async () => {
    const newAllocation = {
      ClassroomID: classroomID,
      TeacherID: teacherID
    };
    console.log(newAllocation);
    await axios.post(
      constants.backendApi +"/Teacher_Classroom",
      newAllocation
    );
    fetchData();
  };

  

  const handleDeallocate = async (a) => {
    await axios.delete(`${constants.backendApi}/Teacher_Classroom/${a.ID}`);
    fetchData();
  }

  return (
    <div>
      <Card className="my-2 mx-2">
        <CardHeader className="bg-success text-white">
          Teacher Details
        </CardHeader>
        <CardBody>
          <Form>
            <FormGroup row>
              <Label for="teacher" sm={1}>
                Teacher
              </Label>
              <Col sm={5}>
                <Input
                  id="teacher"
                  name="teacher"
                  type="select"
                  value={teacherID}
                  onChange={(e) => setTeacherID(e.target.value)}
                >
                  <option disabled selected value="">
                      -- Select a Teacher --
                    </option>
                  {teachers.map((teacher) => (
                    <option key={teacher.TeacherID} value={teacher.TeacherID}>
                      {teacher.FirstName} {teacher.LastName}
                    </option>
                  ))}
                </Input>
              </Col>
              <Col>
                <Button size="sm" onClick={() => handleSave()}>
                  Save
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>

      <Card className="my-2 mx-2">
        <CardHeader className="bg-success text-white">
          Alocated Classrooms
        </CardHeader>
        <CardBody>
          <Form>
            <FormGroup row>
              <Label for="classroom" sm={1}>
                Classrooms
              </Label>
              <Col sm={5}>
                <Input
                  id="classroom"
                  name="classroom"
                  type="select"
                  values={classroomID}
                  onChange={(e) => setClassroomID(e.target.value)}
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
              </Col>
              <Col>
                <Button size="sm" onClick={() => handleAllocate()}>
                  Allocate
                </Button>
              </Col>
            </FormGroup>
          </Form>
          <Table striped bordered border="1">
            <thead className="bg-secondary">
              <tr>
                <th className="text-white">Classrooms</th>
                <th className="text-white">Action</th>
              </tr>
            </thead>
            <tbody>
              {allocations.map((allocation) => (
                <tr key={allocation.ID}>
                  <td>{allocation.ClassroomName}</td>
                  <td>
                    <Button size="sm" onClick={() => handleDeallocate(allocation)}>Deallocate</Button>
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

export default AllocateClassroomsScreen;
