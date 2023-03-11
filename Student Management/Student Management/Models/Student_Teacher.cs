using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Student_Management.Models
{
    public class Student_Teacher
    {
        public int ID { get; set; }
        public int StudentID { get; set; }
        public Student Student { get; set; }
        public int TeacherID { get; set; }
        public Teacher Teacher { get; set; }
    }

}
