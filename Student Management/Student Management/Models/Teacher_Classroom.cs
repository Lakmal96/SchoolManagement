using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Student_Management.Models
{
    public class Teacher_Classroom
    {
        public int ID { get; set; }
        public int TeacherID { get; set; }
        public Teacher Teacher { get; set; }
        public int ClassroomID { get; set; }
        public Classroom Classroom { get; set; }
    }

}
