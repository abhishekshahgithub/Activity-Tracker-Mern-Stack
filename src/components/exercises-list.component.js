import React , { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td>
            <Link to={"/edit/"+props.exercise._id}>Edit</Link> | <a href="#" onClick={()=>{ props.deleteExercise(props.exercise._id)}}>Delete</a>
        </td>

    </tr>
)

export default class ExerciseList extends Component {

    constructor(props){
        super(props);

        this.state = {
            ex: []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/Exercises')
            .then(res=> this.setState({ex: res.data}))
            .catch(err=> console.log(err))
    }

    deleteExercise(id){
        console.log(id);
        axios.delete('http://localhost:5000/Exercises/'+id)
            .then(res=>console.log(res.data))
            // .then(console.log('State Exercise' + this.state.ex));    
            // this.setState({
            //     ex: this.state.ex.filter(item=>item._id !== id)
            // })
    }

    exerciseList(){
        return this.state.ex.map(currentexercise => {
            return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id} />;
        })
    }

    render(){
        return (
            <div>
                {/* {console.log(this.state.ex)}
                {this.state.ex.map((item,index) =>
                    <div>
                        <div>{item.username}</div>
                        <div>{item.description}</div>
                        <div>{item.duration}</div>
                        <div>{item.date}</div>
                        <button onClick={()=>this.deleteExercise(item._id)}>Delete</button>
                        <br/>
                    </div>
                )} */}
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.exerciseList() }
                    </tbody>
                </table>
            </div>
        )
    }
}
