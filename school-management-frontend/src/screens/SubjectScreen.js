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

function SubjectScreen(props) {
  const [subjects, setSubjects] = useState([]);
  const [subjectName, setSubjectName] = useState("");
  const [subjectID, setSubjectID] = useState("");

  const fetchData = async () => {
    const { data } = await axios.get(constants.backendApi +"/Subject");
    setSubjects(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const emptyValues = () => {
    setSubjectName("");  
  }

  const validateForm = () => {
    if (
      !subjectName
    ) {
      toast.warning("Please fill the filed");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    const newSubject = {
      SubjectName: subjectName
    }
    await axios.post(constants.backendApi +"/Subject", newSubject);
    fetchData();
    toast.success("Subject added successfully");
    emptyValues();
  }

  const onClickRow = (tableData) => {
    setSubjectName(tableData.SubjectName);
    setSubjectID(tableData.SubjectID);
  }

  const handleDelete = async () => {
    await axios.delete(`${constants.backendApi}/Subject/${subjectID}`);
    fetchData();
    toast.error("Subject deleted successfully");
    emptyValues();
  }

  const handleUpdate = async () => {
    const updatedSubject = {
      SubjectID: subjectID,
      SubjectName: subjectName
    }
    await axios.put(constants.backendApi +"/Subject", updatedSubject);
    fetchData();
    toast.info("Subject updated successfully");
    emptyValues();
  }

  return (
    <div>
      <Card className="my-2 mx-2">
        <CardHeader className="bg-success text-white">
          Subjects Details
        </CardHeader>
        <CardBody>
          <Form>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label for="subjectName">Subject Name</Label>
                  <Input
                    id="subjectName"
                    name="subjectName"
                    value={subjectName}
                    onChange={(e) => setSubjectName(e.target.value)}
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
          Existing Subjects
        </CardHeader>
        <CardBody>
          <Table striped bordered={false} border="1">
            <thead className="bg-secondary">
              <tr>
                <th className="text-white">Subject Name</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject) => (
                <tr key={subject.SubjectID} onClick={() => onClickRow(subject)}>
                  <td>{subject.SubjectName}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}

export default SubjectScreen;
