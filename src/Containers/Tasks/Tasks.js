import React , {Component} from 'react'
import classes from './Tasks.css'
import Task from '../../components/Task/Task'
import { connect } from 'react-redux'
import firebase from '../../util/firebase'
class Tasks extends Component {
    state={
        tasks:{},
        value:''
    }

  
    inputHadneler = (event) =>{
        const value = event.target.value
        this.setState({
            value:value
        })
    }

    componentDidMount(){
     const toDoRef  = firebase.database().ref('Tasks').child(this.props.userID);
     toDoRef.on('value', (snapshot) => {
             const todos = snapshot.val();
            this.setState({
                tasks:{...todos}
               })
       })
     }
 

    
    addTaskHandeler = ()=>{
        let newTask = {content:this.state.value,status:false};
        const toDoRef  = firebase.database().ref('Tasks').child(this.props.userID);
            toDoRef.push(newTask)
    }

    doneHadeler =(key)=>{
        const doneChild = firebase.database().ref("Tasks").child(this.props.userID).child(key);
        doneChild.update({
        status:true
    })

    }

    deleteHadeler = (key) =>{
        const deleteChild = firebase.database().ref('Tasks').child(this.props.userID).child(key)
        deleteChild.remove();
    }


    render(){
        let tasksElem = []
        let {tasks}= this.state;
           for(let key of  Object.keys(tasks)){
               let task = tasks[key];
                let elm =  <Task 
                content={task.content}
                status={task.status} 
                done={() => this.doneHadeler(key)}
                delete={() => this.deleteHadeler(key)} 
                key={key} />;
                tasksElem.push(elm);
           }


        return(
            <div>
            <div className={classes.InputForm}>
                <input className={classes.Input}
                 type="text" placeholder="Type your task ..." 
                 required="" 
                 value={this.state.value}
                 onChange={(event=> this.inputHadneler(event))}/> 
                <button onClick={this.addTaskHandeler}>
                    <i className="fas fa-plus-square fa-2x" style={{color:'blue'}} />
                </button>
            </div>
            <div className={classes.Container}>
            {tasksElem }
            </div>
            </div>
        );
    }
}
const mapStateToProps = state =>{
    return{
        userID : state.userID
    }

}
export default connect(mapStateToProps)(Tasks)







        // tasks = this.state.tasks.map((data,index)=>{
        //     return <Task 
        //         content={data.content}
        //         status={data.status} 
        //         Done={this.doneHadeler.bind(this,index)}
        //         delete={this.deleteHadeler.bind(this,index)} 
        //         key={index} />
        // })