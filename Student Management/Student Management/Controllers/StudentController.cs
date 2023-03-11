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
    public class StudentController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public StudentController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"SELECT StudentID, FirstName, LastName, ContactPerson, ContactNo,
                            Email, DOB, Age, ClassroomID    
                            FROM Student";

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
        public JsonResult Post(Student student)
        {
            string query = @"INSERT INTO Student VALUES (@FirstName, @LastName, @ContactPerson, @ContactNo,
                            @Email, @DOB, @ClassroomID)";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("StudentManagement");
            SqlDataReader reader;
            using (SqlConnection con = new SqlConnection(sqlDataSource))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@FirstName", student.FirstName);
                    cmd.Parameters.AddWithValue("@LastName", student.LastName);
                    cmd.Parameters.AddWithValue("@ContactPerson", student.ContactPerson);
                    cmd.Parameters.AddWithValue("@ContactNo", student.ContactNo);
                    cmd.Parameters.AddWithValue("@Email", student.Email);
                    cmd.Parameters.AddWithValue("@DOB", student.DOB);
                    cmd.Parameters.AddWithValue("@ClassroomID", student.ClassroomID);
                    reader = cmd.ExecuteReader();
                    table.Load(reader);
                    reader.Close();
                    con.Close();
                }
            }
            return new JsonResult("Record Added Sucessfully!");
        }

        [HttpPut]
        public JsonResult Put(Student student)
        {
            string query = @"UPDATE Student SET FirstName=@FirstName, LastName=@LastName, ContactPerson=@ContactPerson, ContactNo=@ContactNo,
                            Email=@Email, DOB=@DOB, ClassroomID=@ClassroomID WHERE StudentID=@StudentID";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("StudentManagement");
            SqlDataReader reader;
            using (SqlConnection con = new SqlConnection(sqlDataSource))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@StudentID", student.StudentID);
                    cmd.Parameters.AddWithValue("@FirstName", student.FirstName);
                    cmd.Parameters.AddWithValue("@LastName", student.LastName);
                    cmd.Parameters.AddWithValue("@ContactPerson", student.ContactPerson);
                    cmd.Parameters.AddWithValue("@ContactNo", student.ContactNo);
                    cmd.Parameters.AddWithValue("@Email", student.Email);
                    cmd.Parameters.AddWithValue("@DOB", student.DOB);
                    cmd.Parameters.AddWithValue("@ClassroomID", student.ClassroomID);
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
            string query = @"DELETE FROM Student WHERE StudentID=@StudentID";

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
            return new JsonResult("Record Deleted Successfully!");
        }

    }
}
