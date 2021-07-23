import { Link } from 'react-router-dom';

const CourseList = ({courses}) => {

  
  return ( 
    <div className="list-group">
      
      {
        courses.map((course) => {
          return (
            <li className="list-group-item" key={course._id}>
              <strong>{course.courseId} {course.name}</strong>
              <p>{course.dept} - {course.teacher} - {course.time}</p>
              <Link to={`/courses/${course._id}`} className="btn btn-primary ">查看心得</Link> 
            </li>
          );
        })
      }
       
    </div>
  );
}

export default CourseList;