import {  useState } from "react";
import { useHistory } from "react-router-dom";


const Search = ({courses}) => {

  const [text, setText] = useState("");
  const [coursesFiltered, setCoursesFiltered] = useState([]);
  
  let history = useHistory();

  const updateInput = (text) => {
    const filtered = courses.filter(course => {
      return course.name.includes(text)
    })
    
    setText(text);
    setCoursesFiltered(filtered);
  }

  const courseClick = (id) => {
    // console.log(id)
    setCoursesFiltered([])
    setText("")
    history.push(`/courses/${id}`)
  }

  return (
    <div className="container mt-3"> 
      <div className="col-md-4 offset-md-4">
        <input
          className="row"
          type="search"
          id="header-search"
          placeholder="搜尋課程"
          name="search" 
          value={text}
          onChange={(e) => updateInput(e.target.value)}
        />
        
        <ul className="filtered-list mt-1">
        {
          coursesFiltered.length > 0 && text ? (
            coursesFiltered.map((course, index) => {
              return (
                <li className="filtered-item"  onClick={() => courseClick(course._id)} key={index}>
                  {course.courseId} {course.name}
                </li>
              )
            })
          ) :  (
            <div className="px-2">
              {
                text && <p>無關鍵字</p>
              }
            </div>
          )
          
        }
        </ul>
      </div>
        
      
      
    </div>
    
    
  )
    
      
}

export default Search;