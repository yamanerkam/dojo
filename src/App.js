import './App.css'
import {BrowserRouter, Route, Switch,Redirect} from 'react-router-dom'
import OnlineUser from './components/OnlineUser';
import Sidebar from './components/Sidebar';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Create from './pages/Create/Create';
import Project from './pages/Project/Project';
import Navbar from './components/Navbar';
import {useLogout} from './hooks/useLogout';
import {useAuthContext} from './hooks/useAuthContext';
function App() {
    const {user,authIsReady} = useAuthContext()
    if (user) {
        console.log(user.email)

    }
    return (

        <div className="App">
          
          {authIsReady && (


<BrowserRouter>  
{user &&<Sidebar/> }        

                <div className="container">
                  <Navbar/>
                  <Switch>
                    <Route exact path='/'>
                    {!user ? <Redirect to='/login'/> : <Dashboard/> }
                    </Route>

                    <Route  path='/login'>
                      {user ? <Redirect to='/'/> : <Login/> }
 
                    </Route>

                    <Route  path='/signup'>
                    {user ? <Redirect to='/'/> : <Signup/> }

                    </Route>

                    <Route  path='/projects/:id'>
                    {!user ? <Redirect to='/login'/> : <Project/> }

                    </Route>

                    <Route  path='/create'>
                    {!user ? <Redirect to='/login'/> : <Create/> }

                    </Route>
                    

                  </Switch>

                </div>
             {user && <OnlineUser/>}   

            </BrowserRouter>


          )}
            
        </div>
    );
}

export default App
