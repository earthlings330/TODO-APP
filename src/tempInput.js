import React , {Component} from 'react'
import classes from './Login.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import Spinner from '../../components/Spinner/Spinner'
import { Redirect } from 'react-router'
import * as actionType from '../../Store/action/index'
import { connect } from 'react-redux'
class Login extends Component{
    state = {
        controls:{
            email:{
                elementtype:'input',
                elementConfig:{
                    type:'email',
                    name:'email',
                    placeholder:'E-mail'
                },
                value:'',
                validation: {
                    required: true,
                    isEmail:true
                },
                valid: false,
                touched: false
            },
            password:{
                elementtype:'input',
                elementConfig:{
                    type:'password',
                    name:'password',
                    placeholder:'Password'
                },
                value:'',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        }
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }


    changeFormHandeler = (event,controlName) =>{
        const updataControls = {
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value:event.target.value,
                valid:this.checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched:true
            }
        }
        this.setState({controls:updataControls})
    }

    submitedHandeler = (event)=>{
        event.preventDefault(); 
        this.props.onFormSubmited(
            this.state.controls.email.value,
            this.state.controls.password.value,
        )
    }

    render(){
        let FormElementsArray = [];
        for(let keys in this.state.controls){
            FormElementsArray.push({
                id:keys,
                config:this.state.controls[keys]
            });
        }

        const form = FormElementsArray.map(formElement =>{
            return(<Input 
                key={formElement.id}
                changed={(event)=>this.changeFormHandeler(event,formElement.id)}
                elementtype={formElement.config.elementtype}
                elementConfig={formElement.config.elementConfig} 
                value={formElement.config.value} 
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}/>
                
                ); 
                   
        })
        let loading = 
        <form onSubmit={this.submitedHandeler}>
                {form}
                <Button elementType="input" type="Success">Login</Button>
        </form>
    if(this.props.loading)
    loading=<Spinner />


    let errorMessage = null

    if(this.props.error){
    errorMessage = (<p style={{
        color:'red'
    }}>Error! : {this.props.error}</p>)
    }

    let redirect = null
    console.log(this.props.isAuth)
    if(this.props.isAuth)
    redirect = <Redirect to="/"/>

        return(
            <div className={classes.Login}>
                {redirect}
                {loading}
                {errorMessage}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        loading:state.loading,
        error:state.error,
        isAuth : state.token !==null 
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onFormSubmited : (email,password)=> dispatch(actionType.authInit(email,password))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login)