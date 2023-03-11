using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Student_Management.Models;
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
    public class Teacher_ClassroomController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public Teacher_ClassroomController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"SELECT tc.ID, c.ClassroomName, t.FirstName
                             FROM Teacher_Classroom tc
                             JOIN Classroom  c on c.ClassroomID = tc.ClassroomID
                             JOIN Teacher t on t.TeacherID = tc.TeacherID;";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("StudentManagement");
            SqlDataReader reader;
            using (SqlConnection con = new SqlConnection(sqlDataSource))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    reader = cmd.ExecuteReader();
                    table.Load(reader);
                    reader.Close();
                    con.Close();
                }
            }
            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(Teacher_Classroom teacherclass)
        {
            string query = @"INSERT INTO Teacher_Classroom VALUES (@TeacherID, @ClassroomID)";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("StudentManagement");
            SqlDataReader reader;
            using (SqlConnection con = new SqlConnection(sqlDataSource))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@TeacherID", teacherclass.TeacherID);
                    cmd.Parameters.AddWithValue("@ClassroomID", teacherclass.ClassroomID);
                    reader = cmd.ExecuteReader();
                    table.Load(reader);
                    reader.Close();
                    con.Close();
                }
            }
            return new JsonResult("Record Added Sucessfully!");
        }

        [HttpPut]
        public JsonResult Put(Teacher_Classroom teacherclass)
        {
            string query = @"UPDATE Teacher_Classroom SET TeacherID=@TeacherID, ClassroomID=@ClassroomID WHERE ID=@ID";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("StudentManagement");
            SqlDataReader reader;
            using (SqlConnection con = new SqlConnection(sqlDataSource))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@ID", teacherclass.ID);
                    cmd.Parameters.AddWithValue("@TeacherID", teacherclass.TeacherID);
                    cmd.Parameters.AddWithValue("@ClassroomID", teacherclass.ClassroomID);
                    reader = cmd.ExecuteReader();
                    table.Load(reader);
                    reader.Close();
                    con.Close();
                }
            }
            return new JsonResult("Record Updated Sucessfully!");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"DELETE FROM Teacher_Classroom WHERE ID=@ID";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("StudentManagement");
            SqlDataReader reader;
            using (SqlConnection con = new SqlConnection(sqlDataSource))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@ID", id);
                    reader = cmd.ExecuteReader();
                    table.Load(reader);
                    reader.Close();
                    con.Close();
                }
            }
            return new JsonResult("Record Deleted Successfully!");
        }
    }
}
