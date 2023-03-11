using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Student_Management.Models;

namespace Student_Management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassroomController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public ClassroomController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"SELECT ClassroomID, ClassroomName FROM Classroom";

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
        public JsonResult Post(Classroom classRoom)
        {
            string query = @"INSERT INTO Classroom VALUES (@ClassroomName)";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("StudentManagement");
            SqlDataReader reader;
            using (SqlConnection con = new SqlConnection(sqlDataSource))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@ClassroomName", classRoom.ClassroomName);
                    reader = cmd.ExecuteReader();
                    table.Load(reader);
                    reader.Close();
                    con.Close();
                }
            }
            return new JsonResult("Record Added Successfully!");
        }

        [HttpPut]
        public JsonResult Put(Classroom classRoom)
        {
            string query = @"UPDATE Classroom SET ClassroomName=@ClassroomName WHERE ClassroomID=@ClassroomID";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("StudentManagement");
            SqlDataReader reader;
            using (SqlConnection con = new SqlConnection(sqlDataSource))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@ClassroomID", classRoom.ClassroomID);
                    cmd.Parameters.AddWithValue("@ClassroomName", classRoom.ClassroomName);
                    reader = cmd.ExecuteReader();
                    table.Load(reader);
                    reader.Close();
                    con.Close();
                }
            }
            return new JsonResult("Record Updated Successfully!");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"DELETE FROM Classroom WHERE ClassroomID=@ClassroomID";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("StudentManagement");
            SqlDataReader reader;
            using (SqlConnection con = new SqlConnection(sqlDataSource))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@ClassroomID", id);
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
