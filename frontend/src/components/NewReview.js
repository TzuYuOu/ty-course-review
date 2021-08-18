import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

const NewReview = ({courses}) => {
  
  const [ show, setShow ] = useState(false);
  const [ coursesFiltered, setCoursesFiltered ] = useState([]);
  const [ courseInput, setCourseInput] = useState("");

  const addReview = () => {
    setShow(true);
  }

  const handleClose = () => {
    setShow(false);
  }

  const updateCourseInput = (courseInput) => {
    const filtered = courses.filter(course => {
      return course.name.includes(courseInput)
    })
    
    setCourseInput(courseInput);
    setCoursesFiltered(filtered);
  }

  const courseClick = (name) => {
    setCourseInput(name);
    setCoursesFiltered([]);

  }

  return (
    <div>
      <button onClick={addReview} className="add-review-btn">新增心得</button> 
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="modal-header">
          <span>提供心得</span>
          <button onClick={handleClose}>X</button>
        </Modal.Header>
        <Modal.Body className="review-modal">
          <input value={courseInput} onChange={(e) => updateCourseInput(e.target.value)} className="my-2" type="text" placeholder="輸入課程名稱"/>
          {
            coursesFiltered.length !== 0 && courseInput !== "" &&
            <ul className="filtered-list">
              {
                coursesFiltered.map((course, index) => {
                  return (
                    <li onClick={() => courseClick(course.name)} className="filtered-item" key={index}>
                      {course.name}
                    </li>
                  )
                })
              }
            </ul>
            
          }
          <textarea className="review-area" name="review" id="" cols="30" rows="10" placeholder="上課形式、課堂收穫、學習內容..."></textarea>
        </Modal.Body>
        <Modal.Footer>
          <button>送出心得</button>
        </Modal.Footer>
      </Modal>
    </div>
    
  )
}

export default NewReview
