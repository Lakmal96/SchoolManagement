using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Student_Management.Models
{
    public class Classroom
    {
        public int ClassroomID { get; set; }
        public string ClassroomName { get; set; }
        public List<Student> Students { get; set; }
    }
}
