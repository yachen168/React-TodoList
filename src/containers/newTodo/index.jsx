import { useState, useContext } from "react";
import { ContextStore } from '../../App';
import useSubmitHandler from "../../hooks/useSubmit";
import { addTodo } from '../../action';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faPen, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

import TodoDropdown from "../../components/todoDropdown";
import FormButton from '../../components/formButton';
import { defaultNewTodo } from '../../constant';
import './index.scss';


const AddNewTodo = () => {
  const { dispatch } = useContext(ContextStore);

  const [newTodo, setNewTodo] = useState(defaultNewTodo());
  const [isEditingNewTodo, setIsEditingNewTodo] = useState(false);

  const confirmBtnHandler = () => {
    dispatch(addTodo({...newTodo, todoId: Date.now()}));

    setIsEditingNewTodo(!isEditingNewTodo);
    setNewTodo(defaultNewTodo);
  }

  const cancelBtnHandler = () => {
    setIsEditingNewTodo(!isEditingNewTodo);
    setNewTodo(defaultNewTodo);
  }

  const editNewTodo = (e) => {
    const name = e.currentTarget.dataset.name;

    if (name === 'isStarred' || name === 'isCompleted'){
      setNewTodo({...newTodo, [name]: !newTodo[name]});
    }else{
      setNewTodo({...newTodo, [name]: e.target.value});
    }
  }

  const submitHandler = useSubmitHandler(confirmBtnHandler, newTodo.todoTitle);

  return (
    <section className="new-todo">
      <button className="add-todo" onClick={() => setIsEditingNewTodo(!isEditingNewTodo)}>+ Add Task</button>
      <form className={`edit-area new-todo-edit-area ${isEditingNewTodo ? 'active' : ''}`}
            onSubmit={submitHandler}>
        <div  className={`todo-bar ${newTodo.isStarred ? 'active' : ''}`}>
          <label className="todo-title">
            <input
              className="checkbox"
              type="checkbox"
              data-name="isCompleted"
              checked={newTodo.isCompleted}
              onChange={editNewTodo}
            />
            <input
              className="todo-name new-todo-name"
              type="text"
              placeholder="Type Something Here…"
              data-name="todoTitle"
              value={newTodo.todoTitle}
              onChange={editNewTodo}
            />
          </label>
          <div className="icon-wrapper">
            <span className="star" data-name="isStarred" onClick={editNewTodo}>
              <FontAwesomeIcon icon={faStar}/>
            </span>
            <span className="pen new-pen">
              <FontAwesomeIcon icon={faPen}/>
            </span>
          </div>
        </div>
        <TodoDropdown todo={newTodo}
          editTodo={editNewTodo}
          cancelBtnHandler={cancelBtnHandler}
          submitHandler={submitHandler}
        >
          <FormButton buttonType="reset"
            className="button-cancel"
            clickHandler={cancelBtnHandler}
          >
            <FontAwesomeIcon icon={faTimes}/>Cancel
          </FormButton>
          <FormButton buttonType="submit"
            className="button-confirm"
            clickHandler={submitHandler}
          >
            <FontAwesomeIcon icon={faPlus}/>Add Task
          </FormButton>
        </TodoDropdown>
      </form>
    </section>
  );
}

export default AddNewTodo;