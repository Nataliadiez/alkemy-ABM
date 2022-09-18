
import {Routes as Switch, Route} from 'react-router-dom';
import {Home, Login, Register, Operations, Categories, Error404, EditOperation} from '../Pages';


function Routes(){
    return(
        <>
            <Switch>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/' element={<Home/>}/>
                <Route path='/operations' element={<Operations/>}/>
                <Route path='/edit_register/:id' element={<EditOperation/>}/>
                <Route path='/categories' element={<Categories/>}/>
                <Route path='*' element={<Error404/>}/>
            </Switch>
        </>
    )
}

export default Routes;
