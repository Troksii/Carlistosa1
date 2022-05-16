import { BrowserRouter, Route, Link } from "react-router-dom"; //import the package
import TrainingsList from './components/TrainingsList';
import CustomersList from './components/CustomersList';

function MainRouter(){
    return(
        <BrowserRouter>
            <div className="container">
                <Switch>
                    <Route path="/signIn" component={SignIn} />
                    <Route path="/signUp" component={SignUP} />
                </Switch>
            </div>
       </BrowserRouter>

    )
}
export default MainRouter