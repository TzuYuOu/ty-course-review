import { useHistory } from 'react-router-dom';
import Search from './search';
import NewReview from './NewReview';
const CourseList = ({courses}) => {

  const history = useHistory();
  
  return ( 
    <div>
      <Search courses={courses}/>
      <NewReview courses={courses}/>
      <div className="list-group mt-3">
        
      {
        courses.map((course) => {
          return (
            <li onClick={() => history.push(`/courses/${course._id}`)} className="list-group-item course-item" key={course._id}>
              <strong>{course.courseId} {course.name}</strong>
              <p>{course.dept} - {course.teacher} - {course.time}</p>
              {/* <Link to={`/courses/${course._id}`} className="btn btn-primary ">查看心得</Link>  */}
            </li>
          );
        })
      }

      

        
      </div>
    </div>
    
  );
}

export default CourseList;