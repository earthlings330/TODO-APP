import React , { useCallback, useMemo, useState} from 'react'
import classes from './Login.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import Spinner from '../../components/Spinner/Spinner'
import { Redirect } from 'react-router'
import * as actionType from '../../Store/action/index'
import { connect, useDispatch, useSelector } from 'react-redux'


const login = React.memo(props=>{

    const loading  = useSelector(state=>state.auth.loading)
    const error  = useSelector(state=>state.auth.error)
    const isAuth  = useSelector(state=>state.auth.token !==null )

    const dispatch = useDispatch();
    const onFormSubmited = (email,password)=> dispatch(actionType.authInit(email,password))

    const [loginState,setState] = useState({
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
    })

    const checkValidity = (value, rules)=>{
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


    const changeFormHandeler = (event,controlName) =>{
        const updataControls = {
            ...loginState.controls,
            [controlName]:{
                ...loginState.controls[controlName],
                value:event.target.value,
                valid:checkValidity(event.target.value,loginState.controls[controlName].validation),
                touched:true
            }
        }
        setState({controls:updataControls})
    }

    const submitedHandeler = (event)=>{
        event.preventDefault(); 
        onFormSubmited(
            loginState.controls.email.value,
            loginState.controls.password.value,
        )
    }

   
        let FormElementsArray = [];
        for(let keys in loginState.controls){
            FormElementsArray.push({
                id:keys,
                config:loginState.controls[keys]
            });
        }

        const form = FormElementsArray.map(formElement =>{
            return(<Input 
                key={formElement.id}
                changed={(event)=>changeFormHandeler(event,formElement.id)}
                elementtype={formElement.config.elementtype}
                elementConfig={formElement.config.elementConfig} 
                value={formElement.config.value} 
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}/>
                
                ); 
                   
        })
        let Loading = 
        <form onSubmit={submitedHandeler}>
                {form}
                <Button elementType="input" type="Success">Login</Button>
        </form>
    if(loading)
    Loading= <Spinner />



    const errorMsg = useMemo(()=>{
    console.log('Memo error')
    let errorMessage = null
        if(error){  
            errorMessage = (<p style={{
            color:'red'
            }}>Error! : {error}</p>)
            }
        return errorMessage
    },[error])
    

   
    const redirect = useMemo(()=>{
        console.log('Memo isAuth')
        let redirect = null
        if(isAuth){
            redirect = <Redirect to="/"/>
            console.log(isAuth)    
        }
    return redirect
    },[])
   
   


        return(
            <div className={classes.Login}>
                {redirect}
                {Loading}
                {errorMsg}
            </div>
        );
    }
)




export default login