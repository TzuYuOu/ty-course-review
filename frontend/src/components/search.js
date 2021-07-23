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
    <div className="navbar-nav mr-auto">
      
        
      <input 
          
          type="search"
          id="header-search"
          placeholder="Search course"
          name="s" 
          value={text}
          onChange={(e) => updateInput(e.target.value)}
      />
        
      
      <div>
        <ul className="text-warning">
        {
          coursesFiltered.length > 0 && text ? (
            coursesFiltered.map((course, index) => {
              return (
                <li onClick={() => courseClick(course._id)} key={index}>
                  {course.name}
                </li>
              )
            })
          ) :  (
            <div>
              {
                text ? <div className="text-white">無關鍵字</div> : null
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