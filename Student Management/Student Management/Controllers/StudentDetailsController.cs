using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Student_Management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentDetailsController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public StudentDetailsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            string query = @"SELECT s.FirstName, s.ContactPerson, s.ContactNo, s.Email, s.DOB, s.ClassroomID,
                            c.ClassroomName, tc.TeacherID, ts.SubjectID, t.FirstName AS TeacherFirstName, t.LastName AS TeacherLastName, su.SubjectName
                            FROM Student s 
                            LEFT JOIN Classroom c ON c.ClassroomID = s.ClassroomID
                            LEFT JOIN Teacher_Classroom tc ON tc.ClassroomID = s.ClassroomID
                            LEFT JOIN Teacher_Subject ts ON ts.TeacherID = tc.TeacherID
                            LEFT JOIN Teacher t ON t.TeacherID = tc.TeacherID
                            LEFT JOIN Subject su ON su.SubjectID = ts.SubjectID
                            WHERE s.StudentID = @StudentID";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("StudentManagement");
            SqlDataReader reader;
            using (SqlConnection con = new SqlConnection(sqlDataSource))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@StudentID", id);
                    reader = cmd.ExecuteReader();
                    table.Load(reader);
                    reader.Close();
                    con.Close();
                }
            }
            return new JsonResult(table);
        }
    }
}
