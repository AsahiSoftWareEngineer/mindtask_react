import { useEffect, useState } from "react";
import { Checkmark } from "react-ionicons";
import "./styles/Task.css";
import { TaskService } from "../../api/TaskApi";
import { generateId } from "../../modules/generator";
import { TextInput } from "../../components/Input";
import { LoadingComponent } from "../../components/Loading";


const TaskPage = () => {
  const [todayTask, setTodayTask] = useState<TaskType[]>([]);
  const [nextDayTask, setNextDayTask] = useState<NextTaskType[]>([]);
  const [ids, setIds] = useState<{todayId:number, nextDayId:number}>({
    todayId: 0,
    nextDayId: 0,
  })
  const [isOpen, setOpenState] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const TaskSvc = new TaskService()

  useEffect(() => {
    getTasks()
  }, []);

  const openNextDayTask = () => {
    console.log("openNextDayTask");
    setOpenState(!isOpen);
  };

  const getTasks = async () => {
    const request = await TaskSvc.getTasks();
    setIds({
      todayId: request.today.id,
      nextDayId: request.nextday.id
    })
    console.log(request);
    setTodayTask(request.today.tasks)
    setNextDayTask(request.nextday.tasks)
    setLoading(false)
  }

  const changeTaskState = async (id:number) => {
    const newTaskState = todayTask.map((task) => {
      if(task.id === id) {
        task.is_checked = !task.is_checked
        stateCommit(task.id)
      }
      return task
    })
    setTodayTask(newTaskState);
  }

  const generateNewTask = async () => {
    const taskId =  generateId()
    const newTask:NextTaskType = {
      id: taskId,
      name: "",
      is_checked: false,
      is_readonly: false,
    }
    setNextDayTask([...nextDayTask, newTask]);
    return taskId;
  }

  const createNewTask = async () => {
    const taskId = await generateNewTask();
    document.getElementById(`task-${taskId}`)?.focus();
  }

  const changeTaskName = async (id:string, name:string) => {
    const newTaskArray = nextDayTask.map((task) => {
      if(task.id === id) {
        task.name = name;
      }
      return task;
    })
    setNextDayTask(newTaskArray);
  }

  const stateCommit = async (id:number) => {
    const request = await TaskSvc.checkTask(id, ids.todayId)
    return request
  }

  const commitTask = async (id:string) => {
    nextDayTask.forEach(async (task) => {
      if(task.id === id){
        if(task.name === "" && window.confirm("削除しますか?")){
          return deleteTask(ids.nextDayId, task.id);
        }else {
          const request = await TaskSvc.createTask(   
            task.id,
            task.name,
            ids.nextDayId,
          )
          setIds({...ids, nextDayId: request.id})
        }
      }
    })
  }

  const deleteTask = async (id:number, uuid:string) => {
    let targetTask = [...nextDayTask];
    targetTask.forEach((task, i) => {
      if(task.id == uuid){
        targetTask.splice(i, 1)
      }
    })
    console.log(targetTask)
    setNextDayTask(targetTask);
    const request = await TaskSvc.deleteTask(uuid, id); 
    if(request.status == 200)return;
  }

  return (
    <>
      <section className="taskPage">
        <div className={`nextdayTask ${isOpen ? "open" : ""}`}>
          <div className="taskList">
            <ul>
              {nextDayTask.map((task) =>{
                return <li>
                  <div className="taskBar nextDay">
                    <span className="name">
                      <TextInput
                      id={`task-${task.id}`} 
                      is_readonly={task.is_readonly}
                      value={task.name} 
                      onChange={(value) => {changeTaskName(task.id, value)}}
                      onCommit={() => {commitTask(task.id)}}
                    />
                    </span>
                  </div>
                </li>
              })}
            </ul>
            <button className="addNewTaskButton" onClick={() => {createNewTask()}}>Add new task</button>
          </div>
          <div className={`handlar`}>
            <button onClick={openNextDayTask}>
              {isOpen ? "Close" : "Set tommorow task"}
            </button>
          </div>
        </div>
        <div className="todayTask">
          <ul>
            {todayTask.map((task: TaskType) => {
              return (
                <li>
                  <div className="taskBar">
                    <button id={`checkButton-${task.id}`} className={`icon ${task.is_checked?"checked":""}`} onClick={() => {changeTaskState(task.id)}}>
                      {task.is_checked && <Checkmark />}
                    </button>
                    <label htmlFor={`checkButton-${task.id}`} className={`name ${task.is_checked?"checked":""}`}>{task.name}</label>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      {isLoading&&
      <LoadingComponent/>}
    </>
  );
};

export default TaskPage;
