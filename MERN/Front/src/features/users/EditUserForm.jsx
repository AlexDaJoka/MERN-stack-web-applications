import { useState, useEffect } from "react"
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/
const AGE_REGEX = /^[1-9!A-z]{1,9}$/
const EML_REGEX = /^[A-z0-9@.]{1,30}$/

const EditUserForm = ({ user }) => {

    const [updateUser, {
        isLoading,
        isSuccess,
    }] = useUpdateUserMutation()

    const [deleteUser, {
        isSuccess: isDelSuccess,
    }] = useDeleteUserMutation()

    const navigate = useNavigate()

    const [username, setUsername] = useState(user.username)
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
    }, [isSuccess, isDelSuccess, navigate])


    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)
    const onAgeChanged = e => setAge(e.target.value)
    const onEmailChanged = e => setEmail(e.target.value)


    const onSaveUserClicked = async (e) => {
        if (password) {
            await updateUser({ id: user.id, username, password, age, email})
        } else {
            await updateUser({ id: user.id, username, password})
        }
    }

    const onDeleteUserClicked = async () => {
        await deleteUser({ id: user.id })
    }

    let canSave
    if (password) {
        canSave = [validPassword, validPassword, validAge, validEmail].every(Boolean) && !isLoading
    } else {
        canSave = [ validUsername ].every(Boolean) && !isLoading
    }




    const content = (
        <>
        

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edit User</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveUserClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button
                            className="icon-button"
                            title="Delete"
                            onClick={onDeleteUserClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
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
export default EditUserForm