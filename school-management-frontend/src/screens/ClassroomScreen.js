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

function ClassroomScreen(props) {
  const [classrooms, setClassrooms] = useState([]);
  const [classroomName, setClassroomName] = useState("");
  const [classroomID, setClassroomID] = useState("");

  const fetchData = async () => {
    const { data } = await axios.get(constants.backendApi +"/Classroom");
    setClassrooms(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const emptyValues = () => {
    setClassroomName("");
  }

  const validateForm = () => {
    if (
      !classroomName
    ) {
      toast.warning("Please fill the filed");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    const newclassroom = {
      ClassroomName: classroomName
    }
    await axios.post(constants.backendApi +"/Classroom", newclassroom)
    fetchData();
    toast.success("Classroom added successfully");
    emptyValues();
  }

  const onClickRow = (tableData) => {
    setClassroomName(tableData.ClassroomName);
    setClassroomID(tableData.ClassroomID);
  }

  const handleDelete = async () => {
    await axios.delete(`${constants.backendApi}/Classroom/${classroomID}`);
    fetchData();
    toast.error("Classroom deleted successfully");
    emptyValues();
  }

  const handleUpdate = async (event) => {
    event.preventDefault();
    const updatedClassroom = {
      ClassroomID: classroomID,
      ClassroomName: classroomName
    }
    await axios.put(constants.backendApi +"/Classroom", updatedClassroom);
    fetchData();
    toast.info("Classroom updated successfully");
    emptyValues();
  }

  return (
    <div>
      <Card className="my-2 mx-2">
        <CardHeader className="bg-success text-white">
          Classroom Details
        </CardHeader>
        <CardBody>
          <Form>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label for="classroomName">Classroom Name</Label>
                  <Input
                    id="classroomName"
                    name="classroomName"
                    value={classroomName}
                    onChange={(e) => setClassroomName(e.target.value)}
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
          Existing Classrooms
        </CardHeader>
        <CardBody>
          <Table striped bordered={false} border="1">
            <thead className="bg-secondary">
              <tr>
                <th className="text-white">Classroom Name</th>
              </tr>
            </thead>
            <tbody>
              {classrooms.map((classroom) => (
                <tr key={classroom.ClassroomID} onClick={() => onClickRow(classroom)}>
                  <td>{classroom.ClassroomName}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}

export default ClassroomScreen;
