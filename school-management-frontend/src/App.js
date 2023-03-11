import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "reactstrap";
import Navbar from "./components/Navbar";
import AllocateClassroomsScreen from "./screens/AllocateClassroomsScreen";
import AllocateSubjectsScreen from "./screens/AllocateSubjectsScreen";
import ClassroomScreen from "./screens/ClassroomScreen";
import HomeScreen from "./screens/HomeScreen";
import StudentDetails from "./screens/StudentDetails";
import StudentScreen from "./screens/StudentScreen";
import SubjectScreen from "./screens/SubjectScreen";
import TeacherScreen from "./screens/TeacherScreen";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer />
      <Container>
      <Routes>
        <Route path="/" element={<StudentScreen />} exact></Route>
        <Route path="/students" element={<StudentScreen />}></Route>
        <Route path="/teachers" element={<TeacherScreen />}></Route>
        <Route path="/subjects" element={<SubjectScreen />}></Route>
        <Route path="/classrooms" element={<ClassroomScreen />}></Route>
        <Route
          path="/allocate-subjects"
          element={<AllocateSubjectsScreen />}
        ></Route>
        <Route
          path="/allocate-classrooms"
          element={<AllocateClassroomsScreen />}
        ></Route>
        <Route
          path="/student-details"
          element={<StudentDetails />}
        ></Route>
      </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
