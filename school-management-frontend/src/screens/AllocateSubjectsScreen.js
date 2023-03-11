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
  Table,
} from "reactstrap";
import constants from "../constants/constant";

function AllocateSubjectsScreen(props) {
  const [allocations, setAllocations] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [teacherID, setTeacherID] = useState("");
  const [subjectID, setSubjectID] = useState("");
  const [allocateTeacher, setAllocateTeacher] = useState("");

  const fetchData = async () => {
    const { data } = await axios.get(
      constants.backendApi +"/Teacher_Subject"
    );
    setAllocations(data);
  };

  useEffect(() => {
    fetchData();

    const fetchTeachers = async () => {
      const { data } = await axios.get(constants.backendApi +"/Teacher");
      setTeachers(data);
    };

    const fetchSubjects = async () => {
      const { data } = await axios.get(constants.backendApi +"/Subject");
      setSubjects(data);
    };

    fetchTeachers();
    fetchSubjects();
  }, []);

  const handleSave = () => {
    setAllocateTeacher(teacherID);
  };

  const handleAllocate = async () => {
    const newAllocation = {
      TeacherID: teacherID,
      SubjectID: subjectID,
    };
    console.log(newAllocation);
    await axios.post(
      constants.backendApi +"/Teacher_Subject",
      newAllocation
    );
    fetchData();
  };

  const handleDeallocate = async (allocation) => {
    await axios.delete(`${constants.backendApi}/Teacher_Subject/${allocation.ID}`);
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
          Alocated Subjects
        </CardHeader>
        <CardBody>
          <Form>
            <FormGroup row>
              <Label for="subject" sm={1}>
                Subjects
              </Label>
              <Col sm={5}>
                <Input
                  id="subject"
                  name="subject"
                  type="select"
                  value={subjectID}
                  onChange={(e) => setSubjectID(e.target.value)}
                >
                  <option disabled selected value="">
                      -- Select a Subject --
                    </option>
                  {subjects.map((subject) => (
                    <option key={subject.SubjectID} value={subject.SubjectID}>
                      {subject.SubjectName}
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
                <th className="text-white">Subjects</th>
                <th className="text-white">Action</th>
              </tr>
            </thead>
            <tbody>
              {allocations.map((allocation) => (
                <tr key={allocation.ID}>
                  <td>{allocation.SubjectName}</td>
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

export default AllocateSubjectsScreen;
