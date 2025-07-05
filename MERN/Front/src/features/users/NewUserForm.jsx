import { useState, useEffect } from "react"
import { useAddNewUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/
const AGE_REGEX = /^[1-9!A-z]{1,9}$/
const EML_REGEX = /^[A-z0-9@.]{1,30}$/

const NewUserForm = () => {

    const [addNewUser, {
        isLoading,
        isSuccess
    }] = useAddNewUserMutation()

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState(false)

    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)

    const [age, setAge] = useState('')
    const [validAge, setValidAge] = useState(false)

    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        setValidAge(AGE_REGEX.test(age))
    }, [age])

    useEffect(() => {
        setValidEmail(EML_REGEX.test(email))
    }, [email])

    useEffect(() => {
        if (isSuccess) {
            setUsername('')
            setPassword('')
            setAge('')
            setEmail('')
            navigate('/dash/users')
        }
    }, [isSuccess, navigate])

    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)
    const onAgeChanged = e => setAge(e.target.value)
    const onEmailChanged = e => setEmail(e.target.value)


    const canSave = [validUsername, validPassword, validAge, validEmail].every(Boolean) && !isLoading

    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewUser({ username, password, age, email})
        }
    }


    const content = (
        <>

            <form className="form" onSubmit={onSaveUserClicked}>
                <div className="form__title-row">
                    <h2>New User</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}>
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="username">
                    Username: <span className="nowrap">[3-20 letters]</span></label>
                <input
                    
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="off"
                    value={username}
                    onChange={onUsernameChanged}/>

                <label className="form__label" htmlFor="password">
                    Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
                <input
                    
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={onPasswordChanged}/> 


                    
                <label htmlFor="Age">Age</label>
                <input
                    
                    id="age"
                    name="age"
                    type="number"
                    value={age}
                    onChange={onAgeChanged}/>  
                    
                    
                    <label htmlFor="Email">Email</label>
                <input
                    
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={onEmailChanged}/>  
            </form>
        </>
    )

    return content
}
export default NewUserForm