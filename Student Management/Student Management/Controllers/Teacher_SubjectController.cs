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
    public class Teacher_SubjectController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public Teacher_SubjectController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"SELECT ts.ID, t.FirstName, s.SubjectName
                             FROM Teacher_Subject ts
                             JOIN Teacher t on t.TeacherID = ts.TeacherID
                             JOIN Subject s on s.SubjectID = ts.SubjectID";

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
        public JsonResult Post(Teacher_Subject teachersubject)
        {
            string query = @"INSERT INTO Teacher_Subject VALUES (@TeacherID, @SubjectID)";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("StudentManagement");
            SqlDataReader reader;
            using (SqlConnection con = new SqlConnection(sqlDataSource))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@TeacherID", teachersubject.TeacherID);
                    cmd.Parameters.AddWithValue("@SubjectID", teachersubject.SubjectID);
                    reader = cmd.ExecuteReader();
                    table.Load(reader);
                    reader.Close();
                    con.Close();
                }
            }
            return new JsonResult("Record Added Sucessfully!");
        }

        [HttpPut]
        public JsonResult Put(Teacher_Subject teachersubject)
        {
            string query = @"UPDATE Teacher_Subject SET TeacherID=@TeacherID, SubjectID=@SubjectID WHERE ID=@ID";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("StudentManagement");
            SqlDataReader reader;
            using (SqlConnection con = new SqlConnection(sqlDataSource))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@ID", teachersubject.ID);
                    cmd.Parameters.AddWithValue("@TeacherID", teachersubject.TeacherID);
                    cmd.Parameters.AddWithValue("@SubjectID", teachersubject.SubjectID);
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
            string query = @"DELETE FROM Teacher_Subject WHERE ID=@ID";

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
