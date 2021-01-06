import React from 'react'

function counter({isShowLeftCount, leftNum, completedNum}) {
    const LeftCounter = <>{ leftNum } <span>{ leftNum > 1 ? 'tasks' : 'task' }</span> left</>;
    const CompletedCounter = <>{ completedNum } <span>{ completedNum > 1 ? 'tasks' : 'task' }</span> completed</>;
    
    return (
      <>
        <h4 className="todo-count ">
          {isShowLeftCount ? LeftCounter : CompletedCounter}        
        </h4>
      </>
    )
}

export default counter;
