import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import authService from '../services/auth-service';
import { Link } from 'react-router-dom';
import reviewService from '../services/review-service';

const NewReview = ({courses}) => {
  
  const [ show, setShow ] = useState(false);
  const [ loginShow, setLoginShow] = useState(false);
  const [ coursesFiltered, setCoursesFiltered ] = useState([]);
  const [ courseInput, setCourseInput] = useState("");
  const [ selectedCourse, setSelectedCourse] = useState(undefined);
  const [ review, setReview] = useState("");

  const addReview = () => {
    if(authService.isLogin()){
      setShow(true);
    }
    else{
      setLoginShow(true);
    }    
  }

  const handleClose = () => {
    setShow(false);
  }

  const handleLoginClose = () => {
    setLoginShow(false);
  }

  const updateCourseInput = (courseInput) => {
    const filtered = courses.filter(course => {
      return course.name.includes(courseInput)
    })
    
    setCourseInput(courseInput);
    setCoursesFiltered(filtered);
    setSelectedCourse(undefined);
  }

  const courseClick = (course) => {
    setCourseInput(course.name);
    setSelectedCourse(course._id);
    setCoursesFiltered([]);
  }

  const postReview = () => {

    let data = {
      courseId: selectedCourse,
      review: review
    }

    reviewService.createReivew(data)
      .then(res => {
        alert("成功送出心得");
        setShow(false);
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div>
      <button onClick={addReview} className="btn add-review-btn mt-3">新增心得</button> 
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
                    <li onClick={() => courseClick(course)} className="filtered-item" key={index}>
                      {course.name}
                    </li>
                  )
                })
              }
            </ul>
            
          }
          <textarea value={review} onChange={(e) => setReview(e.target.value)} className="review-area" name="review" id="" cols="30" rows="10" placeholder="上課形式、課堂收穫、學習內容..."></textarea>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={postReview} disabled={ selectedCourse === undefined || review === ""}>送出心得</button>
        </Modal.Footer>
      </Modal>
      <Modal show={loginShow} onHide={handleLoginClose}>
        <Modal.Header className="modal-header">
          <h3>請先登入</h3>
        </Modal.Header>
        <Modal.Body >
          <span>本功能僅限登入後使用，請註冊或登入現有帳號後繼續。</span>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleLoginClose}>返回頁面</button>
          <Link className="btn btn-primary" to="/login">登入帳號</Link>
        </Modal.Footer>
      </Modal>
    </div>
    
  )
}

export default NewReview
